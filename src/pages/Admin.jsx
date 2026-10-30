import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  RefreshCw, 
  ArrowLeft, 
  Award, 
  TrendingUp,
  Eye
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';

export const Admin = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProducts,
    consultations,
    updateConsultationStatus,
    orders,
    updateOrderStatus,
    backendStatus,
    backendInfo,
    syncWithBackend
  } = useCart();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'catalog' | 'consultations' | 'orders' | 'guilds'
  
  // Catalog Management State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFabricFilter, setSelectedFabricFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New Product Form State
  const initialNewProduct = {
    name: '',
    assameseName: '',
    fabric: 'Muga Silk',
    category: 'Muga Silk',
    price: '',
    originalPrice: '',
    loomDays: 25,
    artisanLocation: 'Sualkuchi, Assam',
    tag: 'Signature Heritage',
    description: '',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
    ],
    sizes: 'Standard Unstitched, Custom Tailored Fit'
  };
  const [newProductForm, setNewProductForm] = useState(initialNewProduct);

  // Handlers for Multiple Photo Angles in Add Form
  const handleAddImageField = () => {
    setNewProductForm(prev => ({
      ...prev,
      images: [...(prev.images || []), '']
    }));
  };

  const handleImageChange = (index, value) => {
    setNewProductForm(prev => {
      const updated = [...(prev.images || [])];
      updated[index] = value;
      return { ...prev, images: updated };
    });
  };

  const handleRemoveImageField = (index) => {
    setNewProductForm(prev => {
      const updated = (prev.images || []).filter((_, i) => i !== index);
      return { ...prev, images: updated.length > 0 ? updated : [''] };
    });
  };

  const handleAddPresetToForm = (presetUrl) => {
    setNewProductForm(prev => {
      const current = (prev.images || []).filter(Boolean);
      return { ...prev, images: [...current, presetUrl] };
    });
  };

  // Quick preset image recommendations for admin convenience
  const PRESET_IMAGES = [
    { label: 'Golden Muga Handloom', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Royal Bridal Paat', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Natural Ahimsa Eri Wrap', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Vermilion Temple Saree', url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Modern Tailored Silk', url: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1200&q=85' },
    { label: 'Couture Cape & Gown', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85' }
  ];

  // Financial calculations
  const totalCatalogValue = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
  const pendingConsultationsCount = consultations.filter(c => c.status === 'New').length;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  // Filtered Products in Admin Catalog Tab
  const filteredCatalog = products.filter(p => {
    if (selectedFabricFilter !== 'All' && p.fabric !== selectedFabricFilter) return false;
    if (selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        p.name.toLowerCase().includes(q) || 
        (p.assameseName && p.assameseName.includes(q)) ||
        p.fabric.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name.trim() || !newProductForm.price) return;

    const parsedSizes = newProductForm.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const cleanImages = (newProductForm.images || [])
      .map(img => (typeof img === 'string' ? img.trim() : ''))
      .filter(Boolean);

    addProduct({
      name: newProductForm.name.trim(),
      assameseName: newProductForm.assameseName.trim(),
      fabric: newProductForm.fabric,
      category: newProductForm.category,
      price: Number(newProductForm.price),
      originalPrice: newProductForm.originalPrice ? Number(newProductForm.originalPrice) : Number(newProductForm.price) * 1.1,
      loomDays: Number(newProductForm.loomDays) || 20,
      artisanLocation: newProductForm.artisanLocation || 'Sualkuchi, Assam',
      tag: 'New Atelier Creation',
      description: newProductForm.description || 'Exquisitely handwoven in Sualkuchi using traditional wooden throw-shuttle looms.',
      images: cleanImages.length > 0 ? cleanImages : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'],
      sizes: parsedSizes.length > 0 ? parsedSizes : ['Standard Unstitched', 'Custom Tailored Fit'],
      inStock: true
    });

    setNewProductForm(initialNewProduct);
    setIsAddModalOpen(false);
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    const cleanEditImages = (editingProduct.images || [])
      .map(img => (typeof img === 'string' ? img.trim() : ''))
      .filter(Boolean);

    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      assameseName: editingProduct.assameseName,
      fabric: editingProduct.fabric,
      category: editingProduct.category,
      price: Number(editingProduct.price),
      originalPrice: Number(editingProduct.originalPrice),
      description: editingProduct.description,
      images: cleanEditImages.length > 0 ? cleanEditImages : editingProduct.images,
      inStock: editingProduct.inStock
    });
    setEditingProduct(null);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E8DFD1] mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#B69A62] animate-ping" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold">
                Private Atelier Console
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
              Juthika By Momita Atelier Management
            </h1>
            <p className="text-xs text-[#24211D]/70 font-light mt-0.5">
              Sualkuchi Looms, Silk Inventory, Bespoke Consultations & Client Dispatches
            </p>

          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#24211D] text-[#24211D] hover:bg-[#24211D] hover:text-[#FFFFFF] text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Return to Storefront</span>
            </Link>
            <button
              onClick={() => {
                if (window.confirm('Reset all catalog garments to initial masterwork data?')) {
                  resetProducts();
                }
              }}
              title="Reset products to default mock data"
              className="p-2 border border-[#E8DFD1] bg-[#FFFFFF] text-[#24211D]/70 hover:text-[#B69A62] text-xs transition-colors"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E8DFD1] mb-8 overflow-x-auto gap-2">
          {[
            { id: 'overview', label: 'Overview & Pulse', icon: TrendingUp },
            { id: 'catalog', label: `Catalog & Garments (${products.length})`, icon: Package },
            { id: 'consultations', label: `Bespoke Bridal (${consultations.length})`, badge: pendingConsultationsCount, icon: Calendar },
            { id: 'orders', label: `Client Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'guilds', label: 'Artisan Guilds', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-5 text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-2 relative whitespace-nowrap ${
                  isActive
                    ? 'text-[#B69A62] font-semibold bg-[#FFFFFF] border-t-2 border-t-[#B69A62] border-x border-[#E8DFD1]'
                    : 'text-[#24211D]/70 hover:text-[#24211D] hover:bg-[#FFFFFF]/50'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="bg-[#B69A62] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & PULSE */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#24211D]/60 mb-2">
                  <span className="uppercase tracking-wider">Catalog Garments</span>
                  <Package className="text-[#B69A62] w-4 h-4" />
                </div>
                <div className="font-serif text-3xl text-[#24211D] mb-1">{products.length}</div>
                <div className="text-[11px] text-[#24211D]/60 flex items-center gap-1">
                  <span>Catalog Worth: {formatPrice(totalCatalogValue)}</span>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#24211D]/60 mb-2">
                  <span className="uppercase tracking-wider">Bespoke Inquiries</span>
                  <Calendar className="text-[#B69A62] w-4 h-4" />
                </div>
                <div className="font-serif text-3xl text-[#24211D] mb-1">{consultations.length}</div>
                <div className="text-[11px] text-[#B69A62] font-medium">
                  {pendingConsultationsCount} Pending Review
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#24211D]/60 mb-2">
                  <span className="uppercase tracking-wider">Client Orders</span>
                  <ShoppingBag className="text-[#B69A62] w-4 h-4" />
                </div>
                <div className="font-serif text-3xl text-[#24211D] mb-1">{orders.length}</div>
                <div className="text-[11px] text-[#24211D]/60">
                  Volume: {formatPrice(totalRevenue)}
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#24211D]/60 mb-2">
                  <span className="uppercase tracking-wider">Active Looms</span>
                  <Award className="text-[#B69A62] w-4 h-4" />
                </div>
                <div className="font-serif text-3xl text-[#24211D] mb-1">48 Looms</div>
                <div className="text-[11px] text-emerald-800 font-medium">
                  100% Sualkuchi Fair Trade
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Activity Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: Quick Actions & Sualkuchi Status (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 shadow-sm">
                  <h3 className="font-serif text-xl text-[#24211D] mb-4 pb-2 border-b border-[#E8DFD1]">
                    Atelier Operations
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setActiveTab('catalog');
                        setIsAddModalOpen(true);
                      }}
                      className="w-full py-3 px-4 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] transition-colors text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2"
                    >
                      <Plus size={14} />
                      <span>Add New Silk Garment</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('consultations')}
                      className="w-full py-3 px-4 bg-[#FFFFFF] border border-[#E8DFD1] text-[#24211D] hover:border-[#B69A62] transition-colors text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2"
                    >
                      <Calendar size={14} />
                      <span>Review Bridal Inquiries ({pendingConsultationsCount} New)</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('orders')}
                      className="w-full py-3 px-4 bg-[#FFFFFF] border border-[#E8DFD1] text-[#24211D] hover:border-[#B69A62] transition-colors text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={14} />
                      <span>Inspect Client Dispatches ({orders.length})</span>
                    </button>
                  </div>
                </div>

                {/* Sualkuchi Guild Status Box */}
                <div className="bg-[#24211D] text-[#FFFFFF] p-6 border border-[#B69A62]/30 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#B69A62] font-semibold block">
                    Guild Compliance &bull; Assam Handloom
                  </span>
                  <h4 className="font-serif text-lg text-[#FFFFFF]">
                    Sualkuchi Silk Weaver Protection
                  </h4>
                  <p className="text-xs text-[#E8DFD1]/80 font-light leading-relaxed">
                    All pieces currently listed adhere to authentic throw-shuttle extra-weft standards. Zero synthetic polyester blends detected. GI Tag Registration active for 2026/2027.
                  </p>
                </div>
              </div>

              {/* Right: Recent Bridal Inquiries & Orders (7 cols) */}
              <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E8DFD1] p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1] mb-4">
                  <h3 className="font-serif text-xl text-[#24211D]">
                    Recent Bespoke Appointments
                  </h3>
                  <button
                    onClick={() => setActiveTab('consultations')}
                    className="text-xs uppercase tracking-wider text-[#B69A62] hover:underline"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="divide-y divide-[#E8DFD1]">
                  {consultations.slice(0, 4).map((c) => (
                    <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#24211D] text-sm font-serif">{c.name}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded uppercase tracking-wider ${
                            c.status === 'New' ? 'bg-[#B69A62] text-white' : 'bg-[#E8DFD1] text-[#24211D]'
                          }`}>
                            {c.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#24211D]/60 mt-0.5">
                          {c.occasion} &bull; <span className="text-[#B69A62]">{c.preferredFabric}</span> &bull; {c.phone}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-[#24211D]/50">{c.id}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DFD1]">
                  <h4 className="font-serif text-lg text-[#24211D] mb-3">
                    Recent Client Bag Dispatches
                  </h4>
                  <div className="divide-y divide-[#E8DFD1]">
                    {orders.slice(0, 3).map((o) => (
                      <div key={o.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-medium text-[#24211D]">{o.customerName}</span>
                          <p className="text-[11px] text-[#24211D]/60 truncate max-w-xs">
                            {o.items?.map(i => i.name).join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-serif font-medium text-[#24211D] block">
                            {formatPrice(o.total)}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-[#B69A62]">
                            {o.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 2: CATALOG & GARMENTS */}
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            {/* Controls Bar */}
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                  <Search size={14} className="absolute left-3 top-3 text-[#24211D]/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search silk garments..."
                    className="w-full pl-9 pr-3 py-2 bg-[#FFFFFF] border border-[#E8DFD1] text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                  />
                </div>

                <select
                  value={selectedFabricFilter}
                  onChange={(e) => setSelectedFabricFilter(e.target.value)}
                  className="bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                >
                  <option value="All">All Fabrics</option>
                  <option value="Muga Silk">Muga Silk</option>
                  <option value="Eri Silk">Eri Silk</option>
                  <option value="Paat Silk">Paat Silk</option>
                </select>

                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className="text-xs text-[#24211D]/60">
                  {filteredCatalog.length} of {products.length} Garments
                </span>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={14} />
                  <span>Add Garment</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs text-[#24211D]">
                <thead className="bg-[#FFFFFF] uppercase tracking-wider text-[10px] text-[#24211D]/70 border-b border-[#E8DFD1]">
                  <tr>
                    <th className="py-3.5 px-4">Garment</th>
                    <th className="py-3.5 px-4">Fabric</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price (INR)</th>
                    <th className="py-3.5 px-4">Loom Time</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD1]">
                  {filteredCatalog.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-14 object-cover border border-[#E8DFD1] flex-shrink-0"
                        />
                        <div>
                          <span className="font-serif text-sm font-medium text-[#24211D] block">
                            {p.name}
                          </span>
                          {p.assameseName && (
                            <span className="text-[11px] text-[#24211D]/50 italic block">
                              {p.assameseName}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-[#B69A62]">
                            {p.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#B69A62]/10 text-[#24211D] font-medium rounded">
                          {p.fabric}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#24211D]/80">
                        {p.category}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-serif text-sm font-medium">
                          {formatPrice(p.price)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#24211D]/70">
                        {p.loomDays || 25} Days &bull; Sualkuchi
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/product/${p.id}`}
                            target="_blank"
                            title="View storefront page"
                            className="p-1.5 text-[#24211D]/60 hover:text-[#B69A62] hover:bg-stone-100"
                          >
                            <Eye size={14} />
                          </Link>
                          <button
                            onClick={() => setEditingProduct(p)}
                            title="Edit Garment"
                            className="p-1.5 text-[#24211D]/60 hover:text-[#B69A62] hover:bg-stone-100"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            title="Delete Garment"
                            className="p-1.5 text-[#24211D]/40 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCatalog.length === 0 && (
                <div className="text-center py-12 text-[#24211D]/60 text-xs">
                  No garments match your active filters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: BESPOKE BRIDAL APPOINTMENTS */}
        {activeTab === 'consultations' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-[#24211D]">
                  Bespoke Bridal & Custom Consultation Dossier
                </h3>
                <p className="text-xs text-[#24211D]/60 font-light">
                  Captures client inquiries submitted from the Consultation Modal and Bridal page.
                </p>
              </div>
              <span className="text-xs uppercase tracking-wider bg-[#B69A62]/10 text-[#B69A62] px-3 py-1 font-semibold">
                {consultations.length} Total Requests
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultations.map((c) => (
                <div key={c.id} className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-3 mb-3">
                      <div>
                        <h4 className="font-serif text-lg text-[#24211D] font-normal leading-tight">
                          {c.name}
                        </h4>
                        <span className="text-[10px] font-mono text-[#B69A62]">{c.id}</span>
                      </div>
                      <select
                        value={c.status}
                        onChange={(e) => updateConsultationStatus(c.id, e.target.value)}
                        className={`text-[10px] uppercase tracking-wider px-2 py-1 font-semibold border ${
                          c.status === 'New' 
                            ? 'bg-[#B69A62] text-white border-[#B69A62]'
                            : c.status === 'Loom Assigned'
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-[#FFFFFF] text-[#24211D] border-[#E8DFD1]'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Loom Assigned">Loom Assigned</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="space-y-2 text-xs text-[#24211D]/80">
                      <div>
                        <span className="text-[10px] text-[#24211D]/50 uppercase tracking-wider block">Occasion:</span>
                        <span className="font-medium text-[#24211D]">{c.occasion}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#24211D]/50 uppercase tracking-wider block">Preferred Silk:</span>
                        <span className="text-[#B69A62] font-medium">{c.preferredFabric}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#24211D]/50 uppercase tracking-wider block">Format & Location:</span>
                        <span>{c.consultationType}</span>
                      </div>

                      {c.preferredDate && (
                        <div>
                          <span className="text-[10px] text-[#24211D]/50 uppercase tracking-wider block">Requested Date:</span>
                          <span>{c.preferredDate}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-[#E8DFD1]/50">
                        <span className="text-[10px] text-[#24211D]/50 uppercase tracking-wider block">Client Notes:</span>
                        <p className="text-[11px] text-[#24211D]/75 italic mt-1 leading-relaxed bg-[#FFFFFF] p-2.5 border border-[#E8DFD1]/40">
                          &ldquo;{c.message}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8DFD1] text-[11px] text-[#24211D]/70 space-y-1">
                    <p>Phone: <a href={`tel:${c.phone}`} className="text-[#B69A62] hover:underline font-mono">{c.phone}</a></p>
                    <p>Email: <a href={`mailto:${c.email}`} className="text-[#B69A62] hover:underline">{c.email}</a></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT ORDERS & DISPATCHES */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-[#24211D]">
                  Client Bag Dispatches & Order Tracking
                </h3>
                <p className="text-xs text-[#24211D]/60 font-light">
                  Real-time client orders logged via the cart checkout process.
                </p>
              </div>
              <span className="text-xs uppercase tracking-wider font-serif text-[#24211D] font-medium">
                Total Volume: {formatPrice(totalRevenue)}
              </span>
            </div>

            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DFD1] gap-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg text-[#24211D] font-medium">
                          {o.customerName}
                        </span>
                        <span className="text-xs font-mono text-[#B69A62] bg-[#B69A62]/10 px-2 py-0.5 rounded">
                          {o.id}
                        </span>
                      </div>
                      <span className="text-xs text-[#24211D]/60">
                        {o.email} &bull; {o.phone}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl text-[#24211D] font-medium">
                        {formatPrice(o.total)}
                      </span>
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="text-xs px-3 py-1.5 bg-[#FFFFFF] border border-[#E8DFD1] focus:outline-none focus:border-[#B69A62]"
                      >
                        <option value="Preparing Cedar Chest">Preparing Cedar Chest</option>
                        <option value="Loom Quality Inspection">Loom Quality Inspection</option>
                        <option value="Insured Dispatch">Insured Dispatch</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#24211D]/50 block mb-1">
                        Garments in Dispatch:
                      </span>
                      <ul className="space-y-1">
                        {o.items?.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-[#24211D]/80">
                            <span>{item.quantity}x {item.name} ({item.selectedSize})</span>
                            <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#24211D]/50 block mb-1">
                        Destination Address:
                      </span>
                      <p className="text-[#24211D]/80 leading-relaxed bg-[#FFFFFF] p-2 border border-[#E8DFD1]/50">
                        {o.address || 'Flagship Atelier Collection'}
                      </p>
                      <span className="text-[10px] text-[#24211D]/50 block mt-1">
                        Payment: {o.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GUILDS & SUALKUCHI LOOM TRACKER */}
        {activeTab === 'guilds' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
                Hereditary Artisan Lineage
              </span>
              <h2 className="font-serif text-3xl text-[#24211D] mb-4">
                Sualkuchi Partner Guilds & Looms
              </h2>
              <p className="text-xs sm:text-sm text-[#24211D]/75 font-light leading-relaxed max-w-3xl">
                AIAXOM collaborates directly with 45 master weaver family clusters across Sualkuchi, Kamrup, and Majuli. 
                Every master weaver receives fair living compensation 3.2x above the regional benchmark, 
                healthcare coverage, and recognized intellectual design preservation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 space-y-3">
                <span className="font-serif text-xl text-[#24211D] block">Barpeta-Sualkuchi Royal Guild</span>
                <p className="text-[#24211D]/70 font-light">Lead Artisan: Master Weaver Trailokya Das (5th Gen)</p>
                <div className="p-3 bg-[#FFFFFF] border border-[#E8DFD1] space-y-1 text-[11px]">
                  <p>&bull; Active Looms: 18 Wooden Throw-Shuttles</p>
                  <p>&bull; Specialization: 100% Wild Muga Kingkhap Motifs</p>
                  <p>&bull; Certified GI Compliance: Active</p>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 space-y-3">
                <span className="font-serif text-xl text-[#24211D] block">Kamrup Paat Bridal Sanctuary</span>
                <p className="text-[#24211D]/70 font-light">Lead Artisan: Master Weaver Bimala Kalita (4th Gen)</p>
                <div className="p-3 bg-[#FFFFFF] border border-[#E8DFD1] space-y-1 text-[11px]">
                  <p>&bull; Active Looms: 16 Fly & Throw Shuttles</p>
                  <p>&bull; Specialization: Pure Mulberry Paat & Silver Guna</p>
                  <p>&bull; Certified GI Compliance: Active</p>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 space-y-3">
                <span className="font-serif text-xl text-[#24211D] block">Majuli Ahimsa Eri Collective</span>
                <p className="text-[#24211D]/70 font-light">Lead Artisan: Master Weaver Nayanmoni Saikia (3rd Gen)</p>
                <div className="p-3 bg-[#FFFFFF] border border-[#E8DFD1] space-y-1 text-[11px]">
                  <p>&bull; Active Looms: 14 Hand-Spun Eri Looms</p>
                  <p>&bull; Specialization: Botanical-Dyed Cruelty-Free Wraps</p>
                  <p>&bull; Certified Peace Silk: Active</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD NEW SILK GARMENT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24211D]/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#B69A62]/40 shadow-2xl p-6 sm:p-8 my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-[#24211D]/60 hover:text-[#24211D]"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-1">
                Atelier Masterwork Curation
              </span>
              <h3 className="font-serif text-2xl text-[#24211D]">
                Add New Garment to Catalog
              </h3>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                    Garment Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    placeholder="e.g. Royal Singkhap Muga Mekhela"
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                    Assamese Script Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={newProductForm.assameseName}
                    onChange={(e) => setNewProductForm({ ...newProductForm, assameseName: e.target.value })}
                    placeholder="e.g. ৰাজকীয় সোণালী মুগা"
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                    Silk Fabric *
                  </label>
                  <select
                    value={newProductForm.fabric}
                    onChange={(e) => setNewProductForm({ ...newProductForm, fabric: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                  >
                    <option value="Muga Silk">Muga Silk (Wild Gold)</option>
                    <option value="Eri Silk">Eri Silk (Ahimsa Peace Silk)</option>
                    <option value="Paat Silk">Paat Silk (Royal Mulberry)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                    Category *
                  </label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    placeholder="68500"
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                    Loom Days *
                  </label>
                  <input
                    type="number"
                    value={newProductForm.loomDays}
                    onChange={(e) => setNewProductForm({ ...newProductForm, loomDays: e.target.value })}
                    placeholder="28"
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                  />
                </div>
              </div>

              {/* Multiple Photography Angles Manager */}
              <div className="space-y-3 pt-2 pb-1 border-y border-[#E8DFD1]/60">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] text-[#24211D] font-medium">
                      Garment Photography & Multiple Angles *
                    </label>
                    <p className="text-[11px] text-[#24211D]/60 font-light">
                      Add 2, 3 or more photos showing different angles (Front, Side, Close-up) for the thumbnail gallery.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddImageField}
                    className="inline-flex items-center gap-1 px-3 py-1 text-[10px] uppercase tracking-wider bg-[#24211D] text-white hover:bg-[#B69A62] transition-colors"
                  >
                    <Plus size={12} />
                    <span>Add Angle</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {(newProductForm.images || ['']).map((imgUrl, idx) => (
                    <div key={idx} className="p-2.5 border border-[#E8DFD1] bg-white flex items-center gap-3">
                      {/* Live Thumbnail Preview */}
                      <div className="w-12 h-14 bg-stone-100 border border-[#E8DFD1] flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {imgUrl ? (
                          <img 
                            src={imgUrl} 
                            alt={`Angle ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <span className="text-[9px] text-[#24211D]/40 text-center font-mono">No Image</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] uppercase tracking-wider text-[#B69A62] font-semibold">
                            {idx === 0 ? 'Angle 1: Main Front Standing View *' : idx === 1 ? 'Angle 2: Side Profile View' : idx === 2 ? 'Angle 3: Sitting / Pallu Detail View' : `Angle ${idx + 1}`}
                          </span>
                          {idx === 0 && (
                            <span className="text-[9px] text-[#24211D]/50 uppercase tracking-widest">Default Cover</span>
                          )}
                        </div>
                        <input
                          type="url"
                          required={idx === 0}
                          value={imgUrl}
                          onChange={(e) => handleImageChange(idx, e.target.value)}
                          placeholder="Paste image URL (https://...)"
                          className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#B69A62]"
                        />
                      </div>

                      {newProductForm.images?.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImageField(idx)}
                          className="p-1.5 text-[#24211D]/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove this photo angle"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick preset chips to append */}
                <div>
                  <span className="text-[9px] text-[#24211D]/60 uppercase tracking-wider block mb-1">
                    Quick Preset Samples (click to add as another angle):
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAddPresetToForm(preset.url)}
                        className="text-[9px] px-2 py-0.5 bg-[#FFFFFF] border border-[#E8DFD1] hover:border-[#B69A62] text-[#24211D]/80 hover:text-[#B69A62] flex items-center gap-1 transition-colors"
                      >
                        <Plus size={9} />
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                  Weaving Description
                </label>
                <textarea
                  rows={3}
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  placeholder="Describe the motifs, Sualkuchi artisans, and silk texture..."
                  className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-[#24211D] text-xs uppercase tracking-wider text-[#24211D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#B69A62] text-[#FFFFFF] hover:bg-[#A0834E] text-xs uppercase tracking-widest font-medium transition-colors"
                >
                  Add to Atelier Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24211D]/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#B69A62]/40 shadow-2xl p-6 sm:p-8 my-8">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-[#24211D]/60 hover:text-[#24211D]"
            >
              <X size={20} />
            </button>

            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-1">
                Edit Garment
              </span>
              <h3 className="font-serif text-xl text-[#24211D]">
                {editingProduct.name}
              </h3>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                  Garment Name
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                  Price (₹)
                </label>
                <input
                  type="number"
                  required
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                />
              </div>

              {/* Photo Angles Manager for Edit Modal */}
              <div className="space-y-3 pt-2 pb-1 border-y border-[#E8DFD1]/60">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] text-[#24211D] font-medium">
                      Garment Photography & Angles ({editingProduct.images?.length || 0})
                    </label>
                    <p className="text-[11px] text-[#24211D]/60 font-light">
                      Add, edit, or delete photos for this garment's vertical thumbnail gallery.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct({
                        ...editingProduct,
                        images: [...(editingProduct.images || []), '']
                      });
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#24211D] text-white hover:bg-[#B69A62] transition-colors"
                  >
                    <Plus size={11} />
                    <span>Add Angle</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {(editingProduct.images || []).map((imgUrl, idx) => (
                    <div key={idx} className="p-2 border border-[#E8DFD1] bg-white flex items-center gap-2.5">
                      <div className="w-10 h-12 bg-stone-100 border border-[#E8DFD1] flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {imgUrl ? (
                          <img 
                            src={imgUrl} 
                            alt={`Angle ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <span className="text-[8px] text-[#24211D]/40 text-center font-mono">No Image</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] text-[#B69A62] font-semibold block uppercase">
                          Angle {idx + 1} {idx === 0 ? '(Main Front)' : ''}
                        </span>
                        <input
                          type="url"
                          value={imgUrl}
                          onChange={(e) => {
                            const updated = [...(editingProduct.images || [])];
                            updated[idx] = e.target.value;
                            setEditingProduct({ ...editingProduct, images: updated });
                          }}
                          placeholder="https://..."
                          className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-2 py-1 text-xs focus:outline-none focus:border-[#B69A62]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingProduct.images || []).filter((_, i) => i !== idx);
                          setEditingProduct({ ...editingProduct, images: updated });
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete photo angle"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#24211D] mb-1 font-medium">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs focus:outline-none focus:border-[#B69A62]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-[#24211D] text-xs uppercase tracking-wider text-[#24211D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-wider font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
