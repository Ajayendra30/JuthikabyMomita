// Juthika by Momita Luxury Assamese Silk Boutique — API Client Service
// Seamlessly connects React Frontend to FastAPI Backend & Supabase PostgreSQL

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Perform a fetch with a short timeout to prevent frontend hangs if backend is down
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 4000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// -----------------------------------------------------------------------------
// NORMALIZERS (Ensures compatibility between CamelCase & SnakeCase)
// -----------------------------------------------------------------------------
export function normalizeProduct(p) {
  if (!p) return null;
  return {
    id: p.id,
    name: p.name,
    assameseName: p.assameseName || p.assamese_name || '',
    assamese_name: p.assamese_name || p.assameseName || '',
    slug: p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''),
    fabric: p.fabric,
    category: p.category,
    secondaryCategory: p.secondaryCategory || p.secondary_category || '',
    secondary_category: p.secondary_category || p.secondaryCategory || '',
    price: Number(p.price) || 0,
    originalPrice: p.originalPrice ?? p.original_price ?? (Number(p.price) * 1.1),
    original_price: p.original_price ?? p.originalPrice ?? (Number(p.price) * 1.1),
    featured: Boolean(p.featured),
    tag: p.tag || 'Handloom Silk',
    inStock: p.inStock !== undefined ? p.inStock : (p.in_stock !== undefined ? p.in_stock : true),
    in_stock: p.in_stock !== undefined ? p.in_stock : (p.inStock !== undefined ? p.inStock : true),
    loomDays: Number(p.loomDays ?? p.loom_days ?? 20),
    loom_days: Number(p.loom_days ?? p.loomDays ?? 20),
    artisanLocation: p.artisanLocation || p.artisan_location || 'Sualkuchi, Assam',
    artisan_location: p.artisan_location || p.artisanLocation || 'Sualkuchi, Assam',
    description: p.description || '',
    details: Array.isArray(p.details) ? p.details : [],
    care: p.care || 'Specialist silk dry clean only.',
    sizes: Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes : ['Standard Unstitched', 'Custom Tailored Drape'],
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
    ]
  };
}

export function normalizeConsultation(c) {
  if (!c) return null;
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    occasion: c.occasion,
    preferredFabric: c.preferredFabric || c.preferred_fabric || 'Pure Muga Silk',
    preferred_fabric: c.preferred_fabric || c.preferredFabric || 'Pure Muga Silk',
    consultationType: c.consultationType || c.consultation_type || 'Guwahati Flagship Atelier (In-Person)',
    consultation_type: c.consultation_type || c.consultationType || 'Guwahati Flagship Atelier (In-Person)',
    preferredDate: c.preferredDate || c.preferred_date || '',
    preferred_date: c.preferred_date || c.preferredDate || '',
    message: c.message || '',
    status: c.status || 'New',
    createdAt: c.createdAt || c.created_at || new Date().toISOString(),
    created_at: c.created_at || c.createdAt || new Date().toISOString()
  };
}

export function normalizeOrder(o) {
  if (!o) return null;
  return {
    id: o.id,
    customerName: o.customerName || o.customer_name || 'Client Patron',
    customer_name: o.customer_name || o.customerName || 'Client Patron',
    email: o.email,
    phone: o.phone || '',
    address: o.address || '',
    items: Array.isArray(o.items) ? o.items : [],
    total: Number(o.total) || 0,
    paymentMethod: o.paymentMethod || o.payment_method || 'VIP Concierge Wire',
    payment_method: o.payment_method || o.paymentMethod || 'VIP Concierge Wire',
    status: o.status || 'Preparing Cedar Chest',
    createdAt: o.createdAt || o.created_at || new Date().toISOString(),
    created_at: o.created_at || o.createdAt || new Date().toISOString()
  };
}

