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
  { code: "COS-001", name: "Nurse Costume Putih", description: "Gaun satin putih perawat dengan detail elegan dan topi nurse klasik.", price: "320000", category: "cosplay", imageUrl: "/cosplay/cosplay-001.png", badge: "New", inStock: true, isFeatured: true },
  { code: "COS-002", name: "Sailor Seragam Biru", description: "Set sailor crop biru langit dengan rok pensil dan aksesori sailor.", price: "295000", category: "cosplay", imageUrl: "/cosplay/cosplay-002.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-003", name: "Nurse Set Pink", description: "Set nurse pink terbuka dengan stetoskop imitasi dan detail renda.", price: "280000", category: "cosplay", imageUrl: "/cosplay/cosplay-003.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-004", name: "Kostum Polisi", description: "Bodysuit polisi navy blue lengkap dengan aksesori sabuk dan lencana.", price: "310000", category: "cosplay", imageUrl: "/cosplay/cosplay-004.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "COS-005", name: "Cat Girl Hitam", description: "Mini dress kucing hitam berbulu dengan kerah ruffle dan telinga kucing.", price: "305000", category: "cosplay", imageUrl: "/cosplay/cosplay-005.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-006", name: "Sailor Navy Mini", description: "Sailor crop navy gelap dengan rok mini plisket dan dasi pelaut.", price: "335000", category: "cosplay", imageUrl: "/cosplay/cosplay-006.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-007", name: "Kimono Bunga Hitam", description: "Kimono bermotif bunga hitam elegan dengan obi satin dan detail tradisional.", price: "345000", category: "cosplay", imageUrl: "/cosplay/cosplay-007.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-008", name: "Sekretaris Dasi", description: "Kemeja putih sekretaris dengan dasi hitam dan rok mini profesional.", price: "290000", category: "cosplay", imageUrl: "/cosplay/cosplay-008.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-009", name: "Cat Lady Renda", description: "Korset renda hitam dengan rok dan telinga kucing untuk tampilan misterius.", price: "275000", category: "cosplay", imageUrl: "/cosplay/cosplay-009.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-010", name: "Suspender Set Putih", description: "Atasan mesh putih dengan suspender shorts hitam dan telinga kucing imut.", price: "360000", category: "cosplay", imageUrl: "/cosplay/cosplay-010.png", badge: "New", inStock: true, isFeatured: false },
  { code: "COS-011", name: "Cat Girl Set Hitam", description: "Crop cutout hitam dengan rok mini dan telinga kucing edgy.", price: "380000", category: "cosplay", imageUrl: "/cosplay/cosplay-011.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-012", name: "Maid Kotak Biru", description: "Set maid plaid biru dengan bow headband manis dan apron renda.", price: "315000", category: "cosplay", imageUrl: "/cosplay/cosplay-012.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-013", name: "Pramugari", description: "Seragam pramugari kemeja putih dengan rok pensil navy dan topi dinas.", price: "350000", category: "cosplay", imageUrl: "/cosplay/cosplay-013.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "COS-014", name: "Spider Girl Bodysuit", description: "Bodysuit spider hitam dengan motif jaring laba-laba yang memukau.", price: "370000", category: "cosplay", imageUrl: "/cosplay/cosplay-014.png", badge: null, inStock: true, isFeatured: false },
  { code: "COS-015", name: "Seragam Tartan", description: "Atasan tie-front putih dengan rok tartan plaid untuk gaya kawaii.", price: "420000", category: "cosplay", imageUrl: "/cosplay/cosplay-015.png", badge: "Limited", inStock: true, isFeatured: true },

  // ── LINGERIE (15) ─────────────────────────────────────────────────────────
  { code: "LNG-001", name: "Kemeja Transparan Hitam", description: "Kemeja sheer hitam panjang dengan inner renda untuk tampilan sensual.", price: "285000", category: "lingerie", imageUrl: "/lingerie/lingerie-001.png", badge: "New", inStock: true, isFeatured: true },
  { code: "LNG-002", name: "Set Abu Halter", description: "Halter renda abu dengan rok plisket dan kaus kaki fishnet elegan.", price: "260000", category: "lingerie", imageUrl: "/lingerie/lingerie-002.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-003", name: "Mini Dress Satin Hitam", description: "Halter mini satin hitam dengan detail rantai perak yang menawan.", price: "310000", category: "lingerie", imageUrl: "/lingerie/lingerie-003.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-004", name: "Robe Renda Hitam", description: "Kimono robe renda hitam transparan dengan set bra-brief serasi.", price: "295000", category: "lingerie", imageUrl: "/lingerie/lingerie-004.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "LNG-005", name: "Dress Renda Off-Shoulder", description: "Mini dress renda hitam off-shoulder dengan siluet memukau.", price: "340000", category: "lingerie", imageUrl: "/lingerie/lingerie-005.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-006", name: "Babydoll Hitam Pita", description: "Babydoll sheer hitam dengan bow pita dan detail garter rantai.", price: "375000", category: "lingerie", imageUrl: "/lingerie/lingerie-006.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-007", name: "Korset Renda Suspender", description: "Korset renda hitam dengan suspender garter dan stocking serasi.", price: "290000", category: "lingerie", imageUrl: "/lingerie/lingerie-007.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-008", name: "Set Satin Floral Pink", description: "Cami satin floral pink dengan celana pendek serasi untuk keanggunan.", price: "320000", category: "lingerie", imageUrl: "/lingerie/lingerie-008.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-009", name: "Slip Dress Pink Panjang", description: "Slip dress satin peach midi panjang dengan tali spagetti minimalis.", price: "255000", category: "lingerie", imageUrl: "/lingerie/lingerie-009.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-010", name: "Mini Dress Satin Merah", description: "Mini dress satin merah cowl-neck dengan potongan feminin elegan.", price: "305000", category: "lingerie", imageUrl: "/lingerie/lingerie-010.png", badge: "New", inStock: true, isFeatured: false },
  { code: "LNG-011", name: "Babydoll Renda Hitam Pita", description: "Babydoll renda hitam dengan aksen pita satin yang romantis.", price: "270000", category: "lingerie", imageUrl: "/lingerie/lingerie-011.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-012", name: "Babydoll Merah Ruffle", description: "Babydoll sheer merah dengan ruffle dan kalung mutiara imitasi.", price: "355000", category: "lingerie", imageUrl: "/lingerie/lingerie-012.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "LNG-013", name: "Bodysuit Renda Krem Pita", description: "Bodysuit renda krem dengan satin bow dan garter untuk nuansa bridal.", price: "280000", category: "lingerie", imageUrl: "/lingerie/lingerie-013.png", badge: null, inStock: true, isFeatured: false },
  { code: "LNG-014", name: "Mini Dress Maroon Pita", description: "Halter mini maroon dengan bow pita dan rok renda bawah yang manis.", price: "450000", category: "lingerie", imageUrl: "/lingerie/lingerie-014.png", badge: "Limited", inStock: true, isFeatured: true },
  { code: "LNG-015", name: "Mini Dress Satin Merah Layer", description: "Halter mini satin merah berlapis dengan potongan bertingkat sensual.", price: "395000", category: "lingerie", imageUrl: "/lingerie/lingerie-015.png", badge: "New", inStock: true, isFeatured: false },

  // ── ACCESSORIES (9) ───────────────────────────────────────────────────────
  { code: "ACC-001", name: "Gift Set Merah", description: "Gift set BDSM merah lengkap dalam kotak premium — flogger, borgol, blindfold, tali, dan ball gag.", price: "485000", category: "accessories", imageUrl: "/accessories/accessories-001.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "ACC-002", name: "Blindfold Kulit Hitam", description: "Penutup mata silang kulit hitam dengan gesper adjustable untuk sensasi intens.", price: "145000", category: "accessories", imageUrl: "/accessories/accessories-002.png", badge: "New", inStock: true, isFeatured: true },
  { code: "ACC-003", name: "Sarung Tangan Renda Panjang", description: "Sarung tangan renda hitam panjang elegan dengan motif floral premium.", price: "95000", category: "accessories", imageUrl: "/accessories/accessories-003.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-004", name: "Masker Venetian", description: "Masker venetian filigree logam hitam dengan detail ukiran bunga mewah.", price: "175000", category: "accessories", imageUrl: "/accessories/accessories-004.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-005", name: "Stocking Jala Renda", description: "Stocking fishnet hitam paha tinggi dengan border renda floral.", price: "85000", category: "accessories", imageUrl: "/accessories/accessories-005.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-006", name: "Collar Kulit + Rantai", description: "Collar kulit hitam lebar dengan leash rantai perak panjang dan handle.", price: "165000", category: "accessories", imageUrl: "/accessories/accessories-006.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "ACC-007", name: "Borgol Metal + Kunci", description: "Borgol metal asli dengan kunci antik perunggu bergaya steampunk.", price: "125000", category: "accessories", imageUrl: "/accessories/accessories-007.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-008", name: "Choker Kulit O-Ring", description: "Choker kulit hitam dengan O-ring perak dan triple layer rantai menjuntai.", price: "115000", category: "accessories", imageUrl: "/accessories/accessories-008.png", badge: null, inStock: true, isFeatured: false },
  { code: "ACC-009", name: "Harness Pinggang Rantai", description: "Harness kulit hitam pinggang dan paha dengan rantai perak adjustable.", price: "195000", category: "accessories", imageUrl: "/accessories/accessories-009.png", badge: "New", inStock: true, isFeatured: false },

  // ── SEX TOYS (7) ──────────────────────────────────────────────────────────
  { code: "TOY-001", name: "Vibrator Rabbit Aura", description: "Vibrator rabbit dual-stimulation pink silikon premium dengan dual motor, branded Aura.", price: "485000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-001.png", badge: "Hot", inStock: true, isFeatured: true },
  { code: "TOY-002", name: "Vibrator Peluru Hitam", description: "Vibrator peluru hitam waterproof dengan body matte premium dan 10 mode getaran.", price: "320000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-002.png", badge: null, inStock: true, isFeatured: false },
  { code: "TOY-003", name: "Mini Vibrator Pastel Duo", description: "Set dua mini vibrator pastel putih & pink Biutte.co dengan getaran whisper-quiet.", price: "275000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-003.png", badge: "New", inStock: true, isFeatured: true },
  { code: "TOY-004", name: "Vibrator Telur Magenta", description: "Vibrator telur magenta melengkung dengan pegangan ergonomis dan 12 pola.", price: "375000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-004.png", badge: null, inStock: true, isFeatured: false },
  { code: "TOY-005", name: "Love Egg Magenta", description: "Wearable love egg magenta silikon premium dengan ekor kontrol dan 10 intensitas.", price: "340000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-005.png", badge: null, inStock: true, isFeatured: false },
  { code: "TOY-006", name: "Vibrator Gelombang Pink", description: "Vibrator gelombang bergerigi pink silikon dengan ring perak dan 7 mode getaran.", price: "295000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-006.png", badge: null, inStock: true, isFeatured: false },
  { code: "TOY-007", name: "Pompa Vakum Pria", description: "Pompa vakum pria silinder akrilik bening dengan pompa tangan presisi dan selang fleksibel.", price: "455000", category: "sex-toys", imageUrl: "/sex-toys/sex-toys-007.png", badge: "Limited", inStock: true, isFeatured: true },
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
