import { Layout } from "@/components/layout";
import { getProductById } from "@/lib/static-data";
import { useParams } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useFavorites } from "@/context/favorites";
import { useToast } from "@/hooks/use-toast";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  const { isFavorited, toggleFavorite } = useFavorites();
  const { toast } = useToast();

  const favorited = product ? isFavorited(product.id) : false;

  const getGradientClass = (category: string) => {
    if (category?.toLowerCase() === "lingerie") return "gradient-card-lingerie";
    if (category?.toLowerCase() === "sex-toys") return "gradient-card-sextoys";
    if (category?.toLowerCase() === "cosplay") return "gradient-card-cosplay";
    return "gradient-card-accessories";
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    toggleFavorite(product as Parameters<typeof toggleFavorite>[0]);
    toast({
      title: favorited ? "Dihapus dari Favorit" : "Ditambahkan ke Favorit",
      description: favorited
        ? `${product.name} telah dihapus dari daftar favorit Anda.`
        : `${product.name} telah disimpan ke favorit. Lihat di pojok kanan atas.`,
    });
  };

  const shopeeUrl = product
    ? `https://shopee.co.id/search?keyword=${encodeURIComponent(product.name)}`
    : "https://shopee.co.id";

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
          <h2 className="font-serif text-3xl">Piece Not Found</h2>
          <Link href="/products" className="font-sans text-xs uppercase tracking-widest text-primary border-b border-primary/30 hover:border-primary pb-1">
            Return to Boutique
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Boutique
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Image */}
          <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[800px] w-full bg-muted">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center p-8 ${getGradientClass(product.category)} opacity-90 relative`}>
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                <div className="relative z-10 text-center">
                  <span className="font-serif text-6xl text-white/10 uppercase tracking-widest block leading-tight">
                    {product.category}
                  </span>
                </div>
              </div>
            )}

            {product.badge && (
              <div className="absolute top-6 right-6 z-10">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur text-foreground font-sans text-sm uppercase tracking-wider rounded-none border-none py-2 px-4">
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center py-8">
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="font-sans text-xs uppercase tracking-widest text-primary">
                  {product.category}
                </div>
                {product.code && (
                  <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">
                    {product.code}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="prose prose-invert prose-p:font-sans prose-p:font-light prose-p:leading-loose text-muted-foreground mb-12">
              <p>{product.description || "An exquisite piece crafted for those who appreciate the finer aspects of intimacy."}</p>
            </div>

            <div className="space-y-4 border-t border-border pt-8">
              <Button
                size="lg"
                className={`w-full rounded-none font-sans text-sm uppercase tracking-widest py-8 transition-all duration-300 ${
                  favorited
                    ? "bg-primary text-black hover:bg-primary/80"
                    : "bg-white text-black hover:bg-primary"
                }`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`w-4 h-4 mr-2 ${favorited ? "fill-current" : ""}`} />
                {favorited ? "Tersimpan di Favorit" : "Tambah ke Favorit"}
              </Button>

              <a
                href={shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 font-sans text-sm uppercase tracking-widest py-5 px-8 transition-colors ${
                  !product.inStock
                    ? "bg-muted text-muted-foreground cursor-not-allowed pointer-events-none"
                    : "bg-[#EE4D2D] text-white hover:bg-[#d63f20]"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {product.inStock ? "Beli Produk" : "Stok Habis"}
              </a>

              {!product.inStock && (
                <p className="font-sans text-xs text-muted-foreground text-center">
                  Produk ini sedang tidak tersedia.
                </p>
              )}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 pt-12 border-t border-border">
              <div>
                <h4 className="font-serif text-lg mb-2">Pengiriman Diskret</h4>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">Dikirim dalam kemasan hitam elegan tanpa label.</p>
              </div>
              <div>
                <h4 className="font-serif text-lg mb-2">Belanja Aman</h4>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">Transaksi dilindungi sepenuhnya di Shopee.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
