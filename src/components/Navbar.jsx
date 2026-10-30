import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart,
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MegaMenu } from './MegaMenu';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { cartCount, wishlistCount, setIsWishlistOpen, setIsCartDrawerOpen, user } = useCart();
  const location = useLocation();

  // Scroll detection for sticky navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopHovered(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop", hasMegaMenu: true },
    { name: "Collections", path: "/collections" },
    { name: "Bridal", path: "/bridal" },
    { name: "Lookbook", path: "/lookbook" },
    { name: "Our Craft", path: "/our-craft" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFD1] py-3.5'
            : 'bg-[#FFFFFF] border-b border-[#E8DFD1]/60 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#24211D] p-2 hover:text-[#B69A62] transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* JUTHIKA BY MOMITA Brand Logo */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <Link to="/" className="inline-block group text-center lg:text-left">
                <span className="font-serif text-2xl sm:text-[26px] tracking-[0.24em] text-[#24211D] font-light uppercase block group-hover:text-[#B69A62] transition-colors leading-none">
                  JUTHIKA
                </span>
                <span className="text-[9.5px] uppercase tracking-[0.38em] text-[#B69A62] font-medium block mt-1">
                  BY MOMITA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                if (link.hasMegaMenu) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setIsShopHovered(true)}
                    >
                      <Link
                        to={link.path}
                        className={`text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-1 py-2 transition-colors ${
                          isActive
                            ? 'text-[#B69A62] font-semibold'
                            : 'text-[#24211D] hover:text-[#B69A62]'
                        }`}
                      >
                        {link.name}
                        <ChevronDown size={13} className={`transition-transform duration-200 ${isShopHovered ? 'rotate-180 text-[#B69A62]' : ''}`} />
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs uppercase tracking-[0.2em] font-medium py-2 transition-colors relative ${
                      isActive
                        ? 'text-[#B69A62] font-semibold'
                        : 'text-[#24211D] hover:text-[#B69A62]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons: Wishlist Heart, Search, Account, Shopping Bag */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Wishlist Heart Icon (Added seamlessly to the old navbar) */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="text-[#24211D] hover:text-[#B69A62] transition-colors p-1.5 relative flex items-center"
                aria-label={`Wishlist with ${wishlistCount} items`}
                title="View Saved Pieces"
              >
                <Heart size={19} className={wishlistCount > 0 ? "fill-[#B69A62] text-[#B69A62]" : ""} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B69A62] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-[#24211D] hover:text-[#B69A62] transition-colors p-1.5 relative"
                aria-label="Search collection"
                title="Search collection"
              >
                <Search size={19} />
              </button>

              {/* User Account Link */}
              <Link
                to="/login"
                className={`transition-colors p-1.5 flex items-center gap-1 ${
                  user ? 'text-[#B69A62]' : 'text-[#24211D] hover:text-[#B69A62]'
                }`}
                aria-label="Account"
                title={user ? `${user.name} (${user.role})` : 'Login'}
              >
                <User size={19} />
                {user && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B69A62]" />
                )}
              </Link>

              {/* Shopping Bag Icon with Cart Count */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="text-[#24211D] hover:text-[#B69A62] transition-colors p-1.5 relative flex items-center"
                aria-label={`Shopping bag with ${cartCount} items`}
                title="View Shopping Bag"
              >
                <ShoppingBag size={19} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B69A62] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>

        {/* Expandable Search Overlay */}
        {isSearchOpen && (
          <div className="border-t border-[#E8DFD1] bg-[#FFFFFF] px-6 py-4 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search size={18} className="text-[#B69A62] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Muga silk, bridal mekhela chador, eri shawls, paat drapes..."
                className="w-full bg-transparent border-b border-[#E8DFD1] text-sm text-[#24211D] placeholder-[#24211D]/40 pb-2 focus:outline-none focus:border-[#B69A62] font-light"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#24211D] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#B69A62] transition-colors flex-shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-[#24211D]/50 hover:text-[#24211D] flex-shrink-0"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}

        {/* MegaMenu Dropdown for Shop */}
        <MegaMenu
          isOpen={isShopHovered}
          onClose={() => setIsShopHovered(false)}
        />
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#24211D]/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FFFFFF] h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-r border-[#E8DFD1]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD1] mb-6">
                <div>
                  <span className="font-serif text-xl tracking-[0.22em] text-[#24211D] font-light block leading-none">
                    JUTHIKA
                  </span>
                  <span className="text-[9.5px] uppercase tracking-[0.34em] text-[#B69A62] font-medium block mt-1">
                    BY MOMITA
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#24211D] hover:text-[#B69A62]"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xs uppercase tracking-[0.25em] py-2 border-b border-[#E8DFD1]/60 text-[#24211D] hover:text-[#B69A62]"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8DFD1] space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="w-full py-2 px-4 border border-[#24211D] text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 hover:bg-white"
              >
                <Heart size={14} className={wishlistCount > 0 ? "fill-[#B69A62] text-[#B69A62]" : ""} />
                <span>Wishlist ({wishlistCount})</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartDrawerOpen(true);
                }}
                className="w-full py-2.5 px-4 bg-[#24211D] hover:bg-[#B69A62] text-white text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag size={14} />
                <span>Shopping Bag ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
