import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const MegaMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shopCategories = [
    {
      number: "01",
      name: "Muga Silk",
      slug: "Muga Silk",
      desc: "Naturally golden wild silk endemic to the Brahmaputra valley"
    },
    {
      number: "02",
      name: "Eri Silk",
      slug: "Eri Silk",
      desc: "Cruelty-free Ahimsa peace silk with isothermal comfort"
    },
    {
      number: "03",
      name: "Paat Silk",
      slug: "Paat Silk",
      desc: "Luminous mulberry silk drapes in royal jewel & pearl tones"
    },
    {
      number: "04",
      name: "Sarees",
      slug: "Sarees",
      desc: "Classic six-yard heirlooms with antique temple Guna zari"
    },
    {
      number: "05",
      name: "Bridal Couture",
      slug: "Bridal Couture",
      desc: "Imperial Mekhela Chador bridal sets & bespoke riha veils"
    },
    {
      number: "06",
      name: "Occasion Wear",
      slug: "Occasion Wear",
      desc: "Structured silk capes, anarkalis & royal festive silhouettes"
    },
    {
      number: "07",
      name: "Ready-to-Wear",
      slug: "Ready-to-Wear",
      desc: "Understated Eri tunics, lightweight wraps & fluid overlays"
    }
  ];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#E8DFD1] shadow-2xl z-40 transition-all duration-300 animate-fade-in"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-10">
        
        <div className="grid grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ========================================================= */}
          {/* LEFT: Curated Silk Categories Grid (8 Cols)              */}
          {/* ========================================================= */}
          <div className="col-span-12 lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[#E8DFD1] pb-8 lg:pb-0 lg:pr-12">
            
            {/* Clean Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD1] mb-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B69A62]" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#24211D] font-semibold">
                  Explore Silk By Category
                </span>
              </div>
              
              <Link
                to="/shop"
                onClick={onClose}
                className="text-[11px] uppercase tracking-[0.22em] text-[#24211D] hover:text-[#B69A62] flex items-center gap-1.5 transition-colors font-medium group"
              >
                <span>View All Products</span>
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* 2-Column Categories Grid with Spacious Editorial Styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {shopCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/shop?category=${encodeURIComponent(cat.slug)}`}
                  onClick={onClose}
                  className="group relative flex items-start gap-3.5 p-3 rounded-sm border border-transparent hover:border-[#E8DFD1] hover:bg-neutral-50/70 transition-all duration-300"
                >
                  {/* Category Index Number */}
                  <span className="text-[10px] font-sans font-medium text-[#B69A62] tracking-wider pt-0.5">
                    {cat.number}
                  </span>

                  {/* Category Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif text-base text-[#24211D] group-hover:text-[#B69A62] transition-colors leading-tight">
                        {cat.name}
                      </span>
                      <ArrowRight size={12} className="text-[#B69A62] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    
                    <p className="text-[11px] text-[#24211D]/60 font-light leading-relaxed mt-1">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Active Gold Line Indicator on Hover */}
                  <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-[#B69A62] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT: Curator's Spotlight Card (4 Cols)                  */}
          {/* ========================================================= */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-center">
            
            {/* Header Label */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold">
                Curator's Spotlight
              </span>
              
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#24211D]/50 font-sans">
                Seasonal Edition
              </span>
            </div>

            {/* Seamless Editorial Showcase Card */}
            <Link
              to="/shop?category=Bridal%20Couture"
              onClick={onClose}
              className="block relative aspect-[4/3] rounded-sm overflow-hidden shadow-md group bg-[#24211D]"
            >
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                alt="Imperial Paat Haute Bridal"
                className="w-full h-full object-cover filter brightness-[0.90] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Luxury Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/90 via-[#24211D]/30 to-transparent transition-opacity duration-300 group-hover:from-[#24211D]/80" />

              {/* Integrated Typography & Direct CTA */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-white z-10">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold mb-1">
                  Haute Bridal Masterpiece
                </span>
                
                <h4 className="font-serif text-xl sm:text-2xl text-white font-light leading-snug tracking-wide group-hover:text-[#FFFFFF] transition-colors">
                  Imperial Paat & Vermilion Heirloom
                </h4>
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                  <span className="text-[10px] text-white/70 font-light tracking-wider">
                    Sualkuchi Heritage Atelier
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#B69A62] group-hover:text-white font-medium flex items-center gap-1 transition-colors">
                    Explore <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};
