import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  isSupabaseConfigured,
  getProductsFromSupabase,
  insertProductToSupabase,
  updateProductInSupabase,
  deleteProductFromSupabase,
  resetProductsInSupabase,
  getOrdersFromSupabase,
  insertOrderToSupabase,
  updateOrderStatusInSupabase,
  deleteOrderFromSupabase,
  findUserInSupabase,
  insertUserToSupabase,
  getConsultationsFromSupabase,
  insertConsultationToSupabase,
  updateConsultationStatusInSupabase,
  deleteConsultationFromSupabase
} from './supabase.js';
import {
  sendCustomerAccountConfirmationEmail,
  getSentEmails,
  renderAccountConfirmationHtml
} from './email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Paths to persistent data files
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const INITIAL_PRODUCTS_FILE = path.join(DATA_DIR, 'initialProducts.json');
const CONSULTATIONS_FILE = path.join(DATA_DIR, 'consultations.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers for reading and writing JSON files
const readJsonFile = (filePath, fallback = []) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
};

const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
};

// Initialize Consultations if missing
const INITIAL_CONSULTATIONS = [
  {
    id: 'JM-BR-829104',
    name: 'Ananya Hazarika',
    email: 'ananya.h@couture.com',
    phone: '+91 9279125091',
    occasion: 'Bridal Matrimony',
    preferredFabric: 'Pure Muga Silk',
    preferred_fabric: 'Pure Muga Silk',
    consultationType: 'Guwahati Flagship Atelier (In-Person)',
    consultation_type: 'Guwahati Flagship Atelier (In-Person)',
    preferredDate: '2026-11-15',
    preferred_date: '2026-11-15',
    message: 'Looking for a royal Kingkhap Muga Mekhela Chador with antique gold Guna zari and matching Riha for my winter wedding.',
    status: 'New',
    createdAt: '2026-10-22T10:30:00.000Z'
  },
  {
    id: 'JM-BR-419082',
    name: 'Meenakshi Bordoloi',
    email: 'meenakshi.b@silkpatron.org',
    phone: '+91 98112 34567',
    occasion: 'Reception Gala',
    preferredFabric: 'Ceremonial Paat Silk',
    preferred_fabric: 'Ceremonial Paat Silk',
    consultationType: 'New Delhi Private Suite (In-Person)',
    consultation_type: 'New Delhi Private Suite (In-Person)',
    preferredDate: '2026-11-28',
    preferred_date: '2026-11-28',
    message: 'Seeking a heavy vermilion Paat silk saree with kalka border and bespoke blouse tailoring.',
    status: 'In Discussion',
    createdAt: '2026-10-21T14:15:00.000Z'
  },
  {
    id: 'JM-BR-993021',
    name: 'Rohan & Gayatri Sharma',
    email: 'rohan.sharma@sanctuary.in',
    phone: '+91 97170 88990',
    occasion: 'Trousseau Curation',
    preferredFabric: 'Muga-Paat Hybrid',
    preferred_fabric: 'Muga-Paat Hybrid',
    consultationType: 'High-Definition Virtual Video Atelier (Global)',
    consultation_type: 'High-Definition Virtual Video Atelier (Global)',
    preferredDate: '2026-12-05',
    preferred_date: '2026-12-05',
    message: 'Planning complete bridal trousseau including 2 Muga Mekhela Chadors and 1 Ahimsa Eri wrap.',
    status: 'Loom Assigned',
    createdAt: '2026-10-20T09:00:00.000Z'
  }
];

// Initialize Orders if missing
const INITIAL_ORDERS = [
  {
    id: 'JM-ORD-740192',
    customerName: 'Priyanka Saikia',
    customer_name: 'Priyanka Saikia',
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
    payment_method: 'VIP Concierge Wire / Card Payment Link',
    status: 'Loom Quality Inspection',
    createdAt: '2026-10-22T08:45:00.000Z'
  },
  {
    id: 'JM-ORD-519283',
    customerName: 'Siddharth & Devika Sen',
    customer_name: 'Siddharth & Devika Sen',
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
    payment_method: 'White-Glove Cash On Delivery',
    status: 'Insured Dispatch',
    createdAt: '2026-10-21T16:20:00.000Z'
  }
];

