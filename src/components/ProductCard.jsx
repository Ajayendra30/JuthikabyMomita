import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setIsCartDrawerOpen 
  } = useCart();

  const [selectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );
  const [isAdded, setIsAdded] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const cardImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartDrawerOpen(true);
    }, 400);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleMouseMove = (e) => {
    if (cardImages.length <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(0.999, x / rect.width));
    const newIndex = Math.floor(fraction * cardImages.length);
    if (newIndex !== hoverIndex) {
      setHoverIndex(newIndex);
    }
  };

  const handleTouchMove = (e) => {
    if (cardImages.length <= 1) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect) return;
    const x = touch.clientX - rect.left;
    const fraction = Math.max(0, Math.min(0.999, x / rect.width));
    const newIndex = Math.floor(fraction * cardImages.length);
    if (newIndex !== hoverIndex) {
      setHoverIndex(newIndex);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverIndex(0);
  };

  return (
    <div className="group flex flex-col bg-[#FFFFFF] transition-all duration-300">
      
      {/* Product Image Container (Shows ALL product angles on mouse move / touch) */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-[#FFFFFF] select-none cursor-pointer"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Product Image Link navigating to Product Details */}
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          <img
            src={cardImages[hoverIndex] || cardImages[0]}
            alt={product.name}
            className="w-full h-full object-cover object-top filter brightness-[0.98] transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Preload all product angles on hover for zero-latency instant transitions */}
        {isHovered && cardImages.length > 1 && (
          <div className="hidden">
            {cardImages.map((imgUrl, i) => (
              <img key={i} src={imgUrl} alt="" />
            ))}
          </div>
        )}

        {/* Top-Left: Circular Wishlist Heart Icon */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3.5 left-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#24211D] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 group/heart cursor-pointer"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "Saved in wishlist" : "Save to wishlist"}
        >
          <Heart 
            size={16} 
            className={`transition-colors duration-200 ${
              isWishlisted 
                ? 'fill-[#B69A62] text-[#B69A62]' 
                : 'text-[#24211D] group-hover/heart:text-[#B69A62]'
            }`} 
          />
        </button>

        {/* Bottom-Right: Cart Symbol Button (shows on image/card hover) */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-white hover:bg-[#24211D] text-[#24211D] hover:text-white flex items-center justify-center shadow-md hover:scale-105 cursor-pointer transition-all duration-300 ease-out ${
            isAdded
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'
          }`}
          aria-label="Add to cart"
          title="Add to shopping bag"
        >
          {isAdded ? (
            <Check size={16} className="text-emerald-600" />
          ) : (
            <ShoppingCart size={15} />
          )}
        </button>

      </div>

      {/* Product Details Section */}
      <div className="pt-3 pb-2 flex flex-col text-center">
        
        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="group/title block">
          <h3 className="font-serif text-xs sm:text-[13px] text-[#24211D] font-normal leading-snug line-clamp-1 uppercase tracking-[0.14em] group-hover/title:text-[#B69A62] transition-colors mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-2">
          <span className="font-sans text-xs sm:text-[13px] font-normal text-[#24211D] tracking-wide">
            INR. {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-[#24211D]/40 line-through font-sans">
              INR. {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

      </div>

    </div>
  );
};
