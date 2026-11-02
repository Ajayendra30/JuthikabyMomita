import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try loading .env from project root if it exists
try {
  const envPath = path.resolve(__dirname, '..', '.env');
  if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(envPath);
  }
} catch (e) {
  // Ignore env loading error if unsupported
}

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_KEY && SUPABASE_URL.startsWith('http'));
};

let supabase = null;
if (isSupabaseConfigured()) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log(`[Supabase PostgreSQL] Initialized client for ${SUPABASE_URL}`);
  } catch (err) {
    console.error('[Supabase PostgreSQL] Client initialization failed:', err.message);
    supabase = null;
  }
} else {
  console.log('[Supabase PostgreSQL] No credentials found in .env; falling back to persistent JSON storage.');
}

export const getSupabaseClient = () => supabase;

// -----------------------------------------------------------------------------
// PRODUCTS (PostgreSQL public.products)
// -----------------------------------------------------------------------------
export async function getProductsFromSupabase() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Error fetching products:', error.message);
    return null;
  }
  // Normalize snake_case to frontend camelCase and standardize ID to 'jm-'
  return data.map(p => ({
    id: p.id ? p.id.replace(/^ax-/i, 'jm-') : p.id,
    name: p.name,
    assameseName: p.assamese_name || '',
    slug: p.slug,
    fabric: p.fabric,
    category: p.category,
    secondaryCategory: p.secondary_category || '',
    price: Number(p.price),
    originalPrice: p.original_price ? Number(p.original_price) : undefined,
    featured: Boolean(p.featured),
    tag: p.tag || 'Handloom Silk',
    inStock: Boolean(p.in_stock),
    stockCount: p.stock_count,
    images: Array.isArray(p.images) ? p.images : [],
    description: p.description,
    sizes: Array.isArray(p.sizes) ? p.sizes : ['Standard Unstitched'],
    loomDays: p.loom_days || 20,
    artisanLocation: p.artisan_location || 'Sualkuchi, Assam',
    createdAt: p.created_at
  }));
}

export async function insertProductToSupabase(product) {
  if (!supabase) return null;
  const row = {
    id: product.id,
    name: product.name,
    assamese_name: product.assameseName || product.assamese_name || null,
    slug: product.slug,
    fabric: product.fabric,
    category: product.category,
    secondary_category: product.secondaryCategory || product.secondary_category || null,
    price: Number(product.price),
    original_price: product.originalPrice ? Number(product.originalPrice) : null,
    featured: Boolean(product.featured),
    tag: product.tag || 'Handloom Silk',
    in_stock: product.inStock !== false,
    stock_count: product.stockCount !== undefined ? product.stockCount : 5,
    images: product.images || [],
    description: product.description || '',
    sizes: product.sizes || ['Standard Unstitched'],
    loom_days: product.loomDays || 20,
    artisan_location: product.artisanLocation || 'Sualkuchi, Assam'
  };

  const { data, error } = await supabase
    .from('products')
    .insert([row])
    .select();

  if (error) {
    console.error('[Supabase] Error inserting product:', error.message);
    return null;
  }
  return data && data.length > 0 ? data[0] : null;
}

export async function updateProductInSupabase(id, updates) {
  if (!supabase) return null;
  const row = {};
  if (updates.name !== undefined) row.name = updates.name;
  if (updates.assameseName !== undefined || updates.assamese_name !== undefined) {
    row.assamese_name = updates.assameseName || updates.assamese_name || null;
  }
  if (updates.slug !== undefined) row.slug = updates.slug;
  if (updates.fabric !== undefined) row.fabric = updates.fabric;
  if (updates.category !== undefined) row.category = updates.category;
  if (updates.secondaryCategory !== undefined || updates.secondary_category !== undefined) {
    row.secondary_category = updates.secondaryCategory || updates.secondary_category || null;
  }
  if (updates.price !== undefined) row.price = Number(updates.price);
  if (updates.originalPrice !== undefined || updates.original_price !== undefined) {
    row.original_price = Number(updates.originalPrice ?? updates.original_price);
  }
  if (updates.featured !== undefined) row.featured = Boolean(updates.featured);
  if (updates.tag !== undefined) row.tag = updates.tag;
  if (updates.inStock !== undefined || updates.in_stock !== undefined) {
    row.in_stock = Boolean(updates.inStock ?? updates.in_stock);
  }
  if (updates.stockCount !== undefined || updates.stock_count !== undefined) {
    row.stock_count = updates.stockCount ?? updates.stock_count;
  }
  if (updates.images !== undefined) row.images = updates.images;
  if (updates.description !== undefined) row.description = updates.description;
  if (updates.sizes !== undefined) row.sizes = updates.sizes;
  if (updates.loomDays !== undefined || updates.loom_days !== undefined) {
    row.loom_days = Number(updates.loomDays ?? updates.loom_days);
  }
  if (updates.artisanLocation !== undefined || updates.artisan_location !== undefined) {
    row.artisan_location = updates.artisanLocation || updates.artisan_location;
  }

  const possibleIds = [id];
  if (id.startsWith('jm-')) possibleIds.push(id.replace(/^jm-/i, 'ax-'));
  if (id.startsWith('ax-')) possibleIds.push(id.replace(/^ax-/i, 'jm-'));

  const { data, error } = await supabase
    .from('products')
    .update(row)
    .in('id', possibleIds)
    .select();

  if (error) {
    console.error(`[Supabase] Error updating product ${id}:`, error.message);
    return null;
  }
  return data && data.length > 0 ? data[0] : null;
}

