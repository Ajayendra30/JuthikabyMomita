import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Check, 
  Edit3, 
  Plus, 
  Minus, 
  Eye, 
  MessageCircle, 
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, isInWishlist, toggleWishlist, setIsWishlistOpen } = useCart();

  const product = (products && products.find((p) => p.id === id)) || (products && products[0]) || PRODUCTS[0];

  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'];

  const [activeImage, setActiveImage] = useState(0);

  // Reset angle when product id changes
  useEffect(() => {
    setActiveImage(0);
  }, [id]);

  const [selectedSize, setSelectedSize] = useState('S');
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [sizeUnit, setSizeUnit] = useState('CM'); // 'CM' or 'INCHES'

  // Accordion open states (Product Details open by default, matching screenshot)
  const [accordions, setAccordions] = useState({
    details: true,
    shipping: false,
    care: false,
    manufacturer: false,
    disclaimer: false,
    important: false
  });

  const toggleAccordion = (key) => {
    setAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isWishlisted = isInWishlist(product.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleBuyItNow = () => {
    addToCart(product, selectedSize, 1);
    navigate('/cart');
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Size Chart Data (matching reference specifications)
  const SIZE_CHART_DATA = {
    CM: [
      { size: 'S', chest: '96.5', waist: '81.3', hip: '96.5', shoulder: '44.5' },
      { size: 'M', chest: '102', waist: '86.4', hip: '102', shoulder: '45.7' },
      { size: 'L', chest: '107', waist: '91.4', hip: '107', shoulder: '47' },
      { size: 'XL', chest: '112', waist: '96.5', hip: '112', shoulder: '48.3' },
      { size: 'XXL', chest: '117', waist: '102', hip: '117', shoulder: '49.5' },
    ],
    INCHES: [
      { size: 'S', chest: '38', waist: '32', hip: '38', shoulder: '17.5' },
      { size: 'M', chest: '40', waist: '34', hip: '40', shoulder: '18' },
      { size: 'L', chest: '42', waist: '36', hip: '42', shoulder: '18.5' },
      { size: 'XL', chest: '44', waist: '38', hip: '44', shoulder: '19' },
      { size: 'XXL', chest: '46', waist: '40', hip: '46', shoulder: '19.5' },
    ]
  };

  // WhatsApp concierge direct link
  const waMessage = `Hello Juthika by Momita, I would like to order or enquire about the ${product.name} (Price: INR ${formatPrice(product.price)}, Size: ${selectedSize}).`;
  const waUrl = `https://api.whatsapp.com/send?phone=919279125091&text=${encodeURIComponent(waMessage)}`;

  // Related products
  const relatedProducts = (products || PRODUCTS).filter(
    (p) => p.id !== product.id && (p.fabric === product.fabric || p.category === product.category)
  ).slice(0, 4);

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-[11px] text-[#24211D]/50 uppercase tracking-[0.18em] mb-8 overflow-x-auto whitespace-nowrap font-sans">
          <Link to="/" className="hover:text-[#B69A62]">Home</Link>
          <ChevronRight size={11} />
          <Link to="/shop" className="hover:text-[#B69A62]">Shop</Link>
          <ChevronRight size={11} />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#B69A62]">
            {product.category}
          </Link>
          <ChevronRight size={11} />
          <span className="text-[#24211D] font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase Grid (Matching Tarun Tahiliani Screenshots) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-20">
          
          {/* LEFT: Product Image Gallery with Vertical Thumbnails & Interactive Multi-Angle Scrubber (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Vertical Thumbnail Strip */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[720px] flex-shrink-0 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-22 sm:w-20 sm:h-28 overflow-hidden border transition-all flex-shrink-0 bg-[#FFFFFF] ${
                    activeImage === idx 
                      ? 'border-[#24211D] ring-1 ring-[#24211D] shadow-sm' 
                      : 'border-[#E8DFD1] opacity-75 hover:opacity-100'
                  }`}
                  aria-label={`Select angle ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Active Couture Handloom Photography */}
            <div className="relative flex-1 aspect-[3/4] bg-[#FFFFFF] overflow-hidden group">
              <img
                src={images[activeImage] || images[0]}
                alt={`${product.name} - Angle ${activeImage + 1}`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

          </div>

          {/* RIGHT: Product Information, Purchase Controls & Accordions (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Category Label */}
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#24211D]/60 font-semibold mb-2">
              {product.secondaryCategory ? `${product.category} • ${product.secondaryCategory}` : product.category}
            </p>

            {/* Title with Wishlist Heart on Right (Exact layout in Screenshot 1) */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#24211D] font-normal tracking-wide uppercase leading-snug">
                {product.name}
              </h1>

              {/* Wishlist Heart Icon */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-1 text-[#24211D] hover:text-[#B69A62] transition-colors flex-shrink-0 mt-1"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                title={isWishlisted ? "Saved in wishlist" : "Save to wishlist"}
              >
                <Heart 
                  size={22} 
                  className={`transition-colors ${
                    isWishlisted ? 'fill-[#B69A62] text-[#B69A62]' : 'stroke-[1.6]'
                  }`} 
                />
              </button>
            </div>

            {/* Price Line */}
            <div className="mb-2">
              <span className="font-sans text-lg sm:text-xl text-[#24211D] font-medium tracking-wide">
                INR. {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-3 text-sm text-[#24211D]/40 line-through font-sans">
                  INR. {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Tax Note */}
            <p className="text-[11px] text-[#24211D]/60 font-sans tracking-wide mb-6">
              All Taxes are included in MRP, Shipping and Duties calculated at checkout
            </p>

            {/* SIZE Selector & Size Chart */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="uppercase tracking-[0.2em] font-semibold text-[#24211D] text-[11px]">
                  SIZE:
                </span>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#24211D] hover:text-[#B69A62] underline font-medium"
                >
                  <Edit3 size={12} />
                  <span>Size Chart</span>
                </button>
              </div>

              {/* Size Buttons S, M, L, XL, CUSTOM */}
              <div className="flex items-center gap-2.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[48px] h-11 px-3.5 text-xs font-sans font-medium transition-all border ${
                      selectedSize === s
                        ? 'bg-[#24211D] text-white border-[#24211D]'
                        : 'bg-[#FFFFFF] text-[#24211D] border-[#E0E0E0] hover:border-[#24211D]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Shipping & Fitting Specifications */}
            <div className="space-y-1.5 text-xs text-[#24211D]/80 mb-6 font-sans">
              <p>
                <span className="font-semibold text-[#24211D]">Shipping:</span> Made to order : {product.loomDays || 25} loom days ({product.artisanLocation || 'Sualkuchi, Assam'})
              </p>
              <p>
                <span className="font-semibold text-[#24211D]">Fitting:</span> Bust - 34.5in | Waist - 27in | Hip - 37in | Tailored Traditional Drape
              </p>
            </div>

            {/* Action Buttons (ADD TO CART + BUY IT NOW) */}
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* ADD TO CART */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 text-xs uppercase tracking-[0.22em] font-medium transition-colors border ${
                    isAdded
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-[#24211D] hover:bg-[#B69A62] text-white border-[#24211D] hover:border-[#B69A62]'
                  }`}
                >
                  {isAdded ? 'Added to Bag' : 'Add to Cart'}
                </button>

                {/* BUY IT NOW */}
                <button
                  onClick={handleBuyItNow}
                  className="w-full py-3.5 bg-[#24211D] hover:bg-[#B69A62] text-white text-xs uppercase tracking-[0.22em] font-medium transition-colors border border-[#24211D] hover:border-[#B69A62]"
                >
                  Buy It Now
                </button>
              </div>


              {/* ORDER VIA WHATSAPP Button (Dark Charcoal Brown) */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#24211D] hover:bg-[#25D366] text-white text-xs uppercase tracking-[0.22em] font-medium transition-colors flex items-center justify-center gap-2 group/wa"
              >
                <svg className="w-4 h-4 fill-current text-[#25D366] group-hover/wa:text-white transition-colors" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Order via WhatsApp</span>
              </a>
            </div>

            {/* ACCORDIONS (Exact List from Screenshot 2) */}
            <div className="mt-8 border-t border-[#E8DFD1] divide-y divide-[#E8DFD1]">
              
              {/* 1. PRODUCT DETAILS (Open by default) */}
              <div>
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#24211D]"
                >
                  <span>Product Details</span>
                  {accordions.details ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {accordions.details && (
                  <div className="pb-5 text-xs text-[#24211D]/80 space-y-3 font-sans leading-relaxed">
                    <p>{product.description}</p>
                    <ul className="space-y-1.5 pt-2">
                      <li><strong className="text-[#24211D]">MRP INCLUSIVE OF :</strong> Mekhela, Chador, Matching Blouse Piece (0.8m)</li>
                      <li><strong className="text-[#24211D]">MATERIALS :</strong> 100% Certified Pure {product.fabric} (Handloom)</li>
                      <li><strong className="text-[#24211D]">COLOR :</strong> Heritage Luster Patina</li>
                      <li><strong className="text-[#24211D]">CARE GUIDE :</strong> Dry-Clean Only by luxury silk specialists</li>
                      <li><strong className="text-[#24211D]">MODEL SPEC :</strong> Model wearing size Small, Model Height 5'9"</li>
                    </ul>
                    <p className="text-[10px] text-[#24211D]/50 pt-2 uppercase tracking-wider">
                      SKU: JBM-{product.id.toUpperCase()}-CW-50/S
                    </p>
                  </div>
                )}
              </div>

              {/* 2. SHIPPING & DELIVERY */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#24211D]"
                >
                  <span>Shipping & Delivery</span>
                  {accordions.shipping ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {accordions.shipping && (
                  <div className="pb-5 text-xs text-[#24211D]/80 space-y-2 leading-relaxed">
                    <p>Every Juthika by Momita garment is crafted on demand by hereditary master weavers in Sualkuchi, Assam.</p>
                    <p>Domestic delivery within India: 7 to 10 business days post loom completion. Express insured transit.</p>
                    <p>International worldwide couture shipping: 10 to 14 business days via DHL Express.</p>
                  </div>
                )}
              </div>

              {/* 3. CARE & GUIDE */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#24211D]"
                >
                  <span>Care & Guide</span>
                  {accordions.care ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {accordions.care && (
                  <div className="pb-5 text-xs text-[#24211D]/80 space-y-2 leading-relaxed">
                    <p>{product.care || 'Specialist silk dry clean only. Store wrapped in unbleached pure cotton muslin.'}</p>
                    <p>Muga and Eri silk naturally breathe. Air in gentle shade twice a year. Never enclose in synthetic plastic bags.</p>
                  </div>
                )}
              </div>

              {/* 4. MANUFACTURER'S DETAILS */}
              <div>
                <button
                  onClick={() => toggleAccordion('manufacturer')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#24211D]"
                >
                  <span>Manufacturer's Details</span>
                  {accordions.manufacturer ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {accordions.manufacturer && (
                  <div className="pb-5 text-xs text-[#24211D]/80 space-y-1.5 leading-relaxed">
                    <p><strong>Atelier:</strong> Juthika by Momita Master Handloom Weavers Guild</p>
                    <p><strong>Origin:</strong> Sualkuchi, Kamrup District, Assam 781103, India</p>
                    <p><strong>Certification:</strong> Geographical Indication (GI) Certified Assamese Muga & Eri Silk</p>
                  </div>
                )}
              </div>

              {/* 5. DISCLAIMER */}
              <div>
                <button
                  onClick={() => toggleAccordion('disclaimer')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#24211D]"
                >
                  <span>Disclaimer</span>
                  {accordions.disclaimer ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {accordions.disclaimer && (
                  <div className="pb-5 text-xs text-[#24211D]/80 leading-relaxed">
                    <p>Slight irregularities in weave, slubs, and natural golden zari luster variations are characteristic of authentic handloom silk and certify its artisanal pedigree.</p>
                  </div>
                )}
              </div>

              {/* 6. IMPORTANT INFORMATION */}
              <div>
                <button
                  onClick={() => toggleAccordion('important')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#24211D]"
                >
                  <span>Important Information</span>
                  {accordions.important ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {accordions.important && (
                  <div className="pb-5 text-xs text-[#24211D]/80 leading-relaxed space-y-2">
                    <p>Custom tailored garments cannot be exchanged once cutting or personalized zari monogramming has commenced.</p>
                    <p>Our silk curators are available 24/7 on WhatsApp for shade verifications and drape consultations.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* You May Also Admire (Related Products) */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-[#E8DFD1]">
            <div className="text-center max-w-xl mx-auto mb-10">
              {/* <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-1">
                Harmonious Ensembles
              </span> */}
              <h3 className="font-serif text-3xl text-[#24211D] font-light">
                Related Products
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Size Chart Modal (Matching reference image) */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-x-hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsSizeChartOpen(false)} 
          />
          <div className="relative bg-[#FFFFFF] max-w-2xl sm:max-w-3xl w-full shadow-2xl z-10 border border-[#E8DFD1] animate-fade-in max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="relative pt-6 pb-4 px-6 border-b border-gray-200 text-center">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#24211D] tracking-wide">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 font-light tracking-wider mt-1">
                Size Charts
              </p>
              <button 
                onClick={() => setIsSizeChartOpen(false)}
                className="absolute top-5 right-5 text-[#24211D] hover:opacity-60 transition-opacity p-1"
                aria-label="Close size chart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {/* Unit Toggle: CM | INCHES */}
              <div className="flex items-center justify-center gap-2 mb-6 text-xs sm:text-[13px] tracking-wider select-none">
                <button
                  type="button"
                  onClick={() => setSizeUnit('CM')}
                  className={`font-semibold transition-colors focus:outline-none cursor-pointer ${
                    sizeUnit === 'CM' ? 'text-[#0084B4] font-bold' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  CM
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => setSizeUnit('INCHES')}
                  className={`font-semibold transition-colors focus:outline-none cursor-pointer ${
                    sizeUnit === 'INCHES' ? 'text-[#0084B4] font-bold' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  INCHES
                </button>
              </div>

              {/* Measurement Table */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse border border-gray-200 text-center">
                  <thead>
                    <tr className="bg-white">
                      <th className="border border-gray-200 w-16 py-3 px-3"></th>
                      <th className="border border-gray-200 py-3 px-4 text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
                        CHEST
                      </th>
                      <th className="border border-gray-200 py-3 px-4 text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
                        WAIST
                      </th>
                      <th className="border border-gray-200 py-3 px-4 text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
                        HIP
                      </th>
                      <th className="border border-gray-200 py-3 px-4 text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
                        SHOULDER
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {SIZE_CHART_DATA[sizeUnit].map((row) => (
                      <tr key={row.size} className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 py-3.5 px-3 text-xs sm:text-[13px] font-medium text-[#24211D]">
                          {row.size}
                        </td>
                        <td className="border border-gray-200 py-3.5 px-4 text-xs sm:text-[13px] font-bold text-[#24211D]">
                          {row.chest}
                        </td>
                        <td className="border border-gray-200 py-3.5 px-4 text-xs sm:text-[13px] font-bold text-[#24211D]">
                          {row.waist}
                        </td>
                        <td className="border border-gray-200 py-3.5 px-4 text-xs sm:text-[13px] font-bold text-[#24211D]">
                          {row.hip}
                        </td>
                        <td className="border border-gray-200 py-3.5 px-4 text-xs sm:text-[13px] font-bold text-[#24211D]">
                          {row.shoulder}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mannequin Diagram / How to Measure Image */}
              <div className="pt-2 pb-4 flex justify-center">
                <img 
                  src="/images/size-guide-mannequin.png" 
                  alt="How to measure - Chest, Waist, Hip, Shoulder" 
                  className="max-h-[460px] w-auto object-contain mx-auto"
                />
              </div>

            </div>

          </div>
        </div>
      )}


    </div>
  );
};
