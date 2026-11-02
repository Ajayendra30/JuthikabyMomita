import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2, MapPin, X } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/collections';

export const Lookbook = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['All', 'Muga Silk', 'Bridal Couture', 'Eri Silk', 'Sarees', 'Ready-to-Wear', 'Occasion Wear'];

  const filteredItems = activeCategory === 'All'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16 w-full p-0 m-0">
      
      {/* Header Container */}
      <div className="text-center max-w-4xl mx-auto px-6 mb-16">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
          <span>The Juthika by Momita Visual Anthology</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-light tracking-wide mb-4">
          Campaign Lookbook
        </h1>
        <p className="text-sm sm:text-base text-[#111111]/75 font-light leading-relaxed">
          Photographed along the sacred banks of the Brahmaputra, the historical ruins of the Ahom dynasty, 
          and modern high-fashion pavilions across India.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#111111] text-[#FFFFFF]'
                  : 'text-[#111111]/70 hover:text-[#111111] bg-[#FFFFFF] border border-[#E5E5E5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 100% Full-Bleed Edge-to-Edge Grid with Hairline Editorial Seams */}
      <div className="w-full p-0 m-0 border-t border-b border-[#E5E5E5] bg-[#E5E5E5]">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px]">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-[#111111] overflow-hidden cursor-pointer min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] select-none"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.03] transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay with campaign details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8 lg:p-10 pointer-events-none">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                    {item.category}
                  </span>
                  <span className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm">
                    <Maximize2 size={13} />
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFFFF] mb-1.5 font-normal leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E5E5E5]/90 font-light mb-3 max-w-md">
                  {item.subtitle}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                  <MapPin size={13} />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#FFFFFF] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-[#E5E5E5]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2.5 bg-black/80 text-white hover:bg-black rounded-full z-20 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="md:w-3/5 bg-[#111111] flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[60vh] md:max-h-[85vh] w-full object-contain"
              />
            </div>

            <div className="md:w-2/5 p-6 sm:p-10 flex flex-col justify-between bg-[#FFFFFF]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
                  {selectedItem.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-2 font-normal leading-snug">
                  {selectedItem.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#111111]/60 mb-5">
                  {selectedItem.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#111111]/80 font-light leading-relaxed mb-6">
                  {selectedItem.caption}
                </p>
                <div className="p-4 bg-[#FFFFFF] border border-[#E5E5E5] text-xs text-[#111111]/80 space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#111111]">
                    <MapPin size={13} className="text-[#B69A62]" />
                    <span className="font-medium text-[#111111]">{selectedItem.location}</span>
                  </div>
                  <p className="text-[11px] text-[#111111]/60">Woven on ancestral throw-shuttle wooden looms in Sualkuchi, Assam.</p>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#E5E5E5] flex justify-between items-center">
                <Link
                  to={`/shop?category=${encodeURIComponent(selectedItem.category)}`}
                  onClick={() => setSelectedItem(null)}
                  className="text-xs uppercase tracking-widest text-[#111111] hover:text-[#B69A62] flex items-center gap-1.5 font-medium transition-colors"
                >
                  Shop This Aesthetic <ArrowRight size={13} />
                </Link>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-xs uppercase tracking-wider text-[#111111]/60 hover:text-[#111111] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
