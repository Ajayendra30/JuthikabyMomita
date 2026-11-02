import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, X, SlidersHorizontal, Check } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const Shop = () => {
  const { products } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // Query parameters
  const categoryParam = searchParams.get('category');
  const departmentParam = searchParams.get('department');
  const collectionParam = searchParams.get('collection');
  const sortParam = searchParams.get('sort');
  const searchParam = searchParams.get('search');

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [selectedDepartment, setSelectedDepartment] = useState(departmentParam || 'all');
  const [selectedCollection, setSelectedCollection] = useState(collectionParam || 'all');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [sortBy, setSortBy] = useState(sortParam || 'featured');
  const [searchTerm, setSearchTerm] = useState(searchParam || '');
  const [priceRange, setPriceRange] = useState('all'); // 'all' | 'under-50k' | '50k-80k' | 'above-80k'
  
  // UI States
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [gridMode, setGridMode] = useState('3'); // '2', '3', or '4'

  // Sync state if URL search params change
  useEffect(() => {
    setSelectedCategory(categoryParam || 'All');
    setSelectedDepartment(departmentParam || 'all');
    setSelectedCollection(collectionParam || 'all');
    setSortBy(sortParam || 'featured');
    if (searchParam !== null) {
      setSearchTerm(searchParam);
    }
  }, [categoryParam, departmentParam, collectionParam, sortParam, searchParam]);

  const fabrics = ['All', 'Muga Silk', 'Eri Silk', 'Paat Silk'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Department filter
      if (selectedDepartment && selectedDepartment !== 'all') {
        const prodDept = (product.department || 'women').toLowerCase();
        if (prodDept !== selectedDepartment.toLowerCase()) {
          return false;
        }
      }

      // 2. Collection filter
      if (selectedCollection && selectedCollection !== 'all') {
        const prodCol = (product.collection || '').toLowerCase();
        if (prodCol !== selectedCollection.toLowerCase()) {
          return false;
        }
      }

      // 3. Category filter
      if (selectedCategory && selectedCategory !== 'All') {
        const catLower = selectedCategory.toLowerCase();
        const pCat = (product.category || '').toLowerCase();
        const pSecCat = (product.secondaryCategory || '').toLowerCase();
        const pName = (product.name || '').toLowerCase();
        const pDesc = (product.description || '').toLowerCase();

        if (catLower === 'all womenswear') {
          const prodDept = (product.department || 'women').toLowerCase();
          if (prodDept !== 'women') return false;
        } else if (catLower === 'all menswear') {
          const prodDept = (product.department || '').toLowerCase();
          if (prodDept !== 'men') return false;
        } else {
          const matchesDirect = 
            pCat === catLower ||
            pSecCat === catLower ||
            pCat.includes(catLower) ||
            pName.includes(catLower) ||
            pDesc.includes(catLower);

          // Luxury apparel matching heuristics
          const isLehenga = catLower.includes('lehenga') && (pCat.includes('bridal') || pName.includes('bridal') || pCat.includes('lehenga'));
          const isSaree = (catLower === 'sarees' || catLower === 'concept sarees') && (pCat.includes('saree') || pName.includes('saree') || pName.includes('mekhela') || pName.includes('chador'));
          const isCape = catLower.includes('cape') && (pCat.includes('cape') || pName.includes('cape') || pName.includes('wrap') || pName.includes('shawl'));
          const isGown = catLower.includes('gown') && (pCat.includes('gown') || pName.includes('riha') || pCat.includes('bridal'));
          const isSuit = catLower.includes('suit') && (pCat.includes('suit') || pName.includes('tunic') || pName.includes('trousers'));
          const isKurta = catLower.includes('kurta') && (pCat.includes('kurta') || pName.includes('kurta'));
          const isSherwani = catLower.includes('sherwani') && (pCat.includes('sherwani') || pName.includes('sherwani'));
          const isWaistcoat = catLower.includes('waistcoat') && (pCat.includes('waistcoat') || pName.includes('waistcoat'));
          const isBandhgala = catLower.includes('bandhgala') && (pCat.includes('bandhgala') || pName.includes('bandhgala'));
          const isBag = catLower.includes('bag') && (pCat.includes('bag') || pName.includes('potli') || pName.includes('bag'));
          const isJewellery = catLower.includes('jewellery') && (pCat.includes('jewellery') || pName.includes('choker') || pName.includes('filigree'));
          const isBelt = catLower.includes('belt') && (pCat.includes('belt') || pName.includes('belt'));
          const isBook = catLower.includes('book') && (pCat.includes('book') || pName.includes('book'));

          if (!matchesDirect && !isLehenga && !isSaree && !isCape && !isGown && !isSuit && 
              !isKurta && !isSherwani && !isWaistcoat && !isBandhgala && !isBag && !isJewellery && !isBelt && !isBook) {
            return false;
          }
        }
      }

      // 4. Fabric filter
      if (selectedFabric !== 'All') {
        if (product.fabric !== selectedFabric) return false;
      }

      // 5. Price range filter
      if (priceRange === 'under-50k' && product.price >= 50000) return false;
      if (priceRange === '50k-80k' && (product.price < 50000 || product.price > 80000)) return false;
      if (priceRange === 'above-80k' && product.price <= 80000) return false;

      // 6. Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(term) ||
          product.fabric.toLowerCase().includes(term) ||
          (product.category && product.category.toLowerCase().includes(term)) ||
          (product.department && product.department.toLowerCase().includes(term)) ||
          (product.collection && product.collection.toLowerCase().includes(term)) ||
          (product.description && product.description.toLowerCase().includes(term));
        if (!matchesSearch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.createdAt ? new Date(b.createdAt).getTime() : 1) - (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'loom-days') return b.loomDays - a.loomDays;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedDepartment, selectedCollection, selectedCategory, selectedFabric, priceRange, sortBy, searchTerm]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedDepartment('all');
    setSelectedCollection('all');
    setSelectedFabric('All');
    setPriceRange('all');
    setSortBy('featured');
    setSearchTerm('');
    setSearchParams({});
  };

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) + 
    (selectedDepartment !== 'all' ? 1 : 0) +
    (selectedCollection !== 'all' ? 1 : 0) +
    (selectedFabric !== 'All' ? 1 : 0) + 
    (priceRange !== 'all' ? 1 : 0) +
    (searchTerm ? 1 : 0);

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* 1. Page Title Header: "FASHION" */}
      <div className="bg-[#FFFFFF] pt-10 sm:pt-14 pb-6 sm:pb-8 text-center border-b border-[#F0F0F0]/60">
        <h1 className="font-sans text-2xl sm:text-3xl lg:text-[32px] text-[#111111] font-light tracking-[0.32em] uppercase">
          FASHION
        </h1>
        {selectedCategory !== 'All' && (
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#B69A62] mt-2 font-medium">
            {selectedCategory}
          </p>
        )}
        {selectedCollection !== 'all' && (
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#B69A62] mt-2 font-medium">
            Collection: {selectedCollection}
          </p>
        )}
        {selectedDepartment !== 'all' && selectedCategory === 'All' && selectedCollection === 'all' && (
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#B69A62] mt-2 font-medium">
            {selectedDepartment.toUpperCase()}
          </p>
        )}
      </div>

      {/* 2. Control Toolbar: Grid Switchers, Sort By & Filter */}
      <div className="border-t border-b border-[#E5E5E5]/80 bg-[#FFFFFF] sticky top-[61px] sm:top-[65px] z-30 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          
          {/* Left: Grid View Switchers (2, 3, or 4 columns) */}
          <div className="flex items-center space-x-2">
            
            {/* 2-Column Grid Button */}
            <button
              onClick={() => setGridMode('2')}
              className={`p-1.5 transition-colors ${
                gridMode === '2' ? 'text-[#111111]' : 'text-[#BFBFBF] hover:text-[#111111]'
              }`}
              title="2 Columns View"
              aria-label="2 Columns View"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                <rect x="1" y="1" width="6" height="14" rx="0.5" />
                <rect x="9" y="1" width="6" height="14" rx="0.5" />
              </svg>
            </button>

            {/* 3-Column Grid Button (Default standard) */}
            <button
              onClick={() => setGridMode('3')}
              className={`p-1.5 transition-colors ${
                gridMode === '3' ? 'text-[#111111]' : 'text-[#BFBFBF] hover:text-[#111111]'
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
                gridMode === '4' ? 'text-[#111111]' : 'text-[#BFBFBF] hover:text-[#111111]'
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

            <span className="hidden sm:inline-block text-[11px] text-[#111111]/50 pl-3 font-sans tracking-wider">
              {filteredProducts.length} CREATIONS
            </span>
          </div>

          {/* Right: "SORT BY ⌵" | "FILTER" */}
          <div className="flex items-center">
            
            {/* Sort Dropdown */}
            <div className="relative flex items-center pr-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#111111] font-medium mr-1.5">
                SORT BY
              </span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  searchParams.set('sort', e.target.value);
                  setSearchParams(searchParams);
                }}
                className="appearance-none bg-transparent pr-5 text-[11px] uppercase tracking-[0.18em] text-[#111111]/75 focus:outline-none cursor-pointer font-sans"
              >
                <option value="featured">Featured</option>
                <option value="newest">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="loom-days">Artisan Loom Time</option>
              </select>
              <ChevronDown size={13} className="absolute right-4 text-[#111111]/60 pointer-events-none" />
            </div>

            {/* Hairline Divider */}
            <div className="h-5 w-[1px] bg-[#E5E5E5]" />

            {/* FILTER Trigger Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="pl-5 py-1 text-[11px] uppercase tracking-[0.22em] text-[#111111] font-medium hover:text-black hover:opacity-70 transition-colors flex items-center gap-1.5"
            >
              <span>FILTER</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#111111] text-white text-[9px] flex items-center justify-center font-bold">
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
          <span className="text-[10px] uppercase tracking-wider text-[#111111]/50 mr-1">
            Active Filters:
          </span>
          {selectedDepartment !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E5E5] text-[#111111] text-[11px]">
              Department: {selectedDepartment.toUpperCase()}
              <button 
                onClick={() => {
                  setSelectedDepartment('all');
                  searchParams.delete('department');
                  setSearchParams(searchParams);
                }} 
                className="hover:text-red-700"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E5E5] text-[#111111] text-[11px]">
              Category: {selectedCategory}
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                }} 
                className="hover:text-red-700"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {selectedCollection !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E5E5] text-[#111111] text-[11px]">
              Collection: {selectedCollection}
              <button 
                onClick={() => {
                  setSelectedCollection('all');
                  searchParams.delete('collection');
                  setSearchParams(searchParams);
                }} 
                className="hover:text-red-700"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {selectedFabric !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E5E5] text-[#111111] text-[11px]">
              Fabric: {selectedFabric}
              <button onClick={() => setSelectedFabric('All')} className="hover:text-red-700">
                <X size={12} />
              </button>
            </span>
          )}
          {priceRange !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E5E5] text-[#111111] text-[11px]">
              Price: {priceRange === 'under-50k' ? 'Under INR 50,000' : priceRange === '50k-80k' ? 'INR 50,000 - INR 80,000' : 'Above INR 80,000'}
              <button onClick={() => setPriceRange('all')} className="hover:text-red-700">
                <X size={12} />
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E5E5] text-[#111111] text-[11px]">
              Search: "{searchTerm}"
              <button 
                onClick={() => {
                  setSearchTerm('');
                  searchParams.delete('search');
                  setSearchParams(searchParams);
                }} 
                className="hover:text-red-700"
              >
                <X size={12} />
              </button>
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-[11px] uppercase tracking-wider text-[#111111] hover:underline font-medium ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* 4. Product Grid Section - Displays Creations Directly */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-[#111111] mb-2 font-light">
              No silk creations found
            </p>
            <p className="text-xs text-[#111111]/60 max-w-sm mx-auto mb-6">
              We couldn't find any creations matching your selected category. Try resetting your filters to explore our full atelier.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-widest font-medium transition-colors"
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
            className="fixed inset-0 bg-[#111111]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col z-10 animate-fade-in border-l border-[#E5E5E5]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5] bg-[#FFFFFF]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#111111]" />
                <h2 className="font-serif text-lg text-[#111111] font-medium tracking-wide">
                  Filter Atelier Creations
                </h2>
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1.5 text-[#111111]/60 hover:text-[#111111]"
                aria-label="Close Filter"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Options Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Department Filter */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#111111] font-semibold mb-3">
                  Department
                </h3>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Departments' },
                    { id: 'women', label: 'Womenswear' },
                    { id: 'men', label: 'Menswear' },
                    { id: 'accessories', label: 'Accessories & Fine Artefacts' },
                    { id: 'trending', label: 'Trending & Publications' }
                  ].map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => {
                        setSelectedDepartment(dept.id);
                        if (dept.id === 'all') {
                          searchParams.delete('department');
                        } else {
                          searchParams.set('department', dept.id);
                        }
                        setSearchParams(searchParams);
                      }}
                      className={`w-full flex items-center justify-between py-2 px-3 text-xs transition-colors text-left ${
                        selectedDepartment === dept.id
                          ? 'bg-[#111111] text-white font-medium'
                          : 'text-[#111111]/80 hover:bg-[#F9F9F9]'
                      }`}
                    >
                      <span>{dept.label}</span>
                      {selectedDepartment === dept.id && <Check size={13} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Silk Fabric Filter */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#111111] font-semibold mb-3">
                  Authentic Silk Variety
                </h3>
                <div className="space-y-1.5">
                  {fabrics.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFabric(f)}
                      className={`w-full flex items-center justify-between py-2 px-3 text-xs transition-colors text-left ${
                        selectedFabric === f
                          ? 'bg-[#111111] text-white font-medium'
                          : 'text-[#111111]/80 hover:bg-[#F9F9F9]'
                      }`}
                    >
                      <span>{f}</span>
                      {selectedFabric === f && <Check size={13} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#111111] font-semibold mb-3">
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
                          ? 'bg-[#111111] text-white font-medium'
                          : 'text-[#111111]/80 hover:bg-[#F9F9F9]'
                      }`}
                    >
                      <span>{p.label}</span>
                      {priceRange === p.id && <Check size={13} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Controls */}
            <div className="p-6 border-t border-[#E5E5E5] bg-[#FFFFFF] flex items-center gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-2.5 border border-[#111111] text-[#111111] hover:bg-neutral-50 text-xs uppercase tracking-widest transition-colors font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-2.5 bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-widest transition-colors font-medium"
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
