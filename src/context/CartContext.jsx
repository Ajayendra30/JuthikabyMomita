import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { api, normalizeProduct, normalizeConsultation, normalizeOrder } from '../services/api';

const CartContext = createContext();

const INITIAL_CONSULTATIONS = [
  {
    id: 'AX-BR-829104',
    name: 'Ananya Hazarika',
    email: 'ananya.h@couture.com',
    phone: '+91 9279125091',
    occasion: 'Bridal Matrimony',
    preferredFabric: 'Pure Muga Silk',
    consultationType: 'Guwahati Flagship Atelier (In-Person)',
    preferredDate: '2026-11-15',
    message: 'Looking for a royal Kingkhap Muga Mekhela Chador with antique gold Guna zari and matching Riha for my winter wedding.',
    status: 'New',
    createdAt: '2026-10-22T10:30:00.000Z'
  },
  {
    id: 'AX-BR-419082',
    name: 'Meenakshi Bordoloi',
    email: 'meenakshi.b@silkpatron.org',
    phone: '+91 98112 34567',
    occasion: 'Reception Gala',
    preferredFabric: 'Ceremonial Paat Silk',
    consultationType: 'New Delhi Private Suite (In-Person)',
    preferredDate: '2026-11-28',
    message: 'Seeking a heavy vermilion Paat silk saree with kalka border and bespoke blouse tailoring.',
    status: 'In Discussion',
    createdAt: '2026-10-21T14:15:00.000Z'
  },
  {
    id: 'AX-BR-993021',
    name: 'Rohan & Gayatri Sharma',
    email: 'rohan.sharma@sanctuary.in',
    phone: '+91 97170 88990',
    occasion: 'Trousseau Curation',
    preferredFabric: 'Muga-Paat Hybrid',
    consultationType: 'High-Definition Virtual Video Atelier (Global)',
    preferredDate: '2026-12-05',
    message: 'Planning complete bridal trousseau including 2 Muga Mekhela Chadors and 1 Ahimsa Eri wrap.',
    status: 'Loom Assigned',
    createdAt: '2026-10-20T09:00:00.000Z'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'AX-ORD-740192',
    customerName: 'Priyanka Saikia',
    email: 'priyanka.s@gmail.com',
    phone: '+91 98641 22334',
    address: 'Brahmaputra Enclave, Uzanbazar, Guwahati, Assam 781001',
    items: [
      {
        name: 'Royal Kingkhap Muga Mekhela Chador',
        price: 68500,
        selectedSize: 'Standard Unstitched',
        quantity: 1
      }
    ],
    total: 68500,
    paymentMethod: 'VIP Concierge Wire / Card Payment Link',
    status: 'Loom Quality Inspection',
    createdAt: '2026-10-22T08:45:00.000Z'
  },
  {
    id: 'AX-ORD-519283',
    customerName: 'Siddharth & Devika Sen',
    email: 'devika.sen@mumbai.co',
    phone: '+91 98200 44556',
    address: 'Altamount Road, Cumballa Hill, Mumbai, MH 400026',
    items: [
      {
        name: 'Ahimsa Raw Almond Eri Silk Cocoon Wrap',
        price: 24500,
        selectedSize: 'One Size Luxury Wrap (2.6m x 1.1m)',
        quantity: 1
      }
    ],
    total: 24500,
    paymentMethod: 'White-Glove Cash On Delivery',
    status: 'Insured Dispatch',
    createdAt: '2026-10-21T16:20:00.000Z'
  }
];

