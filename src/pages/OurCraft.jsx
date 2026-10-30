import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Award, ShieldCheck, Heart } from 'lucide-react';

export const OurCraft = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
           
            <span>Living Handloom Patrimony</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#24211D] font-light tracking-wide mb-6">
            The Craft of Assamese Silk
          </h1>
          <p className="text-sm sm:text-base text-[#24211D]/80 font-light leading-relaxed">
            In the sacred looms of Sualkuchi, thread is treated not merely as raw material, 
            but as a sacred conduit connecting ancient Ahom royalty to contemporary haute couture.
          </p>
        </div>

        {/* Section 1: Sualkuchi Heritage */}
        <section className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-14 mb-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block">
                The Weaving Capital
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light leading-snug">
                Sualkuchi: Where Every Home is a Sanctuary of Looms
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#24211D]/80 font-light leading-relaxed">
                <p>
                  Perched on the northern bluffs of the mighty Brahmaputra river in Assam, 
                  Sualkuchi is a historical weaving enclave where the rhythmic thrum of wooden shuttle looms 
                  has echoed continuously since the 11th century under King Dharma Pala.
                </p>
                <p>
                  Unlike mass mechanized mills, Sualkuchi handlooms require two pairs of coordinated hands 
                  and intense mental arithmetic to weave complex extra-weft motifs using pure silver and gold Guna wires.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-6 text-xs text-[#24211D]">
                <div>
                  <span className="font-serif text-2xl text-[#B69A62]">1000+</span>
                  <span className="block text-[10px] uppercase tracking-wider text-[#24211D]/60">Years of Continuity</span>
                </div>
                <div className="border-l border-[#E8DFD1] pl-6">
                  <span className="font-serif text-2xl text-[#B69A62]">100%</span>
                  <span className="block text-[10px] uppercase tracking-wider text-[#24211D]/60">Wooden Throw-Shuttle</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden shadow-xl border border-[#B69A62]/30">
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
                alt="Sualkuchi Artisan Handloom"
                className="w-full h-full object-cover filter brightness-[0.9]"
              />
            </div>
          </div>
        </section>

        {/* Section 2: The Three Sacred Silks */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
              The Three Jewels of Assam
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
              Muga, Eri & Paat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Muga */}
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#B69A62]/15 text-[#B69A62] rounded-full flex items-center justify-center mb-6">
                  <Award size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                  Antheraea Assamensis
                </span>
                <h3 className="font-serif text-2xl text-[#24211D] mb-4">
                  Muga Silk — The Eternal Amber
                </h3>
                <p className="text-xs text-[#24211D]/80 font-light leading-relaxed mb-4">
                  Endemic exclusively to the subtropical riverbanks of Assam. Fed on Som and Sualu leaves, the wild caterpillar spins a golden filament of incredible tensile strength. 
                  Muga was legally reserved for Ahom royalty; unauthorized wearing once carried severe penalties.
                </p>
                <ul className="text-xs text-[#24211D]/70 space-y-1.5 list-disc pl-4 mb-6">
                  <li>Natural golden luster without synthetic dyes</li>
                  <li>Absorbs up to 85% of UV radiation</li>
                  <li>Guaranteed GI (Geographical Indication) status</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[#E8DFD1]">
                <Link to="/shop?category=Muga%20Silk" className="text-xs uppercase tracking-wider text-[#B69A62] hover:underline font-medium">
                  View Muga Curations &rarr;
                </Link>
              </div>
            </div>

            {/* Eri */}
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#B69A62]/15 text-[#B69A62] rounded-full flex items-center justify-center mb-6">
                  <Heart size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                  Samia Cynthia Ricini
                </span>
                <h3 className="font-serif text-2xl text-[#24211D] mb-4">
                  Eri Silk — The Gentle Peace Silk
                </h3>
                <p className="text-xs text-[#24211D]/80 font-light leading-relaxed mb-4">
                  Ahimsa silk in its purest spiritual form. Unlike conventional silks that boil the pupae, Eri cocoons are spun only after the adult moth emerges naturally and flies away. 
                  The fiber has a tactile handfeel resembling a dream-like blend of cashmere and wild linen.
                </p>
                <ul className="text-xs text-[#24211D]/70 space-y-1.5 list-disc pl-4 mb-6">
                  <li>Cruelty-free & non-violent harvesting</li>
                  <li>Isothermal: warm in winter, cool in summer</li>
                  <li>Hypoallergenic for delicate sensitive skin</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[#E8DFD1]">
                <Link to="/shop?category=Eri%20Silk" className="text-xs uppercase tracking-wider text-[#B69A62] hover:underline font-medium">
                  View Eri Curations &rarr;
                </Link>
              </div>
            </div>

            {/* Paat */}
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#B69A62]/15 text-[#B69A62] rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                  Bombyx Textor
                </span>
                <h3 className="font-serif text-2xl text-[#24211D] mb-4">
                  Paat Silk — The Royal Mulberry
                </h3>
                <p className="text-xs text-[#24211D]/80 font-light leading-relaxed mb-4">
                  Lustrous white mulberry silk characterized by its brilliant pearl sheen and crisp architectural drape. 
                  Paat readily absorbs deep ceremonial dyes like emerald, vermilion, and midnight indigo, serving as the sacred foundation for Assamese bridal trousseaus.
                </p>
                <ul className="text-xs text-[#24211D]/70 space-y-1.5 list-disc pl-4 mb-6">
                  <li>Flawless satin finish with liquid luster</li>
                  <li>Ideal foundation for pure silver-gold Guna zari</li>
                  <li>Traditional wedding attire of Assamese brides</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[#E8DFD1]">
                <Link to="/shop?category=Paat%20Silk" className="text-xs uppercase tracking-wider text-[#B69A62] hover:underline font-medium">
                  View Paat Curations &rarr;
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Ancestral Motifs Glossary */}
        <section className="bg-[#24211D] text-[#FFFFFF] p-8 sm:p-14 mb-16 border border-[#B69A62]/30">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
              Iconography of Sualkuchi
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] font-light">
              Sacred Motifs & Their Meanings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-5 bg-[#1C1B1A] border border-[#B69A62]/20">
              <span className="font-serif text-xl text-[#B69A62] block mb-2">Kingkhap (কিংখাপ)</span>
              <p className="text-[#E8DFD1]/80 font-light">
                The royal crown insignia adapted from ancient Persian-Ahom cross-cultural exchanges. Symbolizes supreme sovereignty, dignity, and divine blessing.
              </p>
            </div>

            <div className="p-5 bg-[#1C1B1A] border border-[#B69A62]/20">
              <span className="font-serif text-xl text-[#B69A62] block mb-2">Gos Buta (গছ বুটা)</span>
              <p className="text-[#E8DFD1]/80 font-light">
                The Tree of Life motif representing fertility, ancestral continuity, and deep rootedness in the ecological soil of Assam.
              </p>
            </div>

            <div className="p-5 bg-[#1C1B1A] border border-[#B69A62]/20">
              <span className="font-serif text-xl text-[#B69A62] block mb-2">Moora / Peacock (ময়ূৰ)</span>
              <p className="text-[#E8DFD1]/80 font-light">
                The dancing peacock woven into pallus and borders. Represents beauty, nocturnal grace, and emotional devotion.
              </p>
            </div>

            <div className="p-5 bg-[#1C1B1A] border border-[#B69A62]/20">
              <span className="font-serif text-xl text-[#B69A62] block mb-2">Jaapi (জাপি)</span>
              <p className="text-[#E8DFD1]/80 font-light">
                The conical ceremonial hat of Assam stylized into geometric micro-buttas. Woven as an emblem of respect and welcoming hospitality.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: The 6-Stage Handloom Process */}
        <section className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-14">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
              From Cocoon to Couture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
              The Six Stages of Creation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-xs text-[#24211D]/80">
            <div className="p-6 border border-[#E8DFD1] bg-[#FFFFFF]">
              <span className="text-lg font-serif text-[#B69A62] font-bold block mb-2">01. Sericulture</span>
              <p className="font-light">Caterpillars nurtured on indigenous shade trees in rural Assam under strict chemical-free microclimatic monitoring.</p>
            </div>

            <div className="p-6 border border-[#E8DFD1] bg-[#FFFFFF]">
              <span className="text-lg font-serif text-[#B69A62] font-bold block mb-2">02. Hand-Reeling</span>
              <p className="font-light">Filaments gently unwound by hand using traditional <em>bhowri</em> reels to maintain continuous thread tensile strength.</p>
            </div>

            <div className="p-6 border border-[#E8DFD1] bg-[#FFFFFF]">
              <span className="text-lg font-serif text-[#B69A62] font-bold block mb-2">03. Botanical Dyeing</span>
              <p className="font-light">Where color is required, natural dyes extracted from wild tea leaves, madder root, lac, and turmeric are used.</p>
            </div>

            <div className="p-6 border border-[#E8DFD1] bg-[#FFFFFF]">
              <span className="text-lg font-serif text-[#B69A62] font-bold block mb-2">04. Loom Warping</span>
              <p className="font-light">Thousands of warp yarns mapped onto wooden beams with mathematical millimeter accuracy over several days.</p>
            </div>

            <div className="p-6 border border-[#E8DFD1] bg-[#FFFFFF]">
              <span className="text-lg font-serif text-[#B69A62] font-bold block mb-2">05. Throw-Shuttle Weaving</span>
              <p className="font-light">The master artisan operates foot-treadles and throws the wooden shuttle, interweaving gold Guna extra wefts.</p>
            </div>

            <div className="p-6 border border-[#E8DFD1] bg-[#FFFFFF]">
              <span className="text-lg font-serif text-[#B69A62] font-bold block mb-2">06. Atelier Certification</span>
              <p className="font-light">Every finished drape undergoes microscopic thread testing and receives a numbered Juthika by Momita Seal of Authenticity.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.25em] font-medium transition-colors"
            >
              <span>Explore Masterpiece Creations</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
