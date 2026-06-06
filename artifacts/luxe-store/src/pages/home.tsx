import { Layout } from "@/components/layout";
import { useListProducts, useGetStoreSummary, useListCategories } from "@workspace/api-client-react";
import { ProductCard } from "@/components/product-card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Home() {
  const { data: featuredProducts, isLoading: productsLoading } = useListProducts({ featured: true });
  const { data: newArrivals } = useListProducts(); // Using first few as new arrivals if API doesn't support specific flag
  const { data: categories } = useListCategories();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
        {/* Abstract dark aesthetic background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-[hsl(310,40%,6%)] z-0"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[hsl(310,50%,20%)] via-black to-black z-0"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8 effect-clarify-block">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-wide">
            <span className="effect-clarify">Choose Your Fantasy</span>
            {" "}<br/><span className="text-primary italic effect-clarify">& Fun.</span>
          </h1>
          <p className="font-sans text-sm md:text-base uppercase tracking-[0.2em] text-foreground/80 max-w-lg mx-auto">
            An exclusive sanctuary for desire. Enter a world where elegance meets indulgence.
          </p>
          <div className="pt-8">
            <Link href="/products" className="inline-flex items-center justify-center bg-white text-black font-sans text-sm uppercase tracking-widest py-4 px-10 hover:bg-primary transition-colors">enter showcase</Link>
          </div>
        </div>
      </section>
      {/* Featured Showcase */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl md:text-5xl mb-4">Curated Selections</h2>
              <p className="font-sans text-muted-foreground font-light leading-relaxed">
                Pieces that speak to the sophisticated palate. Discover our most coveted items designed to elevate your private moments.
              </p>
            </div>
            <Link href="/products?featured=true" className="font-sans text-xs uppercase tracking-widest text-primary border-b border-primary/30 hover:border-primary pb-1 transition-colors whitespace-nowrap">
              View All Featured
            </Link>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts?.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Category Highlights */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl">The Collections</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories?.map((category) => {
              const gradientClass = category.slug.includes('lingerie') ? 'gradient-card-lingerie'
                : category.slug.includes('toys') ? 'gradient-card-sextoys'
                : category.slug.includes('cosplay') ? 'gradient-card-cosplay'
                : 'gradient-card-accessories';
              return (
              <Link href={`/products?category=${category.slug}`} key={category.slug} className="group relative aspect-square overflow-hidden block">
                <div className={`absolute inset-0 ${gradientClass} opacity-60 group-hover:opacity-80 transition-opacity duration-700`}></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
                  <h3 className="font-serif text-3xl text-white mb-2">{category.label}</h3>
                  <span className="font-sans text-xs uppercase tracking-widest text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Explore
                  </span>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Brand Story Teaser */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <span className="block font-sans text-xs uppercase tracking-widest text-primary mb-6">Our Philosophy</span>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
            "True luxury is not about excess, but the perfection of the essential."
          </h2>
          <p className="font-sans text-muted-foreground leading-loose max-w-2xl mx-auto">
            InLove & Co. was born from a singular desire: to create a space where adult pleasure is treated with the same reverence as haute couture. We source globally, curating only the most exquisite materials and forms.
          </p>
        </div>
      </section>
    </Layout>
  );
}