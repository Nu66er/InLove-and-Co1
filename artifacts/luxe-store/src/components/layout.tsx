import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Heart, X, ShoppingBag, Trash2 } from "lucide-react";
import { useFavorites } from "@/context/favorites";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function FavoritesPanel() {
  const { favorites, removeFavorite, count } = useFavorites();

  const shopeeUrl = (name: string) =>
    `https://shopee.co.id/search?keyword=${encodeURIComponent(name)}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 -mr-2 text-foreground/80 hover:text-primary transition-colors relative group" aria-label="Daftar Favorit">
          <Heart className="w-5 h-5" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-black rounded-full text-[10px] font-sans font-bold flex items-center justify-center leading-none">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-[420px] bg-background border-l border-white/10 p-0 flex flex-col"
      >
        <SheetHeader className="px-6 py-6 border-b border-white/10">
          <SheetTitle className="font-serif text-2xl tracking-widest text-left">
            Favorit Saya
          </SheetTitle>
          <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-1">
            {count} {count === 1 ? "piece" : "pieces"} disimpan
          </p>
        </SheetHeader>

        {count === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <Heart className="w-12 h-12 text-primary/30" />
            <p className="font-serif text-xl text-foreground/60">Belum ada favorit</p>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Tekan ikon hati pada produk untuk menyimpannya di sini.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {favorites.map((product) => (
              <div key={product.id} className="flex gap-4 p-5 group/item hover:bg-white/[0.02] transition-colors">
                <Link href={`/products/${product.id}`} className="flex-shrink-0 w-16 h-20 bg-muted overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full ${
                      product.category === "lingerie" ? "gradient-card-lingerie" :
                      product.category === "sex-toys" ? "gradient-card-sextoys" :
                      "gradient-card-accessories"
                    }`} />
                  )}
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <Link href={`/products/${product.id}`} className="font-serif text-base leading-tight hover:text-primary transition-colors line-clamp-2 block">
                      {product.name}
                    </Link>
                    <p className="font-sans text-xs text-muted-foreground mt-1">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <a
                    href={shopeeUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 font-sans text-[10px] uppercase tracking-widest bg-[#EE4D2D] text-white px-3 py-1.5 hover:bg-[#d63f20] transition-colors w-fit"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    Beli di Shopee
                  </a>
                </div>

                <button
                  onClick={() => removeFavorite(product.id)}
                  className="flex-shrink-0 self-start p-1.5 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover/item:opacity-100"
                  aria-label="Hapus dari favorit"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {count > 0 && (
          <div className="px-6 py-5 border-t border-white/10">
            <p className="font-sans text-xs text-muted-foreground text-center leading-relaxed">
              Klik "Beli di Shopee" pada setiap produk untuk melanjutkan pembelian.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-foreground/80 hover:text-primary transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-sans">
            <Link href="/products" className={`transition-colors hover:text-primary ${location === '/products' ? 'text-primary' : 'text-foreground/80'}`}>Collection</Link>
            <Link href="/categories" className={`transition-colors hover:text-primary ${location === '/categories' ? 'text-primary' : 'text-foreground/80'}`}>Categories</Link>
          </nav>

          <div className="flex-1 flex justify-center lg:flex-none">
            <Link href="/" className="font-serif text-3xl tracking-widest hover:opacity-80 transition-opacity">
              VELOURS
            </Link>
          </div>

          <div className="flex items-center gap-4 lg:gap-6 justify-end">
            <FavoritesPanel />
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm lg:hidden">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-2xl tracking-widest">VELOURS</span>
              <button onClick={closeMenu} className="p-2 -mr-2 text-foreground hover:text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-2xl font-serif text-center">
              <Link href="/" onClick={closeMenu} className="hover:text-primary transition-colors">Home</Link>
              <Link href="/products" onClick={closeMenu} className="hover:text-primary transition-colors">Collection</Link>
              <Link href="/categories" onClick={closeMenu} className="hover:text-primary transition-colors">Categories</Link>
            </nav>
            <div className="mt-auto text-center font-sans text-sm text-muted-foreground uppercase tracking-widest">
              Intimacy, Refined.
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-black py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl tracking-widest">VELOURS</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
              An exclusive sanctuary for desire. A Parisian atelier crossed with a high-end department store.
            </p>
          </div>
          <div className="space-y-4 font-sans">
            <h4 className="text-xs uppercase tracking-widest text-primary font-semibold mb-6">Explore</h4>
            <div className="flex flex-col gap-3 text-sm text-foreground/70">
              <Link href="/products?category=lingerie" className="hover:text-primary transition-colors">Lingerie</Link>
              <Link href="/products?category=sex-toys" className="hover:text-primary transition-colors">Sex Toys</Link>
              <Link href="/products?category=accessories" className="hover:text-primary transition-colors">Accessories</Link>
              <Link href="/categories" className="hover:text-primary transition-colors">All Collections</Link>
            </div>
          </div>
          <div className="space-y-4 font-sans">
            <h4 className="text-xs uppercase tracking-widest text-primary font-semibold mb-6">Concierge</h4>
            <div className="flex flex-col gap-3 text-sm text-foreground/70">
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
              <a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a>
              <a href="#" className="hover:text-primary transition-colors">Discreet Packaging</a>
              <a href="#" className="hover:text-primary transition-colors">Private Viewing</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground font-sans">
          &copy; {new Date().getFullYear()} VELOURS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
