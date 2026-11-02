import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const BridalShowcase = () => {
  const { setIsConsultationOpen } = useCart();

  return (
    <section className="w-full bg-[#FFFFFF] border-b border-[#E5E5E5] p-0 m-0 overflow-hidden">
      {/* 100% Full-Width Edge-to-Edge Grid with Zero Outer Boundary */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[580px] lg:min-h-[660px]">
        
        {/* Left Column: 100% Full-Bleed Editorial Bridal Imagery */}
        <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[560px] lg:min-h-full overflow-hidden bg-[#111111]">
          <img
            src="https://thesilkchamber.com/cdn/shop/files/mekhelasador_4de2660f-1617-463b-ac9c-c525dd93f96e.jpg?v=1759510815&width=1800"
            alt="Juthika by Momita Royal Assamese Bride"
            className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.05] transition-transform duration-1000 ease-out hover:scale-105"
          />
          
          {/* Subtle Luxury Gradient Overlay & Trousseau Badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 lg:p-16 pointer-events-none">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
              The Sanctuary of Royal Matrimony
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] font-light leading-snug mb-3">
              The Imperial Paat & Guna Trousseau
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#E5E5E5]/90">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] uppercase tracking-widest text-[#FFFFFF]">
                Pure Kingkhap Zari
              </span>
              <span className="text-[#D4AF37] font-serif text-sm">
                240+ Loom Hours Per Bridal Drape
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Atelier Narrative & CTAs */}
        <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-16 sm:py-20 lg:py-24 bg-[#FFFFFF]">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#B69A62] font-semibold block mb-3">
              Haute Couture Matrimony
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-light tracking-wide leading-tight mb-6">
              Bridal & Occasion Splendour
            </h2>

            <p className="text-sm sm:text-base text-[#111111]/80 font-light leading-relaxed mb-6">
              For centuries, the Assamese bride has walked to her vows in sacred mulberry Paat and radiant Muga silk, 
              draped in a Mekhela Chador that whispers ancestral blessings. 
              Our bridal atelier collaborates intimately with each bride to hand-weave an irreplaceable heirloom.
            </p>

            <div className="space-y-3 mb-8 pt-4 border-t border-[#E5E5E5] text-xs text-[#111111]/80 font-light">
              <div className="flex items-center gap-3">
                <span className="text-[#B69A62] font-serif text-base">&#10022;</span>
                <span>Custom woven family insignias, auspicious Kingkhap & peacock motifs</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#B69A62] font-serif text-base">&#10022;</span>
                <span>Heirloom presentation in fragrant hand-carved Assam cedarwood chests</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/bridal"
                className="px-8 py-4 bg-[#111111] text-[#FFFFFF] hover:bg-black transition-colors text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 shadow-md text-center"
              >
                <span>Discover Bridal Couture</span>
                <ArrowRight size={14} />
              </Link>

              <button
                onClick={() => setIsConsultationOpen(true)}
                className="px-8 py-4 bg-transparent border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] transition-colors text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <Calendar size={14} />
                <span>Book a Custom Consultation</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
