import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Award, ShieldCheck, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
           
            <span>The Juthika Monograph</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#24211D] font-light tracking-wide mb-6">
            The Soul of Juthika by Momita
          </h1>
          <p className="text-sm sm:text-base text-[#24211D]/80 font-light leading-relaxed">
            Born from an abiding devotion to the Brahmaputra valley and the creative vision of Momita, Juthika by Momita exists to celebrate, protect, 
            and elevate Assamese silk handloom into the pantheon of royal Indian haute couture.
          </p>
        </div>

        {/* Brand Name Origin & Story */}
        <section className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-14 mb-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block">
                The Philosophy of Juthika by Momita
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light leading-snug">
                Fragrance of Jasmine, Majesty of Silk
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#24211D]/80 font-light leading-relaxed">
                <p>
                  In Assamese culture, <strong>Juthika</strong>—the delicate wild jasmine—symbolizes grace, quiet poise, and eternal feminine elegance. Directed by the discerning creative vision of Momita, the Atelier is an emotional tribute to Mother Assam: the sacred land of golden rivers, emerald hills, and hereditary silk guilds.
                </p>
                <p>
                  Juthika by Momita was founded not merely as a fashion house, but as a cultural restoration. For too long, the extraordinary golden filaments of Muga and the peace philosophy of Eri silk were confined to regional obscurity or undervalued by industrial intermediaries.
                </p>
                <p>
                  We set out to create an uncompromising luxury house where Assamese silk is accorded the exact reverence, architectural tailoring, and global editorial presence of royal Indian haute couture.
                </p>
              </div>

              <div className="pt-2">
                <span className="font-serif italic text-sm text-[#B69A62]">
                  &ldquo;We do not invent beauty; we unearth it from centuries of ancestral looms.&rdquo;
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/5] overflow-hidden shadow-2xl border border-[#B69A62]/30">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                alt="Juthika by Momita Brand Karigari Essence"
                className="w-full h-full object-cover filter brightness-[0.95]"
              />
            </div>

          </div>
        </section>

        {/* 3 Pillars of Purpose */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#B69A62]/15 text-[#B69A62] rounded-full flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="font-serif text-2xl text-[#24211D] mb-3">
                Dignity to the Weaver
              </h3>
              <p className="text-xs text-[#24211D]/75 font-light leading-relaxed">
                We eliminate exploitative middlemen entirely. Every master weaver in our partner guilds receives 
                fair living wages, healthcare benefits, and shared copyright credit for their intricate pattern creations.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#B69A62]/15 text-[#B69A62] rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif text-2xl text-[#24211D] mb-3">
                Zero Compromise Pure Weave
              </h3>
              <p className="text-xs text-[#24211D]/75 font-light leading-relaxed">
                In an era plagued by polyester blends, Juthika by Momita guarantees 100% pure wild Muga, certified Ahimsa Eri, 
                and mulberry Paat silk tested for authentic filament purity and GI tag compliance.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#B69A62]/15 text-[#B69A62] rounded-full flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="font-serif text-2xl text-[#24211D] mb-3">
                Architectural Modernity
              </h3>
              <p className="text-xs text-[#24211D]/75 font-light leading-relaxed">
                By sculpting traditional Mekhela Chador proportions with contemporary drapes, capes, and gowns, 
                we make Assamese silk universally resonant across the world’s most discerning red carpets and galas.
              </p>
            </div>
          </div>

        </section>

        {/* The Atelier Guild Section */}
        <section className="bg-[#24211D] text-[#FFFFFF] p-8 sm:p-14 border border-[#B69A62]/30 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
              Our Atelier Guild
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light mb-6 text-[#FFFFFF]">
              45+ Master Weavers. 120 Loom Families. One Sacred Legacy.
            </h2>
            <p className="text-xs sm:text-sm text-[#E8DFD1]/80 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Our private Ateliers in Sualkuchi, Kamrup, and Majuli are family guilds where weaving secrets 
              have been transmitted orally across three to six generations. 
              When you wear Juthika by Momita, you carry the prayers and artistry of a living civilization.
            </p>
            <Link
              to="/our-craft"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#B69A62] text-[#FFFFFF] hover:bg-[#A0834E] text-xs uppercase tracking-[0.25em] font-medium transition-colors"
            >
              <span>Explore The Craftsmanship Journey</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
