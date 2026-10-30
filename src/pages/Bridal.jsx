import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Bridal = () => {
  const { setIsConsultationOpen } = useCart();

  const bridalProducts = PRODUCTS.filter(
    (p) => p.category === 'Bridal Couture' || p.secondaryCategory === 'Bridal Couture'
  );

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* Bridal Campaign Hero */}
      <section className="relative min-h-[75vh] flex items-center justify-center bg-[#24211D] text-[#FFFFFF] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=85"
            alt="Juthika by Momita Haute Bridal Sanctuary"
            className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24211D] via-[#24211D]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <div >
            {/* <span className="text-[10px] uppercase tracking-[0.35em] text-[#E8DFD1] font-medium">
              The Haute Bridal Sanctuary
            </span> */}
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-tight mb-6">
            An Heirloom for <br />
            <span className="italic text-[#E8DFD1]">Your Most Sacred Vows</span>
          </h1>

          <p className="text-sm sm:text-base text-[#E8DFD1]/85 font-light max-w-2xl mx-auto leading-relaxed mb-8">
            Hand-woven in Sualkuchi using sacred mulberry Paat and eternal wild Muga silk. 
            Adorned with pure antique gold Guna, created to be cherished across generations.
          </p>

          <button
            onClick={() => setIsConsultationOpen(true)}
            className="px-8 py-4 bg-[#B69A62] text-[#FFFFFF] hover:bg-[#A0834E] text-xs uppercase tracking-[0.25em] font-medium transition-all shadow-xl inline-flex items-center gap-2"
          >
            <Calendar size={15} />
            <span>Book Private Bridal Consultation</span>
          </button>
        </div>
      </section>

      {/* The Assamese Bridal Narrative */}
      <section className="py-20 bg-[#FFFFFF] border-b border-[#E8DFD1]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#24211D] font-semibold block">
                Six Centuries of Matrimonial Splendour
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#B69A62] font-light leading-snug">
                The Sacred Architecture of the Assamese Bride
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#B69A62]/80 font-light leading-relaxed">
                <p>
                  Unlike stitched pan-Indian garments, the Assamese bridal Mekhela Chador is an architectural masterpiece of two distinct handwoven lengths—the sculptured lower drape (Mekhela) and the diaphanous celestial upper wrap (Chador), complemented by the sacred ceremonial waist veil (Riha).
                </p>
                <p>
                  Traditionally bathed in the auspicious purity of white Mulberry Paat and trimmed with vermilion resham, our bespoke bridal creations honour every ancient royal ritual while offering modern ergonomic comfort and effortless drape.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-8 text-xs text-[#B69A62]">
                <div>
                  <span className="font-serif text-2xl text-[#24211D] block">240+</span>
                  <span className="text-[#24211D]/60 uppercase tracking-wider text-[10px]">Loom Hours</span>
                </div>
                <div className="border-l border-[#E8DFD1] pl-8">
                  <span className="font-serif text-2xl text-[#24211D] block">100%</span>
                  <span className="text-[#B69A62]/60 uppercase tracking-wider text-[10px]">Pure Mulberry Paat</span>
                </div>
                <div className="border-l border-[#E8DFD1] pl-8">
                  <span className="font-serif text-2xl text-[#24211D] block">Bespoke</span>
                  <span className="text-[#B69A62]/60 uppercase tracking-wider text-[10px]">Cedar Chest Box</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/5] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="Assamese Bride in Golden Muga and Paat"
                className="w-full h-full object-cover filter brightness-[0.95]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* The 4-Step Bespoke Bridal Journey */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#24211D] font-semibold block mb-2">
              The Atelier Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#B69A62] font-light">
              Your Bespoke Bridal Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#24211D]/75 font-light mt-2">
              From the initial sketch to the final ceremonial drape, every step is an intimate collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div key={st.step} className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 flex flex-col justify-between">
                <div>
                  <span className="font-serif text-3xl text-[#B69A62] font-light block mb-4">
                    {st.step}
                  </span>
                  <h3 className="font-serif text-xl text-[#24211D] mb-2 font-normal">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#24211D]/75 font-light leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridal Curated Ensembles */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
              Ceremonial Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
              Curated Bridal Ensembles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bridalProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#24211D] text-[#FFFFFF] text-center">
        <div className="max-w-3xl mx-auto px-6">
          {/* <Sparkles className="w-6 h-6 text-[#B69A62] mx-auto mb-4" /> */}
          <h2 className="font-serif text-3xl sm:text-5xl font-light mb-4 text-[#FFFFFF]">
            Begin Your Bridal Heirloom
          </h2>
          <p className="text-xs sm:text-sm text-[#E8DFD1]/80 font-light mb-8 max-w-xl mx-auto">
            Due to the intensive handloom weaving time of 40–60 days per bridal ensemble, 
            we recommend reserving your consultation 4 to 6 months prior to your wedding date.
          </p>
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="px-8 py-4 bg-[#24211D] text-[#FFFFFF] hover:bg-[#A0834E] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-lg"
          >
            Schedule Atelier Consultation
          </button>
        </div>
      </section>

    </div>
  );
};
// className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#24211D]/40 bg-[#B69A62]/60 backdrop-blur-sm mb-6">
//             <Sparkles className="w-3.5 h-3.5 text-[#B69A62]" /