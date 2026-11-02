import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, X, Maximize2, MapPin } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/collections';

export const LookbookGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Column spanning configuration for a true 100% full-bleed 12-column editorial mosaic
  const getColSpan = (index) => {
    switch (index) {
      case 0:
        return 'lg:col-span-5 min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]'; // Asymmetric portrait
      case 1:
        return 'lg:col-span-7 min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]'; // Wide imperial couture
      case 2:
      case 3:
      case 4:
        return 'lg:col-span-4 min-h-[460px] sm:min-h-[520px] lg:min-h-[600px]'; // Balanced triptych (4+4+4=12)
      case 5:
      default:
        return 'lg:col-span-12 min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]'; // Panoramic grand finale
    }
  };

  return (
    <section className="w-full pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 bg-[#FFFFFF] border-b border-[#E5E5E5] p-0 m-0 overflow-hidden">
      
      {/* Editorial Header */}
      <div className="text-center max-w-4xl mx-auto px-6 mb-6 sm:mb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#B69A62] font-semibold block mb-1.5">
          Campaign Visual Anthology
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light tracking-wide mb-2.5">
          Lookbook Gallery
        </h2>
        <p className="text-xs sm:text-sm text-[#111111]/75 font-light leading-relaxed max-w-2xl mx-auto">
          A visual anthology capturing the intersection of Assamese antiquity, 
          intricate Guna textures, and contemporary couture drapes.
        </p>
      </div>

      {/* 100% Full-Bleed Edge-to-Edge Editorial Mosaic */}
      <div className="w-full p-0 m-0 border-t border-b border-[#E5E5E5] bg-[#E5E5E5]">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-[1px]">
          {LOOKBOOK_ITEMS.map((item, index) => {
            const colSpanClass = getColSpan(index);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group relative overflow-hidden bg-[#111111] cursor-pointer select-none transition-all duration-500 ${colSpanClass}`}
              >
                {/* 100% Full-Bleed Image with Object-Top Framing */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.94] contrast-[1.03] transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8 lg:p-10 pointer-events-none">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                      {item.category}
                    </span>
                    <span className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm">
                      <Maximize2 size={13} />
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFFFF] font-normal mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E5E5E5]/90 font-light line-clamp-2 max-w-xl mb-3">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                    <MapPin size={13} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Atelier Exploration CTA */}
      <div className="w-full text-center pt-12 sm:pt-16 px-6">
        <Link
          to="/lookbook"
          className="inline-flex items-center gap-3 px-9 py-4 bg-[#111111] text-[#FFFFFF] hover:bg-black text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md"
        >
          <span>Explore Complete Lookbook</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* High-Fashion Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#FFFFFF] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-[#E5E5E5]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2.5 bg-black/80 text-white hover:bg-black rounded-full z-20 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div className="md:w-3/5 bg-[#111111] flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[60vh] md:max-h-[85vh] w-full object-contain"
              />
            </div>

            {/* Modal Editorial Story */}
            <div className="md:w-2/5 p-6 sm:p-10 flex flex-col justify-between bg-[#FFFFFF]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-2 font-normal leading-snug">
                  {selectedImage.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#111111]/60 mb-5">
                  {selectedImage.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#111111]/80 font-light leading-relaxed mb-6">
                  {selectedImage.caption}
                </p>
                <div className="p-4 bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#111111]/80 space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#111111]">
                    <MapPin size={13} className="text-[#B69A62]" />
                    <span className="font-medium text-[#111111]">{selectedImage.location}</span>
                  </div>
                  <p className="text-[11px] text-[#111111]/60">Woven on ancestral throw-shuttle wooden looms in Sualkuchi, Assam.</p>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#E5E5E5] flex justify-between items-center">
                <Link
                  to={`/shop?category=${encodeURIComponent(selectedImage.category)}`}
                  onClick={() => setSelectedImage(null)}
                  className="text-xs uppercase tracking-widest text-[#111111] hover:text-[#B69A62] flex items-center gap-1.5 font-medium transition-colors"
                >
                  Shop This Aesthetic <ArrowRight size={13} />
                </Link>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-xs uppercase tracking-wider text-[#111111]/60 hover:text-[#111111] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
