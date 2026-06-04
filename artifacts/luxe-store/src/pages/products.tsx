import { Layout } from "@/components/layout";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { ProductCard } from "@/components/product-card";
import { useLocation, useSearch } from "wouter";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

export function Products() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState<string | undefined>(categoryParam || undefined);

  const { data: products, isLoading } = useListProducts(
    activeCategory ? { category: activeCategory } : {}
  );
  
  const { data: categories } = useListCategories();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    setActiveCategory(categoryParam || undefined);
  }, [categoryParam]);

  const formatCategoryLabel = (slug: string) => {
    const labels: Record<string, string> = {
      "sex-toys": "SexToy's",
    };
    return labels[slug] ?? slug;
  };

  const handleCategorySelect = (slug?: string) => {
    if (slug) {
      setLocation(`/products?category=${slug}`);
    } else {
      setLocation(`/products`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-serif text-4xl md:text-6xl">{activeCategory ? formatCategoryLabel(activeCategory) : "Showcase Product"}</h1>
          <p className="font-sans text-muted-foreground uppercase tracking-widest text-xs">
            {products?.length || 0} Pieces Available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 shrink-0 space-y-10">
            <div>
              <h3 className="font-sans text-xs uppercase tracking-widest text-foreground mb-6 font-semibold border-b border-border pb-4">Categories</h3>
              <ul className="space-y-4 font-sans text-sm">
                <li>
                  <button 
                    onClick={() => handleCategorySelect()}
                    className={`transition-colors text-left w-full hover:text-primary ${!activeCategory ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    All Pieces
                  </button>
                </li>
                {categories?.map(cat => (
                  <li key={cat.slug}>
                    <button 
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`transition-colors text-left w-full flex justify-between hover:text-primary ${activeCategory === cat.slug ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-xs opacity-50">{cat.productCount}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Design detail - decorative separator */}
            <div className="hidden lg:block w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-muted animate-pulse"></div>
                ))}
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-border p-8">
                <p className="font-serif text-2xl text-muted-foreground mb-4">No pieces found</p>
                <button onClick={() => handleCategorySelect()} className="font-sans text-xs uppercase tracking-widest text-primary hover:opacity-80">
                  Return to Boutique
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {products?.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}