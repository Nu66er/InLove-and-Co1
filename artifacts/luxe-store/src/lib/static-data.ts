import imageData from "../../../../product-images/images.json";

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

const imageMap: Record<string, string> = Object.fromEntries(
  imageData.products.map((p) => [p.code, p.image])
);

function img(code: string, fallback: string): string {
  return imageMap[code] ?? fallback;
}

export const ALL_PRODUCTS: Product[] = [
  // ── COSPLAY (15) ──────────────────────────────────────────────────────────
  { id: 1,  code: "COS-001", name: "White Nurse Costume",        description: "Elegant white satin nurse dress with classic nurse cap and delicate details.",                         price: "320000", category: "cosplay",     imageUrl: img("COS-001", "/cosplay/cosplay-001.png"),       badge: "New",     inStock: true, isFeatured: true },
  { id: 2,  code: "COS-002", name: "Blue Sailor Uniform",        description: "Sky-blue sailor crop top with pencil skirt and authentic sailor accessories.",                        price: "295000", category: "cosplay",     imageUrl: img("COS-002", "/cosplay/cosplay-002.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 3,  code: "COS-003", name: "Pink Nurse Set",             description: "Open-front pink nurse set with stethoscope prop and lace detailing.",                                 price: "280000", category: "cosplay",     imageUrl: img("COS-003", "/cosplay/cosplay-003.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 4,  code: "COS-004", name: "Police Costume",             description: "Navy blue police bodysuit complete with belt accessories and badge.",                                 price: "310000", category: "cosplay",     imageUrl: img("COS-004", "/cosplay/cosplay-004.png"),       badge: "Hot",     inStock: true, isFeatured: true },
  { id: 5,  code: "COS-005", name: "Black Cat Girl",             description: "Black fluffy cat mini dress with ruffle collar and matching cat ears.",                               price: "305000", category: "cosplay",     imageUrl: img("COS-005", "/cosplay/cosplay-005.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 6,  code: "COS-006", name: "Navy Sailor Mini",           description: "Dark navy sailor crop top with pleated mini skirt and sailor tie.",                                   price: "335000", category: "cosplay",     imageUrl: img("COS-006", "/cosplay/cosplay-006.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 7,  code: "COS-007", name: "Black Floral Kimono",        description: "Elegant black floral-patterned kimono with satin obi and traditional details.",                      price: "345000", category: "cosplay",     imageUrl: img("COS-007", "/cosplay/cosplay-007.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 8,  code: "COS-008", name: "Secretary Tie Set",          description: "Professional white button shirt with black tie and sleek mini skirt.",                               price: "290000", category: "cosplay",     imageUrl: img("COS-008", "/cosplay/cosplay-008.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 9,  code: "COS-009", name: "Lace Cat Lady",              description: "Black lace corset with skirt and cat ears for a mysterious alluring look.",                          price: "275000", category: "cosplay",     imageUrl: img("COS-009", "/cosplay/cosplay-009.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 10, code: "COS-010", name: "White Suspender Set",        description: "White mesh crop top with black suspender shorts and cute cat ears.",                                 price: "360000", category: "cosplay",     imageUrl: img("COS-010", "/cosplay/cosplay-010.png"),       badge: "New",     inStock: true, isFeatured: false },
  { id: 11, code: "COS-011", name: "Black Cat Girl Set",         description: "Black cutout crop top with mini skirt and edgy cat ears.",                                           price: "380000", category: "cosplay",     imageUrl: img("COS-011", "/cosplay/cosplay-011.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 12, code: "COS-012", name: "Blue Plaid Maid Set",        description: "Blue plaid maid set with sweet bow headband and lace apron.",                                        price: "315000", category: "cosplay",     imageUrl: img("COS-012", "/cosplay/cosplay-012.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 13, code: "COS-013", name: "Flight Attendant",           description: "White button shirt flight attendant uniform with navy pencil skirt and service cap.",                 price: "350000", category: "cosplay",     imageUrl: img("COS-013", "/cosplay/cosplay-013.png"),       badge: "Hot",     inStock: true, isFeatured: true },
  { id: 14, code: "COS-014", name: "Spider Girl Bodysuit",       description: "Striking black spider bodysuit with intricate web-pattern detailing.",                               price: "370000", category: "cosplay",     imageUrl: img("COS-014", "/cosplay/cosplay-014.png"),       badge: null,      inStock: true, isFeatured: false },
  { id: 15, code: "COS-015", name: "Tartan Uniform",             description: "Tie-front white crop top with tartan plaid skirt for a kawaii-inspired look.",                       price: "420000", category: "cosplay",     imageUrl: img("COS-015", "/cosplay/cosplay-015.png"),       badge: "Limited", inStock: true, isFeatured: true },

  // ── LINGERIE (15) ─────────────────────────────────────────────────────────
  { id: 16, code: "LNG-001", name: "Black Sheer Shirt",          description: "Long black sheer shirt with lace inner for a sensual layered look.",                                 price: "285000", category: "lingerie",    imageUrl: img("LNG-001", "/lingerie/lingerie-001.png"),     badge: "New",     inStock: true, isFeatured: true },
  { id: 17, code: "LNG-002", name: "Grey Halter Set",            description: "Grey lace halter top with pleated skirt and elegant fishnet socks.",                                 price: "260000", category: "lingerie",    imageUrl: img("LNG-002", "/lingerie/lingerie-002.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 18, code: "LNG-003", name: "Black Satin Mini Dress",     description: "Black satin halter mini dress with captivating silver chain detail.",                                price: "310000", category: "lingerie",    imageUrl: img("LNG-003", "/lingerie/lingerie-003.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 19, code: "LNG-004", name: "Black Lace Robe",            description: "Sheer black lace kimono robe with matching bra-brief set.",                                          price: "295000", category: "lingerie",    imageUrl: img("LNG-004", "/lingerie/lingerie-004.png"),     badge: "Hot",     inStock: true, isFeatured: true },
  { id: 20, code: "LNG-005", name: "Off-Shoulder Lace Dress",    description: "Black lace off-shoulder mini dress with a striking silhouette.",                                     price: "340000", category: "lingerie",    imageUrl: img("LNG-005", "/lingerie/lingerie-005.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 21, code: "LNG-006", name: "Black Ribbon Babydoll",      description: "Sheer black babydoll with satin ribbon bow and chain garter detail.",                                price: "375000", category: "lingerie",    imageUrl: img("LNG-006", "/lingerie/lingerie-006.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 22, code: "LNG-007", name: "Lace Suspender Corset",      description: "Black lace corset with suspender garter and matching stockings.",                                    price: "290000", category: "lingerie",    imageUrl: img("LNG-007", "/lingerie/lingerie-007.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 23, code: "LNG-008", name: "Pink Floral Satin Set",      description: "Pink floral satin cami top with matching shorts for effortless elegance.",                           price: "320000", category: "lingerie",    imageUrl: img("LNG-008", "/lingerie/lingerie-008.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 24, code: "LNG-009", name: "Long Pink Slip Dress",       description: "Peach satin midi slip dress with minimalist spaghetti straps.",                                      price: "255000", category: "lingerie",    imageUrl: img("LNG-009", "/lingerie/lingerie-009.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 25, code: "LNG-010", name: "Red Satin Mini Dress",       description: "Red satin cowl-neck mini dress with a feminine and elegant cut.",                                    price: "305000", category: "lingerie",    imageUrl: img("LNG-010", "/lingerie/lingerie-010.png"),     badge: "New",     inStock: true, isFeatured: false },
  { id: 26, code: "LNG-011", name: "Black Lace Ribbon Babydoll", description: "Black lace babydoll with romantic satin ribbon accents.",                                            price: "270000", category: "lingerie",    imageUrl: img("LNG-011", "/lingerie/lingerie-011.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 27, code: "LNG-012", name: "Red Ruffle Babydoll",        description: "Sheer red babydoll with ruffle trim and faux pearl necklace.",                                       price: "355000", category: "lingerie",    imageUrl: img("LNG-012", "/lingerie/lingerie-012.png"),     badge: "Hot",     inStock: true, isFeatured: true },
  { id: 28, code: "LNG-013", name: "Cream Lace Ribbon Bodysuit", description: "Cream lace bodysuit with satin bow and garter for a bridal-inspired look.",                         price: "280000", category: "lingerie",    imageUrl: img("LNG-013", "/lingerie/lingerie-013.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 29, code: "LNG-014", name: "Maroon Ribbon Mini Dress",   description: "Maroon halter mini dress with ribbon bow and layered lace skirt.",                                   price: "450000", category: "lingerie",    imageUrl: img("LNG-014", "/lingerie/lingerie-014.png"),     badge: "Limited", inStock: true, isFeatured: true },
  { id: 30, code: "LNG-015", name: "Red Layered Satin Mini Dress",description: "Red layered satin halter mini dress with a sensual tiered cut.",                                   price: "395000", category: "lingerie",    imageUrl: img("LNG-015", "/lingerie/lingerie-015.png"),     badge: "New",     inStock: true, isFeatured: false },

  // ── ACCESSORIES (9) ───────────────────────────────────────────────────────
  { id: 31, code: "ACC-001", name: "Red BDSM Gift Set",          description: "Complete red BDSM gift set in premium box — flogger, cuffs, blindfold, rope, and ball gag.",        price: "485000", category: "accessories", imageUrl: img("ACC-001", "/accessories/accessories-001.png"), badge: "Hot",    inStock: true, isFeatured: true },
  { id: 32, code: "ACC-002", name: "Black Leather Blindfold",    description: "Cross-strap black leather blindfold with adjustable buckle for intense sensations.",                 price: "145000", category: "accessories", imageUrl: img("ACC-002", "/accessories/accessories-002.png"), badge: "New",    inStock: true, isFeatured: true },
  { id: 33, code: "ACC-003", name: "Long Lace Gloves",           description: "Long elegant black lace gloves with premium floral pattern.",                                        price: "95000",  category: "accessories", imageUrl: img("ACC-003", "/accessories/accessories-003.png"), badge: null,     inStock: true, isFeatured: false },
  { id: 34, code: "ACC-004", name: "Venetian Mask",              description: "Black metal filigree venetian mask with intricate floral engraving.",                                price: "175000", category: "accessories", imageUrl: img("ACC-004", "/accessories/accessories-004.png"), badge: null,     inStock: true, isFeatured: false },
  { id: 35, code: "ACC-005", name: "Fishnet Lace Stockings",     description: "Black thigh-high fishnet stockings with floral lace border.",                                        price: "85000",  category: "accessories", imageUrl: img("ACC-005", "/accessories/accessories-005.png"), badge: null,     inStock: true, isFeatured: false },
  { id: 36, code: "ACC-006", name: "Leather Collar & Chain",     description: "Wide black leather collar with long silver chain leash and handle.",                                 price: "165000", category: "accessories", imageUrl: img("ACC-006", "/accessories/accessories-006.png"), badge: "Hot",    inStock: true, isFeatured: true },
  { id: 37, code: "ACC-007", name: "Metal Handcuffs & Keys",     description: "Real metal handcuffs with antique bronze keys in a steampunk style.",                               price: "125000", category: "accessories", imageUrl: img("ACC-007", "/accessories/accessories-007.png"), badge: null,     inStock: true, isFeatured: false },
  { id: 38, code: "ACC-008", name: "O-Ring Leather Choker",      description: "Black leather choker with silver O-ring and triple-layer hanging chains.",                           price: "115000", category: "accessories", imageUrl: img("ACC-008", "/accessories/accessories-008.png"), badge: null,     inStock: true, isFeatured: false },
  { id: 39, code: "ACC-009", name: "Chain Waist Harness",        description: "Black leather waist-to-thigh harness with adjustable silver chains.",                               price: "195000", category: "accessories", imageUrl: img("ACC-009", "/accessories/accessories-009.png"), badge: "New",    inStock: true, isFeatured: false },

  // ── SEX TOYS (7) ──────────────────────────────────────────────────────────
  { id: 40, code: "TOY-001", name: "Aura Rabbit Vibrator",       description: "Premium pink dual-stimulation rabbit vibrator with dual motors, by Aura.",                          price: "485000", category: "sex-toys",    imageUrl: img("TOY-001", "/sex-toys/sex-toys-001.png"),     badge: "Hot",     inStock: true, isFeatured: true },
  { id: 41, code: "TOY-002", name: "Black Bullet Vibrator",      description: "Waterproof matte black bullet vibrator with premium body and 10 vibration modes.",                  price: "320000", category: "sex-toys",    imageUrl: img("TOY-002", "/sex-toys/sex-toys-002.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 42, code: "TOY-003", name: "Pastel Duo Mini Vibrator",   description: "Set of two whisper-quiet pastel mini vibrators (white & pink) by Biutte.co.",                      price: "275000", category: "sex-toys",    imageUrl: img("TOY-003", "/sex-toys/sex-toys-003.png"),     badge: "New",     inStock: true, isFeatured: true },
  { id: 43, code: "TOY-004", name: "Magenta Egg Vibrator",       description: "Curved magenta egg vibrator with ergonomic handle and 12 vibration patterns.",                      price: "375000", category: "sex-toys",    imageUrl: img("TOY-004", "/sex-toys/sex-toys-004.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 44, code: "TOY-005", name: "Magenta Love Egg",           description: "Wearable magenta silicone love egg with tail control and 10 intensity levels.",                     price: "340000", category: "sex-toys",    imageUrl: img("TOY-005", "/sex-toys/sex-toys-005.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 45, code: "TOY-006", name: "Pink Wave Vibrator",         description: "Ribbed pink silicone wave vibrator with silver ring and 7 vibration modes.",                        price: "295000", category: "sex-toys",    imageUrl: img("TOY-006", "/sex-toys/sex-toys-006.png"),     badge: null,      inStock: true, isFeatured: false },
  { id: 46, code: "TOY-007", name: "Male Vacuum Pump",           description: "Clear acrylic cylinder vacuum pump with precision hand pump and flexible hose.",                    price: "455000", category: "sex-toys",    imageUrl: img("TOY-007", "/sex-toys/sex-toys-007.png"),     badge: "Limited", inStock: true, isFeatured: true },
];

export const ALL_CATEGORIES: Category[] = [
  { slug: "cosplay",     label: "Cosplay",     productCount: 15, description: "Premium cosplay costumes for endless role-play and fantasy." },
  { slug: "lingerie",    label: "Lingerie",    productCount: 15, description: "Elegant lingerie crafted from premium materials for perfect intimate moments." },
  { slug: "accessories", label: "Accessories", productCount: 9,  description: "Curated accessories to complement every experience with a luxurious touch." },
  { slug: "sex-toys",    label: "Sex Toys",    productCount: 7,  description: "Premium adult toys of the highest quality for maximum pleasure." },
];

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