// Seed initial files if not present
if (!fs.existsSync(CONSULTATIONS_FILE)) {
  writeJsonFile(CONSULTATIONS_FILE, INITIAL_CONSULTATIONS);
}
if (!fs.existsSync(ORDERS_FILE)) {
  writeJsonFile(ORDERS_FILE, INITIAL_ORDERS);
}

// -----------------------------------------------------------------------------
// 0. ROOT WELCOME & API DIRECTORY
// -----------------------------------------------------------------------------
app.get('/', (req, res) => {
  const supabaseActive = isSupabaseConfigured();
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Juthika by Momita — Backend API Server</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #FAF8F5; color: #24211D; padding: 40px 20px; line-height: 1.6; }
        .card { max-width: 650px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E8DFD1; padding: 32px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 3px; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
        h1 { font-family: Georgia, serif; font-size: 24px; font-weight: normal; margin-top: 12px; margin-bottom: 6px; }
        p { color: #666; font-size: 14px; margin-bottom: 24px; }
        .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #B69A62; font-weight: 600; margin-top: 24px; margin-bottom: 12px; }
        ul { list-style: none; padding: 0; margin: 0; }
        li { padding: 10px 14px; border: 1px solid #F0ECE4; margin-bottom: 8px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; background: #FCFBF9; }
        a { color: #24211D; text-decoration: none; font-weight: 500; font-family: monospace; font-size: 13px; }
        a:hover { color: #B69A62; }
        .method { font-size: 11px; font-weight: 600; background: #EEF2FF; color: #4338CA; padding: 2px 6px; border-radius: 2px; }
        .footer { margin-top: 28px; padding-top: 20px; border-top: 1px solid #E8DFD1; font-size: 12px; color: #888; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">● Online & Ready</span>
        <h1>Juthika by Momita Backend API</h1>
        <p>Node.js & Express 5 Server connected to <strong>${supabaseActive ? 'Supabase PostgreSQL' : 'Local Persistent Storage'}</strong>.</p>

        <div class="section-title">Available REST Endpoints</div>
        <ul>
          <li><a href="/api/health">/api/health</a> <span class="method">GET</span></li>
          <li><a href="/api/products">/api/products</a> <span class="method">GET</span></li>
          <li><a href="/api/orders">/api/orders</a> <span class="method">GET</span></li>
          <li><a href="/api/consultations">/api/consultations</a> <span class="method">GET</span></li>
          <li><a href="/api/emails/preview-raw" target="_blank">/api/emails/preview-raw (HTML Email Preview)</a> <span class="method">GET</span></li>
          <li><a href="/api/emails/sent">/api/emails/sent (Sent Outbox Log)</a> <span class="method">GET</span></li>
        </ul>

        <div class="section-title">Frontend Applications</div>
        <ul>
          <li><a href="http://localhost:5173" target="_blank">Storefront Website ↗</a> <span>http://localhost:5173</span></li>
          <li><a href="http://admin.localhost:5173" target="_blank">Admin Atelier Console ↗</a> <span>http://admin.localhost:5173</span></li>
        </ul>

        <div class="footer">Port 8000 &bull; Juthika by Momita Luxury Silk Boutique</div>
      </div>
    </body>
    </html>
  `);
});

// -----------------------------------------------------------------------------
// 1. HEALTH CHECK ENDPOINT
// -----------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  const supabaseActive = isSupabaseConfigured();
  res.json({
    status: 'healthy',
    online: true,
    backend: 'Node.js Express Server',
    database_type: supabaseActive ? 'Supabase PostgreSQL' : 'Persistent Storage (Local JSON)',
    supabase_connected: supabaseActive,
    timestamp: new Date().toISOString()
  });
});

// -----------------------------------------------------------------------------
// 2. PRODUCTS API (Catalog Control)
// -----------------------------------------------------------------------------

// GET all products with optional filters
app.get('/api/products', async (req, res) => {
  const { category, fabric, search, sort } = req.query;
  let products = null;

  if (isSupabaseConfigured()) {
    try {
      products = await getProductsFromSupabase();
    } catch (e) {
      console.warn('[Supabase] Products query error:', e.message);
    }
  }

  if (!products || products.length === 0) {
    products = readJsonFile(PRODUCTS_FILE);
  }

  if (category && category !== 'All') {
    products = products.filter(p => p.category === category);
  }
  if (fabric && fabric !== 'All') {
    products = products.filter(p => p.fabric === fabric);
  }
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => 
      p.name?.toLowerCase().includes(q) ||
      p.assameseName?.toLowerCase().includes(q) ||
      p.fabric?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  }
  if (sort === 'price-asc') {
    products.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  } else if (sort === 'price-desc') {
    products.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
  }

  // Standardize all IDs from 'ax-' to 'jm-'
  products = products.map(p => ({
    ...p,
    id: p.id ? p.id.replace(/^ax-/i, 'jm-') : p.id
  }));

  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const reqId = req.params.id;
  const altId = reqId.startsWith('jm-') ? reqId.replace(/^jm-/i, 'ax-') : reqId.replace(/^ax-/i, 'jm-');
  const products = readJsonFile(PRODUCTS_FILE);
  const product = products.find(p => p.id === reqId || p.id === altId);
  if (!product) {
    return res.status(404).json({ error: `Product ${reqId} not found` });
  }
  res.json({ ...product, id: product.id ? product.id.replace(/^ax-/i, 'jm-') : product.id });
});

// POST create new product
app.post('/api/products', async (req, res) => {
  const newProduct = req.body;
  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: 'Product name and price are required' });
  }

  const products = readJsonFile(PRODUCTS_FILE);
  const rawId = newProduct.id || `jm-item-${Date.now()}`;
  const id = rawId.startsWith('ax-') ? rawId.replace(/^ax-/i, 'jm-') : rawId;
  const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const created = {
    ...newProduct,
    id,
    slug,
    price: Number(newProduct.price),
    originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : Number(newProduct.price) * 1.1,
    loomDays: Number(newProduct.loomDays) || 20,
    artisanLocation: newProduct.artisanLocation || 'Sualkuchi, Assam',
    images: Array.isArray(newProduct.images) && newProduct.images.length > 0 ? newProduct.images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'],
    sizes: newProduct.sizes || ['Standard Unstitched', 'Custom Tailored Fit'],
    inStock: newProduct.inStock !== false,
    createdAt: new Date().toISOString()
  };

  products.unshift(created);
  writeJsonFile(PRODUCTS_FILE, products);

  if (isSupabaseConfigured()) {
    try {
      await insertProductToSupabase(created);
    } catch (e) {
      console.warn('[Supabase] Product sync error:', e.message);
    }
  }

  console.log(`[Node.js Backend] Created new product: ${created.name} (${created.id})`);
  res.status(201).json(created);
});

// PUT update existing product
app.put('/api/products/:id', async (req, res) => {
  const reqId = req.params.id;
  const altId = reqId.startsWith('jm-') ? reqId.replace(/^jm-/i, 'ax-') : reqId.replace(/^ax-/i, 'jm-');
  const updates = req.body;
  const products = readJsonFile(PRODUCTS_FILE);
  const index = products.findIndex(p => p.id === reqId || p.id === altId);

  if (index === -1) {
    return res.status(404).json({ error: `Product ${reqId} not found` });
  }

  const existing = products[index];
  const id = reqId.startsWith('ax-') ? reqId.replace(/^ax-/i, 'jm-') : reqId;
  const updated = {
    ...existing,
    ...updates,
    id,
    name: updates.name !== undefined ? updates.name : existing.name,
    assameseName: updates.assameseName !== undefined ? updates.assameseName : (updates.assamese_name !== undefined ? updates.assamese_name : existing.assameseName),
    assamese_name: updates.assamese_name !== undefined ? updates.assamese_name : (updates.assameseName !== undefined ? updates.assameseName : existing.assamese_name),
    fabric: updates.fabric || existing.fabric,
    category: updates.category || existing.category,
    price: updates.price !== undefined ? Number(updates.price) : existing.price,
    originalPrice: updates.originalPrice !== undefined ? Number(updates.originalPrice) : existing.originalPrice,
    original_price: updates.originalPrice !== undefined ? Number(updates.originalPrice) : existing.originalPrice,
    loomDays: updates.loomDays !== undefined ? Number(updates.loomDays) : (updates.loom_days !== undefined ? Number(updates.loom_days) : existing.loomDays),
    loom_days: updates.loomDays !== undefined ? Number(updates.loomDays) : (updates.loom_days !== undefined ? Number(updates.loom_days) : existing.loomDays),
    inStock: updates.inStock !== undefined ? Boolean(updates.inStock) : (updates.in_stock !== undefined ? Boolean(updates.in_stock) : existing.inStock),
    in_stock: updates.inStock !== undefined ? Boolean(updates.inStock) : (updates.in_stock !== undefined ? Boolean(updates.in_stock) : existing.inStock),
    images: updates.images || existing.images,
    description: updates.description !== undefined ? updates.description : existing.description,
    updatedAt: new Date().toISOString()
  };

  products[index] = updated;
  writeJsonFile(PRODUCTS_FILE, products);

  if (isSupabaseConfigured()) {
    try {
      await updateProductInSupabase(reqId, updates);
    } catch (e) {
      console.warn('[Supabase] Product update sync error:', e.message);
    }
  }

  console.log(`[Node.js Backend] Updated product: ${updated.name} (${id})`);
  res.json(updated);
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  const reqId = req.params.id;
  const altId = reqId.startsWith('jm-') ? reqId.replace(/^jm-/i, 'ax-') : reqId.replace(/^ax-/i, 'jm-');
  let products = readJsonFile(PRODUCTS_FILE);
  products = products.filter(p => p.id !== reqId && p.id !== altId);

  writeJsonFile(PRODUCTS_FILE, products);

  if (isSupabaseConfigured()) {
    try {
      await deleteProductFromSupabase(reqId);
    } catch (e) {
      console.warn('[Supabase] Product delete error:', e.message);
    }
  }

  console.log(`[Node.js Backend] Deleted product: ${reqId}`);
  res.json({ success: true, message: `Product ${reqId} deleted successfully` });
});

// POST reset products to default masterwork data
app.post('/api/products/reset', async (req, res) => {
  const initial = readJsonFile(INITIAL_PRODUCTS_FILE);
  writeJsonFile(PRODUCTS_FILE, initial);

  if (isSupabaseConfigured()) {
    try {
      await resetProductsInSupabase(initial);
    } catch (e) {
      console.warn('[Supabase] Product reset sync error:', e.message);
    }
  }

  console.log(`[Node.js Backend] Reset products to default (${initial.length} items)`);
  res.json(initial);
});

// -----------------------------------------------------------------------------
// 3. CONSULTATIONS API (Bespoke Bridal Control)
// -----------------------------------------------------------------------------

// Helper to normalize any legacy AX- to JM-
const toJMId = (id) => (id && typeof id === 'string' && id.startsWith('AX-') ? id.replace(/^AX-/, 'JM-') : id);
const toAXId = (id) => (id && typeof id === 'string' && id.startsWith('JM-') ? id.replace(/^JM-/, 'AX-') : id);

// GET all consultations
app.get('/api/consultations', async (req, res) => {
  const localConsultations = readJsonFile(CONSULTATIONS_FILE, []).map(c => ({
    ...c,
    id: toJMId(c.id)
  }));
  let supabaseConsultations = null;

  if (isSupabaseConfigured()) {
    try {
      const raw = await getConsultationsFromSupabase();
      if (raw) {
        supabaseConsultations = raw.map(c => ({
          ...c,
          id: toJMId(c.id)
        }));
      }
    } catch (e) {
      console.warn('[Supabase] Consultations query error:', e.message);
    }
  }

  if (!supabaseConsultations || supabaseConsultations.length === 0) {
    return res.json(localConsultations);
  }

  // Merge: Local status & local fields take precedence for updated items
  const localMap = new Map(localConsultations.map(c => [c.id, c]));
  const merged = supabaseConsultations.map(sc => {
    const local = localMap.get(sc.id);
    if (local) {
      return {
        ...sc,
        status: local.status || sc.status,
        updatedAt: local.updatedAt || sc.createdAt
      };
    }
    return sc;
  });

  // Include any local items not yet in Supabase
  const supabaseIds = new Set(supabaseConsultations.map(c => c.id));
  for (const lc of localConsultations) {
    if (!supabaseIds.has(lc.id)) {
      merged.push(lc);
    }
  }

  res.json(merged);
});

// POST create consultation
app.post('/api/consultations', async (req, res) => {
  const data = req.body;
  if (!data.name || !data.email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const consultations = readJsonFile(CONSULTATIONS_FILE);
  const rawId = data.id || `JM-BR-${Math.floor(100000 + Math.random() * 900000)}`;
  const id = toJMId(rawId);

  const created = {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    occasion: data.occasion || 'Bridal Matrimony',
    preferredFabric: data.preferredFabric || data.preferred_fabric || 'Pure Muga Silk',
    preferred_fabric: data.preferredFabric || data.preferred_fabric || 'Pure Muga Silk',
    consultationType: data.consultationType || data.consultation_type || 'Guwahati Flagship Atelier (In-Person)',
    consultation_type: data.consultationType || data.consultation_type || 'Guwahati Flagship Atelier (In-Person)',
    preferredDate: data.preferredDate || data.preferred_date || '',
    preferred_date: data.preferredDate || data.preferred_date || '',
    message: data.message || '',
    status: 'New',
    createdAt: new Date().toISOString()
  };

  consultations.unshift(created);
  writeJsonFile(CONSULTATIONS_FILE, consultations);

  if (isSupabaseConfigured()) {
    try {
      await insertConsultationToSupabase(created);
    } catch (e) {
      console.warn('[Supabase] Consultation sync error:', e.message);
    }
  }

  console.log(`[Node.js Backend] New Bespoke Consultation: ${created.name} (${id})`);
  res.status(201).json(created);
});

// PATCH consultation status
app.patch('/api/consultations/:id/status', async (req, res) => {
  const id = req.params.id;
  const altId = id.startsWith('JM-') ? toAXId(id) : toJMId(id);
  const { status } = req.body;
  const consultations = readJsonFile(CONSULTATIONS_FILE);
  const index = consultations.findIndex(c => c.id === id || c.id === altId);

  let updatedRecord = null;
  if (index !== -1) {
    consultations[index].status = status;
    consultations[index].updatedAt = new Date().toISOString();
    consultations[index].id = toJMId(consultations[index].id);
    updatedRecord = consultations[index];
  } else {
    // If not in local file, find from Supabase or create record
    let existingItem = null;
    if (isSupabaseConfigured()) {
      try {
        const allSupabase = await getConsultationsFromSupabase();
        existingItem = allSupabase?.find(c => c.id === id || c.id === altId);
      } catch (e) {}
    }
    updatedRecord = {
      ...(existingItem || {}),
      id: toJMId(id),
      status,
      updatedAt: new Date().toISOString()
    };
    consultations.push(updatedRecord);
  }
  writeJsonFile(CONSULTATIONS_FILE, consultations);

  if (isSupabaseConfigured()) {
    try {
      await updateConsultationStatusInSupabase(id, status);
      if (altId !== id) {
        await updateConsultationStatusInSupabase(altId, status);
      }
    } catch (e) {
      console.warn('[Supabase] Consultation status sync error:', e.message);
    }
  }

  console.log(`[Node.js Backend] Consultation ${id} status updated to: ${status}`);
  res.json(updatedRecord);
});

// DELETE consultation
app.delete('/api/consultations/:id', async (req, res) => {
  const id = req.params.id;
  const altId = id.startsWith('JM-') ? toAXId(id) : toJMId(id);
  let consultations = readJsonFile(CONSULTATIONS_FILE);
  consultations = consultations.filter(c => c.id !== id && c.id !== altId);
  writeJsonFile(CONSULTATIONS_FILE, consultations);

  if (isSupabaseConfigured()) {
    try {
      await deleteConsultationFromSupabase(id);
      if (altId !== id) {
        await deleteConsultationFromSupabase(altId);
      }
    } catch (e) {
      console.warn('[Supabase] Consultation delete error:', e.message);
    }
  }

  console.log(`[Node.js Backend] Deleted consultation: ${id}`);
  res.json({ success: true, message: `Consultation ${id} deleted successfully` });
});

// -----------------------------------------------------------------------------
// 4. ORDERS API (Client Dispatches Control)
// -----------------------------------------------------------------------------

// GET all orders
app.get('/api/orders', async (req, res) => {
  const localOrders = readJsonFile(ORDERS_FILE, []).map(o => ({
    ...o,
    id: toJMId(o.id)
  }));
  let supabaseOrders = null;

  if (isSupabaseConfigured()) {
    try {
      const raw = await getOrdersFromSupabase();
      if (raw) {
        supabaseOrders = raw.map(o => ({
          ...o,
          id: toJMId(o.id)
        }));
      }
    } catch (e) {
      console.warn('[Supabase] Orders query error:', e.message);
    }
  }

  if (!supabaseOrders || supabaseOrders.length === 0) {
    return res.json(localOrders);
  }

  // Merge: Local status & local fields take precedence for updated items
  const localMap = new Map(localOrders.map(o => [o.id, o]));
  const merged = supabaseOrders.map(so => {
    const local = localMap.get(so.id);
    if (local) {
      return {
        ...so,
        status: local.status || so.status,
        updatedAt: local.updatedAt || so.createdAt
      };
    }
    return so;
  });

  const supabaseIds = new Set(supabaseOrders.map(o => o.id));
  for (const lo of localOrders) {
    if (!supabaseIds.has(lo.id)) {
      merged.push(lo);
    }
  }

  res.json(merged);
});

// POST create order
app.post('/api/orders', async (req, res) => {
  const data = req.body;
  const orders = readJsonFile(ORDERS_FILE);
  const rawId = data.id || `JM-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const id = toJMId(rawId);

  const created = {
    id,
    customerName: data.customerName || data.customer_name || 'Client Patron',
    customer_name: data.customerName || data.customer_name || 'Client Patron',
    email: data.email,
    phone: data.phone || '',
    address: data.address || '',
    items: data.items || [],
    total: Number(data.total) || 0,
    paymentMethod: data.paymentMethod || data.payment_method || 'VIP Concierge Wire',
    payment_method: data.paymentMethod || data.payment_method || 'VIP Concierge Wire',
    status: data.status || 'Preparing Cedar Chest',
    createdAt: new Date().toISOString()
  };

  orders.unshift(created);
  writeJsonFile(ORDERS_FILE, orders);

  if (isSupabaseConfigured()) {
    try {
      await insertOrderToSupabase(created);
    } catch (e) {
      console.warn('[Supabase] Order sync error:', e.message);
    }
  }

  console.log(`[Node.js Backend] New Client Order: ${id} by ${created.customerName} (₹${created.total})`);
  res.status(201).json(created);
});

// PATCH order status
app.patch('/api/orders/:id/status', async (req, res) => {
  const id = req.params.id;
  const altId = id.startsWith('JM-') ? toAXId(id) : toJMId(id);
  const { status } = req.body;
  const orders = readJsonFile(ORDERS_FILE);
  const index = orders.findIndex(o => o.id === id || o.id === altId);

  let updatedRecord = null;
  if (index !== -1) {
    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    orders[index].id = toJMId(orders[index].id);
    updatedRecord = orders[index];
  } else {
    let existingItem = null;
    if (isSupabaseConfigured()) {
      try {
        const allSupabase = await getOrdersFromSupabase();
        existingItem = allSupabase?.find(o => o.id === id || o.id === altId);
      } catch (e) {}
    }
    updatedRecord = {
      ...(existingItem || {}),
      id: toJMId(id),
      status,
      updatedAt: new Date().toISOString()
    };
    orders.push(updatedRecord);
  }
  writeJsonFile(ORDERS_FILE, orders);

  if (isSupabaseConfigured()) {
    try {
      await updateOrderStatusInSupabase(id, status);
      if (altId !== id) {
        await updateOrderStatusInSupabase(altId, status);
      }
    } catch (e) {
      console.warn('[Supabase] Order update status error:', e.message);
    }
  }

  console.log(`[Node.js Backend] Order ${id} status updated to: ${status}`);
  res.json(updatedRecord);
});

// DELETE order
app.delete('/api/orders/:id', async (req, res) => {
  const id = req.params.id;
  const altId = id.startsWith('JM-') ? toAXId(id) : toJMId(id);
  let orders = readJsonFile(ORDERS_FILE);
  orders = orders.filter(o => o.id !== id && o.id !== altId);
  writeJsonFile(ORDERS_FILE, orders);

  if (isSupabaseConfigured()) {
    try {
      await deleteOrderFromSupabase(id);
      if (altId !== id) {
        await deleteOrderFromSupabase(altId);
      }
    } catch (e) {
      console.warn('[Supabase] Order delete error:', e.message);
    }
  }

  console.log(`[Node.js Backend] Deleted order: ${id}`);
  res.json({ success: true, message: `Order ${id} deleted successfully` });
});

// -----------------------------------------------------------------------------
// 5. AUTHENTICATION API (Persistent in server/data/users.json)
// -----------------------------------------------------------------------------

// Informative GET helper for browser address bar checks
app.get('/api/auth/register', (req, res) => {
  res.json({
    status: 'active',
    endpoint: '/api/auth/register',
    method: 'POST',
    description: 'Endpoint to register new users. Send a POST request with JSON body to create an account.',
    example_payload: {
      name: 'Priyanka Saikia',
      email: 'priyanka@example.com',
      password: 'securepassword123'
    }
  });
});

app.get('/api/auth/login', (req, res) => {
  res.json({
    status: 'active',
    endpoint: '/api/auth/login',
    method: 'POST',
    description: 'Endpoint to login users. Send a POST request with JSON body.',
    example_payload: {
      email: 'admin@juthikabymomita.com',
      password: 'adminpassword123'
    }
  });
});

// Customer / Admin Registration
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!cleanName) {
    return res.status(400).json({ error: 'Please enter your full name.' });
  }
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!cleanPassword || cleanPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  // Check Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const existingInSupabase = await findUserInSupabase(cleanEmail);
      if (existingInSupabase) {
        return res.status(400).json({ error: 'An account with this email address already exists. Please login.' });
      }
    } catch (e) {
      console.warn('[Supabase] User lookup warning:', e.message);
    }
  }

  const users = readJsonFile(USERS_FILE, []);
  const existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existingUser) {
    return res.status(400).json({ error: 'An account with this email address already exists. Please login.' });
  }

  const isRoleAdmin = cleanEmail === 'admin@juthikabymomita.com' || cleanEmail.includes('admin');
  const newUser = {
    id: `usr-${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    password: cleanPassword,
    role: isRoleAdmin ? 'admin' : 'client',
    title: isRoleAdmin ? 'Master Atelier Director' : 'Patron of Assamese Handloom',
    tier: isRoleAdmin ? 'Atelier Council Member' : 'Heritage Silk Patron',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeJsonFile(USERS_FILE, users);

  if (isSupabaseConfigured()) {
    try {
      await insertUserToSupabase(newUser);
    } catch (e) {
      console.warn('[Supabase] User registration sync error:', e.message);
    }
  }

  console.log(`[Node.js Backend] Registered new user: ${cleanName} (${cleanEmail}) [${newUser.role}]`);

  // Automated Customer Account Confirmation Email Trigger
  const storeUrl = `${req.protocol}://${req.get('host') ? req.get('host').replace(':8000', ':5173') : 'http://localhost:5173'}`;
  sendCustomerAccountConfirmationEmail({
    to: cleanEmail,
    name: cleanName,
    storeUrl,
    isLogin: false
  }).then(result => {
    console.log(`[Email Service] Confirmation dispatch for ${cleanEmail}:`, result.status || (result.delivered ? 'delivered' : 'simulated'));
  }).catch(err => {
    console.warn(`[Email Service] Registration email warning:`, err.message);
  });

  const { password: _, ...safeUser } = newUser;
  return res.status(201).json({
    user: safeUser,
    token: `node-token-${Date.now()}`,
    message: `Account created successfully. Welcome to Juthika by Momita, ${cleanName}.`
  });
});

// Customer / Admin Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!cleanEmail) {
    return res.status(400).json({ error: 'Please enter your email address.' });
  }
  if (!cleanPassword) {
    return res.status(400).json({ error: 'Please enter your password.' });
  }

  let user = null;

  // Check Supabase first if configured
  if (isSupabaseConfigured()) {
    try {
      user = await findUserInSupabase(cleanEmail);
    } catch (e) {
      console.warn('[Supabase] Login check warning:', e.message);
    }
  }

  // Fallback to local users.json
  if (!user) {
    const users = readJsonFile(USERS_FILE, []);
    user = users.find(u => u.email.toLowerCase() === cleanEmail);
  }

  // Default admin fallback if not already in file
  if (!user && (cleanEmail === 'admin@juthikabymomita.com' || cleanEmail.includes('admin'))) {
    if (cleanPassword === 'adminpassword123') {
      user = {
        id: 'usr-admin-01',
        name: 'Curator Hemanta Saikia',
        email: cleanEmail,
        password: cleanPassword,
        role: 'admin',
        title: 'Master Atelier Director',
        tier: 'Atelier Council Member',
        createdAt: new Date().toISOString()
      };
      const users = readJsonFile(USERS_FILE, []);
      users.push(user);
      writeJsonFile(USERS_FILE, users);
    }
  }

  if (!user) {
    return res.status(404).json({ error: 'No account found with this email. Please sign up first.' });
  }

  // Password verification
  if (user.password && user.password !== cleanPassword) {
    return res.status(401).json({ error: 'Incorrect password. Please try again.' });
  }

  console.log(`[Node.js Backend] User logged in: ${user.name} (${user.email})`);

  // Automated Customer Login / Account Notification Email Trigger
  const storeUrl = `${req.protocol}://${req.get('host') ? req.get('host').replace(':8000', ':5173') : 'http://localhost:5173'}`;
  sendCustomerAccountConfirmationEmail({
    to: cleanEmail,
    name: user.name,
    storeUrl,
    isLogin: true
  }).then(result => {
    console.log(`[Email Service] Login notification dispatch for ${cleanEmail}:`, result.status || (result.delivered ? 'delivered' : 'simulated'));
  }).catch(err => {
    console.warn(`[Email Service] Login email warning:`, err.message);
  });

  const { password: _, ...safeUser } = user;
  return res.json({
    user: safeUser,
    token: `node-token-${Date.now()}`,
    message: `Welcome back to the sanctuary, ${user.name}.`
  });
});

