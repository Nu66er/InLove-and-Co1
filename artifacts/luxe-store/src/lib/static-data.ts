import storeData from "../../../../store-data/products.json";

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  badge: string | null;
  inStock: boolean;
  isFeatured: boolean;
}

export interface Category {
  slug: string;
  label: string;
  productCount: number;
  description?: string;
}

export const ALL_PRODUCTS: Product[] = storeData.products.map((p, index) => ({
  id: index + 1,
  code: p.code,
  name: p.name,
  description: p.description,
  price: p.price,
  category: p.category,
  imageUrl: `/products/${p.code}.png`,
  badge: p.badge ?? null,
  inStock: p.inStock,
  isFeatured: p.isFeatured,
}));

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  cosplay:     { label: "Cosplay",     description: "Premium cosplay costumes for endless role-play and fantasy." },
  lingerie:    { label: "Lingerie",    description: "Elegant lingerie crafted from premium materials for perfect intimate moments." },
  accessories: { label: "Accessories", description: "Curated accessories to complement every experience with a luxurious touch." },
  "sex-toys":  { label: "Sex Toys",    description: "Premium adult toys of the highest quality for maximum pleasure." },
};

export const ALL_CATEGORIES: Category[] = Object.entries(CATEGORY_META).map(
  ([slug, meta]) => ({
    slug,
    label: meta.label,
    description: meta.description,
    productCount: ALL_PRODUCTS.filter(p => p.category === slug).length,
  })
);

export function getProductById(id: number): Product | undefined {
  return ALL_PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category?: string): Product[] {
  if (!category) return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return ALL_PRODUCTS.filter(p => p.isFeatured);
}

export function getProductLink(code: string): string {
  const entry = storeData.products.find(p => p.code === code);
  return entry?.link ?? "";
}
