import { Router } from "express";
import { db, productsTable } from "@workspace/db";
import { eq, ilike, or, and, sql } from "drizzle-orm";
import {
  ListProductsQueryParams,
  CreateProductBody,
  GetProductParams,
  UpdateProductParams,
  UpdateProductBody,
  DeleteProductParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/products/summary", async (req, res) => {
  try {
    const [totalResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(productsTable);

    const [newResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(productsTable)
      .where(eq(productsTable.badge, "New"));

    const [featuredResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(productsTable)
      .where(eq(productsTable.isFeatured, true));

    const categoryRows = await db
      .selectDistinct({ category: productsTable.category })
      .from(productsTable);

    res.json({
      totalProducts: totalResult.count,
      totalCategories: categoryRows.length,
      newArrivalsCount: newResult.count,
      featuredCount: featuredResult.count,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get store summary");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const parsed = ListProductsQueryParams.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid query params" });
      return;
    }
    const { category, search, featured } = parsed.data;

    const conditions = [];
    if (category) conditions.push(eq(productsTable.category, category));
    if (featured !== undefined) conditions.push(eq(productsTable.isFeatured, featured));
    if (search) {
      conditions.push(
        or(
          ilike(productsTable.name, `%${search}%`),
          ilike(productsTable.description, `%${search}%`)
        )!
      );
    }

    const rows = await db
      .select()
      .from(productsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(productsTable.createdAt);

    const products = rows.map((r) => ({
      ...r,
      price: Number(r.price),
      createdAt: r.createdAt.toISOString(),
    }));

    res.json(products);
  } catch (err) {
    req.log.error({ err }, "Failed to list products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const parsed = CreateProductBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }
    const { name, description, price, category, imageUrl, badge, inStock, isFeatured } = parsed.data;
    const [row] = await db
      .insert(productsTable)
      .values({
        name,
        description: description ?? null,
        price: String(price),
        category,
        imageUrl: imageUrl ?? null,
        badge: badge ?? null,
        inStock: inStock ?? true,
        isFeatured: isFeatured ?? false,
      })
      .returning();

    res.status(201).json({
      ...row,
      price: Number(row.price),
      createdAt: row.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const parsed = GetProductParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const [row] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, parsed.data.id));

    if (!row) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({
      ...row,
      price: Number(row.price),
      createdAt: row.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/products/:id", async (req, res) => {
  try {
    const paramParsed = UpdateProductParams.safeParse({ id: Number(req.params.id) });
    if (!paramParsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const bodyParsed = UpdateProductBody.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }

    const updates: Record<string, unknown> = {};
    const b = bodyParsed.data;
    if (b.name !== undefined) updates.name = b.name;
    if (b.description !== undefined) updates.description = b.description;
    if (b.price !== undefined) updates.price = String(b.price);
    if (b.category !== undefined) updates.category = b.category;
    if (b.imageUrl !== undefined) updates.imageUrl = b.imageUrl;
    if (b.badge !== undefined) updates.badge = b.badge;
    if (b.inStock !== undefined) updates.inStock = b.inStock;
    if (b.isFeatured !== undefined) updates.isFeatured = b.isFeatured;

    const [row] = await db
      .update(productsTable)
      .set(updates)
      .where(eq(productsTable.id, paramParsed.data.id))
      .returning();

    if (!row) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({
      ...row,
      price: Number(row.price),
      createdAt: row.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const parsed = DeleteProductParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    await db.delete(productsTable).where(eq(productsTable.id, parsed.data.id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const rows = await db
      .select({
        category: productsTable.category,
        count: sql<number>`count(*)::int`,
      })
      .from(productsTable)
      .groupBy(productsTable.category);

    const categoryMeta: Record<string, { label: string; description: string; order: number }> = {
      cosplay: {
        label: "Cosplay",
        description: "Daring costumes and fantasy wear for every role you desire to embody.",
        order: 1,
      },
      lingerie: {
        label: "Lingerie",
        description: "Exquisite intimates crafted for the discerning woman — lace, silk, and beyond.",
        order: 2,
      },
      accessories: {
        label: "Accessories",
        description: "Refined accessories to elevate every intimate moment.",
        order: 3,
      },
      "sex-toys": {
        label: "Sex Toys",
        description: "Premium pleasure devices designed for exploration and exquisite sensation.",
        order: 4,
      },
    };

    const categories = rows
      .map((r) => ({
        slug: r.category,
        label: categoryMeta[r.category]?.label ?? r.category,
        productCount: r.count,
        description: categoryMeta[r.category]?.description ?? null,
        order: categoryMeta[r.category]?.order ?? 99,
      }))
      .sort((a, b) => a.order - b.order)
      .map(({ order: _order, ...rest }) => rest);

    res.json(categories);
  } catch (err) {
    req.log.error({ err }, "Failed to list categories");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
