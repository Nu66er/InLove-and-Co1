import { Product } from "@workspace/api-client-react/src/generated/api.schemas";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/favorites";

export function ProductCard({ product }: { product: Product }) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(product.id);

  const getGradientClass = (category: string) => {
    if (category.toLowerCase() === "lingerie") return "gradient-card-lingerie";
    if (category.toLowerCase() === "sex-toys") return "gradient-card-sextoys";
    if (category.toLowerCase() === "cosplay") return "gradient-card-cosplay";
    return "gradient-card-accessories";
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center p-6 ${getGradientClass(product.category)} opacity-90 group-hover:opacity-100 transition-opacity duration-700 relative`}>
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
            <span className="font-serif text-4xl text-white/10 text-center uppercase tracking-widest break-words z-10 select-none">
              {product.category}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <span className="inline-flex w-full items-center justify-center bg-white text-black font-sans text-xs uppercase tracking-widest py-3 px-4 hover:bg-primary hover:text-black transition-colors">
              Lihat Detail
            </span>
          </div>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-4 left-4 z-30 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            favorited
              ? "bg-primary/90 text-black scale-110"
              : "bg-black/40 text-white/70 opacity-0 group-hover:opacity-100 hover:text-primary"
          }`}
          aria-label={favorited ? "Hapus dari favorit" : "Tambah ke favorit"}
        >
          <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
        </button>

        {product.badge && (
          <div className="absolute top-4 right-4 z-30">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur text-foreground font-sans text-xs uppercase tracking-wider rounded-none border-none py-1.5 px-3">
              {product.badge}
            </Badge>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-serif text-lg tracking-wide group-hover:text-primary transition-colors text-foreground">{product.name}</h3>
      </div>
    </Link>
  );
}
