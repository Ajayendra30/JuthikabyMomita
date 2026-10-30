import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const Craftsmanship = () => {
  return (
    <section className="py-24 bg-[#24211D] text-[#FFFFFF] relative overflow-hidden">
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B69A62_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Headline & Intro */}
        {/* <div className="text-center max-w-3xl mx-auto mb-20"> */}
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B69A62]/40 bg-[#B69A62]/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B69A62]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8DFD1] font-medium">
              Sualkuchi Handloom Legacy
            </span>
          </div> */}
          {/* <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFFFFF] font-light tracking-wide mb-6">
            The Soul of Assamese Craft
          </h2> */}
          {/* <p className="text-sm sm:text-base text-[#E8DFD1]/80 font-light leading-relaxed">
            In the ancient weaving village of Sualkuchi, the rhythmic clack of wooden throw-shuttle looms 
            has composed Assam's cultural soundtrack for over six centuries. 
            Each Juthika by Momita garment carries the breath, spirit, and unmatched precision of master weavers.
          </p> */}
        {/* </div> */}

        {/* 3 Silk Heritage Pillars Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"> */}
          
          {/* Pillar 1: Muga Silk */}
          {/* <div className="bg-[#1C1B1A] border border-[#B69A62]/30 p-8 flex flex-col justify-between hover:border-[#B69A62] transition-colors duration-300">
            <div> */}
              {/* <div className="w-12 h-12 rounded-full bg-[#B69A62]/15 flex items-center justify-center mb-6 text-[#B69A62]">
                <Award size={24} />
              </div> */}
              {/* <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                GI Tag Protected &bull; Wild Golden Silk
              </span> */}
              {/* <h3 className="font-serif text-2xl text-[#FFFFFF] font-normal mb-4">
                Muga — Nature's Golden Alchemy
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DFD1]/75 font-light leading-relaxed">
                Found nowhere else on Earth, the wild <em>Antheraea assamensis</em> silkworm produces a naturally shimmering, 
                rich amber fiber. Muga silk never loses its luster; remarkably, each gentle wash deepens its golden glow.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#B69A62]/20 flex items-center justify-between text-xs text-[#E8DFD1]/60">
              <span>Origin: Brahmaputra Basin</span>
              <span className="text-[#B69A62]">100% Endemic</span>
            </div> */}
          {/* </div> */}

          {/* Pillar 2: Eri Silk
          <div className="bg-[#1C1B1A] border border-[#B69A62]/30 p-8 flex flex-col justify-between hover:border-[#B69A62] transition-colors duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#B69A62]/15 flex items-center justify-center mb-6 text-[#B69A62]">
                <HeartHandshake size={24} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                Cruelty-Free &bull; Ahimsa Philosophy
              </span>
              <h3 className="font-serif text-2xl text-[#FFFFFF] font-normal mb-4">
                Eri — The Gentle Sanctuary
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DFD1]/75 font-light leading-relaxed">
                Spun after the silk moth peacefully vacates its cocoon. Known as 'Peace Silk', Eri mimics the softness 
                of cashmere with the breathable drape of linen—soothing the skin with rare isothermal comfort.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#B69A62]/20 flex items-center justify-between text-xs text-[#E8DFD1]/60">
              <span>Philosophy: Ahimsa Non-Violence</span>
              <span className="text-[#B69A62]">Cruelty-Free</span>
            </div>
          </div>

          {/* Pillar 3: Paat Silk */}
          {/* <div className="bg-[#1C1B1A] border border-[#B69A62]/30 p-8 flex flex-col justify-between hover:border-[#B69A62] transition-colors duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#B69A62]/15 flex items-center justify-center mb-6 text-[#B69A62]">
                <ShieldCheck size={24} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                Royal Loom &bull; Pure Mulberry
              </span>
              <h3 className="font-serif text-2xl text-[#FFFFFF] font-normal mb-4">
                Paat — The Imperial Canvas
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DFD1]/75 font-light leading-relaxed">
                Lustrous white mulberry silk that once draped the monarchs of the Ahom Dynasty. 
                Revered for its pearlescent sheen and architectural weight, it serves as the sacred foundation for Assamese bridal couture.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#B69A62]/20 flex items-center justify-between text-xs text-[#E8DFD1]/60">
              <span>Technique: Throw-Shuttle Zari</span>
              <span className="text-[#B69A62]">Mulberry Silk</span>
            </div>
          </div> */} 

        {/* </div> */}

        {/* Large Visual Feature: Handloom Artisan Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1C1B1A] border border-[#B69A62]/30 p-8 sm:p-12">
          <div className="lg:col-span-7">
            {/* <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-medium block mb-2">
              Fair Trade &bull; Living Cultural Heritage
            </span> */}
            <h3 className="font-serif text-2xl sm:text-4xl text-[#FFFFFF] font-light mb-4">
              Preserving the Guilds of Sualkuchi
            </h3>
            <p className="text-sm text-[#E8DFD1]/80 font-light leading-relaxed mb-6">
              Every Juthika by Momita drape is direct-from-artisan. We work directly with over 45 master weaver families in Kamrup, 
              providing fair dignity-first wages, healthcare security, and complete artistic autonomy to safeguard this endangered craft.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/our-craft"
                className="px-6 py-3.5 bg-[#B69A62] text-[#FFFFFF] hover:bg-[#A0834E] text-xs uppercase tracking-[0.25em] font-medium transition-colors flex items-center gap-2"
              >
                <span>Explore Our Heritage</span>
                <ArrowRight size={14} />
              </Link>
              <span className="text-xs text-[#E8DFD1]/60 italic font-serif">
                &ldquo;Where thread becomes scripture.&rdquo;
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden border border-[#B69A62]/40">
            <img
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80"
              alt="Assam Silk Artisan at Loom"
              className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1]"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
