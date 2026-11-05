import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package, 
  ShoppingBag, 
  Calendar, 
  Award, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  RefreshCw, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ChevronRight, 
  Filter, 
  Sparkles, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  Eye, 
  Grid, 
  List, 
  MoreVertical, 
  Phone, 
  Mail, 
  MapPin, 
  SlidersHorizontal, 
  ArrowUpRight, 
  BarChart2, 
  BarChart3,
  PieChart,
  Download,
  Percent,
  CreditCard,
  Target,
  Coins,
  Check, 
  AlertCircle, 
  MessageCircle, 
  Home, 
  Menu
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';
import { getMainStoreUrl, isAdminSubdomain } from '../utils/subdomain';

// ---------------------------------------------------------------------------
// Modern Luxury Interactive SVG Donut / Pie Chart Component
// ---------------------------------------------------------------------------
const DonutPieChart = ({ data, total, formatPrice }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const radius = 48;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius; // ~301.59
  let accumulatedOffset = 0;

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
      {/* SVG Donut */}
      <div className="relative w-52 h-52 sm:w-56 sm:h-56 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 140 140" className="w-full h-full transform -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#F0ECE1"
            strokeWidth={strokeWidth}
          />
          {data.map((slice) => {
            if (slice.percentage <= 0) return null;
            const strokeLength = (slice.percentage / 100) * circumference;
            const currentOffset = accumulatedOffset;
            accumulatedOffset += strokeLength;
            const isHovered = hoveredSlice?.key === slice.key;

            return (
              <circle
                key={slice.key}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${Math.max(1, strokeLength - 2.5)} ${circumference - strokeLength + 2.5}`}
                strokeDashoffset={-currentOffset}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  filter: isHovered ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))' : 'none'
                }}
                onMouseEnter={() => setHoveredSlice(slice)}
                onMouseLeave={() => setHoveredSlice(null)}
              />
            );
          })}
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-3">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold truncate max-w-[130px]">
            {hoveredSlice ? hoveredSlice.label : 'Gross Sales'}
          </span>
          <span className="font-serif text-lg sm:text-xl font-bold text-[#111111] leading-none my-1">
            {formatPrice(hoveredSlice ? hoveredSlice.revenue : total)}
          </span>
          <span className="text-[10px] text-[#B69A62] font-semibold">
            {hoveredSlice 
              ? `${hoveredSlice.percentage}% Share (${hoveredSlice.count} sold)`
              : `${data.reduce((s, d) => s + d.count, 0)} Masterworks`}
          </span>
        </div>
      </div>

      {/* Legend & Details */}
      <div className="flex-1 w-full space-y-2.5">
        {data.map((slice) => {
          const isHovered = hoveredSlice?.key === slice.key;
          return (
            <div
              key={slice.key}
              onMouseEnter={() => setHoveredSlice(slice)}
              onMouseLeave={() => setHoveredSlice(null)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isHovered
                  ? 'bg-neutral-50 border-[#B69A62] shadow-xs translate-x-1'
                  : 'bg-white border-[#F0ECE1] hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <div>
                  <h5 className="text-xs font-semibold text-neutral-900 leading-tight">
                    {slice.label}
                  </h5>
                  <span className="text-[10px] text-neutral-400">
                    {slice.count} creations sold
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-serif font-medium text-neutral-900">
                  {formatPrice(slice.revenue)}
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-bold">
                  {slice.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Modern Luxury Monthly Revenue Bar Chart Component
// ---------------------------------------------------------------------------
const MonthlyRevenueBarChart = ({ monthlyData, formatPrice }) => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue), 1);

  return (
    <div className="space-y-4">
      {/* Top Bar Details / Hover indicator */}
      <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-100">
        <div>
          <span className="text-neutral-400 uppercase tracking-wider text-[10px] font-semibold">Focused Period:</span>
          <strong className="ml-1.5 text-neutral-900 font-medium">
            {hoveredBar ? hoveredBar.period : 'Oct 2025 - Mar 2026 Seasonal Trajectory'}
          </strong>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 uppercase tracking-wider text-[10px] font-semibold">Revenue:</span>
          <strong className="text-[#8C6D23] font-serif font-bold text-sm">
            {formatPrice(hoveredBar ? hoveredBar.revenue : monthlyData.reduce((s, m) => s + m.revenue, 0))}
          </strong>
          {hoveredBar?.growth && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              {hoveredBar.growth}
            </span>
          )}
        </div>
      </div>

      {/* Bars Chart Area */}
      <div className="h-44 sm:h-48 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-1 sm:px-2">
        {monthlyData.map((item, idx) => {
          const heightPercent = Math.max(14, Math.round((item.revenue / maxRevenue) * 100));
          const isHovered = hoveredBar?.period === item.period;

          return (
            <div 
              key={idx}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              onMouseEnter={() => setHoveredBar(item)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {/* Tooltip value on hover or top bar */}
              <div className={`text-[10px] font-serif font-medium text-neutral-700 mb-1.5 transition-all ${
                isHovered ? 'opacity-100 scale-105 font-bold text-[#8C6D23]' : 'opacity-0 sm:opacity-75'
              }`}>
                {item.revenue >= 10000000 
                  ? `₹${(item.revenue / 10000000).toFixed(1)}Cr` 
                  : item.revenue >= 100000 
                    ? `₹${(item.revenue / 100000).toFixed(1)}L` 
                    : `₹${Math.round(item.revenue / 1000)}k`}
              </div>

              {/* Bar Column */}
              <div className="w-full max-w-[42px] bg-neutral-100/80 rounded-t-xl overflow-hidden relative flex flex-col justify-end h-full">
                <div 
                  className={`w-full rounded-t-xl transition-all duration-300 ${
                    isHovered 
                      ? 'bg-gradient-to-t from-[#8C6D23] via-[#B69A62] to-[#E6CA85] shadow-lg' 
                      : 'bg-gradient-to-t from-[#1F1E1D] to-[#B69A62]'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Month Label */}
              <span className={`text-[11px] mt-2 font-medium tracking-tight transition-colors ${
                isHovered ? 'text-[#8C6D23] font-bold' : 'text-neutral-600'
              }`}>
                {item.shortMonth}
              </span>
              <span className="text-[9px] text-neutral-400">
                {item.ordersCount} orders
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Admin = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProducts,
    consultations,
    updateConsultationStatus,
    deleteConsultation,
    orders,
    updateOrderStatus,
    deleteOrder,
    backendStatus,
    backendInfo,
    syncWithBackend
  } = useCart();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'catalog' | 'orders' | 'consultations' | 'guilds'
  const [isSyncing, setIsSyncing] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await syncWithBackend();
    } finally {
      setTimeout(() => setIsSyncing(false), 500);
    }
  };

  // Automatically fetch live orders when switching to orders, overview, or analytics tabs
  useEffect(() => {
    if (activeTab === 'orders' || activeTab === 'overview' || activeTab === 'analytics') {
      syncWithBackend();
    }
  }, [activeTab, syncWithBackend]);

  // Periodic polling every 5 seconds to automatically pick up live customer orders
  useEffect(() => {
    const timer = setInterval(() => {
      syncWithBackend();
    }, 5000);
    return () => clearInterval(timer);
  }, [syncWithBackend]);
  
  // Catalog Management State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFabricFilter, setSelectedFabricFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All'); // 'All' | 'inStock' | 'outOfStock'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Inquiries & Orders filter states
  const [consultationSearchQuery, setConsultationSearchQuery] = useState('');
  const [consultationStatusFilter, setConsultationStatusFilter] = useState('All');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // New Product Form State
  const initialNewProduct = {
    name: '',
    assameseName: '',
    fabric: 'Muga Silk',
    category: 'Muga Silk',
    department: 'Women',
    collection: 'Timeless Handloom',
    price: '',
    originalPrice: '',
    loomDays: 25,
    artisanLocation: 'Sualkuchi, Assam',
    tag: 'Signature Heritage',
    description: '',
    images: [
      'https://thesilkchamber.com/cdn/shop/files/mugasari_4c4c1055-f4e5-4275-929e-47cca7fd8daf.jpg?v=1758283256&width=1800'
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
    { label: 'Golden Muga Handloom', url: 'https://thesilkchamber.com/cdn/shop/files/mugasari_4c4c1055-f4e5-4275-929e-47cca7fd8daf.jpg?v=1758283256&width=1800' },
    { label: 'Royal Bridal Paat', url: 'https://thesilkchamber.com/cdn/shop/files/mekhelasador_4de2660f-1617-463b-ac9c-c525dd93f96e.jpg?v=1759510815&width=1800' },
    { label: 'Natural Ahimsa Eri Wrap', url: 'https://thesilkchamber.com/cdn/shop/files/erisilksari_18749ea6-7a3f-4c6c-9a09-1618d14a8328.jpg?v=1770292936&width=1800' },
    { label: 'Teal Blue Paat Saree', url: 'https://thesilkchamber.com/cdn/shop/files/teal.jpg?v=1766847656&width=1800' },
    { label: 'Coral Eri Kesa Paat', url: 'https://thesilkchamber.com/cdn/shop/files/erikp_3649e180-cde4-4052-bf27-234ba580ef55.jpg?v=1713617452&width=1800' },
    { label: 'Mustard-Lac Silk Saree', url: 'https://thesilkchamber.com/cdn/shop/files/kperisari_4e0389a4-2f66-4583-bcce-3088a728a035.jpg?v=1739620090&width=1800' }
  ];

  // Financial & Analytics Calculations
  const totalCatalogValue = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
  const pendingConsultationsCount = consultations.filter(c => c.status === 'New').length;
  
  const totalItemsSold = orders.reduce((sum, o) => sum + (o.items ? o.items.reduce((iSum, i) => iSum + (Number(i.quantity) || 1), 0) : 1), 0);
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const deliveredOrdersCount = orders.filter(o => o.status === 'Delivered' || o.status === 'Insured Dispatch').length;
  const fulfillmentRate = orders.length > 0 ? Math.round((deliveredOrdersCount / orders.length) * 100) : 92;

  const [analyticsTimeframe, setAnalyticsTimeframe] = useState('all'); // 'all' | '90d' | '30d'

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  const formatCompactPrice = (num) => {
    if (!num) return '₹0';
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)} K`;
    return `₹${num}`;
  };

  // Fabric sales breakdown for Interactive Donut / Pie Chart
  const fabricSalesStats = React.useMemo(() => {
    const map = {
      'Muga Silk': { label: 'Pure Golden Muga', color: '#B69A62', count: 0, revenue: 0 },
      'Paat Silk': { label: 'Ceremonial Mulberry Paat', color: '#8B5CF6', count: 0, revenue: 0 },
      'Eri Silk': { label: 'Ahimsa Peace Eri', color: '#10B981', count: 0, revenue: 0 },
      'Kesa Paat': { label: 'Raw Kesa Paat', color: '#F59E0B', count: 0, revenue: 0 }
    };

    orders.forEach(order => {
      const items = order.items && order.items.length > 0 ? order.items : [{ name: 'Heritage Handloom', price: order.total, quantity: 1 }];
      items.forEach(item => {
        let fabricKey = item.fabric;
        if (!fabricKey) {
          const name = (item.name || '').toLowerCase();
          if (name.includes('muga')) fabricKey = 'Muga Silk';
          else if (name.includes('eri')) fabricKey = 'Eri Silk';
          else if (name.includes('kesa')) fabricKey = 'Kesa Paat';
          else fabricKey = 'Paat Silk';
        }
        if (!map[fabricKey]) {
          fabricKey = 'Paat Silk';
        }
        const itemQty = Number(item.quantity) || 1;
        const itemRevenue = (Number(item.price) || 0) * itemQty;
        map[fabricKey].count += itemQty;
        map[fabricKey].revenue += itemRevenue;
      });
    });

    const totalCalculated = Object.values(map).reduce((sum, f) => sum + f.revenue, 0) || totalRevenue || 1;

    return Object.entries(map).map(([key, data]) => {
      const percentage = Math.round((data.revenue / totalCalculated) * 100);
      return {
        key,
        ...data,
        percentage
      };
    });
  }, [orders, totalRevenue]);

  // Top Selling Products Leaderboard
  const topSellingProducts = React.useMemo(() => {
    const productMap = {};
    orders.forEach(order => {
      (order.items || []).forEach(item => {
        const key = item.name || 'Silk Creation';
        if (!productMap[key]) {
          const catalogItem = products.find(p => p.name === item.name || p.id === item.id);
          const img = (item.images && item.images[0]) || (catalogItem && catalogItem.images && catalogItem.images[0]) || 'https://thesilkchamber.com/cdn/shop/files/mugasari_4c4c1055-f4e5-4275-929e-47cca7fd8daf.jpg?v=1758283256&width=1800';
          const fabric = item.fabric || (catalogItem && catalogItem.fabric) || 'Muga Silk';
          const assameseName = (catalogItem && (catalogItem.assameseName || catalogItem.assamese_name)) || '';

          productMap[key] = {
            name: key,
            assameseName,
            fabric,
            image: img,
            units: 0,
            revenue: 0
          };
        }
        const qty = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;
        productMap[key].units += qty;
        productMap[key].revenue += price * qty;
      });
    });

    const sorted = Object.values(productMap).sort((a, b) => b.revenue - a.revenue);
    const maxRev = sorted[0]?.revenue || 1;
    return sorted.slice(0, 5).map(prod => ({
      ...prod,
      percentOfTop: Math.round((prod.revenue / maxRev) * 100)
    }));
  }, [orders, products]);

  // Regional Client Hubs Distribution
  const regionalHubStats = React.useMemo(() => {
    const hubMap = {
      'Guwahati & Assam Heritage Base': { name: 'Guwahati & Assam Corridor', orders: 0, revenue: 0, icon: '🏛️' },
      'Delhi NCR & North': { name: 'Delhi NCR & North India', orders: 0, revenue: 0, icon: '👑' },
      'Mumbai & Western Metro': { name: 'Mumbai & Western Coast', orders: 0, revenue: 0, icon: '🌊' },
      'Bengaluru & Southern Hub': { name: 'Bengaluru & South Corridor', orders: 0, revenue: 0, icon: '✨' },
      'Global & Overseas Diaspora': { name: 'Global & NRI Patron Hubs', orders: 0, revenue: 0, icon: '✈️' }
    };

    orders.forEach(order => {
      const addr = (order.address || '').toLowerCase();
      let key = 'Guwahati & Assam Heritage Base';
      if (addr.includes('mumbai') || addr.includes('maharashtra') || addr.includes('pune') || addr.includes('gujarat')) {
        key = 'Mumbai & Western Metro';
      } else if (addr.includes('delhi') || addr.includes('ncr') || addr.includes('patna') || addr.includes('noida') || addr.includes('gurgaon')) {
        key = 'Delhi NCR & North';
      } else if (addr.includes('bengaluru') || addr.includes('bangalore') || addr.includes('chennai') || addr.includes('hyderabad')) {
        key = 'Bengaluru & Southern Hub';
      } else if (addr.includes('uk') || addr.includes('london') || addr.includes('usa') || addr.includes('dubai') || addr.includes('singapore')) {
        key = 'Global & Overseas Diaspora';
      }
      hubMap[key].orders += 1;
      hubMap[key].revenue += (Number(order.total) || 0);
    });

    const totalCalculated = Object.values(hubMap).reduce((s, h) => s + h.revenue, 0) || totalRevenue || 1;

    return Object.values(hubMap)
      .map(hub => ({
        ...hub,
        percentage: Math.round((hub.revenue / totalCalculated) * 100)
      }))
      .filter(hub => hub.orders > 0 || hub.percentage > 0)
      .sort((a, b) => b.revenue - a.revenue);
  }, [orders, totalRevenue]);

  // Payment Methods Breakdown
  const paymentMethodStats = React.useMemo(() => {
    let wireRev = 0;
    let wireCount = 0;
    let codRev = 0;
    let codCount = 0;

    orders.forEach(o => {
      const method = (o.paymentMethod || '').toLowerCase();
      const amount = Number(o.total) || 0;
      if (method.includes('cod') || method.includes('cash')) {
        codRev += amount;
        codCount += 1;
      } else {
        wireRev += amount;
        wireCount += 1;
      }
    });

    const total = (wireRev + codRev) || 1;
    return [
      {
        name: 'VIP Direct Wire / Online Card',
        badge: 'Instant Atelier Verification',
        count: wireCount,
        revenue: wireRev,
        percentage: Math.round((wireRev / total) * 100)
      },
      {
        name: 'White-Glove Cash On Delivery',
        badge: 'Handover at Cedar Chest Dispatch',
        count: codCount,
        revenue: codRev,
        percentage: Math.round((codRev / total) * 100)
      }
    ];
  }, [orders]);

  // 6-Month Seasonal Revenue Trajectory
  const monthlyRevenueData = React.useMemo(() => {
    const actualMap = {};
    orders.forEach(o => {
      const d = o.createdAt ? new Date(o.createdAt) : new Date();
      const m = d.toLocaleString('en-US', { month: 'short' });
      if (!actualMap[m]) actualMap[m] = { orders: 0, revenue: 0 };
      actualMap[m].orders += 1;
      actualMap[m].revenue += (Number(o.total) || 0);
    });

    return [
      {
        shortMonth: 'Oct',
        period: 'Oct 2025 (Festive Pre-Winter)',
        revenue: actualMap['Oct']?.revenue || 1427000,
        ordersCount: actualMap['Oct']?.orders || 7,
        growth: '+14%'
      },
      {
        shortMonth: 'Nov',
        period: 'Nov 2025 (Winter Wedding Peak)',
        revenue: actualMap['Nov']?.revenue || 4136035,
        ordersCount: actualMap['Nov']?.orders || 4,
        growth: '+32%'
      },
      {
        shortMonth: 'Dec',
        period: 'Dec 2025 (Grand Bridal Gala)',
        revenue: actualMap['Dec']?.revenue || 2850000,
        ordersCount: actualMap['Dec']?.orders || 6,
        growth: '+18%'
      },
      {
        shortMonth: 'Jan',
        period: 'Jan 2026 (Magh Bihu Heritage)',
        revenue: actualMap['Jan']?.revenue || 3200000,
        ordersCount: actualMap['Jan']?.orders || 8,
        growth: '+22%'
      },
      {
        shortMonth: 'Feb',
        period: 'Feb 2026 (Spring Matrimony)',
        revenue: actualMap['Feb']?.revenue || 2950000,
        ordersCount: actualMap['Feb']?.orders || 5,
        growth: '+15%'
      },
      {
        shortMonth: 'Mar',
        period: 'Mar 2026 (Rongali Bihu Preview)',
        revenue: actualMap['Mar']?.revenue || 4500000,
        ordersCount: actualMap['Mar']?.orders || 9,
        growth: '+28%'
      }
    ];
  }, [orders]);

  const formatDateForDisplay = (dateVal) => {
    if (!dateVal) return 'N/A';
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return 'N/A';
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return 'N/A';
    }
  };

  const formatDateForCSV = (dateVal) => {
    if (!dateVal) return 'N/A';
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return 'N/A';
      const day = String(d.getDate()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day}-${month}-${year}`; // e.g. "03-Nov-2026"
    } catch (e) {
      return 'N/A';
    }
  };

  // 1-Click Export CSV Function
  const handleExportCSV = () => {
    if (!orders || orders.length === 0) {
      alert('No client dispatches available to export.');
      return;
    }

    const headers = [
      'Order ID',
      'Order Date (DD-MMM-YYYY)',
      'Patron Name',
      'Email Address',
      'Contact Phone',
      'Destination Address',
      'Garments Ordered',
      'Order Total (INR)',
      'Payment Preference',
      'Fulfillment Status'
    ];

    const rows = orders.map(o => {
      const dateStr = formatDateForCSV(o.createdAt);
      const itemsStr = (o.items || [])
        .map(i => `${i.name || 'Silk Garment'} (x${i.quantity || 1})`)
        .join('; ');
      
      const phoneStr = o.phone ? `\t${o.phone}` : 'N/A';
      const escape = (str) => `"${String(str || '').replace(/"/g, '""')}"`;

      return [
        escape(o.id),
        escape(dateStr),
        escape(o.customerName || o.customer_name || 'Anonymous Patron'),
        escape(o.email || 'N/A'),
        escape(phoneStr),
        escape(o.address || 'N/A'),
        escape(itemsStr),
        escape(o.total || 0),
        escape(o.paymentMethod || 'VIP Wire'),
        escape(o.status || 'New Order')
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `juthika_atelier_sales_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered Products in Admin Catalog Tab
  const filteredCatalog = products.filter(p => {
    if (selectedFabricFilter !== 'All' && p.fabric !== selectedFabricFilter) return false;
    if (selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) return false;
    if (stockFilter === 'inStock' && p.inStock === false) return false;
    if (stockFilter === 'outOfStock' && p.inStock !== false) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        (p.name && p.name.toLowerCase().includes(q)) || 
        (p.assameseName && p.assameseName.toLowerCase().includes(q)) ||
        (p.assamese_name && p.assamese_name.toLowerCase().includes(q)) ||
        (p.fabric && p.fabric.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.id && p.id.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Filtered Consultations in Admin Tab
  const filteredConsultations = consultations.filter(c => {
    if (consultationStatusFilter !== 'All' && c.status !== consultationStatusFilter) return false;
    if (consultationSearchQuery.trim()) {
      const q = consultationSearchQuery.toLowerCase();
      const match =
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.toLowerCase().includes(q)) ||
        (c.occasion && c.occasion.toLowerCase().includes(q)) ||
        (c.preferredFabric && c.preferredFabric.toLowerCase().includes(q)) ||
        (c.id && c.id.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Filtered Client Orders in Admin Tab
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'All' && o.status !== orderStatusFilter) return false;
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const match =
        (o.customerName && o.customerName.toLowerCase().includes(q)) ||
        (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
        (o.email && o.email.toLowerCase().includes(q)) ||
        (o.phone && o.phone.toLowerCase().includes(q)) ||
        (o.id && o.id.toLowerCase().includes(q)) ||
        (o.address && o.address.toLowerCase().includes(q)) ||
        (o.items && o.items.some(item => item.name && item.name.toLowerCase().includes(q)));
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
      department: 'Women',
      collection: 'Timeless Handloom',
      price: Number(newProductForm.price),
      originalPrice: newProductForm.originalPrice ? Number(newProductForm.originalPrice) : Number(newProductForm.price) * 1.1,
      loomDays: Number(newProductForm.loomDays) || 20,
      artisanLocation: newProductForm.artisanLocation || 'Sualkuchi, Assam',
      tag: 'New Atelier Creation',
      description: newProductForm.description || 'Exquisitely handwoven in Sualkuchi using traditional wooden throw-shuttle looms.',
      images: cleanImages.length > 0 ? cleanImages : ['https://thesilkchamber.com/cdn/shop/files/mugasari_4c4c1055-f4e5-4275-929e-47cca7fd8daf.jpg?v=1758283256&width=1800'],
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
      assameseName: editingProduct.assameseName || editingProduct.assamese_name || '',
      assamese_name: editingProduct.assameseName || editingProduct.assamese_name || '',
      fabric: editingProduct.fabric || 'Muga Silk',
      category: editingProduct.category || 'Muga Silk',
      price: Number(editingProduct.price) || 0,
      originalPrice: editingProduct.originalPrice ? Number(editingProduct.originalPrice) : undefined,
      original_price: editingProduct.originalPrice ? Number(editingProduct.originalPrice) : undefined,
      loomDays: Number(editingProduct.loomDays || editingProduct.loom_days) || 20,
      loom_days: Number(editingProduct.loomDays || editingProduct.loom_days) || 20,
      inStock: editingProduct.inStock !== false,
      in_stock: editingProduct.inStock !== false,
      description: editingProduct.description || '',
      images: cleanEditImages.length > 0 ? cleanEditImages : editingProduct.images
    });
    setEditingProduct(null);
  };

  const navTabs = [
    { id: 'overview', label: 'Overview & Pulse', icon: LayoutDashboard },
    { id: 'analytics', label: 'Sales & Revenue', icon: BarChart3 },
    { id: 'catalog', label: 'Catalog & Garments', badge: products.length, icon: Package },
    { id: 'orders', label: 'Client Dispatches', badge: orders.length, icon: ShoppingBag },
    { id: 'consultations', label: 'Bespoke Bridal', badge: pendingConsultationsCount, icon: Calendar },
    { id: 'guilds', label: 'Artisan Guilds', icon: Award }
  ];

  const getOrderStatusBadgeClass = (status) => {
    switch (status) {
      case 'New Order Placed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Loom Quality Inspection':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Preparing Cedar Chest':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Insured Dispatch':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Delivered':
        return 'bg-stone-100 text-stone-800 border-stone-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getConsultationBadgeClass = (status) => {
    switch (status) {
      case 'New':
        return 'bg-amber-500 text-white font-semibold';
      case 'In Discussion':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Loom Assigned':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1A1918] flex flex-col lg:flex-row font-sans selection:bg-[#B69A62]/20 selection:text-[#111111]">
      
      {/* ========================================================================= */}
      {/* 1. LUXURY ATELIER SIDEBAR (Desktop Fixed & Mobile Slide-Over)             */}
      {/* ========================================================================= */}
      
      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#121110] text-[#E8DFD1] flex flex-col justify-between border-r border-[#262420] transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top: Brand Monogram & Status */}
        <div>
          <div className="p-6 border-b border-[#262420]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B69A62] to-[#8C6D23] flex items-center justify-center text-white font-serif text-lg font-light shadow-md">
                  JM
                </div>
                <div>
                  <h2 className="font-serif text-lg tracking-[0.18em] text-[#FFFFFF] font-light leading-none">
                    JUTHIKA
                  </h2>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#B69A62] block mt-1 font-semibold">
                    Atelier Console
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden text-[#E8DFD1]/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Live Database & Looms Status Indicator */}
            <div className="mt-5 px-3 py-2 rounded-lg bg-[#1B1917] border border-[#2B2926] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#E8DFD1]/90 font-medium">
                  {backendStatus === 'connected' ? 'PostgreSQL Live' : 'Atelier Local Active'}
                </span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#2B2926] text-[#B69A62] font-mono">
                Sualkuchi
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <span className="px-3 text-[10px] uppercase tracking-[0.25em] text-[#E8DFD1]/40 font-semibold block mb-2">
              Management
            </span>
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#B69A62] text-[#FFFFFF] font-semibold shadow-md'
                      : 'text-[#E8DFD1]/70 hover:bg-[#1E1C1A] hover:text-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-white' : 'text-[#B69A62]'} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-black/25 text-white' : 'bg-[#2A2825] text-[#B69A62]'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions in Sidebar */}
          <div className="p-4 pt-2 border-t border-[#262420] space-y-2">
            <span className="px-3 text-[10px] uppercase tracking-[0.25em] text-[#E8DFD1]/40 font-semibold block mb-2">
              Atelier Operations
            </span>
            <button
              onClick={handleManualSync}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-[#E8DFD1]/80 hover:bg-[#1E1C1A] hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw size={14} className={`text-[#B69A62] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Live Orders'}</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Restore official 9 authentic Assamese handloom creations to the catalog?')) {
                  resetProducts();
                }
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-[#E8DFD1]/80 hover:bg-[#1E1C1A] hover:text-white transition-colors cursor-pointer"
            >
              <Sparkles size={14} className="text-[#B69A62]" />
              <span>Restore 9 Masterworks</span>
            </button>
            <a
              href={getMainStoreUrl('/')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-[#E8DFD1]/80 hover:bg-[#1E1C1A] hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ExternalLink size={14} className="text-[#B69A62]" />
                <span>Visit Live Boutique</span>
              </div>
              <ArrowUpRight size={12} className="text-[#E8DFD1]/40" />
            </a>
          </div>
        </div>

        {/* Bottom: Curator Director Profile Card */}
        <div className="p-4 border-t border-[#262420] bg-[#100F0E]">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#181615] border border-[#2B2926]">
            <div className="w-9 h-9 rounded-full bg-[#B69A62]/20 border border-[#B69A62]/40 flex items-center justify-center text-[#B69A62] font-semibold text-xs">
              HS
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-medium text-white truncate">Curator Hemanta Saikia</h4>
              <p className="text-[10px] text-[#B69A62] truncate">Master Atelier Director</p>
            </div>
          </div>
        </div>

      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN MODERN APP WORKSPACE                                              */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top App Header Bar */}
        <header className="sticky top-0 z-30 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E5E0D8] px-6 sm:px-8 py-4 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-[#111111] hover:bg-neutral-100 rounded-lg"
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8C6D23] font-semibold">
                <span>Atelier Console</span>
                <span>/</span>
                <span className="text-[#111111]">
                  {navTabs.find(t => t.id === activeTab)?.label}
                </span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal tracking-wide">
                {activeTab === 'overview' && 'Atelier Overview & Pulse'}
                {activeTab === 'analytics' && 'Sales Performance & Analytics Dashboard'}
                {activeTab === 'catalog' && 'Haute Couture Silk Catalog'}
                {activeTab === 'orders' && 'Client Orders & Dispatches'}
                {activeTab === 'consultations' && 'Bespoke Bridal Consultations'}
                {activeTab === 'guilds' && 'Sualkuchi Heritage & Looms'}
              </h1>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-white border border-[#E5E0D8] text-[#111111] hover:bg-neutral-50 rounded-lg text-xs tracking-wider font-medium shadow-2xs transition-all cursor-pointer"
              title="Export Sales Ledger to CSV"
            >
              <Download size={13} className="text-[#8C6D23]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white hover:bg-black rounded-lg text-xs uppercase tracking-[0.2em] font-medium shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              <Plus size={14} className="text-[#B69A62]" />
              <span className="hidden sm:inline">Add Silk Garment</span>
            </button>

            <a
              href={getMainStoreUrl('/')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 border border-[#E5E0D8] bg-white text-[#111111] hover:bg-neutral-50 rounded-lg text-xs tracking-wider transition-colors"
            >
              <ExternalLink size={13} className="text-[#8C6D23]" />
              <span>Live Store</span>
            </a>
          </div>

        </header>

        {/* Workspace Body Content */}
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">

          {/* ===================================================================== */}
          {/* TAB 1: MODERN OVERVIEW & PULSE                                        */}
          {/* ===================================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* 4 Hero KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Metric 1 */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Catalog Worth</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <DollarSign size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#111111] font-medium mb-1">
                    {formatPrice(totalCatalogValue)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                    <CheckCircle2 size={13} />
                    <span>{products.length} Authentic Masterworks</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Client Orders</span>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                      <ShoppingBag size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#111111] font-medium mb-1">
                    {orders.length} Orders
                  </div>
                  <div className="text-xs text-neutral-600 font-medium">
                    Revenue: <strong className="text-neutral-900">{formatPrice(totalRevenue)}</strong>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Bespoke Bridal</span>
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                      <Calendar size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#111111] font-medium mb-1">
                    {consultations.length} Inquiries
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                    <Clock size={13} />
                    <span>{pendingConsultationsCount} Pending Review</span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Active Looms</span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Award size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#111111] font-medium mb-1">
                    48 Looms
                  </div>
                  <div className="text-xs text-neutral-600 font-medium">
                    100% Sualkuchi Fair Trade GI
                  </div>
                </div>

              </div>

              {/* Sales Pulse & Category Distribution Banner */}
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0ECE1] gap-3 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D23] font-semibold block mb-1">
                      Revenue Intelligence & Silk Pulse
                    </span>
                    <h3 className="font-serif text-xl text-[#111111] font-normal">
                      Sales Performance & Category Share
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="px-3 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Download Sales Report"
                    >
                      <Download size={13} className="text-[#8C6D23]" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className="px-3.5 py-1.5 rounded-lg bg-[#111111] text-white hover:bg-black text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                    >
                      <span>Full Analytics Dashboard</span>
                      <ChevronRight size={13} className="text-[#B69A62]" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <DonutPieChart 
                      data={fabricSalesStats} 
                      total={totalRevenue} 
                      formatPrice={formatPrice} 
                    />
                  </div>
                  <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-6 lg:pt-0 lg:pl-8">
                    <div className="mb-4">
                      <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                        Seasonal Revenue Run-Rate
                      </h4>
                      <div className="text-2xl font-serif text-neutral-900 font-semibold">
                        {formatPrice(totalRevenue)}
                      </div>
                      <p className="text-xs text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                        <TrendingUp size={13} />
                        <span>+28.4% growth across festive matrimonial orders</span>
                      </p>
                    </div>
                    <MonthlyRevenueBarChart 
                      monthlyData={monthlyRevenueData.slice(0, 4)} 
                      formatPrice={formatPrice} 
                    />
                  </div>
                </div>
              </div>

              {/* Split Analytics & Feeds */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left (8 Columns): Live Orders & Loom Distribution */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Live Order Feed Card */}
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE1] mb-4">
                      <div>
                        <h3 className="font-serif text-lg text-[#111111] font-normal">
                          Live Client Dispatches & Orders
                        </h3>
                        <p className="text-xs text-neutral-500 font-light mt-0.5">
                          Real-time stream of patron orders and cedarwood heirloom dispatch
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-semibold text-[#8C6D23] hover:text-[#B69A62] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All ({orders.length})</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>

                    <div className="divide-y divide-[#F2EFE9]">
                      {orders.slice(0, 4).map((order) => (
                        <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center justify-center font-serif font-semibold text-sm flex-shrink-0">
                              {(order.customerName || 'P').charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm text-[#111111]">{order.customerName}</span>
                                <span className="text-[10px] font-mono text-neutral-400">({order.id})</span>
                              </div>
                              <p className="text-xs text-neutral-500 truncate max-w-sm sm:max-w-md mt-0.5">
                                {order.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                              </p>
                              <div className="flex items-center gap-3 mt-1 text-[11px] text-neutral-400">
                                <span>{order.address?.split(',').slice(-2).join(',') || 'India'}</span>
                                <span>&bull;</span>
                                <span className="text-neutral-600">{order.paymentMethod || 'VIP Wire'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center sm:flex-col sm:items-end justify-between gap-1 pl-13 sm:pl-0">
                            <span className="font-medium text-sm text-[#111111]">
                              {formatPrice(order.total)}
                            </span>
                            <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border ${getOrderStatusBadgeClass(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Silk Fiber & Loom Capacity Card */}
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                    <h3 className="font-serif text-lg text-[#111111] font-normal mb-1">
                      Atelier Loom Capacity & Silk Distribution
                    </h3>
                    <p className="text-xs text-neutral-500 font-light mb-6">
                      Authentic wild silk fiber allocation across Kamrup throw-shuttle master looms
                    </p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-neutral-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#B69A62]" />
                            Pure Golden Muga Silk (Antheraea assamensis)
                          </span>
                          <span className="font-semibold text-neutral-700">55% (26 Looms Assigned)</span>
                        </div>
                        <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#B69A62] to-[#D4AF37] rounded-full" style={{ width: '55%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-neutral-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
                            Ceremonial Mulberry Paat Silk
                          </span>
                          <span className="font-semibold text-neutral-700">30% (14 Looms Assigned)</span>
                        </div>
                        <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: '30%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-neutral-800 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                            Cruelty-Free Ahimsa Eri Silk (Samia cynthia ricini)
                          </span>
                          <span className="font-semibold text-neutral-700">15% (8 Looms Assigned)</span>
                        </div>
                        <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: '15%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right (4 Columns): Bespoke Inquiries & Atelier Guild Card */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Bespoke Bridal Queue */}
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1] mb-4">
                      <div>
                        <h3 className="font-serif text-lg text-[#111111]">
                          Bridal Inquiries
                        </h3>
                        <p className="text-[11px] text-neutral-400">High-touch client curation</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('consultations')}
                        className="text-xs font-semibold text-[#8C6D23] hover:underline"
                      >
                        All &rarr;
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {consultations.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-3.5 rounded-xl border border-[#F0ECE1] bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className="font-medium text-sm text-[#111111] font-serif">{item.name}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${getConsultationBadgeClass(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 font-light mb-2">
                            {item.occasion} &bull; <strong className="text-neutral-800">{item.preferredFabric}</strong>
                          </p>
                          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-200/50">
                            <span>{item.preferredDate || 'Date Flexible'}</span>
                            {item.phone && (
                              <a
                                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium"
                              >
                                <MessageCircle size={12} />
                                <span>WhatsApp</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sualkuchi Guild Heritage Protection Card */}
                  <div className="rounded-2xl bg-[#141312] text-[#FFFFFF] p-6 border border-[#2B2926] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B69A62]/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-2">
                      GI Tag Verified &bull; Sualkuchi
                    </span>
                    <h4 className="font-serif text-lg text-white font-light mb-2">
                      Hereditary Loom Protection
                    </h4>
                    <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4">
                      Every piece logged in this console connects directly to accredited master weavers in Kamrup. Zero industrial automation, 100% hand-spun gold Guna and silk.
                    </p>
                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-[#B69A62]">
                      <span>Fair Dignity-First Wages</span>
                      <span>Active 2026/27</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 1.5: MODERN SALES & REVENUE ANALYTICS DASHBOARD                  */}
          {/* ===================================================================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Analytics Top Control Bar */}
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D23] font-bold">
                      Live Atelier Analytics
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl text-[#111111] font-normal">
                    Sales Performance & Revenue Intelligence
                  </h2>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">
                    Real-time patron purchase volume, fabric category distribution, and regional delivery economics
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Timeframe Filter Pills */}
                  <div className="flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200 text-xs">
                    {[
                      { id: 'all', label: 'All Time' },
                      { id: '90d', label: 'Last 90D' },
                      { id: '30d', label: 'Last 30D' }
                    ].map(tf => (
                      <button
                        key={tf.id}
                        onClick={() => setAnalyticsTimeframe(tf.id)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                          analyticsTimeframe === tf.id
                            ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                      >
                        {tf.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E5E0D8] hover:bg-neutral-50 rounded-xl text-xs font-medium text-neutral-800 transition-colors shadow-2xs cursor-pointer"
                    title="Export Sales Ledger to CSV"
                  >
                    <Download size={14} className="text-[#8C6D23]" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handleManualSync}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111111] text-white hover:bg-black rounded-xl text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                  >
                    <RefreshCw size={13} className={`text-[#B69A62] ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
                  </button>
                </div>
              </div>

              {/* 4 Primary Financial KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* KPI 1: Gross Sales */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Gross Sales Volume</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <BarChart3 size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#111111] font-semibold mb-1">
                    {formatPrice(totalRevenue)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <TrendingUp size={13} />
                    <span>+32.4% MoM Growth</span>
                  </div>
                </div>

                {/* KPI 2: Average Order Value */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Average Order Value</span>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                      <Target size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#111111] font-semibold mb-1">
                    {formatPrice(averageOrderValue)}
                  </div>
                  <div className="text-xs text-neutral-500">
                    High-touch bespoke bridal average
                  </div>
                </div>

                {/* KPI 3: Units Sold */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Handcrafted Units Sold</span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Package size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#111111] font-semibold mb-1">
                    {totalItemsSold} Garments
                  </div>
                  <div className="text-xs text-neutral-500">
                    Across {orders.length} client dispatches
                  </div>
                </div>

                {/* KPI 4: Fulfillment Rate */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Dispatch Fulfillment</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#111111] font-semibold mb-1">
                    {fulfillmentRate}% Rate
                  </div>
                  <div className="text-xs text-emerald-700 font-medium">
                    {deliveredOrdersCount} dispatches insured & complete
                  </div>
                </div>

              </div>

              {/* Main Grid: Charts & Analytics Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left (7 Columns): Charts */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Card 1: Silk Category Share (Donut Chart) */}
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE1] mb-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <PieChart size={16} className="text-[#8C6D23]" />
                          <h3 className="font-serif text-lg text-[#111111] font-normal">
                            Sales Share by Silk Category
                          </h3>
                        </div>
                        <p className="text-xs text-neutral-500 font-light mt-0.5">
                          Interactive revenue and volume split across Sualkuchi heritage handlooms
                        </p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                        Hover Slices
                      </span>
                    </div>

                    <DonutPieChart 
                      data={fabricSalesStats} 
                      total={totalRevenue} 
                      formatPrice={formatPrice} 
                    />

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={12} className="text-[#B69A62]" />
                        <span>Certified 100% Wild Silk & Pure Zari Guna</span>
                      </span>
                      <span className="font-mono text-[11px] text-neutral-400">GI Reg. Assam</span>
                    </div>
                  </div>

                  {/* Card 2: Seasonal Revenue Trajectory (Bar Chart) */}
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE1] mb-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <BarChart3 size={16} className="text-[#8C6D23]" />
                          <h3 className="font-serif text-lg text-[#111111] font-normal">
                            Seasonal Revenue Trajectory
                          </h3>
                        </div>
                        <p className="text-xs text-neutral-500 font-light mt-0.5">
                          Monthly order run-rate and festival matrimonial spikes
                        </p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-semibold">
                        2025 - 2026
                      </span>
                    </div>

                    <MonthlyRevenueBarChart 
                      monthlyData={monthlyRevenueData} 
                      formatPrice={formatPrice} 
                    />

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-500">
                      <span>Wedding peak concentrated between November & January</span>
                      <span className="text-neutral-700 font-medium">Next peak: Rongali Bihu (April)</span>
                    </div>
                  </div>

                </div>

                {/* Right (5 Columns): Leaderboards, Hubs & Payment Methods */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Top-Selling Masterworks Leaderboard */}
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1] mb-4">
                      <div>
                        <h3 className="font-serif text-lg text-[#111111]">
                          Top-Selling Masterworks
                        </h3>
                        <p className="text-[11px] text-neutral-400">Ranked by gross sales revenue</p>
                      </div>
                      <span className="text-[10px] font-semibold text-[#8C6D23] uppercase tracking-wider">
                        Top 5
                      </span>
                    </div>

                    <div className="space-y-4">
                      {topSellingProducts.map((prod, idx) => (
                        <div key={prod.name} className="group">
                          <div className="flex items-center justify-between gap-3 mb-1.5">
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Rank Badge */}
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-serif font-bold flex-shrink-0 ${
                                idx === 0 
                                  ? 'bg-[#B69A62] text-white shadow-xs' 
                                  : idx === 1 
                                    ? 'bg-neutral-300 text-neutral-800' 
                                    : idx === 2 
                                      ? 'bg-amber-100 text-amber-900' 
                                      : 'bg-neutral-100 text-neutral-600'
                              }`}>
                                #{idx + 1}
                              </div>

                              {/* Thumbnail */}
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
                                <img 
                                  src={prod.image} 
                                  alt={prod.name} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>

                              <div className="min-w-0">
                                <h4 className="text-xs font-medium text-neutral-900 truncate">
                                  {prod.name}
                                </h4>
                                <span className="text-[10px] text-[#8C6D23] font-serif">
                                  {prod.fabric}
                                </span>
                              </div>
                            </div>

                            <div className="text-right flex-shrink-0">
                              <span className="text-xs font-serif font-semibold text-neutral-900 block">
                                {formatPrice(prod.revenue)}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                {prod.units} sold
                              </span>
                            </div>
                          </div>

                          {/* Progress Meter */}
                          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#B69A62] to-[#8C6D23] rounded-full transition-all duration-500"
                              style={{ width: `${prod.percentOfTop}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regional Dispatch Share */}
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1] mb-4">
                      <div>
                        <h3 className="font-serif text-lg text-[#111111]">
                          Regional Dispatch Hubs
                        </h3>
                        <p className="text-[11px] text-neutral-400">Geographical patron concentration</p>
                      </div>
                      <MapPin size={15} className="text-[#8C6D23]" />
                    </div>

                    <div className="space-y-3.5">
                      {regionalHubStats.map((hub) => (
                        <div key={hub.name}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-medium text-neutral-800 flex items-center gap-1.5 truncate">
                              <span>{hub.icon}</span>
                              <span className="truncate">{hub.name}</span>
                            </span>
                            <span className="font-serif font-semibold text-neutral-900 ml-2">
                              {formatPrice(hub.revenue)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-neutral-800 rounded-full" 
                                style={{ width: `${Math.max(5, hub.percentage)}%` }} 
                              />
                            </div>
                            <span className="text-[10px] font-semibold text-neutral-500 w-8 text-right">
                              {hub.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Channel Breakdown */}
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1] mb-4">
                      <div>
                        <h3 className="font-serif text-lg text-[#111111]">
                          Payment Channels
                        </h3>
                        <p className="text-[11px] text-neutral-400">Patron transaction preferences</p>
                      </div>
                      <CreditCard size={15} className="text-[#8C6D23]" />
                    </div>

                    <div className="space-y-3">
                      {paymentMethodStats.map((method) => (
                        <div key={method.name} className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-neutral-900">
                              {method.name}
                            </span>
                            <span className="text-xs font-serif font-bold text-neutral-900">
                              {formatPrice(method.revenue)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-neutral-400">
                            <span>{method.badge}</span>
                            <span className="font-semibold text-neutral-700">{method.percentage}% ({method.count} orders)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Comprehensive Sales Transaction Ledger Table */}
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0ECE1] gap-3 mb-4">
                  <div>
                    <h3 className="font-serif text-lg text-[#111111]">
                      Detailed Sales Ledger
                    </h3>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">
                      Itemized breakdown of all haute couture customer purchases
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      <Download size={13} className="text-[#8C6D23]" />
                      <span>Download CSV Spreadsheet</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#111111] text-white hover:bg-black text-xs font-medium cursor-pointer transition-colors"
                    >
                      <span>Manage Dispatches</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E5E0D8] text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                        <th className="py-3 px-3">Order ID</th>
                        <th className="py-3 px-3">Order Date</th>
                        <th className="py-3 px-3">Patron</th>
                        <th className="py-3 px-3">Garments Purchased</th>
                        <th className="py-3 px-3">Payment Channel</th>
                        <th className="py-3 px-3 text-right">Order Total</th>
                        <th className="py-3 px-3 text-center">Fulfillment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2EFE9]">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="py-3.5 px-3 font-mono font-medium text-neutral-700">
                            {o.id}
                          </td>
                          <td className="py-3.5 px-3 whitespace-nowrap text-neutral-600">
                            <span className="font-medium text-neutral-900 block">{formatDateForDisplay(o.createdAt)}</span>
                            <span className="text-[10px] text-neutral-400">Insured Dispatch</span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="font-medium text-neutral-900 block">{o.customerName || o.customer_name}</span>
                            <span className="text-[10px] text-neutral-400 truncate max-w-[180px] block">
                              {o.address?.split(',').slice(-2).join(',') || 'India'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 max-w-xs">
                            <p className="text-neutral-700 truncate">
                              {(o.items || []).map(i => `${i.name} (x${i.quantity || 1})`).join(', ') || 'Custom Handloom'}
                            </p>
                          </td>
                          <td className="py-3.5 px-3 text-neutral-600">
                            {o.paymentMethod || 'VIP Wire'}
                          </td>
                          <td className="py-3.5 px-3 text-right font-serif font-bold text-neutral-900">
                            {formatPrice(o.total)}
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border ${getOrderStatusBadgeClass(o.status)}`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: MODERN CATALOG & GARMENTS                                      */}
          {/* ===================================================================== */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Modern Search & Filter Controls Toolbar */}
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs space-y-4">
                
                {/* Search Bar + Primary Action Buttons */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search creations by name, Assamese script, fabric, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#B69A62] focus:bg-white transition-colors"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Mode Toggle */}
                    <div className="flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-lg text-xs ${viewMode === 'grid' ? 'bg-white shadow-xs text-neutral-900 font-medium' : 'text-neutral-500'}`}
                        title="Grid View"
                      >
                        <Grid size={15} />
                      </button>
                      <button
                        onClick={() => setViewMode('table')}
                        className={`p-1.5 rounded-lg text-xs ${viewMode === 'table' ? 'bg-white shadow-xs text-neutral-900 font-medium' : 'text-neutral-500'}`}
                        title="Table View"
                      >
                        <List size={15} />
                      </button>
                    </div>

                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="px-4 py-2.5 bg-[#111111] text-white hover:bg-black rounded-xl text-xs uppercase tracking-wider font-medium flex items-center gap-2 cursor-pointer shadow-xs transition-all"
                    >
                      <Plus size={14} className="text-[#B69A62]" />
                      <span>Add Garment</span>
                    </button>
                  </div>
                </div>

                {/* Filter Pills (Fabric + Category) */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mr-1">Fabric:</span>
                    {['All', 'Muga Silk', 'Paat Silk', 'Eri Silk', 'Kesa Paat'].map((fabric) => (
                      <button
                        key={fabric}
                        onClick={() => setSelectedFabricFilter(fabric)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          selectedFabricFilter === fabric
                            ? 'bg-[#111111] text-white'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {fabric}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400">
                      Showing <strong className="text-neutral-800">{filteredCatalog.length}</strong> of {products.length} Garments
                    </span>
                    <button
                      onClick={() => {
                        if (window.confirm('Restore official 9 authentic Assamese handloom creations to the catalog?')) {
                          resetProducts();
                        }
                      }}
                      className="text-xs text-[#8C6D23] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Sparkles size={12} />
                      <span>Restore Official 9</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Garment Grid View */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCatalog.map((product) => (
                    <div 
                      key={product.id}
                      className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                        <img 
                          src={product.images?.[0] || 'https://thesilkchamber.com/cdn/shop/files/mugasari_4c4c1055-f4e5-4275-929e-47cca7fd8daf.jpg?v=1758283256&width=1800'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        
                        {/* Floating Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          <span className="px-2.5 py-1 bg-black/80 backdrop-blur-xs text-[#E8DFD1] text-[10px] uppercase tracking-wider rounded-md font-semibold">
                            {product.fabric}
                          </span>
                          {product.images?.length > 1 && (
                            <span className="px-2 py-0.5 bg-white/90 backdrop-blur-xs text-neutral-800 text-[9px] rounded-md font-medium">
                              {product.images.length} Photos
                            </span>
                          )}
                        </div>

                        {/* In-Stock Pill on Image */}
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => updateProduct(product.id, { inStock: product.inStock === false })}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5 ${
                              product.inStock !== false
                                ? 'bg-emerald-500 text-white'
                                : 'bg-rose-500 text-white'
                            }`}
                            title="Click to toggle stock status"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>{product.inStock !== false ? 'In Stock' : 'Sold Out'}</span>
                          </button>
                        </div>

                        {/* Hover Quick Action Buttons */}
                        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="flex-1 py-2 bg-white text-neutral-900 rounded-lg text-xs uppercase tracking-wider font-semibold shadow-md hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 size={13} />
                            <span>Edit Garment</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Remove "${product.name}" from the atelier catalog?`)) {
                                deleteProduct(product.id);
                              }
                            }}
                            className="p-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 shadow-md transition-colors cursor-pointer"
                            title="Delete Garment"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Card Content Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-serif text-base text-[#111111] font-normal leading-snug line-clamp-1">
                              {product.name}
                            </h3>
                          </div>
                          {(product.assameseName || product.assamese_name) && (
                            <p className="text-xs text-[#8C6D23] font-light mb-2.5">
                              {product.assameseName || product.assamese_name}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Clock size={12} className="text-neutral-400" />
                              <span>{product.loomDays || product.loom_days || 25} Loom Days</span>
                            </span>
                            <span>&bull;</span>
                            <span className="text-neutral-600 truncate max-w-[120px]">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        {/* Pricing & Stock Details Footer */}
                        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                          <div>
                            <span className="text-sm font-semibold text-[#111111] block">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-[11px] text-neutral-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                            {product.id}
                          </span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                /* Garment Table View */
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider text-[10px] font-semibold border-b border-neutral-200">
                        <tr>
                          <th className="py-3.5 px-4">Garment</th>
                          <th className="py-3.5 px-4">Fabric & Category</th>
                          <th className="py-3.5 px-4">Loom Time</th>
                          <th className="py-3.5 px-4">Price</th>
                          <th className="py-3.5 px-4">Stock Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {filteredCatalog.map((product) => (
                          <tr key={product.id} className="hover:bg-neutral-50/70 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.images?.[0] || 'https://thesilkchamber.com/cdn/shop/files/mugasari_4c4c1055-f4e5-4275-929e-47cca7fd8daf.jpg?v=1758283256&width=1800'}
                                  alt={product.name}
                                  className="w-11 h-14 object-cover rounded-lg border border-neutral-200"
                                />
                                <div>
                                  <div className="font-serif text-sm text-neutral-900 font-medium">
                                    {product.name}
                                  </div>
                                  <div className="text-[11px] text-[#8C6D23]">
                                    {product.assameseName || product.assamese_name}
                                  </div>
                                  <span className="text-[9px] font-mono text-neutral-400">{product.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-800 font-medium text-[11px]">
                                {product.fabric}
                              </span>
                              <div className="text-[11px] text-neutral-400 mt-1">{product.category}</div>
                            </td>
                            <td className="py-3.5 px-4 text-neutral-600">
                              {product.loomDays || product.loom_days || 25} Days
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-neutral-900">{formatPrice(product.price)}</div>
                              {product.originalPrice && (
                                <div className="text-[10px] text-neutral-400 line-through">
                                  {formatPrice(product.originalPrice)}
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => updateProduct(product.id, { inStock: product.inStock === false })}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer ${
                                  product.inStock !== false
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}
                              >
                                {product.inStock !== false ? '● In Stock' : '● Sold Out'}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => setEditingProduct(product)}
                                  className="p-1.5 hover:bg-neutral-100 text-neutral-700 rounded-lg cursor-pointer"
                                  title="Edit"
                                >
                                  <Edit3 size={14} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Remove "${product.name}"?`)) {
                                      deleteProduct(product.id);
                                    }
                                  }}
                                  className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 3: MODERN CLIENT ORDERS & DISPATCHES                              */}
          {/* ===================================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Order Search & Status Filter Controls */}
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search orders by customer name, order ID, phone, address, or item..."
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#B69A62] focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleManualSync}
                      className="px-3.5 py-2.5 border border-neutral-200 bg-white hover:bg-neutral-50 rounded-xl text-xs flex items-center gap-2 text-neutral-700 cursor-pointer"
                    >
                      <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
                      <span>Sync Orders</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-neutral-100">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mr-1">Status:</span>
                  {[
                    'All',
                    'New Order Placed',
                    'Loom Quality Inspection',
                    'Preparing Cedar Chest',
                    'Insured Dispatch',
                    'Delivered'
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        orderStatusFilter === status
                          ? 'bg-[#111111] text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Cards List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-12 text-center text-neutral-400">
                    <ShoppingBag size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No client orders match the current filter criteria.</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow"
                    >
                      {/* Top Bar: Order ID, Date, Amount, Status Selector */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-neutral-100 gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] flex items-center justify-center font-serif font-bold text-base">
                            {(order.customerName || 'P').charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-semibold text-[#111111]">{order.id}</span>
                              <span className="text-[10px] text-neutral-400">
                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                              </span>
                            </div>
                            <h3 className="font-medium text-sm text-neutral-900 mt-0.5">{order.customerName}</h3>
                          </div>
                        </div>

                        {/* Status Dropdown & Total */}
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Total Amount</span>
                            <span className="font-serif text-base font-semibold text-neutral-900">
                              {formatPrice(order.total)}
                            </span>
                          </div>

                          <div className="relative">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className={`text-xs font-medium px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${getOrderStatusBadgeClass(order.status)}`}
                            >
                              <option value="New Order Placed">New Order Placed</option>
                              <option value="Loom Quality Inspection">Loom Quality Inspection</option>
                              <option value="Preparing Cedar Chest">Preparing Cedar Chest</option>
                              <option value="Insured Dispatch">Insured Dispatch</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm(`Archive order ${order.id}?`)) {
                                deleteOrder(order.id);
                              }
                            }}
                            className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Archive Order"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Middle: Items & Customer Details */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        {/* Ordered Items (7 cols) */}
                        <div className="md:col-span-7 space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                            Heirloom Garments Selected ({order.items?.length || 0})
                          </span>
                          <div className="space-y-2">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-neutral-50/70 border border-neutral-100">
                                <div>
                                  <span className="font-medium text-neutral-900">{item.name}</span>
                                  <div className="text-[10px] text-neutral-500">
                                    Size: {item.selectedSize || 'Standard'} &bull; Qty: {item.quantity || 1}
                                  </div>
                                </div>
                                <span className="font-medium text-neutral-800">
                                  {formatPrice(item.price * (item.quantity || 1))}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Customer Address & Payment (5 cols) */}
                        <div className="md:col-span-5 space-y-2 text-xs border-t md:border-t-0 md:border-l border-neutral-100 md:pl-6 pt-3 md:pt-0">
                          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                            Dispatch & Contact Information
                          </span>
                          <p className="text-neutral-700 leading-relaxed font-light">
                            <MapPin size={12} className="inline mr-1 text-[#8C6D23]" />
                            {order.address || 'Address pending client confirmation'}
                          </p>
                          <div className="pt-2 text-neutral-500 space-y-1">
                            {order.phone && (
                              <p className="flex items-center gap-1.5">
                                <Phone size={11} className="text-neutral-400" />
                                <span>{order.phone}</span>
                                <a
                                  href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-700 text-[10px] hover:underline font-medium"
                                >
                                  (WhatsApp)
                                </a>
                              </p>
                            )}
                            {order.email && (
                              <p className="flex items-center gap-1.5">
                                <Mail size={11} className="text-neutral-400" />
                                <span>{order.email}</span>
                              </p>
                            )}
                            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mt-1">
                              Payment: <strong className="text-neutral-800">{order.paymentMethod || 'VIP Wire'}</strong>
                            </p>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 4: MODERN BESPOKE BRIDAL CONSULTATIONS                            */}
          {/* ===================================================================== */}
          {activeTab === 'consultations' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search bespoke appointments by patron name, phone, occasion, or silk..."
                      value={consultationSearchQuery}
                      onChange={(e) => setConsultationSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#B69A62] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-neutral-100">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mr-1">Status:</span>
                  {['All', 'New', 'In Discussion', 'Loom Assigned', 'Completed', 'Archived'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setConsultationStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        consultationStatusFilter === status
                          ? 'bg-[#111111] text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConsultations.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border ${getConsultationBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">{item.id}</span>
                      </div>

                      <h3 className="font-serif text-lg text-neutral-900 font-medium mb-1">
                        {item.name}
                      </h3>
                      <div className="text-xs text-[#8C6D23] font-medium mb-3">
                        {item.occasion} &bull; {item.preferredFabric}
                      </div>

                      <div className="space-y-2 text-xs text-neutral-600 mb-4 bg-neutral-50/70 p-3.5 rounded-xl border border-neutral-100">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-neutral-400" />
                          <span>Appt Date: <strong>{item.preferredDate || 'To be scheduled'}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-neutral-400" />
                          <span className="truncate">{item.consultationType || 'Guwahati Flagship Atelier'}</span>
                        </div>
                        {item.message && (
                          <p className="text-[11px] text-neutral-500 italic pt-1 border-t border-neutral-200/50">
                            &ldquo;{item.message}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {item.phone && (
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-medium flex items-center gap-1"
                          >
                            <MessageCircle size={12} />
                            <span>WhatsApp</span>
                          </a>
                        )}
                        {item.email && (
                          <a
                            href={`mailto:${item.email}`}
                            className="p-1.5 hover:bg-neutral-100 text-neutral-600 rounded-lg"
                            title="Send Email"
                          >
                            <Mail size={14} />
                          </a>
                        )}
                      </div>

                      <select
                        value={item.status}
                        onChange={(e) => updateConsultationStatus(item.id, e.target.value)}
                        className="text-xs font-medium px-2 py-1 rounded-lg border border-neutral-200 bg-white focus:outline-none cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Loom Assigned">Loom Assigned</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 5: MODERN ARTISAN GUILDS & HERITAGE                               */}
          {/* ===================================================================== */}
          {activeTab === 'guilds' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-8 shadow-xs">
                <div className="max-w-3xl">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6D23] font-semibold block mb-2">
                    Living Heritage &bull; Fair Trade Sualkuchi
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-light mb-3">
                    Kamrup Silk Weaver Guild Registry
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-8">
                    Juthika by Momita operates as an artisanal sanctuary. We collaborate directly with 45+ hereditary master weaver families across Sualkuchi, ensuring fair-trade living dignity wages, healthcare security, and complete protection of the GI Tag for pure Assamese Muga and Paat silks.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Active Guilds</span>
                      <span className="font-serif text-2xl text-neutral-900">3 Master Cooperatives</span>
                      <span className="text-[11px] text-emerald-700 block mt-1">Sualkuchi, Hajo & Kamrup</span>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Throw-Shuttle Looms</span>
                      <span className="font-serif text-2xl text-neutral-900">48 Heritage Looms</span>
                      <span className="text-[11px] text-neutral-600 block mt-1">100% Traditional Extra-Weft</span>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">GI Tag Authenticity</span>
                      <span className="font-serif text-2xl text-neutral-900">Govt Reg. #GI-44</span>
                      <span className="text-[11px] text-[#8C6D23] block mt-1">Zero Synthetic Blends</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. MODAL: ADD NEW SILK GARMENT                                            */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E5E5E5] shadow-2xl p-6 sm:p-8 my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-[#111111]/60 hover:text-[#111111] cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#111111] font-semibold block mb-1">
                Atelier Masterwork Curation
              </span>
              <h3 className="font-serif text-2xl text-[#111111]">
                Add New Garment to Catalog
              </h3>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Garment Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    placeholder="e.g. Royal Singkhap Muga Mekhela"
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Assamese Script Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={newProductForm.assameseName}
                    onChange={(e) => setNewProductForm({ ...newProductForm, assameseName: e.target.value })}
                    placeholder="e.g. ৰাজকীয় সোণালী মুগা"
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Silk Fabric *
                  </label>
                  <select
                    value={newProductForm.fabric}
                    onChange={(e) => setNewProductForm({ ...newProductForm, fabric: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  >
                    <option value="Muga Silk">Muga Silk (Wild Gold)</option>
                    <option value="Eri Silk">Eri Silk (Ahimsa Peace Silk)</option>
                    <option value="Paat Silk">Paat Silk (Royal Mulberry)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Category *
                  </label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    placeholder="68500"
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Loom Days *
                  </label>
                  <input
                    type="number"
                    value={newProductForm.loomDays}
                    onChange={(e) => setNewProductForm({ ...newProductForm, loomDays: e.target.value })}
                    placeholder="28"
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Multiple Photography Angles Manager */}
              <div className="space-y-3 pt-2 pb-1 border-y border-[#E5E5E5]/60">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] text-[#111111] font-medium">
                      Garment Photography & Multiple Angles *
                    </label>
                    <p className="text-[11px] text-[#111111]/60 font-light">
                      Add 2, 3 or more photos showing different angles (Front, Side, Close-up) for the thumbnail gallery.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddImageField}
                    className="text-[10px] uppercase tracking-wider font-semibold text-[#111111] hover:opacity-70 flex items-center gap-1 border-b border-[#111111] pb-0.5 cursor-pointer"
                  >
                    <Plus size={10} />
                    <span>Add Angle</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {newProductForm.images?.map((imgUrl, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-[#FAFAFA] border border-[#E5E5E5]">
                      {/* Live Thumbnail Preview */}
                      <div className="w-10 h-12 bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {imgUrl ? (
                          <img 
                            src={imgUrl} 
                            alt={`Angle ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <span className="text-[9px] text-[#111111]/40 text-center font-mono">No Image</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] uppercase tracking-wider text-[#111111] font-semibold">
                            {idx === 0 ? 'Angle 1: Main Front Standing View *' : idx === 1 ? 'Angle 2: Side Profile View' : idx === 2 ? 'Angle 3: Sitting / Pallu Detail View' : `Angle ${idx + 1}`}
                          </span>
                          {idx === 0 && (
                            <span className="text-[9px] text-[#111111]/50 uppercase tracking-widest">Default Cover</span>
                          )}
                        </div>
                        <input
                          type="url"
                          required={idx === 0}
                          value={imgUrl}
                          onChange={(e) => handleImageChange(idx, e.target.value)}
                          placeholder="Paste image URL (https://...)"
                          className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#111111]"
                        />
                      </div>

                      {newProductForm.images?.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImageField(idx)}
                          className="p-1.5 text-[#111111]/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
                  <span className="text-[9px] text-[#111111]/60 uppercase tracking-wider block mb-1">
                    Quick Preset Samples (click to add as another angle):
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAddPresetToForm(preset.url)}
                        className="text-[9px] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#111111] text-[#111111]/80 hover:text-black hover:opacity-70 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Plus size={9} />
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                  Weaving Description
                </label>
                <textarea
                  rows={3}
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  placeholder="Describe the motifs, Sualkuchi artisans, and silk texture..."
                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-[#111111] text-xs uppercase tracking-wider text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#111111] text-[#FFFFFF] hover:bg-[#222222] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
                >
                  Add to Atelier Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: EDIT EXISTING SILK GARMENT                                      */}
      {/* ========================================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E5E5E5] shadow-2xl p-6 sm:p-8 my-8">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-[#111111]/60 hover:text-[#111111] cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#111111] font-semibold block mb-1">
                Edit Atelier Garment
              </span>
              <h3 className="font-serif text-2xl text-[#111111]">
                {editingProduct.name}
              </h3>
              <span className="text-[10px] font-mono text-[#111111]">
                {editingProduct.id ? editingProduct.id.replace(/^ax-/i, 'jm-') : ''}
              </span>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Garment Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Assamese Script Title
                  </label>
                  <input
                    type="text"
                    value={editingProduct.assameseName || editingProduct.assamese_name || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      assameseName: e.target.value,
                      assamese_name: e.target.value 
                    })}
                    placeholder="e.g. ৰাজকীয় সোণালী মুগা"
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Silk Fabric *
                  </label>
                  <select
                    value={editingProduct.fabric || 'Muga Silk'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fabric: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  >
                    <option value="Muga Silk">Muga Silk (Wild Gold)</option>
                    <option value="Eri Silk">Eri Silk (Ahimsa Peace Silk)</option>
                    <option value="Paat Silk">Paat Silk (Royal Mulberry)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Category *
                  </label>
                  <select
                    value={editingProduct.category || 'Muga Silk'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Original / Comparison Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || editingProduct.original_price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value, original_price: e.target.value })}
                    placeholder="Optional list price"
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                    Loom Days *
                  </label>
                  <input
                    type="number"
                    value={editingProduct.loomDays ?? editingProduct.loom_days ?? 20}
                    onChange={(e) => setEditingProduct({ ...editingProduct, loomDays: e.target.value, loom_days: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Stock Status Toggle */}
              <div className="p-3 border border-[#E5E5E5] bg-stone-50 flex items-center justify-between">
                <div>
                  <span className="block uppercase tracking-wider text-[10px] text-[#111111] font-medium">
                    Inventory Status
                  </span>
                  <p className="text-[11px] text-[#111111]/60 font-light">
                    When toggled on, garment shows as "In Stock" with rapid dispatch. When off, displays "Made to Order".
                  </p>
                </div>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock !== false && editingProduct.in_stock !== false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked, in_stock: e.target.checked })}
                    className="w-4 h-4 accent-[#111111]"
                  />
                  <span className="text-xs font-medium text-[#111111]">
                    {editingProduct.inStock !== false && editingProduct.in_stock !== false ? 'In Stock & Ready' : 'Made to Order'}
                  </span>
                </label>
              </div>

              {/* Photo Angles Manager for Edit Modal */}
              <div className="space-y-3 pt-2 pb-1 border-y border-[#E5E5E5]/60">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] text-[#111111] font-medium">
                      Garment Photography & Angles ({editingProduct.images?.length || 0})
                    </label>
                    <p className="text-[11px] text-[#111111]/60 font-light">
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
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#111111] text-white hover:bg-black transition-colors cursor-pointer"
                  >
                    <Plus size={11} />
                    <span>Add Angle</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {(editingProduct.images || []).map((imgUrl, idx) => (
                    <div key={idx} className="p-2 border border-[#E5E5E5] bg-white flex items-center gap-2.5">
                      <div className="w-10 h-12 bg-stone-100 border border-[#E5E5E5] flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {imgUrl ? (
                          <img 
                            src={imgUrl} 
                            alt={`Angle ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <span className="text-[8px] text-[#111111]/40 text-center font-mono">No Image</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] text-[#111111] font-semibold block uppercase">
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
                          className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-2 py-1 text-xs focus:outline-none focus:border-[#111111]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingProduct.images || []).filter((_, i) => i !== idx);
                          setEditingProduct({ ...editingProduct, images: updated });
                        }}
                        className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                        title="Delete photo angle"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-[#111111] mb-1 font-medium">
                  Weaving Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 border border-[#111111] text-xs uppercase tracking-wider text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#111111] text-[#FFFFFF] hover:bg-[#222222] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
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
