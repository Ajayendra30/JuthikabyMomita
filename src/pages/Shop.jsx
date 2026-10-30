import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, X, SlidersHorizontal, Check } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const Shop = () => {
  const { products } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState(searchParam || '');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState('all'); // 'all' | 'under-50k' | '50k-80k' | 'above-80k'

  // Grid column layout state: '2', '3', or '4' (Matches the 3-button switcher in screenshot)
  const [gridMode, setGridMode] = useState('3');

  // Sync state if URL search params change
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam !== null) {
      setSearchTerm(searchParam);
    }
  }, [categoryParam, searchParam]);

  const fabrics = ['All', 'Muga Silk', 'Eri Silk', 'Paat Silk'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const matchesCat = 
          product.category === selectedCategory || 
          product.secondaryCategory === selectedCategory;
        if (!matchesCat) return false;
      }

      // Fabric filter
      if (selectedFabric !== 'All') {
        if (product.fabric !== selectedFabric) return false;
      }

      // Price range filter
      if (priceRange === 'under-50k' && product.price >= 50000) return false;
      if (priceRange === '50k-80k' && (product.price < 50000 || product.price > 80000)) return false;
      if (priceRange === 'above-80k' && product.price <= 80000) return false;

      // Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(term) ||
          product.fabric.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          (product.description && product.description.toLowerCase().includes(term));
        if (!matchesSearch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'loom-days') return b.loomDays - a.loomDays;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedFabric, priceRange, sortBy, searchTerm]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedFabric('All');
    setPriceRange('all');
    setSortBy('featured');
    setSearchTerm('');
    setSearchParams({});
  };

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) + 
    (selectedFabric !== 'All' ? 1 : 0) + 
    (priceRange !== 'all' ? 1 : 0) +
    (searchTerm ? 1 : 0);

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* 1. Page Title Header: "FASHION" (Exact Tarun Tahiliani Styling) */}
      <div className="bg-[#FFFFFF] pt-12 pb-8 text-center border-b border-[#F0F0F0]/60">
        <h1 className="font-sans text-2xl sm:text-3xl lg:text-[32px] text-[#24211D] font-light tracking-[0.32em] uppercase">
          FASHION
        </h1>
        {selectedCategory !== 'All' && (
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#B69A62] mt-2 font-medium">
            {selectedCategory}
          </p>
        )}
      </div>

      {/* 2. Control Toolbar: Grid Switchers, Sort By & Filter (Exact Tarun Tahiliani Bar) */}
      <div className="border-t border-b border-[#E8DFD1]/80 bg-[#FFFFFF] sticky top-[61px] sm:top-[65px] z-30 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          
          {/* Left: Grid View Switchers (2, 3, or 4 columns) */}
          <div className="flex items-center space-x-2">
            
            {/* 2-Column Grid Button */}
            <button
              onClick={() => setGridMode('2')}
              className={`p-1.5 transition-colors ${
                gridMode === '2' ? 'text-[#24211D]' : 'text-[#BFBFBF] hover:text-[#24211D]'
              }`}
              title="2 Columns View"
              aria-label="2 Columns View"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                <rect x="1" y="1" width="6" height="14" rx="0.5" />
                <rect x="9" y="1" width="6" height="14" rx="0.5" />
              </svg>
            </button>

            {/* 3-Column Grid Button (Default in screenshot) */}
            <button
              onClick={() => setGridMode('3')}
              className={`p-1.5 transition-colors ${
                gridMode === '3' ? 'text-[#24211D]' : 'text-[#BFBFBF] hover:text-[#24211D]'
              }`}
              title="3 Columns View (Standard)"
              aria-label="3 Columns View"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                <rect x="1" y="1" width="3.5" height="14" rx="0.5" />
                <rect x="6.25" y="1" width="3.5" height="14" rx="0.5" />
                <rect x="11.5" y="1" width="3.5" height="14" rx="0.5" />
              </svg>
            </button>

            {/* 4-Column Grid Button */}
            <button
              onClick={() => setGridMode('4')}
              className={`p-1.5 transition-colors ${
                gridMode === '4' ? 'text-[#24211D]' : 'text-[#BFBFBF] hover:text-[#24211D]'
              }`}
              title="4 Columns View"
              aria-label="4 Columns View"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                <rect x="0.5" y="1" width="2.8" height="14" rx="0.5" />
                <rect x="4.4" y="1" width="2.8" height="14" rx="0.5" />
                <rect x="8.4" y="1" width="2.8" height="14" rx="0.5" />
                <rect x="12.4" y="1" width="2.8" height="14" rx="0.5" />
              </svg>
            </button>

            <span className="hidden sm:inline-block text-[11px] text-[#24211D]/40 pl-3 font-sans tracking-wider">
              {filteredProducts.length} CREATIONS
            </span>
          </div>

          {/* Right: "SORT BY ⌵" | "FILTER" (Exact Tarun Tahiliani styling) */}
          <div className="flex items-center">
            
            {/* Sort Dropdown */}
            <div className="relative flex items-center pr-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#24211D] font-medium mr-1.5">
                SORT BY
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent pr-5 text-[11px] uppercase tracking-[0.18em] text-[#24211D]/75 focus:outline-none cursor-pointer font-sans"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="loom-days">Artisan Loom Time</option>
              </select>
              <ChevronDown size={13} className="absolute right-4 text-[#24211D]/60 pointer-events-none" />
            </div>

            {/* Hairline Divider */}
            <div className="h-5 w-[1px] bg-[#E8DFD1]" />

            {/* FILTER Trigger Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="pl-5 py-1 text-[11px] uppercase tracking-[0.22em] text-[#24211D] font-medium hover:text-[#B69A62] transition-colors flex items-center gap-1.5"
            >
              <span>FILTER</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#24211D] text-white text-[9px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* 3. Active Filter Badges Bar (If any filters applied) */}
      {activeFiltersCount > 0 && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-[#F0F0F0] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] uppercase tracking-wider text-[#24211D]/50 mr-1">
            Active:
          </span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E8DFD1] text-[#24211D] text-[11px]">
              Category: {selectedCategory}
              <button onClick={() => handleCategoryChange('All')} className="hover:text-red-700">
                <X size={12} />
              </button>
            </span>
          )}
          {selectedFabric !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E8DFD1] text-[#24211D] text-[11px]">
              Fabric: {selectedFabric}
              <button onClick={() => setSelectedFabric('All')} className="hover:text-red-700">
                <X size={12} />
              </button>
            </span>
          )}
          {priceRange !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E8DFD1] text-[#24211D] text-[11px]">
              Price: {priceRange === 'under-50k' ? 'Under INR 50,000' : priceRange === '50k-80k' ? 'INR 50,000 - INR 80,000' : 'Above INR 80,000'}
              <button onClick={() => setPriceRange('all')} className="hover:text-red-700">
                <X size={12} />
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E8DFD1] text-[#24211D] text-[11px]">
              Keyword: "{searchTerm}"
              <button onClick={() => setSearchTerm('')} className="hover:text-red-700">
                <X size={12} />
              </button>
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-[11px] uppercase tracking-wider text-[#B69A62] hover:underline font-medium ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* 4. Product Grid Section (Responsive 2, 3, or 4 columns matching user's layout) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-[#24211D] mb-2 font-light">
              No silk creations found
            </p>
            <p className="text-xs text-[#24211D]/60 max-w-sm mx-auto mb-6">
              We couldn't find any creations matching your selected filters. Try clearing your search parameters.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 bg-[#24211D] hover:bg-[#B69A62] text-white text-xs uppercase tracking-widest font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid ${
              gridMode === '2'
                ? 'grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12'
                : gridMode === '4'
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-12'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* 5. Luxury Slide-over Filter Panel */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#24211D]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col z-10 animate-fade-in border-l border-[#E8DFD1]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DFD1] bg-[#FFFFFF]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#B69A62]" />
                <h2 className="font-serif text-lg text-[#24211D] font-medium tracking-wide">
                  Filter Collections
                </h2>
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1.5 text-[#24211D]/60 hover:text-[#24211D]"
                aria-label="Close Filter"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Options Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Category Filter */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#B69A62] font-semibold mb-3">
                  Silks By Category
                </h3>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full flex items-center justify-between py-2 px-3 text-xs transition-colors text-left ${
                        selectedCategory === cat
                          ? 'bg-[#24211D] text-white font-medium'
                          : 'text-[#24211D]/80 hover:bg-[#FFFFFF]'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <Check size={13} className="text-[#B69A62]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Silk Fabric Filter */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#B69A62] font-semibold mb-3">
                  Authentic Silk Variety
                </h3>
                <div className="space-y-1.5">
                  {fabrics.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFabric(f)}
                      className={`w-full flex items-center justify-between py-2 px-3 text-xs transition-colors text-left ${
                        selectedFabric === f
                          ? 'bg-[#24211D] text-white font-medium'
                          : 'text-[#24211D]/80 hover:bg-[#FFFFFF]'
                      }`}
                    >
                      <span>{f}</span>
                      {selectedFabric === f && <Check size={13} className="text-[#B69A62]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#B69A62] font-semibold mb-3">
                  Price Valuation (INR)
                </h3>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Price Ranges' },
                    { id: 'under-50k', label: 'Under INR 50,000' },
                    { id: '50k-80k', label: 'INR 50,000 - INR 80,000' },
                    { id: 'above-80k', label: 'Above INR 80,000 (Haute Bridal)' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPriceRange(p.id)}
                      className={`w-full flex items-center justify-between py-2 px-3 text-xs transition-colors text-left ${
                        priceRange === p.id
                          ? 'bg-[#24211D] text-white font-medium'
                          : 'text-[#24211D]/80 hover:bg-[#FFFFFF]'
                      }`}
                    >
                      <span>{p.label}</span>
                      {priceRange === p.id && <Check size={13} className="text-[#B69A62]" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Controls */}
            <div className="p-6 border-t border-[#E8DFD1] bg-[#FFFFFF] flex items-center gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-2.5 border border-[#24211D] text-[#24211D] hover:bg-white text-xs uppercase tracking-widest transition-colors font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-2.5 bg-[#24211D] hover:bg-[#B69A62] text-white text-xs uppercase tracking-widest transition-colors font-medium"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
