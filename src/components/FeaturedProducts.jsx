import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';

export const FeaturedProducts = () => {
  const { products } = useCart();
  const catalog = products || PRODUCTS;
  const [activeFilter, setActiveFilter] = useState('All');

  const filterTabs = ['All', 'Muga Silk', 'Paat Silk', 'Eri Silk', 'Bridal Couture', 'Occasion Wear'];

  const filteredProducts = activeFilter === 'All'
    ? catalog.slice(0, 8)
    : catalog.filter(p => p.fabric === activeFilter || p.category === activeFilter).slice(0, 8);

  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Title and Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E8DFD1] pb-6">
          <div>
            {/* <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-2">
              <Sparkles size={14} />
              <span>Limited Masterpiece Weaves</span>
            </div> */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#24211D] font-light tracking-wide">
              Curated in Silk
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`text-xs uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 ${
                  activeFilter === tab
                    ? 'bg-[#24211D] text-[#FFFFFF]'
                    : 'text-[#24211D]/70 hover:text-[#24211D] bg-[#FFFFFF] border border-[#E8DFD1]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid (4 columns on lg, 2 on md, 1 on sm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center mt-16">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFFFFF] border border-[#24211D] text-[#24211D] hover:bg-[#24211D] hover:text-[#FFFFFF] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 shadow-sm"
          >
            <span>View All Curated Weaves</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
};
