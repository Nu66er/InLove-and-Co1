import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { productsTable } from "./schema/index.js";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const products = [
  // ── COSPLAY (15) ──────────────────────────────────────────────────────────
  { code: "COS-001", name: "Maid Fantasy", description: "Setelan gaun maid mini dengan apron renda putih, elegan dan menggoda.", price: "320000", category: "cosplay", imageUrl: "/cosplay/cosplay-001.png", badge: "New", inStock: true, isFeatured: true },
  { code: "COS-002", name: "Nurse Naughty", description: "Kostum perawat seksi dengan detail medis yang memikat.", price: "295000", category: "cosplay", imageUrl: "/cosplay/cosplay-002.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-003", name: "Schoolgirl Seduction", description: "Seragam sekolah bergaya Jepang dengan rok mini dan kaus kaki tinggi.", price: "280000", category: "cosplay", imageUrl: "/cosplay/cosplay-003.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-004", name: "Cat Girl", description: "Set telinga kucing dan ekor berbulu dengan bodysuit hitam elegan.", price: "310000", category: "cosplay", imageUrl: "/cosplay/cosplay-004.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "COS-005", name: "Bunny Fantasy", description: "Kostum kelinci seksi dengan bando telinga dan ekor pom-pom.", price: "305000", category: "cosplay", imageUrl: "/cosplay/cosplay-005.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-006", name: "Devil's Play", description: "Kostum iblis menggoda dengan sayap dan tanduk merah menyala.", price: "335000", category: "cosplay", imageUrl: "/cosplay/cosplay-006.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-007", name: "Angel's Temptation", description: "Gaun bidadari putih transparan dengan sayap bulu lembut.", price: "345000", category: "cosplay", imageUrl: "/cosplay/cosplay-007.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-008", name: "Witch's Spell", description: "Kostum penyihir misterius dengan topi kerucut dan jubah tipis.", price: "290000", category: "cosplay", imageUrl: "/cosplay/cosplay-008.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-009", name: "Sailor Temptress", description: "Seragam sailor mini bergaya anime dengan dasi pita berwarna.", price: "275000", category: "cosplay", imageUrl: "/cosplay/cosplay-009.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-010", name: "Kimono Fantasy", description: "Kimono Jepang mini dengan obi sutra dan detail bordir halus.", price: "360000", category: "cosplay", imageUrl: "/cosplay/cosplay-010.png", badge: "New", inStock: true, isFeatured: false },
  { code: "COS-011", name: "Warrior Princess", description: "Kostum prajurit putri dengan armor imitasi dan jubah merah.", price: "380000", category: "cosplay", imageUrl: "/cosplay/cosplay-011.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-012", name: "Policewoman", description: "Seragam polisi seksi dengan lencana imitasi dan topi dinas.", price: "315000", category: "cosplay", imageUrl: "/cosplay/cosplay-012.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-013", name: "French Maid Luxe", description: "Gaun maid Prancis klasik dengan apron renda dan sarung tangan panjang.", price: "350000", category: "cosplay", imageUrl: "/cosplay/cosplay-013.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "COS-014", name: "Anime Goddess", description: "Kostum karakter anime dengan wig berwarna dan aksesori lengkap.", price: "370000", category: "cosplay", imageUrl: "/cosplay/cosplay-014.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-015", name: "Dark Goddess", description: "Kostum dewi kegelapan mewah dengan detail batu permata imitasi.", price: "420000", category: "cosplay", imageUrl: "/cosplay/cosplay-015.png", badge: "Limited", inStock: true, isFeatured: true },

  // ── LINGERIE (15) ─────────────────────────────────────────────────────────
  { code: "LNG-001", name: "Velvet Rose", description: "Set lingerie renda merah mawar dengan detail bunga tiga dimensi.", price: "285000", category: "lingerie", imageUrl: "/lingerie/lingerie-001.png", badge: "New", inStock: true, isFeatured: true },
  { code: "LNG-002", name: "Midnight Lace", description: "Set bra dan celana dalam hitam transparan dengan renda premium.", price: "260000", category: "lingerie", imageUrl: "/lingerie/lingerie-002.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-003", name: "Silk Desire", description: "Negligee sutra lembut dengan potongan asimetris yang menawan.", price: "310000", category: "lingerie", imageUrl: "/lingerie/lingerie-003.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-004", name: "Crimson Temptation", description: "Babydoll merah padam dengan detail rhinestone di neckline.", price: "295000", category: "lingerie", imageUrl: "/lingerie/lingerie-004.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "LNG-005", name: "Pearl Fantasy", description: "Harness tali mutiara imitasi di atas bodysuit mesh transparan.", price: "340000", category: "lingerie", imageUrl: "/lingerie/lingerie-005.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-006", name: "Black Obsession", description: "Set korset hitam dengan suspender dan garter belt klasik.", price: "375000", category: "lingerie", imageUrl: "/lingerie/lingerie-006.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-007", name: "Ivory Dream", description: "Set lingerie putih gading dengan renda Chantilly dan pita satin.", price: "290000", category: "lingerie", imageUrl: "/lingerie/lingerie-007.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-008", name: "Scarlet Seduction", description: "One-piece bodysuit merah dengan cut-out strategis dan resleting belakang.", price: "320000", category: "lingerie", imageUrl: "/lingerie/lingerie-008.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-009", name: "Lace Whisper", description: "Babydoll renda berlapisan dengan celana dalam thong yang serasi.", price: "255000", category: "lingerie", imageUrl: "/lingerie/lingerie-009.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-010", name: "Golden Touch", description: "Set lingerie nude dengan detail benang emas dan bra push-up.", price: "305000", category: "lingerie", imageUrl: "/lingerie/lingerie-010.png", badge: "New", inStock: true, isFeatured: false },
  { code: "LNG-011", name: "Violet Veil", description: "Chemise ungu lavender transparan dengan renda di tepi bawah.", price: "270000", category: "lingerie", imageUrl: "/lingerie/lingerie-011.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-012", name: "Noir Collection", description: "Set bralette hitam dengan suspender dan stocking jala halus.", price: "355000", category: "lingerie", imageUrl: "/lingerie/lingerie-012.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "LNG-013", name: "Satin Kiss", description: "Slip dress satin merah muda dengan tali spagetti tipis dan renda.", price: "280000", category: "lingerie", imageUrl: "/lingerie/lingerie-013.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-014", name: "Crystal Desire", description: "Bodysuit jala dengan hiasan kristal Swarovski di bagian dada.", price: "450000", category: "lingerie", imageUrl: "/lingerie/lingerie-014.png", badge: "Limited", inStock: true, isFeatured: true },
  { code: "LNG-015", name: "Blush Romance", description: "Set bridal lingerie dusty pink dengan veil mini dan sarung tangan renda.", price: "395000", category: "lingerie", imageUrl: "/lingerie/lingerie-015.png", badge: "New", inStock: true, isFeatured: false },

  // ── ACCESSORIES (9) ───────────────────────────────────────────────────────
  { code: "ACC-001", name: "Velvet Blindfold", description: "Penutup mata beludru premium dengan bantalan empuk dan tali elastis.", price: "95000", category: "accessories", imageUrl: "/accessories/accessories-001.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-002", name: "Satin Restraint Set", description: "Set pengikat tangan dan kaki dari satin lembut dengan gesper velcro.", price: "185000", category: "accessories", imageUrl: "/accessories/accessories-002.png", badge: "New", inStock: true, isFeatured: true },
  { code: "ACC-003", name: "Feather Tickler", description: "Bulu gelitik ostrich premium dengan gagang berlapis kulit imitasi.", price: "75000", category: "accessories", imageUrl: "/accessories/accessories-003.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-004", name: "Pearl Collar", description: "Kalung kerah mutiara imitasi dengan cincin O dan tali rantai tipis.", price: "145000", category: "accessories", imageUrl: "/accessories/accessories-004.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-005", name: "Silk Ribbon", description: "Set pita sutra multifungsi panjang 2m dalam 3 warna pilihan.", price: "65000", category: "accessories", imageUrl: "/accessories/accessories-005.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-006", name: "Crystal Choker", description: "Choker berlapis kristal dengan detail berlian imitasi yang memukau.", price: "120000", category: "accessories", imageUrl: "/accessories/accessories-006.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "ACC-007", name: "Lace Mask", description: "Masker mata renda dengan bingkai detail bordir halus.", price: "85000", category: "accessories", imageUrl: "/accessories/accessories-007.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-008", name: "Gold Cuff Set", description: "Set gelang borgol imitasi berlapis emas dengan kunci dan kunci cadangan.", price: "165000", category: "accessories", imageUrl: "/accessories/accessories-008.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-009", name: "Velvet Flogger", description: "Flogger mini dari kulit imitasi premium dengan gagang beludru.", price: "155000", category: "accessories", imageUrl: "/accessories/accessories-009.png", badge: "New", inStock: true, isFeatured: false },

  // ── SEX TOYS (7) ──────────────────────────────────────────────────────────
  { code: "TOY-001", name: "Rose Suction Vibrator", description: "Vibrator rose berbentuk mawar dengan teknologi suction 10 intensitas.", price: "285000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-001.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "TOY-002", name: "Luxury Magic Wand", description: "Pijat wand elektrik premium dengan 20 mode getaran whisper-quiet.", price: "420000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-002.png", badge: null, inStock: true, isFeatured: false },
  { code: "TOY-003", name: "Dual Pleasure Pro", description: "Vibrator dual-stimulation dengan kontrol terpisah dan bahan medical-grade.", price: "490000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-003.png", badge: "New", inStock: true, isFeatured: true },
  { code: "TOY-004", name: "Wireless Butterfly", description: "Wearable butterfly vibrator nirkabel dengan remote kontrol 10 meter.", price: "375000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-004.png", badge: null, inStock: true, isFeatured: false },
  { code: "TOY-005", name: "G-Spot Explorer", description: "Vibrator G-spot melengkung dengan ujung fleksibel dan 12 pola getaran.", price: "340000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-005.png", badge: null, inStock: true, isFeatured: false },
  { code: "TOY-006", name: "Couples Vibrating Ring", description: "Cincin getar pasangan silikon stretch dengan 7 mode untuk kenikmatan berdua.", price: "195000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-006.png", badge: null, inStock: true, isFeatured: false },
  { code: "TOY-007", name: "Suction Wave Clitoral", description: "Stimulator klitoral suction wave tanpa kontak dengan 11 intensitas.", price: "455000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-007.png", badge: "Limited", inStock: true, isFeatured: true },
];

async function seed() {
  console.log(`Seeding ${products.length} products...`);

  await db.delete(productsTable);
  console.log("Cleared existing products.");

  for (const p of products) {
    await db.insert(productsTable).values(p);
    console.log(`  ✓ [${p.code}] ${p.name}`);
  }

  console.log("\nDone! All products seeded successfully.");
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
