import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, X, Maximize2, MapPin } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/collections';

export const LookbookGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          {/* <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
            <Sparkles size={14} />
            <span>Editorial Campaign & Styling</span>
          </div> */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#24211D] font-light tracking-wide mb-4">
            Lookbook Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#24211D]/75 font-light leading-relaxed">
            A visual anthology capturing the intersection of Assamese antiquity, 
            intricate Guna textures, and contemporary couture drapes.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOOKBOOK_ITEMS.map((item, index) => {
            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group relative overflow-hidden bg-[#24211D] cursor-pointer shadow-md transition-all duration-500 hover:shadow-2xl ${
                  item.aspect === 'wide' ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[3/4]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-[0.92] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/90 via-[#24211D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold">
                      {item.category}
                    </span>
                    <span className="p-1.5 bg-[#FFFFFF]/20 rounded-full text-white">
                      <Maximize2 size={13} />
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#FFFFFF] font-normal mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#E8DFD1]/80 font-light line-clamp-2">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#B69A62] mt-3">
                    <MapPin size={11} />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Corner Label when idle */}
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-[#24211D]/60 backdrop-blur-sm text-[9px] uppercase tracking-wider text-[#FFFFFF] group-hover:opacity-0 transition-opacity">
                  Look 0{index + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-14">
          <Link
            to="/lookbook"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md"
          >
            <span>Explore Complete Lookbook</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#24211D]/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-[#FFFFFF] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-[#B69A62]/40">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 p-2 bg-[#24211D]/80 text-white hover:bg-[#B69A62] rounded-full z-20 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="md:w-3/5 bg-[#24211D] flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[70vh] md:max-h-[85vh] w-full object-contain"
              />
            </div>

            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-3xl text-[#24211D] mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#24211D]/60 mb-4">
                  {selectedImage.subtitle}
                </p>
                <p className="text-xs text-[#24211D]/80 font-light leading-relaxed mb-6">
                  {selectedImage.caption}
                </p>
                <div className="p-3 bg-[#FFFFFF] border border-[#E8DFD1] text-xs text-[#24211D]/70 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#B69A62]">
                    <MapPin size={13} />
                    <span className="font-medium text-[#24211D]">{selectedImage.location}</span>
                  </div>
                  <p className="text-[11px]">Woven on wooden handlooms in Sualkuchi, Assam.</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DFD1] flex justify-between items-center">
                <Link
                  to="/shop"
                  onClick={() => setSelectedImage(null)}
                  className="text-xs uppercase tracking-widest text-[#B69A62] hover:underline flex items-center gap-1 font-medium"
                >
                  Shop This Aesthetic <ArrowRight size={13} />
                </Link>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-xs uppercase tracking-wider text-[#24211D]/60 hover:text-[#24211D]"
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