// -----------------------------------------------------------------------------
// API CLIENT
// -----------------------------------------------------------------------------
export const api = {
  /**
   * Ping the FastAPI health endpoint
   */
  async checkHealth() {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/health`, { method: 'GET' }, 2000);
      if (!res.ok) return { online: false };
      const data = await res.json();
      return { online: true, ...data };
    } catch {
      return { online: false };
    }
  },

  // ----------------- PRODUCTS -----------------
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.fabric && params.fabric !== 'All') query.append('fabric', params.fabric);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);

    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await fetchWithTimeout(`${API_BASE_URL}/products${qs}`, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch products`);
    const raw = await res.json();
    return raw.map(normalizeProduct);
  },

  async getProductById(id) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/products/${id}`, { method: 'GET' });
    if (!res.ok) throw new Error(`Product ${id} not found`);
    const raw = await res.json();
    return normalizeProduct(raw);
  },

  async createProduct(productData) {
    const payload = {
      id: productData.id,
      name: productData.name,
      assamese_name: productData.assameseName || productData.assamese_name || '',
      fabric: productData.fabric,
      category: productData.category,
      secondary_category: productData.secondaryCategory || productData.secondary_category || '',
      price: Number(productData.price),
      original_price: productData.originalPrice ? Number(productData.originalPrice) : Number(productData.price) * 1.1,
      featured: Boolean(productData.featured),
      tag: productData.tag || 'Handloom Silk',
      in_stock: productData.inStock !== false,
      loom_days: Number(productData.loomDays || productData.loom_days) || 20,
      artisan_location: productData.artisanLocation || productData.artisan_location || 'Sualkuchi, Assam',
      description: productData.description || '',
      details: productData.details || [],
      care: productData.care || '',
      sizes: productData.sizes || ['Standard Unstitched', 'Custom Tailored Fit'],
      images: productData.images || []
    };

    const res = await fetchWithTimeout(`${API_BASE_URL}/products`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Failed to create product: HTTP ${res.status}`);
    const raw = await res.json();
    return normalizeProduct(raw);
  },

  async updateProduct(id, updates) {
    const payload = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.assameseName !== undefined || updates.assamese_name !== undefined) {
      payload.assamese_name = updates.assameseName || updates.assamese_name;
    }
    if (updates.fabric !== undefined) payload.fabric = updates.fabric;
    if (updates.category !== undefined) payload.category = updates.category;
    if (updates.price !== undefined) payload.price = Number(updates.price);
    if (updates.originalPrice !== undefined || updates.original_price !== undefined) {
      payload.original_price = Number(updates.originalPrice ?? updates.original_price);
    }
    if (updates.tag !== undefined) payload.tag = updates.tag;
    if (updates.featured !== undefined) payload.featured = updates.featured;
    if (updates.inStock !== undefined || updates.in_stock !== undefined) {
      payload.in_stock = updates.inStock ?? updates.in_stock;
    }
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.details !== undefined) payload.details = updates.details;
    if (updates.care !== undefined) payload.care = updates.care;
    if (updates.sizes !== undefined) payload.sizes = updates.sizes;
    if (updates.images !== undefined) payload.images = updates.images;

    const res = await fetchWithTimeout(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Failed to update product ${id}`);
    const raw = await res.json();
    return normalizeProduct(raw);
  },

  async deleteProduct(id) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Failed to delete product ${id}`);
    return await res.json();
  },

  async resetProducts() {
    const res = await fetchWithTimeout(`${API_BASE_URL}/products/reset`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset products');
    const raw = await res.json();
    return raw.map(normalizeProduct);
  },

  // ----------------- CONSULTATIONS -----------------
  async getConsultations() {
    const res = await fetchWithTimeout(`${API_BASE_URL}/consultations`, { method: 'GET' });
    if (!res.ok) throw new Error('Failed to fetch consultations');
    const raw = await res.json();
    return raw.map(normalizeConsultation);
  },

  async createConsultation(data) {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      occasion: data.occasion || 'Bridal Matrimony',
      preferred_fabric: data.preferredFabric || data.preferred_fabric || 'Pure Muga Silk',
      consultation_type: data.consultationType || data.consultation_type || 'Guwahati Flagship Atelier (In-Person)',
      preferred_date: data.preferredDate || data.preferred_date || '',
      message: data.message || ''
    };

    const res = await fetchWithTimeout(`${API_BASE_URL}/consultations`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to submit consultation');
    const raw = await res.json();
    return normalizeConsultation(raw);
  },

  async updateConsultationStatus(id, status) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/consultations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error(`Failed to update consultation ${id}`);
    const raw = await res.json();
    return normalizeConsultation(raw);
  },

  // ----------------- ORDERS -----------------
  async getOrders() {
    const res = await fetchWithTimeout(`${API_BASE_URL}/orders`, { method: 'GET' });
    if (!res.ok) throw new Error('Failed to fetch orders');
    const raw = await res.json();
    return raw.map(normalizeOrder);
  },

  async createOrder(data) {
    const payload = {
      customer_name: data.customerName || data.customer_name,
      email: data.email,
      phone: data.phone || '',
      address: data.address || '',
      items: data.items || [],
      total: Number(data.total) || 0,
      payment_method: data.paymentMethod || data.payment_method || 'VIP Concierge Wire'
    };

    const res = await fetchWithTimeout(`${API_BASE_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to place order');
    const raw = await res.json();
    return normalizeOrder(raw);
  },

  async updateOrderStatus(id, status) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error(`Failed to update order ${id}`);
    const raw = await res.json();
    return normalizeOrder(raw);
  },

  // ----------------- AUTHENTICATION -----------------
  async login(email, password = '') {
    const res = await fetchWithTimeout(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Authentication failed');
    }
    return await res.json();
  },

  async register(name, email, password) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Registration failed');
    }
    return await res.json();
  },

  async getCurrentUser() {
    const res = await fetchWithTimeout(`${API_BASE_URL}/auth/me`, { method: 'GET' });
    if (!res.ok) return null;
    return await res.json();
  }
};
