import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Heart, Trash2, Share2, LogIn, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const WishlistDrawer = () => {
  const { 
    products, 
    wishlist, 
    toggleWishlist, 
    clearWishlist,
    isWishlistOpen, 
    setIsWishlistOpen,
    addToCart,
    setIsCartDrawerOpen,
    showNotification,
    user 
  } = useCart();

  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  if (!isWishlistOpen) return null;

  const wishlistProducts = (products || []).filter(p => wishlist.includes(p.id));

  // Formatted date matching screenshot (e.g., "26 Oct 2026")
  const todayFormatted = new Intl.DateTimeFormat('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }).format(new Date());

  const handleAddAllToCart = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach(product => {
      addToCart(product, product.sizes?.[0] || 'S', 1);
    });
    showNotification('All wishlist items added to shopping bag.');
    setIsWishlistOpen(false);
    setIsCartDrawerOpen(true);
  };

  const handleRemoveAll = () => {
    if (wishlistProducts.length === 0) return;
    if (clearWishlist) {
      clearWishlist();
    } else {
      wishlist.forEach(id => toggleWishlist(id));
    }
    showNotification('All items removed from wishlist.');
  };

  const handleShareWishlist = () => {
    if (wishlistProducts.length === 0) return;
    const shareUrl = window.location.origin + '/shop?wishlist=' + wishlist.join(',');
    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist | Juthika by Momita',
        text: 'Explore my curated Assamese luxury silk wishlist at Juthika by Momita.',
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showNotification('Wishlist link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-x-hidden">
      {/* Dark Translucent Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Centered Wishlist Modal Container (matching reference image) */}
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] shadow-2xl flex flex-col z-10 animate-fade-in border border-[#E8DFD1] max-h-[88vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#FFFFFF]">
          <div className="flex items-center gap-2.5">
            <Heart size={22} className="fill-[#24211D] text-[#24211D]" />
            <h2 className="font-serif text-2xl text-[#24211D] font-normal tracking-wide">
              My Wishlist
            </h2>
          </div>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 text-[#24211D] hover:opacity-60 transition-opacity"
            aria-label="Close Wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Login Reminder Banner */}
        <div className="px-6 py-3 border-b border-gray-100 bg-[#FFFFFF] flex items-center justify-between text-xs sm:text-[13px] text-gray-700">
          {user ? (
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
              <span>
                Signed in as <strong className="font-medium text-[#24211D]">{user.name}</strong> • Wishlist synchronized across your devices.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LogIn size={16} className="text-gray-700 flex-shrink-0" />
              <span>Please login to save your wishlist across devices.</span>
              <button 
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigate('/login');
                }}
                className="text-[#0084B4] hover:underline font-bold uppercase tracking-wider text-xs sm:text-[13px] ml-1 focus:outline-none"
              >
                LOGIN
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-[#24211D]">
                <Heart size={24} className="fill-[#24211D]" />
              </div>
              <h3 className="font-serif text-lg text-[#24211D] mb-1 font-normal">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs text-gray-500 font-light max-w-xs mx-auto leading-relaxed mb-5">
                Explore our luxury Assamese handloom silks and tap the heart icon to save your favorite pieces.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigate('/shop');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#24211D] hover:bg-[#B69A62] text-white text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Discover Creations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {wishlistProducts.map((product) => {
                const itemSize = product.sizes?.[0] || 'S';
                return (
                  <div 
                    key={product.id}
                    className="border border-gray-200 p-3 sm:p-3.5 bg-white flex flex-col justify-between group hover:border-[#B69A62]/60 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  >
                    {/* Top: Title & Date */}
                    <div>
                      <Link 
                        to={`/product/${product.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="block text-xs sm:text-[13px] font-medium text-[#24211D] hover:text-[#B69A62] leading-snug line-clamp-2"
                        title={product.name}
                      >
                        {product.name} - {itemSize}
                      </Link>
                      <p className="text-[11px] text-gray-500 font-light mt-1 mb-2.5">
                        {todayFormatted}
                      </p>
                    </div>

                    {/* Middle: Product Thumbnail Image */}
                    <Link 
                      to={`/product/${product.id}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="aspect-[3/4] w-full block overflow-hidden bg-[#FFFFFF] relative"
                    >
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </Link>

                    {/* Bottom: Trash icon on the right */}
                    <div className="pt-2.5 flex items-center justify-end">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        title="Remove from wishlist"
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Action Footer Bar */}
        <div className="border-t border-gray-200 px-6 py-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 select-none">
          {/* Left Buttons: ADD ALL TO CART & REMOVE ALL FROM WISHLIST */}
          <div className="flex items-center gap-5 sm:gap-7 w-full sm:w-auto justify-start">
            <button
              onClick={handleAddAllToCart}
              disabled={wishlistProducts.length === 0}
              className="text-xs sm:text-[12px] font-bold uppercase tracking-wider text-[#24211D] hover:text-[#B69A62] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ADD ALL TO CART
            </button>
            <button
              onClick={handleRemoveAll}
              disabled={wishlistProducts.length === 0}
              className="text-xs sm:text-[12px] font-bold uppercase tracking-wider text-[#24211D] hover:text-red-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              REMOVE ALL FROM WISHLIST
            </button>
          </div>

          {/* Right Button: SHARE WISHLIST */}
          <div className="w-full sm:w-auto flex justify-end">
            <button
              onClick={handleShareWishlist}
              disabled={wishlistProducts.length === 0}
              className="text-xs sm:text-[12px] font-bold uppercase tracking-wider text-[#24211D] hover:text-[#B69A62] flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <Share2 size={16} />
              <span>{copied ? 'LINK COPIED' : 'SHARE WISHLIST'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
