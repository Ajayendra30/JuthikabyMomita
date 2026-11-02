import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Craftsmanship = () => {
  return (
    <section className="w-full bg-[#1C1B1A] text-[#FFFFFF] p-0 m-0 mt-5 sm:mt-6 md:mt-8 border-b border-[#2A2620]">
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
              Every Juthika by Momita drape is direct-from-artisan. We work directly with over 45 master weaver families in Kamrup, 
              providing fair dignity-first wages, healthcare security, and complete artistic autonomy to safeguard this endangered craft.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/our-craft"
                className="px-7 sm:px-9 py-3.5 bg-[#B69A62] text-[#FFFFFF] hover:bg-[#A0834E] text-xs uppercase tracking-[0.25em] font-medium transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Explore Our Heritage</span>
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
            src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
            alt="Assam Silk Artisan at Loom"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.9] contrast-[1.05]"
          />
        </div>

      </div>
    </section>
  );
};
