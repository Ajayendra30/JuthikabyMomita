import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ALL_COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';

export const Collections = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className=" text-[#B69A62] font-semibold mb-3">
           <span>The Juthika by Momita Anthologies</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#24211D] font-light tracking-wide mb-6">
            The Silk Collections
          </h1>
          <p className="text-sm sm:text-base text-[#24211D]/80 font-light leading-relaxed">
            Each collection explores a singular facet of Assamese textile heritage—from 
            the unyielding solar luster of wild Muga to the gentle cocoon warmth of Ahimsa Eri and the royal drapes of bridal Paat.
          </p>
        </div>

        {/* Collections Editorial Showcase Stack */}
        <div className="space-y-24">
          {ALL_COLLECTIONS.map((col, idx) => {
            const isEven = idx % 2 === 0;
            const collectionProducts = PRODUCTS.filter(
              (p) => p.category === col.category || p.fabric === col.category
            ).slice(0, 3);

            return (
              <div
                key={col.id}
                className="bg-[#FFFFFF] border border-[#E8DFD1] overflow-hidden shadow-sm"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Image Banner Column (7 cols) */}
                  <div className={`lg:col-span-7 relative min-h-[400px] overflow-hidden ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <img
                      src={col.heroImage}
                      alt={col.title}
                      className="w-full h-full object-cover filter brightness-[0.92] transition-transform duration-1000 ease-out hover:scale-105"
                    />
                    <div className="absolute top-6 left-6">
                      {/* <span className="text-[10px] uppercase tracking-[0.25em] bg-[#24211D]/85 text-[#FFFFFF] px-3 py-1 font-medium border border-[#B69A62]/30">
                        {col.tag}
                      </span> */}
                    </div>
                  </div>

                  {/* Story & Exploration Column (5 cols) */}
                  <div className={`lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
                        Curated Series &bull; 0{idx + 1}
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-normal leading-snug mb-4">
                        {col.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#24211D]/80 font-light leading-relaxed mb-6">
                        {col.description}
                      </p>

                      {/* Mini Preview of items */}
                      <div className="pt-4 border-t border-[#E8DFD1] mb-6">
                        <span className="text-[10px] uppercase tracking-wider text-[#24211D]/60 block mb-2">
                          Featuring in this anthology:
                        </span>
                        <div className="space-y-1.5 text-xs text-[#24211D]/85">
                          {collectionProducts.map((p) => (
                            <Link
                              key={p.id}
                              to={`/product/${p.id}`}
                              className="flex items-center justify-between hover:text-[#B69A62] py-0.5"
                            >
                              <span className="truncate max-w-[240px]">&bull; {p.name}</span>
                              <span className="font-medium">INR {p.price.toLocaleString('en-IN')}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#E8DFD1]">
                      <Link
                        to={`/shop?category=${encodeURIComponent(col.category)}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm"
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
    </div>
  );
};
