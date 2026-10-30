import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Maximize2, MapPin, X } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/collections';

export const Lookbook = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['All', 'Muga Silk', 'Bridal Couture', 'Eri Silk', 'Sarees', 'Ready-to-Wear', 'Occasion Wear'];

  const filteredItems = activeCategory === 'All'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
            
            <span>The Juthika by Momita Visual Anthology</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#24211D] font-light tracking-wide mb-4">
            Campaign Lookbook
          </h1>
          <p className="text-sm sm:text-base text-[#24211D]/75 font-light leading-relaxed">
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
                    ? 'bg-[#24211D] text-[#FFFFFF]'
                    : 'text-[#24211D]/70 hover:text-[#24211D] bg-[#FFFFFF] border border-[#E8DFD1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-[#24211D] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-[0.92] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Hover overlay with campaign details */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/90 via-[#24211D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold">
                    {item.category}
                  </span>
                  <span className="p-1.5 bg-[#FFFFFF]/20 rounded-full text-white">
                    <Maximize2 size={13} />
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#FFFFFF] mb-1 font-normal">
                  {item.title}
                </h3>
                <p className="text-xs text-[#E8DFD1]/80 font-light mb-3">
                  {item.subtitle}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-[#B69A62]">
                  <MapPin size={11} />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Idle Corner Tag */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#24211D]/60 backdrop-blur-sm text-[9px] uppercase tracking-wider text-[#FFFFFF] group-hover:opacity-0 transition-opacity">
                Plate 0{index + 1}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#24211D]/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-[#FFFFFF] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-[#B69A62]/40">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 p-2 bg-[#24211D]/80 text-white hover:bg-[#B69A62] rounded-full z-20 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="md:w-3/5 bg-[#24211D] flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[70vh] md:max-h-[85vh] w-full object-contain"
              />
            </div>

            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
                  {selectedItem.category}
                </span>
                <h3 className="font-serif text-3xl text-[#24211D] mb-2 font-normal">
                  {selectedItem.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#24211D]/60 mb-4">
                  {selectedItem.subtitle}
                </p>
                <p className="text-xs text-[#24211D]/80 font-light leading-relaxed mb-6">
                  {selectedItem.caption}
                </p>
                <div className="p-3 bg-[#FFFFFF] border border-[#E8DFD1] text-xs text-[#24211D]/70 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#B69A62]">
                    <MapPin size={13} />
                    <span className="font-medium text-[#24211D]">{selectedItem.location}</span>
                  </div>
                  <p className="text-[11px]">Woven on wooden handlooms in Sualkuchi, Assam.</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DFD1] flex justify-between items-center">
                <Link
                  to={`/shop?category=${encodeURIComponent(selectedItem.category)}`}
                  onClick={() => setSelectedItem(null)}
                  className="text-xs uppercase tracking-widest text-[#B69A62] hover:underline flex items-center gap-1 font-medium"
                >
                  Shop This Aesthetic <ArrowRight size={13} />
                </Link>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-xs uppercase tracking-wider text-[#24211D]/60 hover:text-[#24211D]"
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
