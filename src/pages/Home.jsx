import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Hero } from '../components/Hero';
import { CollectionShowcase } from '../components/CollectionShowcase';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { Craftsmanship } from '../components/Craftsmanship';
import { BridalShowcase } from '../components/BridalShowcase';
import { LookbookGallery } from '../components/LookbookGallery';
import { Newsletter } from '../components/Newsletter';

export const Home = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* C. Full-Screen Campaign Hero */}
      <Hero />

      {/* D. Signature Collections ("Signature Expressions") */}
      <CollectionShowcase />

      {/* E. Featured Collection ("Curated in Silk") */}
      <FeaturedProducts />

      {/* F. Craftsmanship Storytelling ("The Soul of Assamese Craft") */}
      <Craftsmanship />

      {/* G. Bridal and Occasion Wear */}
      <BridalShowcase />

      {/* H. Lookbook Gallery */}
      <LookbookGallery />

      {/* I. Brand Philosophy: Tradition, Reimagined */}
      <section className="py-28 bg-[#FFFFFF] border-b border-[#E8DFD1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1200&q=85"
                  alt="Assamese Handloom High Fashion Draping"
                  className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.05]"
                />
                <div className="absolute inset-0 border border-[#B69A62]/30 m-4 pointer-events-none" />
              </div>
              
              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-[#24211D] text-[#FFFFFF] p-6 max-w-xs shadow-2xl border border-[#B69A62]/40 hidden sm:block">
                <p className="font-serif italic text-sm text-[#E8DFD1] leading-relaxed">
                  &ldquo;Juthika by Momita does not reproduce the past; we give antiquity an architectural tomorrow.&rdquo;
                </p>
                <span className="text-[10px] uppercase tracking-widest text-[#B69A62] block mt-2 font-medium">
                  Atelier Philosophy
                </span>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 lg:pl-8">
              {/* <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
                <Sparkles size={14} />
                <span>The Juthika Ethos</span>
              </div> */}

              <h2 className="font-serif text-3xl sm:text-5xl text-[#24211D] font-light tracking-wide leading-tight mb-6">
                Tradition, Reimagined
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#24211D]/80 font-light leading-relaxed">
                <p>
                  For centuries, Assamese silk has resided in the private treasuries of Ahom monarchs 
                  and the sacred sanctuaries of Kamrup weavers. 
                  Yet true luxury is never static—it evolves with poise, clarity, and fearless imagination.
                </p>
                <p>
                  At Juthika by Momita, we bridge ancient handloom wisdom with contemporary global silhouettes. 
                  By refining the weight, drape, and chromatic nuance of wild Muga, cruelty-free Eri, and ethereal Paat, 
                  we translate Assam’s living handloom poetry for the modern cosmopolitan connoisseur.
                </p>
                <p>
                  Every weave is an heirloom of conscience: slow-made, zero-chemical, and directly supporting 
                  the hereditary artisan families whose fingers hold the memory of dynasties.
                </p>
              </div>

              <div className="pt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] transition-colors text-xs uppercase tracking-[0.25em] font-medium shadow-md"
                >
                  <span>Read The Full Story</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* J. Newsletter */}
      <Newsletter />

    </div>
  );
};
