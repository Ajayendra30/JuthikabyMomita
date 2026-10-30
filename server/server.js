import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
    id: 'AX-BR-829104',
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
    id: 'AX-BR-419082',
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
    id: 'AX-BR-993021',
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
    id: 'AX-ORD-740192',
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
    id: 'AX-ORD-519283',
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
// 1. HEALTH CHECK ENDPOINT
// -----------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    online: true,
    backend: 'Node.js Express Server',
    database_type: 'Node.js JSON Database',
    timestamp: new Date().toISOString()
  });
});

// -----------------------------------------------------------------------------
// 2. PRODUCTS API (Catalog Control)
// -----------------------------------------------------------------------------

// GET all products with optional filters
app.get('/api/products', (req, res) => {
  const { category, fabric, search, sort } = req.query;
  let products = readJsonFile(PRODUCTS_FILE);

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

  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const products = readJsonFile(PRODUCTS_FILE);
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: `Product ${req.params.id} not found` });
  }
  res.json(product);
});

// POST create new product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: 'Product name and price are required' });
  }

  const products = readJsonFile(PRODUCTS_FILE);
  const id = newProduct.id || `ax-item-${Date.now()}`;
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

  console.log(`[Node.js Backend] Created new product: ${created.name} (${created.id})`);
  res.status(201).json(created);
});

// PUT update existing product
app.put('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const products = readJsonFile(PRODUCTS_FILE);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Product ${id} not found` });
  }

  const existing = products[index];
  const updated = {
    ...existing,
    ...updates,
    id,
    price: updates.price !== undefined ? Number(updates.price) : existing.price,
    originalPrice: updates.originalPrice !== undefined ? Number(updates.originalPrice) : existing.originalPrice,
    loomDays: updates.loomDays !== undefined ? Number(updates.loomDays) : existing.loomDays,
    updatedAt: new Date().toISOString()
  };

  products[index] = updated;
  writeJsonFile(PRODUCTS_FILE, products);

  console.log(`[Node.js Backend] Updated product: ${updated.name} (${id})`);
  res.json(updated);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  let products = readJsonFile(PRODUCTS_FILE);
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);

  if (products.length === initialLength) {
    return res.status(404).json({ error: `Product ${id} not found` });
  }

  writeJsonFile(PRODUCTS_FILE, products);
  console.log(`[Node.js Backend] Deleted product: ${id}`);
  res.json({ success: true, message: `Product ${id} deleted successfully` });
});

// POST reset products to default masterwork data
app.post('/api/products/reset', (req, res) => {
  const initial = readJsonFile(INITIAL_PRODUCTS_FILE);
  writeJsonFile(PRODUCTS_FILE, initial);
  console.log(`[Node.js Backend] Reset products to default (${initial.length} items)`);
  res.json(initial);
});

// -----------------------------------------------------------------------------
// 3. CONSULTATIONS API (Bespoke Bridal Control)
// -----------------------------------------------------------------------------

// GET all consultations
app.get('/api/consultations', (req, res) => {
  const consultations = readJsonFile(CONSULTATIONS_FILE);
  res.json(consultations);
});

// POST create consultation
app.post('/api/consultations', (req, res) => {
  const data = req.body;
  if (!data.name || !data.email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const consultations = readJsonFile(CONSULTATIONS_FILE);
  const id = `AX-BR-${Math.floor(100000 + Math.random() * 900000)}`;
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

  console.log(`[Node.js Backend] New Bespoke Consultation: ${created.name} (${id})`);
  res.status(201).json(created);
});

// PATCH consultation status
app.patch('/api/consultations/:id/status', (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const consultations = readJsonFile(CONSULTATIONS_FILE);
  const index = consultations.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Consultation ${id} not found` });
  }

  consultations[index].status = status;
  consultations[index].updatedAt = new Date().toISOString();
  writeJsonFile(CONSULTATIONS_FILE, consultations);

  console.log(`[Node.js Backend] Consultation ${id} status updated to: ${status}`);
  res.json(consultations[index]);
});

// -----------------------------------------------------------------------------
// 4. ORDERS API (Client Dispatches Control)
// -----------------------------------------------------------------------------

// GET all orders
app.get('/api/orders', (req, res) => {
  const orders = readJsonFile(ORDERS_FILE);
  res.json(orders);
});

// POST create order
app.post('/api/orders', (req, res) => {
  const data = req.body;
  const orders = readJsonFile(ORDERS_FILE);
  const id = `AX-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

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

  console.log(`[Node.js Backend] New Client Order: ${id} by ${created.customerName} (₹${created.total})`);
  res.status(201).json(created);
});

// PATCH order status
app.patch('/api/orders/:id/status', (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const orders = readJsonFile(ORDERS_FILE);
  const index = orders.findIndex(o => o.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Order ${id} not found` });
  }

  orders[index].status = status;
  orders[index].updatedAt = new Date().toISOString();
  writeJsonFile(ORDERS_FILE, orders);

  console.log(`[Node.js Backend] Order ${id} status updated to: ${status}`);
  res.json(orders[index]);
});

// -----------------------------------------------------------------------------
// 5. AUTHENTICATION API
// -----------------------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const cleanEmail = (email || '').trim().toLowerCase();

  if (cleanEmail.includes('admin') || cleanEmail === 'admin@juthikabymomita.com') {
    return res.json({
      user: {
        id: 'usr-admin-01',
        name: 'Curator Hemanta Saikia',
        email: cleanEmail || 'admin@juthikabymomita.com',
        role: 'admin',
        title: 'Master Atelier Director',
        tier: 'Atelier Council Member'
      },
      token: `node-admin-token-${Date.now()}`,
      message: 'Welcome Curator Hemanta Saikia to the Private Atelier Console.'
    });
  }

  const formattedName = cleanEmail
    ? cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Maharani Barooah';

  return res.json({
    user: {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: formattedName,
      email: cleanEmail,
      role: 'client',
      title: 'Royal Silk Patron'
    },
    token: `node-client-token-${Date.now()}`,
    message: `Welcome to Juthika by Momita, ${formattedName}.`
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    id: 'usr-admin-01',
    name: 'Curator Hemanta Saikia',
    email: 'admin@juthikabymomita.com',
    role: 'admin',
    title: 'Master Atelier Director'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Juthika by Momita Node.js Backend Running on Port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Products API: http://localhost:${PORT}/api/products`);
  console.log(` Orders API:   http://localhost:${PORT}/api/orders`);
  console.log(`=======================================================`);
});
