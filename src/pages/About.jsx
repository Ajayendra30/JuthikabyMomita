import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen w-full p-0 m-0 overflow-hidden">
      
      {/* Page Hero Header */}
      <div className="text-center max-w-4xl mx-auto px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.35em] text-[#B69A62] font-semibold mb-3">
          <span>The Juthika Monograph</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-light tracking-wide mb-6">
          The Soul of Juthika by Momita
        </h1>
        <p className="text-sm sm:text-base text-[#111111]/80 font-light leading-relaxed max-w-2xl mx-auto">
          Born from an abiding devotion to the Brahmaputra valley and the creative vision of Momita, Juthika by Momita exists to celebrate, protect, 
          and elevate Assamese silk handloom into the pantheon of royal Indian haute couture.
        </p>
      </div>

      {/* Section 1: Brand Philosophy & Story (100% Full-Bleed 50/50 Split) */}
      <section className="w-full bg-[#FFFFFF] border-t border-b border-[#E5E5E5] p-0 m-0 overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[580px] lg:min-h-[660px]">
          
          {/* Left Column: Atelier Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-16 sm:py-20 lg:py-24">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#B69A62] font-semibold block mb-3">
              The Philosophy of Juthika by Momita
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-light leading-tight mb-6">
              Fragrance of Jasmine, Majesty of Silk
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#111111]/80 font-light leading-relaxed mb-8">
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

            <div className="pt-6 border-t border-[#E5E5E5]">
              <span className="font-serif italic text-base sm:text-lg text-[#B69A62] leading-relaxed block">
                &ldquo;We do not invent beauty; we unearth it from centuries of ancestral looms.&rdquo;
              </span>
            </div>
          </div>

          {/* Right Column: 100% Full-Bleed High-Fashion Editorial Imagery */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full overflow-hidden bg-[#111111]">
            <img
              src="https://thesilkchamber.com/cdn/shop/files/mugasari_4c4c1055-f4e5-4275-929e-47cca7fd8daf.jpg?v=1758283256&width=1800"
              alt="Juthika by Momita Brand Karigari Essence"
              className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.03]"
            />
          </div>

        </div>
      </section>

      {/* Section 2: Three Pillars of Purpose (100% Full-Width Architectural Grid) */}
      <section className="w-full py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5] p-0 m-0">
        <div className="text-center max-w-3xl mx-auto px-6 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2.5">
            Our Guiding Creed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light tracking-wide mb-4">
            The Three Pillars of Purpose
          </h2>
          <p className="text-sm sm:text-base text-[#111111]/75 font-light leading-relaxed">
            The uncompromised moral and artistic principles that define every drape.
          </p>
        </div>

        {/* 3-Column Edge-to-Edge Grid with Hairline Dividers */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E5E5E5] border-t border-b border-[#E5E5E5]">
          
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <div>
              <div className="w-14 h-14 bg-[#FFFFFF] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#B69A62] mb-8 shadow-sm">
                <Users size={26} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                Ethical Karigari
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-4 font-normal">
                Dignity to the Weaver
              </h3>
              <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed">
                We eliminate exploitative middlemen entirely. Every master weaver in our partner guilds receives 
                fair living wages, healthcare benefits, and shared copyright credit for their intricate pattern creations.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <div>
              <div className="w-14 h-14 bg-[#FFFFFF] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#B69A62] mb-8 shadow-sm">
                <ShieldCheck size={26} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                Filament Purity
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-4 font-normal">
                Zero Compromise Pure Weave
              </h3>
              <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed">
                In an era plagued by polyester blends, Juthika by Momita guarantees 100% pure wild Muga, certified Ahimsa Eri, 
                and mulberry Paat silk tested for authentic filament purity and GI tag compliance.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <div>
              <div className="w-14 h-14 bg-[#FFFFFF] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#B69A62] mb-8 shadow-sm">
                <Award size={26} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                Couture Evolution
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-4 font-normal">
                Architectural Modernity
              </h3>
              <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed">
                By sculpting traditional Mekhela Chador proportions with contemporary drapes, capes, and gowns, 
                we make Assamese silk universally resonant across the world’s most discerning red carpets and galas.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: The Atelier Guild (100% Full-Width Dark Canvas) */}
      <section className="w-full bg-[#141414] text-[#FFFFFF] py-20 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-[#2A2620] p-0 m-0">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#B69A62] font-semibold block mb-3">
            Our Atelier Guild
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light mb-6 text-[#FFFFFF] leading-tight">
            45+ Master Weavers. 120 Loom Families. One Sacred Legacy.
          </h2>
          <p className="text-sm sm:text-base text-[#E5E5E5]/80 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Our private Ateliers in Sualkuchi, Kamrup, and Majuli are family guilds where weaving secrets 
            have been transmitted orally across three to six generations. 
            When you wear Juthika by Momita, you carry the prayers and artistry of a living civilization.
          </p>
          <Link
            to="/our-craft"
            className="inline-flex items-center gap-3 px-9 py-4 bg-[#B69A62] text-[#FFFFFF] hover:bg-[#A0834E] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md"
          >
            <span>Explore The Craftsmanship Journey</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
};
