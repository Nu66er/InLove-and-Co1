import { Layout } from "@/components/layout";
import { useListCategories, useListProducts } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { useState, useEffect } from "react";
import { Product } from "@workspace/api-client-react/src/generated/api.schemas";

function CategoryHeroSlider({
  products,
  gradientClass,
}: {
  products: Product[];
  gradientClass: string;
}) {
  const images = products
    .filter(p => p.imageUrl)
    .slice(0, 5)
    .map(p => p.imageUrl as string);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="absolute inset-0">
      {images.length > 0 ? (
        <>
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-black/30" />
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-white w-4" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className={`absolute inset-0 ${gradientClass} opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out`} />
          <div className="absolute inset-0 bg-black/20" />
        </>
      )}
    </div>
  );
}

export function Categories() {
  const { data: categories, isLoading: categoriesLoading } = useListCategories();
  const { data: allProducts, isLoading: productsLoading } = useListProducts({});

  const isLoading = categoriesLoading || productsLoading;

  const productsByCategory = (slug: string) =>
    allProducts?.filter(p => p.category?.toLowerCase() === slug.toLowerCase()) ?? [];

  return (
    <Layout>
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">

          <div className="text-center mb-24 max-w-2xl mx-auto space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl">The Collections</h1>
            <p className="font-sans text-muted-foreground leading-relaxed font-light">
              Explore our meticulously curated domains of pleasure. Each category represents a different facet of desire, waiting to be discovered.
            </p>
          </div>

          <div className="space-y-32 md:space-y-48">
            {isLoading ? (
              <div className="space-y-24">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-muted animate-pulse"></div>
                ))}
              </div>
            ) : categories?.map((category, index) => {
              const isEven = index % 2 === 0;
              const gradientClass = category.slug.toLowerCase().includes('lingerie')
                ? 'gradient-card-lingerie'
                : category.slug.toLowerCase().includes('toys')
                  ? 'gradient-card-sextoys'
                  : category.slug.toLowerCase().includes('cosplay')
                    ? 'gradient-card-cosplay'
                    : 'gradient-card-accessories';

              const categoryProducts = productsByCategory(category.slug);

              return (
                <div key={category.slug}>
                  {/* Category Header */}
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24 group mb-16`}>

                    <div className="w-full md:w-1/2 aspect-[4/3] relative overflow-hidden bg-muted">
                      <CategoryHeroSlider
                        products={categoryProducts}
                        gradientClass={gradientClass}
                      />
                    </div>

                    <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                      <div className="font-sans text-xs uppercase tracking-widest text-primary">
                        {category.productCount} Product
                      </div>
                      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">{category.label}</h2>
                      <p className="font-sans text-muted-foreground leading-relaxed font-light">
                        {category.description || `Discover our exquisite collection of ${category.label.toLowerCase()}. Carefully selected for the discerning individual who accepts no compromises.`}
                      </p>
                      <div className="pt-6">
                        <Link
                          href={`/products?category=${category.slug}`}
                          className="inline-flex items-center gap-4 font-sans text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link"
                        >
                          View All
                          <span className="w-8 h-px bg-current group-hover/link:w-12 transition-all"></span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Products Grid */}
                  {categoryProducts.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                      {categoryProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
