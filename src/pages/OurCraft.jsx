import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Award, ShieldCheck, Heart } from 'lucide-react';

export const OurCraft = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen w-full p-0 m-0 overflow-hidden">
      
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.35em] text-[#B69A62] font-semibold mb-3">
          <span>Living Handloom Patrimony</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-light tracking-wide mb-6">
          The Craft of Assamese Silk
        </h1>
        <p className="text-sm sm:text-base text-[#111111]/80 font-light leading-relaxed max-w-2xl mx-auto">
          In the sacred looms of Sualkuchi, thread is treated not merely as raw material, 
          but as a sacred conduit connecting ancient Ahom royalty to contemporary haute couture.
        </p>
      </div>

      {/* Section 1: Sualkuchi Heritage (100% Full-Bleed 50/50 Split) */}
      <section className="w-full bg-[#FFFFFF] border-t border-b border-[#E5E5E5] p-0 m-0 overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[580px] lg:min-h-[660px]">
          
          {/* Left Column: Sualkuchi Narrative & Continuity Counters */}
          <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-16 sm:py-20 lg:py-24">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#B69A62] font-semibold block mb-3">
              The Weaving Capital
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-light leading-tight mb-6">
              Sualkuchi: Where Every Home is a Sanctuary of Looms
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#111111]/80 font-light leading-relaxed mb-8">
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

            <div className="pt-6 border-t border-[#E5E5E5] flex items-center gap-10 text-xs text-[#111111]">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#111111] block">1000+</span>
                <span className="text-[10px] uppercase tracking-wider text-[#111111]/60 mt-1 block">Years of Continuity</span>
              </div>
              <div className="border-l border-[#E5E5E5] pl-10">
                <span className="font-serif text-3xl sm:text-4xl text-[#111111] block">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-[#111111]/60 mt-1 block">Wooden Throw-Shuttle</span>
              </div>
            </div>
          </div>

          {/* Right Column: 100% Full-Bleed Handloom Imagery */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full overflow-hidden bg-[#111111]">
            <img
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
              alt="Sualkuchi Artisan Handloom"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.95] contrast-[1.03]"
            />
          </div>

        </div>
      </section>

      {/* Section 2: The Three Sacred Silks (100% Full-Width Architectural Grid) */}
      <section className="w-full py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5] p-0 m-0">
        <div className="text-center max-w-3xl mx-auto px-6 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2.5">
            The Three Jewels of Assam
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light tracking-wide mb-4">
            Muga, Eri & Paat
          </h2>
          <p className="text-sm sm:text-base text-[#111111]/75 font-light leading-relaxed">
            Three rare indigenous filaments revered for six centuries by royal dynasties and global textile connoisseurs.
          </p>
        </div>

        {/* Edge-to-Edge 3-Column Silk Showcase */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-[#E5E5E5] border-t border-b border-[#E5E5E5]">
          
          {/* Muga Silk */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <div>
              <div className="w-14 h-14 bg-[#FFFFFF] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#B69A62] mb-8 shadow-sm">
                <Award size={26} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                Antheraea Assamensis
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-4 font-normal">
                Muga Silk — The Eternal Amber
              </h3>
              <p className="text-xs sm:text-sm text-[#111111]/80 font-light leading-relaxed mb-6">
                Endemic exclusively to the subtropical riverbanks of Assam. Fed on Som and Sualu leaves, the wild caterpillar spins a golden filament of incredible tensile strength. 
                Muga was legally reserved for Ahom royalty; unauthorized wearing once carried severe penalties.
              </p>
              <ul className="text-xs text-[#111111]/70 space-y-2.5 list-disc pl-4 mb-8">
                <li>Natural golden luster that deepens with every washing</li>
                <li>Absorbs up to 85% of harmful UV radiation</li>
                <li>Certified Geographical Indication (GI) protected heritage</li>
              </ul>
            </div>
            <div className="pt-6 border-t border-[#E5E5E5]">
              <Link to="/shop?category=Muga%20Silk" className="text-xs uppercase tracking-[0.2em] text-[#111111] hover:text-[#B69A62] font-medium transition-colors flex items-center gap-1.5">
                <span>View Muga Curations</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Eri Silk */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <div>
              <div className="w-14 h-14 bg-[#FFFFFF] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#B69A62] mb-8 shadow-sm">
                <Heart size={26} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                Samia Cynthia Ricini
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-4 font-normal">
                Eri Silk — The Gentle Peace Silk
              </h3>
              <p className="text-xs sm:text-sm text-[#111111]/80 font-light leading-relaxed mb-6">
                Ahimsa silk in its purest spiritual form. Unlike conventional silks that boil the pupae, Eri cocoons are spun only after the adult moth emerges naturally and flies away. 
                The fiber has a tactile handfeel resembling a dream-like blend of cashmere and wild linen.
              </p>
              <ul className="text-xs text-[#111111]/70 space-y-2.5 list-disc pl-4 mb-8">
                <li>100% cruelty-free & non-violent harvesting</li>
                <li>Naturally isothermal: warm in winter, cool in summer</li>
                <li>Hypoallergenic texture for sensitive delicate skin</li>
              </ul>
            </div>
            <div className="pt-6 border-t border-[#E5E5E5]">
              <Link to="/shop?category=Eri%20Silk" className="text-xs uppercase tracking-[0.2em] text-[#111111] hover:text-[#B69A62] font-medium transition-colors flex items-center gap-1.5">
                <span>View Eri Curations</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Paat Silk */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <div>
              <div className="w-14 h-14 bg-[#FFFFFF] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[#B69A62] mb-8 shadow-sm">
                <ShieldCheck size={26} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                Bombyx Textor
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-4 font-normal">
                Paat Silk — The Royal Mulberry
              </h3>
              <p className="text-xs sm:text-sm text-[#111111]/80 font-light leading-relaxed mb-6">
                Lustrous white mulberry silk characterized by its brilliant pearl sheen and crisp architectural drape. 
                Paat readily absorbs deep ceremonial dyes like emerald, vermilion, and midnight indigo, serving as the sacred foundation for Assamese bridal trousseaus.
              </p>
              <ul className="text-xs text-[#111111]/70 space-y-2.5 list-disc pl-4 mb-8">
                <li>Flawless satin finish with liquid pearl luster</li>
                <li>Ideal structural foundation for pure silver-gold Guna zari</li>
                <li>Traditional matrimonial attire of Assamese brides</li>
              </ul>
            </div>
            <div className="pt-6 border-t border-[#E5E5E5]">
              <Link to="/shop?category=Paat%20Silk" className="text-xs uppercase tracking-[0.2em] text-[#111111] hover:text-[#B69A62] font-medium transition-colors flex items-center gap-1.5">
                <span>View Paat Curations</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: Ancestral Motifs Glossary (100% Full-Width Dark Atelier Grid) */}
      <section className="w-full bg-[#141414] text-[#FFFFFF] py-20 sm:py-24 border-b border-[#2A2620] p-0 m-0">
        <div className="text-center max-w-3xl mx-auto px-6 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2.5">
            Iconography of Sualkuchi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF] font-light tracking-wide mb-4">
            Sacred Motifs & Their Meanings
          </h2>
          <p className="text-sm sm:text-base text-[#E5E5E5]/75 font-light leading-relaxed">
            Every geometric figure and floral butta represents sacred cosmic balance and ancestral oral folklore.
          </p>
        </div>

        {/* 4-Column Edge-to-Edge Architectural Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#2A2620] border-t border-b border-[#2A2620]">
          <div className="p-8 sm:p-10 lg:p-12 bg-[#1A1918] hover:bg-[#22211F] transition-colors">
            <span className="font-serif text-2xl text-[#D4AF37] block mb-3 font-normal">Kingkhap (কিংখাপ)</span>
            <p className="text-xs sm:text-sm text-[#E5E5E5]/80 font-light leading-relaxed">
              The royal crown insignia adapted from ancient Persian-Ahom cross-cultural exchanges. Symbolizes supreme sovereignty, dignity, and divine matrimonial blessing.
            </p>
          </div>

          <div className="p-8 sm:p-10 lg:p-12 bg-[#1A1918] hover:bg-[#22211F] transition-colors">
            <span className="font-serif text-2xl text-[#D4AF37] block mb-3 font-normal">Gos Buta (গছ বুটা)</span>
            <p className="text-xs sm:text-sm text-[#E5E5E5]/80 font-light leading-relaxed">
              The Tree of Life motif representing fertility, ancestral continuity, and deep spiritual rootedness in the subtropical soil of Assam.
            </p>
          </div>

          <div className="p-8 sm:p-10 lg:p-12 bg-[#1A1918] hover:bg-[#22211F] transition-colors">
            <span className="font-serif text-2xl text-[#D4AF37] block mb-3 font-normal">Moora / Peacock (ময়ূৰ)</span>
            <p className="text-xs sm:text-sm text-[#E5E5E5]/80 font-light leading-relaxed">
              The dancing peacock woven into pallus and borders. Represents beauty, nocturnal grace, and emotional matrimonial devotion.
            </p>
          </div>

          <div className="p-8 sm:p-10 lg:p-12 bg-[#1A1918] hover:bg-[#22211F] transition-colors">
            <span className="font-serif text-2xl text-[#D4AF37] block mb-3 font-normal">Jaapi (জাপি)</span>
            <p className="text-xs sm:text-sm text-[#E5E5E5]/80 font-light leading-relaxed">
              The conical ceremonial hat of Assam stylized into geometric micro-buttas. Woven as an eternal emblem of respect and welcoming hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: The 6-Stage Handloom Process (100% Full-Width) */}
      <section className="w-full bg-[#FFFFFF] py-20 sm:py-24 border-b border-[#E5E5E5] p-0 m-0">
        <div className="text-center max-w-3xl mx-auto px-6 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2.5">
            From Cocoon to Couture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light tracking-wide mb-4">
            The Six Stages of Creation
          </h2>
          <p className="text-sm sm:text-base text-[#111111]/75 font-light leading-relaxed">
            The unhurried methodology behind every Juthika by Momita heirloom drape.
          </p>
        </div>

        {/* 6-Stage Edge-to-Edge Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#E5E5E5] border-t border-b border-[#E5E5E5]">
          <div className="p-8 sm:p-10 lg:p-12 bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <span className="text-xl font-serif text-[#111111] font-normal block mb-2.5">01. Sericulture</span>
            <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed">Caterpillars nurtured on indigenous Som and Sualu shade trees in rural Assam under strict chemical-free microclimatic monitoring.</p>
          </div>

          <div className="p-8 sm:p-10 lg:p-12 bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <span className="text-xl font-serif text-[#111111] font-normal block mb-2.5">02. Hand-Reeling</span>
            <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed">Filaments gently unwound by hand using traditional <em>bhowri</em> reels to maintain continuous thread tensile strength and natural luster.</p>
          </div>

          <div className="p-8 sm:p-10 lg:p-12 bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <span className="text-xl font-serif text-[#111111] font-normal block mb-2.5">03. Botanical Dyeing</span>
            <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed">Where color is required, organic extracts from wild black tea leaves, madder root, lac, and fresh turmeric are lovingly simmered.</p>
          </div>

          <div className="p-8 sm:p-10 lg:p-12 bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <span className="text-xl font-serif text-[#111111] font-normal block mb-2.5">04. Loom Warping</span>
            <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed">Thousands of warp yarns mapped onto wooden beams with mathematical millimeter accuracy over several patient days.</p>
          </div>

          <div className="p-8 sm:p-10 lg:p-12 bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <span className="text-xl font-serif text-[#111111] font-normal block mb-2.5">05. Throw-Shuttle Weaving</span>
            <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed">The master artisan operates foot-treadles and throws the wooden shuttle, interweaving pure gold Guna extra wefts by hand.</p>
          </div>

          <div className="p-8 sm:p-10 lg:p-12 bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-colors">
            <span className="text-xl font-serif text-[#111111] font-normal block mb-2.5">06. Atelier Certification</span>
            <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed">Every finished drape undergoes microscopic thread testing and receives an individually numbered Juthika by Momita Seal of Authenticity.</p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-14 sm:pt-16 px-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-9 py-4 bg-[#111111] text-[#FFFFFF] hover:bg-black text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md"
          >
            <span>Explore Masterpiece Creations</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
};
