import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SIGNATURE_COLLECTIONS } from '../data/collections';

export const CollectionShowcase = () => {
  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          {/* <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
            <Sparkles size={14} />
            <span>Curated Silks of Assam</span>
          </div> */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#24211D] font-light tracking-wide mb-4">
            Signature Expressions
          </h2>
          <p className="text-sm sm:text-base text-[#24211D]/75 font-light leading-relaxed">
            Four pillars of North-Eastern haute couture, woven across hundreds of heirloom loom hours 
            by master weaver families in Sualkuchi.
          </p>
        </div>

        {/* 4 Image-Led Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SIGNATURE_COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              className="group flex flex-col bg-[#FFFFFF] border border-[#E8DFD1] overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Large Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#24211D]">
                <img
                  src={col.heroImage}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92]"
                />
                
                {/* Subtle Tag Overlay */}
                <div className="absolute top-4 left-4">
                  {/* <span className="text-[9px] uppercase tracking-[0.25em] bg-[#24211D]/75 backdrop-blur-md text-[#FFFFFF] px-3 py-1 font-medium border border-[#B69A62]/30">
                    {col.tag}
                  </span> */}
                </div>

                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#24211D]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-[#FFFFFF]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-1.5">
                    Expression 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#24211D] font-normal mb-3 leading-snug group-hover:text-[#B69A62] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#24211D]/70 font-light leading-relaxed mb-6">
                    {col.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DFD1]/60">
                  <Link
                    to={`/shop?category=${encodeURIComponent(col.category)}`}
                    className="inline-flex items-center text-xs uppercase tracking-[0.25em] text-[#24211D] group-hover:text-[#B69A62] font-medium transition-colors gap-2"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
