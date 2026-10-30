import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen 
  } = useCart();

  const [orderNote, setOrderNote] = useState('');
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  if (!isCartDrawerOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24211D]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Drawer Container (Crisp White Luxury Cart Styling) */}
      <div className="relative w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col z-10 animate-fade-in border-l border-[#E8DFD1]">
        
        {/* Header: CART with X button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DFD1] bg-[#FFFFFF]">
          <h2 className="font-serif text-lg tracking-[0.2em] text-[#24211D] uppercase font-light">
            CART
          </h2>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1 text-[#24211D]/60 hover:text-[#24211D] transition-colors"
            aria-label="Close Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white border border-[#E8DFD1] flex items-center justify-center text-[#B69A62]">
                <ShoppingBag size={22} />
              </div>
              <h3 className="font-serif text-lg text-[#24211D] mb-2 font-normal">
                Your Shopping Bag is Empty
              </h3>
              <p className="text-xs text-[#24211D]/70 font-light max-w-xs mx-auto leading-relaxed mb-6">
                Explore our handwoven Muga, Eri, and Paat silk masterworks from Sualkuchi.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/shop');
                }}
                className="px-5 py-2.5 bg-[#24211D] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#B69A62] transition-colors"
              >
                Shop Creations
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="flex gap-4 pb-6 border-b border-[#E8DFD1] last:border-0"
              >
                {/* Thumbnail Image */}
                <Link
                  to={`/product/${item.id}`}
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-24 h-32 flex-shrink-0 bg-[#FFFFFF] overflow-hidden"
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover object-top"
                  />
                </Link>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Uppercase Title */}
                    <Link
                      to={`/product/${item.id}`}
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="font-serif text-xs sm:text-sm text-[#24211D] uppercase tracking-wide hover:text-[#B69A62] transition-colors line-clamp-2 block leading-snug"
                    >
                      {item.name}
                    </Link>

                    {/* Price */}
                    <p className="text-xs font-sans text-[#24211D] mt-1.5 font-medium">
                      INR. {formatPrice(item.price)}
                    </p>

                    {/* Size */}
                    <p className="text-[11px] font-sans text-[#24211D]/70 mt-1 uppercase">
                      {item.selectedSize || 'S'}
                    </p>
                  </div>

                  {/* Quantity Stepper & REMOVE (Exact Layout from Screenshot 3) */}
                  <div className="flex items-center justify-between pt-3">
                    
                    {/* Stepper Box */}
                    <div className="flex items-center border border-[#E0E0E0] bg-white h-8">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        className="w-8 h-full flex items-center justify-center text-[#24211D] hover:bg-neutral-100 text-xs"
                        aria-label="Decrease quantity"
                      >
                        &minus;
                      </button>
                      <span className="w-8 text-center text-xs font-sans text-[#24211D] font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        className="w-8 h-full flex items-center justify-center text-[#24211D] hover:bg-neutral-100 text-xs"
                        aria-label="Increase quantity"
                      >
                        &#43;
                      </button>
                    </div>

                    {/* Underlined REMOVE Button */}
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-[11px] font-sans text-[#24211D]/80 hover:text-red-700 underline uppercase tracking-wider ml-4"
                    >
                      REMOVE
                    </button>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Order Note, Taxes, and Checkout Button) */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E8DFD1] bg-[#FFFFFF] space-y-4">
            
            {/* Add Order Note Toggle */}
            <div>
              <button
                onClick={() => setIsNoteOpen(!isNoteOpen)}
                className="text-xs text-[#24211D]/80 hover:text-[#24211D] underline font-sans"
              >
                {isNoteOpen ? 'Hide order note' : 'Add order note'}
              </button>
              {isNoteOpen && (
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Special instructions for tailoring drape, loom timeline or delivery date..."
                  className="w-full mt-2 p-2.5 text-xs bg-white border border-[#E8DFD1] focus:outline-none focus:border-[#24211D] font-sans"
                  rows={2}
                />
              )}
            </div>

            {/* Taxes and Shipping Note */}
            <p className="text-xs text-[#24211D]/75 font-sans leading-tight">
              Taxes and shipping calculated at checkout
            </p>

            {/* Dark Charcoal Brown Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#24211D] hover:bg-[#B69A62] text-white text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>CHECKOUT</span>
              <span>&bull;</span>
              <span>INR. {formatPrice(cartSubtotal)}</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
