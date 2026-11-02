import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ALL_COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';

export const Collections = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12 sm:py-16 w-full">
      
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto px-6 mb-16 sm:mb-20">
        <div className="text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
          <span>The Juthika by Momita Anthologies</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-light tracking-wide mb-6">
          The Silk Collections
        </h1>
        <p className="text-sm sm:text-base text-[#111111]/80 font-light leading-relaxed max-w-2xl mx-auto">
          Each collection explores a singular facet of Assamese textile heritage—from 
          the unyielding solar luster of wild Muga to the gentle cocoon warmth of Ahimsa Eri and the royal drapes of bridal Paat.
        </p>
      </div>

      {/* 100% Full-Width Editorial Showcase Stack */}
      <div className="w-full space-y-0 border-t border-[#E5E5E5]">
        {ALL_COLLECTIONS.map((col, idx) => {
          const isEven = idx % 2 === 0;
          const collectionProducts = PRODUCTS.filter(
            (p) => p.category === col.category || p.fabric === col.category
          ).slice(0, 3);

          return (
            <div
              key={col.id}
              className="w-full bg-[#FFFFFF] border-b border-[#E5E5E5] overflow-hidden"
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px] sm:min-h-[620px] lg:min-h-[80vh] xl:min-h-[88vh]">
                
                {/* Image Banner Column (6 cols) - 100% Full Bleed with Object-Top (Prevents Head Cropping) */}
                <div className={`lg:col-span-6 relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto min-h-[460px] sm:min-h-[580px] lg:min-h-full overflow-hidden bg-[#111111] ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <img
                    src={col.heroImage}
                    alt={col.title}
                    className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.93] transition-transform duration-1000 ease-out hover:scale-105"
                  />
                </div>

                {/* Story & Exploration Column (6 cols) - Atelier Spacing */}
                <div className={`lg:col-span-6 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-12 sm:py-16 lg:py-20 flex flex-col justify-between bg-[#FFFFFF] ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
                      Curated Series &bull; 0{idx + 1}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-light leading-snug mb-4">
                      {col.title}
                    </h2>
                    <p className="text-sm text-[#111111]/80 font-light leading-relaxed mb-6">
                      {col.description}
                    </p>

                    {/* Mini Preview of items */}
                    <div className="pt-4 border-t border-[#E5E5E5] mb-6">
                      <span className="text-[10px] uppercase tracking-wider text-[#111111]/60 block mb-2.5 font-medium">
                        Featuring in this anthology:
                      </span>
                      <div className="space-y-2 text-xs text-[#111111]/85">
                        {collectionProducts.map((p) => (
                          <Link
                            key={p.id}
                            to={`/product/${p.id}`}
                            className="flex items-center justify-between hover:text-[#B69A62] py-1 border-b border-dashed border-[#E5E5E5]/60 transition-colors"
                          >
                            <span className="truncate max-w-[260px]">&bull; {p.name}</span>
                            <span className="font-medium">INR {p.price.toLocaleString('en-IN')}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E5E5E5]">
                    <Link
                      to={`/shop?category=${encodeURIComponent(col.category)}`}
                      className="inline-flex items-center gap-2 px-7 py-4 bg-[#111111] text-[#FFFFFF] hover:bg-black text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm"
                    >
                      <span>Shop {col.category}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
