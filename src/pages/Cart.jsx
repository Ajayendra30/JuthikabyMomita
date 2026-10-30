import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartSubtotal, addOrder } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Checkout form fields
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'VIP Concierge Wire / Card Payment Link'
  });

  // Shipping is complimentary for luxury couture
  const shippingFee = 0;
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const totalAmount = cartSubtotal - discountAmount + shippingFee;

  const formatPrice = (price) => {
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price || 0);
    return `INR ${formatted}`;
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'HERITAGE10') {
      setDiscountPercent(10);
      setCouponMessage({ type: 'success', text: 'Coupon Coupon Applied: 10% Atelier Courtesy' });
    } else if (couponCode.trim().toUpperCase() === 'ROYALMUGA') {
      setDiscountPercent(15);
      setCouponMessage({ type: 'success', text: 'Royal Patron Coupon Applied: 15% Courtesy' });
    } else {
      setCouponMessage({ type: 'error', text: 'Invalid code. Try "HERITAGE10"' });
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrderNo = 'AX-ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNo);
    addOrder({
      id: newOrderNo,
      customerName: customerInfo.name || 'Valued Patron',
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      items: [...cart],
      total: totalAmount,
      paymentMethod: customerInfo.paymentMethod
    });
    setOrderComplete(true);
    clearCart();
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-2">
            <ShoppingBag size={14} />
            <span>Curated Silk Selections</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#24211D] font-light tracking-wide">
            Your Shopping Bag
          </h1>
        </div>

        {cart.length === 0 && !orderComplete ? (
          /* Empty Bag State */
          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#B69A62]">
              <ShoppingBag size={28} />
            </div>
            <h3 className="font-serif text-2xl text-[#24211D] mb-2 font-normal">
              Your Bag is Currently Empty
            </h3>
            <p className="text-xs sm:text-sm text-[#24211D]/70 font-light mb-8 leading-relaxed">
              Explore our curated handloom collections of pure wild Muga, cruelty-free Eri, and royal Paat silks.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md"
            >
              <span>Discover Collections</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : orderComplete ? (
          /* Order Confirmation / Success State */
          <div className="bg-[#FFFFFF] border border-[#B69A62]/40 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xl">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#B69A62]/15 flex items-center justify-center text-[#B69A62]">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
              Atelier Order Confirmed
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light mb-4">
              Thank You for Supporting Handloom
            </h2>
            <p className="text-xs sm:text-sm text-[#24211D]/80 font-light leading-relaxed max-w-md mx-auto mb-6">
              Your order reference is <span className="font-mono font-bold text-[#B69A62]">{orderNumber}</span>. 
              Our master weaver guild has been notified, and your silk pieces will be packed in our custom cedarwood heirloom chest.
            </p>

            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-4 text-xs text-[#24211D]/70 max-w-md mx-auto mb-8 text-left space-y-1">
              <p>&bull; Insured dispatch within 3–5 business days</p>
              <p>&bull; Includes GI Tag Certificate of Authenticity</p>
              <p>&bull; Tracking sent via SMS & VIP Concierge WhatsApp</p>
            </div>

            <div className="text-[11px] text-[#24211D]/50 italic mb-8">
              * Frontend demonstration only. No real payment or database was processed.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                onClick={() => setOrderComplete(false)}
                className="px-8 py-3.5 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                Continue Browsing Silks
              </Link>
            </div>
          </div>
        ) : (
          /* Active Cart Grid (Items + Summary) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 sm:p-8 shadow-sm">
                
                <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD1] mb-6">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#24211D]">
                    Garments Selected ({cart.length})
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#24211D]/50 hover:text-red-600 transition-colors"
                  >
                    Clear All Items
                  </button>
                </div>

                <div className="divide-y divide-[#E8DFD1]">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                      
                      {/* Product Thumbnail & Info */}
                      <div className="flex gap-4 items-center">
                        <Link to={`/product/${item.id}`} className="w-20 h-24 flex-shrink-0 bg-[#FFFFFF] overflow-hidden border border-[#E8DFD1]">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#B69A62] font-semibold block">
                            {item.fabric}
                          </span>
                          <Link to={`/product/${item.id}`}>
                            <h4 className="font-serif text-lg text-[#24211D] hover:text-[#B69A62] transition-colors leading-snug">
                              {item.name}
                            </h4>
                          </Link>
                          <p className="text-xs text-[#24211D]/60 mt-0.5">
                            Fit / Size: <span className="font-medium text-[#24211D]">{item.selectedSize}</span>
                          </p>
                          <span className="text-sm font-medium text-[#24211D] mt-1 block">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Remove Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center border border-[#E8DFD1] bg-[#FFFFFF]">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                            className="px-2.5 py-1 text-xs hover:bg-[#E8DFD1]/50 text-[#24211D]"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-medium text-[#24211D]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                            className="px-2.5 py-1 text-xs hover:bg-[#E8DFD1]/50 text-[#24211D]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#24211D] min-w-[80px] text-right">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-[#24211D]/40 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#E8DFD1] flex justify-between items-center text-xs">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-1.5 text-[#24211D] hover:text-[#B69A62] font-medium uppercase tracking-wider"
                  >
                    <ArrowLeft size={13} />
                    <span>Continue Exploring Collections</span>
                  </Link>
                  <span className="text-[#24211D]/60">
                    Complimentary Sualkuchi Silk Pouch Included
                  </span>
                </div>

              </div>
            </div>

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 sm:p-8 shadow-sm">
                <h3 className="font-serif text-xl text-[#24211D] pb-4 border-b border-[#E8DFD1] mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs pb-6 border-b border-[#E8DFD1]">
                  <div className="flex justify-between text-[#24211D]/80">
                    <span>Handloom Subtotal</span>
                    <span className="font-medium text-[#24211D]">{formatPrice(cartSubtotal)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Patron Privilege ({discountPercent}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  {/* <div className="flex justify-between text-[#24211D]/80">
                    <span>White-Glove Insured Delivery</span>
                    <span className="text-[#B69A62] uppercase tracking-wider font-medium">Complimentary</span>
                  </div>

                  <div className="flex justify-between text-[#24211D]/80">
                    <span>Juthika by Momita Cedarwood Packaging</span>
                    <span className="text-[#B69A62] uppercase tracking-wider font-medium">Included</span>
                  </div> */}
                </div>

                {/* Total */}
                <div className="py-4 flex justify-between items-baseline">
                  <span className="font-serif text-lg text-[#24211D]">Estimated Total</span>
                  <div className="text-right">
                    <span className="font-serif text-2xl text-[#24211D] font-medium block">
                      {formatPrice(totalAmount)}
                    </span>
                    <span className="text-[10px] text-[#24211D]/50 uppercase tracking-wider">
                      Inclusive of GST & Customs
                    </span>
                  </div>
                </div>

                {/* Coupon Input Form */}
                <form onSubmit={handleApplyCoupon} className="mt-4 pt-4 border-t border-[#E8DFD1]">
                  <span className="text-[10px] uppercase tracking-wider text-[#24211D]/70 block mb-1.5 font-medium">
                    Have a Coupon Code? (Try <code className="text-[#B69A62]">HERITAGE10</code>)
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code"
                      className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs uppercase text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#24211D] text-[#FFFFFF] text-[10px] uppercase tracking-widest font-medium hover:bg-[#B69A62] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[11px] mt-2 ${couponMessage.type === 'success' ? 'text-emerald-700' : 'text-red-600'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </form>

                {/* Checkout Trigger Button */}
                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full mt-6 py-4 bg-[#B69A62] text-[#FFFFFF] hover:bg-[#A0834E] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Couture Checkout</span>
                  <ArrowRight size={14} />
                </button>

                <p className="text-[10px] text-center text-[#24211D]/60 mt-3 font-light">
                  Protected by 256-bit encrypted security &bull; Authentic GI Tagged Silk
                </p>

              </div>

              {/* Trust Box
              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-5 text-xs text-[#24211D]/80 space-y-2">
                <div className="flex items-center gap-2 text-[#B69A62]">
                  <ShieldCheck size={16} />
                  <span className="font-medium text-[#24211D]">Guaranteed Silk Authenticity</span>
                </div>
                <p className="text-[11px] text-[#24211D]/70 leading-relaxed">
                  Every order includes a verified Sualkuchi Master Weaver authenticity certification. 
                  Complimentary returns or exchanges within 7 days of delivery.
                </p>
              </div> */}

            </div>

          </div>
        )}

      </div>

      {/* Checkout Demonstration Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#24211D]/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#B69A62]/40 shadow-2xl p-6 sm:p-10">
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-[#24211D]/60 hover:text-[#24211D]"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-1">
                Atelier White-Glove Dispatch
              </span>
              <h3 className="font-serif text-2xl text-[#24211D]">
                Complete Your Order Details
              </h3>
              <p className="text-xs text-[#24211D]/70 mt-1">
                Amount payable: <span className="font-medium text-[#24211D]">{formatPrice(totalAmount)}</span>
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                  Delivery Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="e.g. Maharani Barooah"
                  className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B69A62]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="client@luxury.com"
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B69A62]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                    Phone (WhatsApp updates)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="+91 9279125091"
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B69A62]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                  Destination Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  placeholder="Street Address, Penthouse / Suite, City, State, PIN / Postal Code"
                  className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3.5 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                  Payment Preference
                </label>
                <div className="p-3 bg-[#FFFFFF] border border-[#E8DFD1] space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={customerInfo.paymentMethod === 'VIP Concierge Wire / Card Payment Link'}
                      onChange={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'VIP Concierge Wire / Card Payment Link' })}
                      className="accent-[#B69A62]"
                    />
                    <span>VIP Concierge Wire / Card Payment Link via Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={customerInfo.paymentMethod === 'White-Glove Cash On Delivery'}
                      onChange={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'White-Glove Cash On Delivery' })}
                      className="accent-[#B69A62]"
                    />
                    <span>White-Glove Cash On Delivery (Major Metros)</span>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md"
                >
                  Confirm & Place Order
                </button>
                <p className="text-[10px] text-center text-[#24211D]/50 mt-2">
                  * Note: Demonstration only. No card details or fees will be billed.
                </p>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