app.get('/api/auth/me', (req, res) => {
  const users = readJsonFile(USERS_FILE, []);
  if (users.length > 0) {
    const { password: _, ...safeUser } = users[0];
    return res.json(safeUser);
  }
  res.status(404).json({ error: 'No user session active.' });
});

// -----------------------------------------------------------------------------
// 6. CUSTOMER EMAIL NOTIFICATION APIS
// -----------------------------------------------------------------------------

// Live HTML preview of the customer confirmation email
app.get('/api/emails/preview-raw', (req, res) => {
  const name = req.query.name || 'Ajayendra Shekhar';
  const storeUrl = req.query.storeUrl || 'http://localhost:5173';
  const html = renderAccountConfirmationHtml({
    customerName: name,
    storeUrl
  });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// JSON list of recently dispatched confirmation emails
app.get('/api/emails/sent', (req, res) => {
  const emails = getSentEmails();
  res.json({
    total: emails.length,
    recent: emails
  });
});

// Test trigger endpoint to test email dispatch to any address
app.post('/api/emails/send-test', async (req, res) => {
  const { to, name } = req.body;
  if (!to || !to.includes('@')) {
    return res.status(400).json({ error: 'Valid recipient email is required in JSON body.' });
  }

  const result = await sendCustomerAccountConfirmationEmail({
    to,
    name: name || 'Valued Patron',
    storeUrl: 'http://localhost:5173',
    isLogin: false
  });

  res.json({
    message: `Account confirmation email triggered for ${to}.`,
    result
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Juthika by Momita Node.js Backend Running on Port ${PORT}`);
  console.log(` Health check:  http://localhost:${PORT}/api/health`);
  console.log(` Products API:  http://localhost:${PORT}/api/products`);
  console.log(` Orders API:    http://localhost:${PORT}/api/orders`);
  console.log(` Email Preview: http://localhost:${PORT}/api/emails/preview-raw`);
  console.log(` Email Log:     http://localhost:${PORT}/api/emails/sent`);
  console.log(`=======================================================`);
});
