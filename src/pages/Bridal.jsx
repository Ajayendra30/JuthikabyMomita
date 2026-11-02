import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Bridal = () => {
  const { setIsConsultationOpen } = useCart();

  const bridalProducts = PRODUCTS.filter(
    (p) => (p.category === 'Bridal Couture' || p.secondaryCategory === 'Bridal Couture') && p.id !== 'jm-acc-02'
  );

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* Bridal Campaign Hero (Crisp Unblurred Image, Left-Aligned Luxury Editorial Design) */}
      <section className="relative min-h-[88vh] sm:min-h-[92vh] lg:min-h-[96vh] flex items-center justify-start bg-[#111111] text-[#FFFFFF] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bridal-palace-hero.png"
            alt="Juthika by Momita Haute Bridal Sanctuary"
            className="w-full h-full object-cover object-[78%_center] sm:object-[82%_center] lg:object-right filter brightness-[0.96] contrast-[1.02]"
          />
          {/* Directional gradient: Deep dark on the left for maximum text contrast, fading out to transparent so the bride on the right remains 100% sharp, bright, and unobstructed */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 via-35% sm:via-black/60 sm:via-48% to-transparent pointer-events-none" />
          {/* Subtle bottom vignette for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none sm:hidden" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-24">
          <div className="max-w-xl lg:max-w-2xl text-left">
          

            {/* Medium Luxury Headline */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-light tracking-normal leading-[1.2] text-[#FFFFFF] mb-4 drop-shadow-md">
              An Heirloom for <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7B4] via-[#D4AF37] to-[#C99632]">
                Your Most Sacred Vows
              </span>
            </h1>

            {/* Redesigned Narrative with Gold Left Accent */}
            <div className="border-l-2 border-[#D4AF37] pl-4 sm:pl-5 my-4 max-w-md">
              <p className="text-xs sm:text-sm text-[#F3F3F1]/90 font-light leading-relaxed">
                Hand-woven in Sualkuchi using sacred mulberry Paat and eternal wild Muga silk. 
                Adorned with pure antique gold Guna, created to be cherished across generations.
              </p>
            </div>

            {/* Redesigned Luxury CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#DFBA48] to-[#C29B27] hover:from-[#E6C65C] hover:to-[#B68C1C] text-[#111111] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_8px_24px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_32px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
              >
                <Calendar size={14} className="text-[#111111] transition-transform duration-300 group-hover:scale-110" />
                <span>Book Private Consultation</span>
              </button>
            </div>

            {/* Provenance Hallmarks Strip
            <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-[#E5E5E5]/75 tracking-wider uppercase font-light">
              <span className="flex items-center gap-1.5">
                <span className="text-[#D4AF37]">✦</span> 100% Sualkuchi Handloom
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#D4AF37]">✦</span> Pure Mulberry Paat & Muga
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#D4AF37]">✦</span> Antique Gold Guna
              </span>
            </div> */}

          </div>
        </div>
      </section>

      {/* The Assamese Bridal Narrative - 100% Full-Width Edge-to-Edge */}
      <section className="w-full bg-[#FFFFFF] border-b border-[#E5E5E5] p-0 m-0 overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[580px] lg:min-h-[660px]">
          
          <div className="lg:col-span-6 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-16 sm:py-20 lg:py-24 flex flex-col justify-center bg-[#FFFFFF] space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block">
              Six Centuries of Matrimonial Splendour
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-light leading-snug">
              The Sacred Architecture of the Assamese Bride
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-[#111111]/80 font-light leading-relaxed">
              <p>
                Unlike stitched pan-Indian garments, the Assamese bridal Mekhela Chador is an architectural masterpiece of two distinct handwoven lengths—the sculptured lower drape (Mekhela) and the diaphanous celestial upper wrap (Chador), complemented by the sacred ceremonial waist veil (Riha).
              </p>
              <p>
                Traditionally bathed in the auspicious purity of white Mulberry Paat and trimmed with vermilion resham, our bespoke bridal creations honour every ancient royal ritual while offering modern ergonomic comfort and effortless drape.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#111111]">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#111111] block">240+</span>
                <span className="text-[#111111]/60 uppercase tracking-wider text-[10px]">Loom Hours</span>
              </div>
              <div className="border-l border-[#E5E5E5] pl-6 sm:pl-8">
                <span className="font-serif text-2xl sm:text-3xl text-[#111111] block">100%</span>
                <span className="text-[#111111]/60 uppercase tracking-wider text-[10px]">Pure Mulberry Paat</span>
              </div>
              <div className="border-l border-[#E5E5E5] pl-6 sm:pl-8">
                <span className="font-serif text-2xl sm:text-3xl text-[#111111] block">Bespoke</span>
                <span className="text-[#111111]/60 uppercase tracking-wider text-[10px]">Cedar Chest Box</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[460px] lg:min-h-full overflow-hidden bg-[#111111]">
            <img
              src="/images/bridal-narrative.jpg"
              alt="Assamese Bride in Golden Muga and Paat"
              className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02] transition-transform duration-1000 ease-out hover:scale-105"
            />
          </div>

        </div>
      </section>

      {/* The 4-Step Bespoke Bridal Journey */}
      <section className="py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5] w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
              The Atelier Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-light">
              Your Bespoke Bridal Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#111111]/75 font-light mt-2 max-w-xl mx-auto">
              From the initial sketch to the final ceremonial drape, every step is an intimate collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Private Consultation",
                desc: "Meet with our senior bridal drape master at our Guwahati flagship, New Delhi Darbar, or via global virtual appointment to discuss your wedding dreams."
              },
              {
                step: "02",
                title: "Weave & Motif Selection",
                desc: "Choose between pure wild Muga gold and luminescent Paat silk. Select ancestral Ahom motifs—from the royal Kingkhap to auspicious peacocks."
              },
              {
                step: "03",
                title: "Loom Crafting",
                desc: "Your ensemble is assigned to a dedicated Sualkuchi master weaver family, hand-crafting each centimeter on traditional wooden throw-shuttles."
              },
              {
                step: "04",
                title: "Fitting & Presentation",
                desc: "A personalized fitting session followed by heirloom presentation in an aromatic, handcrafted Assam cedarwood storage chest."
              }
            ].map((st) => (
              <div key={st.step} className="bg-[#FFFFFF] border border-[#E5E5E5] p-8 flex flex-col justify-between hover:border-[#111111] transition-colors">
                <div>
                  <span className="font-serif text-3xl text-[#111111] font-light block mb-4">
                    {st.step}
                  </span>
                  <h3 className="font-serif text-xl text-[#111111] mb-2 font-normal">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#111111]/75 font-light leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridal Curated Ensembles */}
      <section className="py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5] w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
              Ceremonial Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-light">
              Curated Bridal Ensembles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bridalProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#111111] text-[#FFFFFF] text-center">
        <div className="max-w-3xl mx-auto px-6">
          {/* <Sparkles className="w-6 h-6 text-[#111111] mx-auto mb-4" /> */}
          <h2 className="font-serif text-3xl sm:text-5xl font-light mb-4 text-[#FFFFFF]">
            Begin Your Bridal Heirloom
          </h2>
          <p className="text-xs sm:text-sm text-[#E5E5E5]/80 font-light mb-8 max-w-xl mx-auto">
            Due to the intensive handloom weaving time of 40–60 days per bridal ensemble, 
            we recommend reserving your consultation 4 to 6 months prior to your wedding date.
          </p>
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="px-8 py-4 bg-[#111111] text-[#FFFFFF] hover:bg-[#222222] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-lg"
          >
            Schedule Atelier Consultation
          </button>
        </div>
      </section>

    </div>
  );
};