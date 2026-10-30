import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const BridalShowcase = () => {
  const { setIsConsultationOpen } = useCart();

  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#E8DFD1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Imagery (7 cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              
              {/* Primary Large Bridal Image */}
              <div className="col-span-8 relative aspect-[3/4] overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                  alt="Juthika by Momita Royal Assamese Bride"
                  className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold">
                    The Sanctuary of Royal Matrimony
                  </span>
                  <h4 className="font-serif text-2xl text-[#FFFFFF]">
                    The Imperial Paat & Guna Trousseau
                  </h4>
                </div>
              </div>

              {/* Secondary Detail Image (Textile close-up & jewelry) */}
              <div className="col-span-4 flex flex-col gap-4">
                <div className="relative aspect-[3/4] overflow-hidden group shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                    alt="Handwoven Muga Zari Detail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 right-2 p-2 bg-[#24211D]/75 backdrop-blur-sm text-center">
                    <span className="text-[9px] uppercase tracking-wider text-[#E8DFD1]">
                      Pure Kingkhap Zari
                    </span>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-5 flex flex-col justify-center text-center">
                  <span className="font-serif text-3xl text-[#B69A62]">240+</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#24211D]/70 mt-1">
                    Loom Hours Per Bridal Drape
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Action CTAs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
              <Sparkles size={14} />
              <span>Haute Couture Matrimony</span>
            </div> */}

            <h2 className="font-serif text-3xl sm:text-5xl text-[#24211D] font-light tracking-wide leading-tight mb-6">
              Bridal & Occasion Splendour
            </h2>

            <p className="text-sm sm:text-base text-[#24211D]/80 font-light leading-relaxed mb-6">
              For centuries, the Assamese bride has walked to her vows in sacred mulberry Paat and radiant Muga silk, 
              draped in a Mekhela Chador that whispers ancestral blessings. 
              Our bridal atelier collaborates intimately with each bride to hand-weave an irreplaceable heirloom.
            </p>

            {/* Bullet Highlights
            <div className="space-y-3 mb-8 text-xs text-[#24211D]/80"> */}
              {/* <div className="flex items-start gap-2.5">
                <span className="text-[#B69A62] font-serif text-base">&#10022;</span>
                <span>Custom woven family insignias, motifs, and auspicious Kingkhap patterns.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#B69A62] font-serif text-base">&#10022;</span>
                <span>Heirloom presentation in fragrant hand-carved cedar storage chests.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#B69A62] font-serif text-base">&#10022;</span>
                <span>Tailored in-person or high-definition virtual draping consultations.</span>
              </div>
            </div> */}

            {/* Two Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/bridal"
                className="w-full sm:w-auto px-6 py-4 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] transition-colors text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 shadow-md"
              >
                <span>Discover Bridal Couture</span>
                <ArrowRight size={14} />
              </Link>

              <button
                onClick={() => setIsConsultationOpen(true)}
                className="w-full sm:w-auto px-6 py-4 bg-transparent border border-[#24211D] text-[#24211D] hover:bg-[#24211D] hover:text-[#FFFFFF] transition-colors text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2"
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
