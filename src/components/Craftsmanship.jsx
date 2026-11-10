import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assetPath';

export const Craftsmanship = () => {
  return (
    <section className="w-full bg-[#1C1B1A] text-[#FFFFFF] p-0 m-0 border-b border-[#2A2620]">
      {/* 100% Full-Width Edge-to-Edge Grid with Zero Outer Boundary */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px] lg:min-h-[580px]">
        
        {/* Left Column: Artisan Narrative & Heritage Action */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#B69A62] font-semibold block mb-3">
              Fair Trade &bull; Living Cultural Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFFFFF] font-light leading-tight mb-6">
              Preserving the Guilds of Sualkuchi
            </h2>
            <p className="text-sm sm:text-base text-[#E8DFD1]/85 font-light leading-relaxed mb-8">
              Every creation is born on traditional bamboo looms in Sualkuchi, Assam&rsquo;s historic silk hamlet. 
              Our master weavers breathe life into ancient motifs, hand-threading unadulterated Muga and cruelty-free Eri with mathematical precision. 
              By partnering directly with weaving clusters, we honor their generational legacy and ensure fair-trade ethical stewardship.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/our-craft"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#B69A62] text-[#1C1B1A] hover:bg-[#C8AC75] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Read The Artisan Story</span>
                <ArrowRight size={14} />
              </Link>
              <span className="text-xs sm:text-sm text-[#E8DFD1]/60 italic font-serif">
                &ldquo;Where thread becomes scripture.&rdquo;
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 100% Full-Bleed Image (Zero Border, Edge-to-Edge) */}
        <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full">
          <img
            src={getAssetUrl('/images/assam-loom-artisan.jpg')}
            alt="Assam Silk Artisan at Loom"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.9] contrast-[1.05]"
          />
        </div>

      </div>
    </section>
  );
};