export const CartProvider = ({ children }) => {
  // Shopping Cart state
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('aiaxom_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error('Error reading cart from localStorage', err);
      return [];
    }
  });

  // Dynamic Catalog state (persisted in localStorage + synced with FastAPI/Supabase)
  const [products, setProducts] = useState(() => {
    try {
      const deletedIds = new Set(JSON.parse(localStorage.getItem('aiaxom_deleted_product_ids') || '[]'));
      const savedProducts = localStorage.getItem('aiaxom_products');
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        // Clean out any explicitly deleted IDs, ax-velvet-01, or contemporary-velvet photos
        const filtered = parsed.filter(p => 
          p && 
          p.id !== 'ax-velvet-01' && 
          !deletedIds.has(p.id) &&
          !p.images?.some(img => typeof img === 'string' && img.includes('contemporary-velvet'))
        );
        try {
          localStorage.setItem('aiaxom_products', JSON.stringify(filtered));
        } catch (e) {}
        return filtered.map(normalizeProduct);
      }
      return INITIAL_PRODUCTS
        .filter(p => p.id !== 'ax-velvet-01' && !deletedIds.has(p.id))
        .map(normalizeProduct);
    } catch (err) {
      console.error('Error reading products from localStorage', err);
      return INITIAL_PRODUCTS.filter(p => p.id !== 'ax-velvet-01').map(normalizeProduct);
    }
  });

  // Consultations state
  const [consultations, setConsultations] = useState(() => {
    try {
      const saved = localStorage.getItem('aiaxom_consultations');
      return saved ? JSON.parse(saved).map(normalizeConsultation) : INITIAL_CONSULTATIONS.map(normalizeConsultation);
    } catch (err) {
      console.error('Error reading consultations from localStorage', err);
      return INITIAL_CONSULTATIONS.map(normalizeConsultation);
    }
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aiaxom_orders');
      return saved ? JSON.parse(saved).map(normalizeOrder) : INITIAL_ORDERS.map(normalizeOrder);
    } catch (err) {
      console.error('Error reading orders from localStorage', err);
      return INITIAL_ORDERS.map(normalizeOrder);
    }
  });

  // User Authentication state
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('aiaxom_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error('Error reading user from localStorage', err);
      return null;
    }
  });

  // Client Wishlist state (persisted in localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('aiaxom_wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : ['ax-muga-01', 'ax-bridal-01'];
    } catch (err) {
      console.error('Error reading wishlist from localStorage', err);
      return [];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Backend connection status state
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'connected' | 'offline'
  const [backendInfo, setBackendInfo] = useState({
    supabase_connected: false,
    database_type: 'Offline Local Mode'
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('aiaxom_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('aiaxom_user');
      }
    } catch (err) {
      console.error('Error writing user to localStorage', err);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('aiaxom_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Error writing cart to localStorage', err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aiaxom_products', JSON.stringify(products));
    } catch (err) {
      console.error('Error writing products to localStorage', err);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('aiaxom_consultations', JSON.stringify(consultations));
    } catch (err) {
      console.error('Error writing consultations to localStorage', err);
    }
  }, [consultations]);

  useEffect(() => {
    try {
      localStorage.setItem('aiaxom_orders', JSON.stringify(orders));
    } catch (err) {
      console.error('Error writing orders to localStorage', err);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('aiaxom_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.error('Error writing wishlist to localStorage', err);
    }
  }, [wishlist]);

  // Flash notification helper
  const showNotification = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  }, []);

  // ---------------------------------------------------------------------------
  // BACKEND SYNCHRONIZATION
  // ---------------------------------------------------------------------------
  const syncWithBackend = useCallback(async () => {
    try {
      setBackendStatus('checking');
      const health = await api.checkHealth();
      if (health.online) {
        setBackendStatus('connected');
        setBackendInfo({
          supabase_connected: Boolean(health.supabase_connected),
          database_type: health.database_type || (health.supabase_connected ? 'Supabase PostgreSQL' : 'FastAPI Memory Store')
        });

        // Hydrate products from FastAPI backend
        try {
          const apiProducts = await api.getProducts();
          if (Array.isArray(apiProducts) && apiProducts.length > 0) {
            setProducts(apiProducts);
          }
        } catch (e) {
          console.warn('Could not hydrate products from backend:', e);
        }

        // Hydrate consultations
        try {
          const apiConsultations = await api.getConsultations();
          if (Array.isArray(apiConsultations) && apiConsultations.length > 0) {
            setConsultations(apiConsultations);
          }
        } catch (e) {
          console.warn('Could not hydrate consultations from backend:', e);
        }

        // Hydrate orders
        try {
          const apiOrders = await api.getOrders();
          if (Array.isArray(apiOrders) && apiOrders.length > 0) {
            setOrders(apiOrders);
          }
        } catch (e) {
          console.warn('Could not hydrate orders from backend:', e);
        }
      } else {
        setBackendStatus('offline');
        setBackendInfo({
          supabase_connected: false,
          database_type: 'Offline Local Browser Mode'
        });
      }
    } catch {
      setBackendStatus('offline');
    }
  }, []);

  useEffect(() => {
    syncWithBackend();
  }, [syncWithBackend]);

  // ---------------------------------------------------------------------------
  // CART OPERATIONS
  // ---------------------------------------------------------------------------
  const addToCart = (product, selectedSize = null, quantity = 1) => {
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            selectedSize: size,
            quantity: quantity,
            addedAt: Date.now()
          }
        ];
      }
    });

    showNotification(`Added "${product.name}" to your shopping bag.`);
  };

  const updateQuantity = (productId, selectedSize, delta) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === productId && item.selectedSize === selectedSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart(prevCart =>
      prevCart.filter(item => !(item.id === productId && item.selectedSize === selectedSize))
    );
    showNotification('Item removed from your shopping bag.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  // ---------------------------------------------------------------------------
  // WISHLIST OPERATIONS
  // ---------------------------------------------------------------------------
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showNotification(
        exists ? 'Garment removed from your private wishlist.' : 'Garment saved to your private wishlist.'
      );
      return updated;
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    showNotification('All items removed from wishlist.');
  };

  const isInWishlist = (productId) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // ---------------------------------------------------------------------------
  // CATALOG OPERATIONS (Admin)
  // ---------------------------------------------------------------------------
  const addProduct = async (newProduct) => {
    const productWithId = normalizeProduct({
      ...newProduct,
      id: newProduct.id || `ax-custom-${Date.now()}`
    });

    // Optimistic local update
    setProducts(prev => [productWithId, ...prev]);
    showNotification(`Garment "${newProduct.name}" added to the Juthika by Momita catalog.`);

    // Async backend sync if connected
    if (backendStatus === 'connected') {
      try {
        const serverProduct = await api.createProduct(productWithId);
        if (serverProduct) {
          setProducts(prev => prev.map(p => (p.id === productWithId.id ? serverProduct : p)));
        }
      } catch (err) {
        console.warn('Backend sync failed for addProduct, kept in local state:', err);
      }
    }
  };

  const updateProduct = async (id, updatedFields) => {
    // Optimistic local update
    setProducts(prev =>
      prev.map(p => (p.id === id ? normalizeProduct({ ...p, ...updatedFields }) : p))
    );
    showNotification('Product details updated successfully.');

    // Async backend sync
    if (backendStatus === 'connected') {
      try {
        await api.updateProduct(id, updatedFields);
      } catch (err) {
        console.warn('Backend sync failed for updateProduct, kept in local state:', err);
      }
    }
  };

  const deleteProduct = async (id) => {
    // 1. Permanently track in deleted IDs so it never re-appears
    try {
      const deletedIds = JSON.parse(localStorage.getItem('aiaxom_deleted_product_ids') || '[]');
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem('aiaxom_deleted_product_ids', JSON.stringify(deletedIds));
      }
    } catch (e) {
      console.error('Error tracking deleted product ID', e);
    }

    // 2. Remove product from state & immediately update localStorage
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      try {
        localStorage.setItem('aiaxom_products', JSON.stringify(updated));
      } catch (e) {
        console.error('Error updating localStorage after product deletion', e);
      }
      return updated;
    });

    showNotification('Garment deleted from catalog permanently.');

    if (backendStatus === 'connected') {
      try {
        await api.deleteProduct(id);
      } catch (err) {
        console.warn('Backend sync failed for deleteProduct:', err);
      }
    }
  };

  const deleteProductImage = async (productId, imageIndexOrUrl) => {
    let updatedProduct = null;
    setProducts(prev => {
      const updated = prev.map(p => {
        if (p.id === productId) {
          const currentImages = Array.isArray(p.images) ? [...p.images] : [];
          let filteredImages;
          if (typeof imageIndexOrUrl === 'number') {
            filteredImages = currentImages.filter((_, idx) => idx !== imageIndexOrUrl);
          } else {
            filteredImages = currentImages.filter(img => img !== imageIndexOrUrl);
          }
          if (filteredImages.length === 0) {
            filteredImages = [
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
            ];
          }
          updatedProduct = normalizeProduct({ ...p, images: filteredImages });
          return updatedProduct;
        }
        return p;
      });

      try {
        localStorage.setItem('aiaxom_products', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    showNotification('Photo removed from product.');

    if (backendStatus === 'connected' && updatedProduct) {
      try {
        await api.updateProduct(productId, { images: updatedProduct.images });
      } catch (err) {
        console.warn('Backend sync failed for deleteProductImage:', err);
      }
    }
  };

  const resetProducts = async () => {
    setProducts(INITIAL_PRODUCTS.map(normalizeProduct));
    localStorage.removeItem('aiaxom_products');
    showNotification('Catalog reset to factory masterworks.');

    if (backendStatus === 'connected') {
      try {
        const resetData = await api.resetProducts();
        if (Array.isArray(resetData) && resetData.length > 0) {
          setProducts(resetData);
        }
      } catch (err) {
        console.warn('Backend reset failed:', err);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // CONSULTATION OPERATIONS
  // ---------------------------------------------------------------------------
  const addConsultation = async (consultationData) => {
    const record = normalizeConsultation({
      ...consultationData,
      id: consultationData.id || `AX-BR-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    });

    setConsultations(prev => [record, ...prev]);

    if (backendStatus === 'connected') {
      try {
        const serverConsultation = await api.createConsultation(consultationData);
        if (serverConsultation) {
          setConsultations(prev => prev.map(c => (c.id === record.id ? serverConsultation : c)));
        }
      } catch (err) {
        console.warn('Backend sync failed for addConsultation, saved locally:', err);
      }
    }
  };

  const updateConsultationStatus = async (id, status) => {
    setConsultations(prev =>
      prev.map(c => (c.id === id ? { ...c, status } : c))
    );
    showNotification(`Consultation ${id} marked as "${status}".`);

    if (backendStatus === 'connected') {
      try {
        await api.updateConsultationStatus(id, status);
      } catch (err) {
        console.warn('Backend sync failed for updateConsultationStatus:', err);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // ORDER OPERATIONS
  // ---------------------------------------------------------------------------
  const addOrder = async (orderData) => {
    const record = normalizeOrder({
      ...orderData,
      id: orderData.id || `AX-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Preparing Cedar Chest',
      createdAt: new Date().toISOString()
    });

    setOrders(prev => [record, ...prev]);

    if (backendStatus === 'connected') {
      try {
        const serverOrder = await api.createOrder(orderData);
        if (serverOrder) {
          setOrders(prev => prev.map(o => (o.id === record.id ? serverOrder : o)));
        }
      } catch (err) {
        console.warn('Backend sync failed for addOrder, saved locally:', err);
      }
    }
  };

  const updateOrderStatus = async (id, status) => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, status } : o))
    );
    showNotification(`Order ${id} status updated to "${status}".`);

    if (backendStatus === 'connected') {
      try {
        await api.updateOrderStatus(id, status);
      } catch (err) {
        console.warn('Backend sync failed for updateOrderStatus:', err);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // AUTHENTICATION OPERATIONS
  // ---------------------------------------------------------------------------
  const login = async (email, password = '', rolePreference = 'client') => {
    let userData = null;
    const cleanEmail = (email || '').trim().toLowerCase();

    // If backend is connected, try authenticating via FastAPI endpoint
    if (backendStatus === 'connected') {
      try {
        const res = await api.login(cleanEmail, password);
        if (res && res.user) {
          userData = res.user;
          setUser(userData);
          showNotification(res.message || `Welcome to the sanctuary, ${userData.name}.`);
          return userData;
        }
      } catch (err) {
        console.warn('Backend login attempt fell back to local authentication:', err);
      }
    }

    // Local / Offline authentication fallback
    if (cleanEmail.includes('admin') || rolePreference === 'admin') {
      userData = {
        id: 'usr-admin-01',
        name: 'Curator Hemanta Saikia',
        email: cleanEmail || 'admin@juthikabymomita.com',
        role: 'admin',
        title: 'Master Atelier Director',
        tier: 'Atelier Council Member',
        joinedDate: 'October 2024'
      };
    } else {
      const formattedName = cleanEmail
        ? cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        : 'Maharani Barooah';

      userData = {
        id: 'usr-patron-01',
        name: formattedName || 'Maharani Priyadarshini Barooah',
        email: cleanEmail || 'patron@juthikabymomita.com',
        role: 'client',
        title: 'Royal Silk Patron',
        tier: 'Ahom Gold Guild Member',
        joinedDate: 'December 2025'
      };
    }

    setUser(userData);
    showNotification(`Welcome to the sanctuary, ${userData.name}.`);
    return userData;
  };

  const logout = () => {
    const prevName = user?.name || 'Patron';
    setUser(null);
    showNotification(`You have signed out. Farewell, ${prevName}.`);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        // Wishlist APIs
        wishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isConsultationOpen,
        setIsConsultationOpen,
        notification,
        showNotification,
        // Backend Status & Diagnostics
        backendStatus,
        backendInfo,
        syncWithBackend,
        // Authentication APIs
        user,
        login,
        logout,
        // Admin & Catalog APIs
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteProductImage,
        resetProducts,
        consultations,
        addConsultation,
        updateConsultationStatus,
        orders,
        addOrder,
        updateOrderStatus
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