export async function deleteProductFromSupabase(id) {
  if (!supabase) return null;
  const possibleIds = [id];
  if (id.startsWith('jm-')) possibleIds.push(id.replace(/^jm-/i, 'ax-'));
  if (id.startsWith('ax-')) possibleIds.push(id.replace(/^ax-/i, 'jm-'));

  const { data, error } = await supabase
    .from('products')
    .delete()
    .in('id', possibleIds)
    .select();

  if (error) {
    console.error(`[Supabase] Error deleting product ${id}:`, error.message);
    return null;
  }
  return data;
}

export async function resetProductsInSupabase(productsList) {
  if (!supabase || !Array.isArray(productsList) || productsList.length === 0) return null;
  try {
    // 1. Clear out existing items
    await supabase.from('products').delete().neq('id', '___force_delete_all___');

    // 2. Prepare masterwork rows
    const rows = productsList.map(p => ({
      id: p.id,
      name: p.name,
      assamese_name: p.assameseName || p.assamese_name || null,
      slug: p.slug || (p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000)),
      fabric: p.fabric,
      category: p.category,
      secondary_category: p.secondaryCategory || p.secondary_category || null,
      price: Number(p.price),
      original_price: p.originalPrice ? Number(p.originalPrice) : null,
      featured: Boolean(p.featured),
      tag: p.tag || 'Handloom Silk',
      in_stock: p.inStock !== false,
      stock_count: p.stockCount !== undefined ? p.stockCount : 5,
      images: p.images || [],
      description: p.description || '',
      sizes: p.sizes || ['Standard Unstitched'],
      loom_days: p.loomDays || 20,
      artisan_location: p.artisanLocation || 'Sualkuchi, Assam'
    }));

    const { data, error } = await supabase.from('products').insert(rows).select();
    if (error) {
      console.error('[Supabase] Error resetting products table:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('[Supabase] Reset products exception:', err.message);
    return null;
  }
}

// -----------------------------------------------------------------------------
// ORDERS (PostgreSQL public.orders)
// -----------------------------------------------------------------------------
export async function getOrdersFromSupabase() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Error fetching orders:', error.message);
    return null;
  }

  return data.map(o => ({
    id: o.id,
    customerName: o.customer_name,
    customer_name: o.customer_name,
    email: o.email,
    phone: o.phone,
    address: o.address,
    items: Array.isArray(o.items) ? o.items : [],
    total: Number(o.total),
    paymentMethod: o.payment_method,
    payment_method: o.payment_method,
    status: o.status,
    createdAt: o.created_at
  }));
}

export async function insertOrderToSupabase(order) {
  if (!supabase) return null;
  const row = {
    id: order.id,
    customer_name: order.customerName || order.customer_name || 'Client',
    email: order.email || '',
    phone: order.phone || '',
    address: order.address || '',
    items: order.items || [],
    total: Number(order.total) || 0,
    payment_method: order.paymentMethod || order.payment_method || 'Card',
    status: order.status || 'Loom Quality Inspection'
  };

  const { data, error } = await supabase
    .from('orders')
    .insert([row])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error inserting order:', error.message);
    return null;
  }
  return data;
}

export async function updateOrderStatusInSupabase(id, status) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.error(`[Supabase] Error updating order ${id} status:`, error.message);
    return null;
  }
  return data && data.length > 0 ? data[0] : null;
}

export async function deleteOrderFromSupabase(id) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    console.error(`[Supabase] Error deleting order ${id}:`, error.message);
    return null;
  }
  return data;
}

// -----------------------------------------------------------------------------
// USERS (PostgreSQL public.users)
// -----------------------------------------------------------------------------
export async function findUserInSupabase(email) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error || !data) return null;
  return data;
}

export async function insertUserToSupabase(user) {
  if (!supabase) return null;
  const row = {
    id: user.id,
    name: user.name,
    email: user.email.toLowerCase(),
    password: user.password,
    role: user.role || 'customer',
    phone: user.phone || null
  };

  const { data, error } = await supabase
    .from('users')
    .insert([row])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error inserting user:', error.message);
    return null;
  }
  return data;
}

// -----------------------------------------------------------------------------
// CONSULTATIONS (PostgreSQL public.consultations)
// -----------------------------------------------------------------------------
export async function getConsultationsFromSupabase() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Error fetching consultations:', error.message);
    return null;
  }

  return data.map(c => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    occasion: c.occasion,
    preferredFabric: c.preferred_fabric,
    preferred_fabric: c.preferred_fabric,
    consultationType: c.consultation_type,
    consultation_type: c.consultation_type,
    preferredDate: c.preferred_date,
    preferred_date: c.preferred_date,
    message: c.message,
    status: c.status,
    createdAt: c.created_at
  }));
}

export async function insertConsultationToSupabase(c) {
  if (!supabase) return null;
  const row = {
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone || '',
    occasion: c.occasion || '',
    preferred_fabric: c.preferredFabric || c.preferred_fabric || '',
    consultation_type: c.consultationType || c.consultation_type || '',
    preferred_date: c.preferredDate || c.preferred_date || null,
    message: c.message || '',
    status: c.status || 'Requested'
  };

  const { data, error } = await supabase
    .from('consultations')
    .insert([row])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error inserting consultation:', error.message);
    return null;
  }
  return data;
}

export async function updateConsultationStatusInSupabase(id, status) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('consultations')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.error(`[Supabase] Error updating consultation ${id} status:`, error.message);
    return null;
  }
  return data && data.length > 0 ? data[0] : null;
}

export async function deleteConsultationFromSupabase(id) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('consultations')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    console.error(`[Supabase] Error deleting consultation ${id}:`, error.message);
    return null;
  }
  return data;
}
