import { Router } from "express";
import { readFile } from "fs/promises";
import { resolve } from "path";

const router = Router();

const LINKS_FILE = resolve(process.cwd(), "../../product-links/links.json");

router.get("/product-links", async (req, res) => {
  try {
    const raw = await readFile(LINKS_FILE, "utf-8");
    const data = JSON.parse(raw);

    const lookup: Record<string, string> = {};
    for (const items of Object.values(data) as Array<Array<{ code: string; link: string }>>) {
      if (!Array.isArray(items)) continue;
      for (const item of items) {
        if (item.code && item.link) {
          lookup[item.code] = item.link;
        }
      }
    }

    res.json(lookup);
  } catch (err) {
    req.log.warn({ err }, "Could not read product-links.json");
    res.json({});
  }
});

export default router;
