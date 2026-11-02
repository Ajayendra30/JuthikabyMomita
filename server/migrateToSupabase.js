// =============================================================================
// Migration Script: Push local JSON data to Supabase PostgreSQL
// Usage: node server/migrateToSupabase.js
// =============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  getSupabaseClient, 
  isSupabaseConfigured,
  insertProductToSupabase,
  insertOrderToSupabase,
  insertUserToSupabase,
  insertConsultationToSupabase
} from './supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

async function migrate() {
  console.log('--- Juthika by Momita: Supabase PostgreSQL Data Migration ---');
  
  if (!isSupabaseConfigured()) {
    console.error('ERROR: Supabase credentials not found.');
    console.error('Please configure SUPABASE_URL and SUPABASE_ANON_KEY in your .env file first.');
    process.exit(1);
  }

  const client = getSupabaseClient();
  console.log('Connecting to Supabase PostgreSQL...');

  // 1. Migrate Products
  const productsFile = path.join(DATA_DIR, 'products.json');
  if (fs.existsSync(productsFile)) {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    console.log(`Pushing ${products.length} products to Supabase PostgreSQL...`);
    for (const p of products) {
      await insertProductToSupabase(p);
    }
    console.log('Products migrated successfully.');
  }

  // 2. Migrate Orders
  const ordersFile = path.join(DATA_DIR, 'orders.json');
  if (fs.existsSync(ordersFile)) {
    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
    console.log(`Pushing ${orders.length} orders to Supabase PostgreSQL...`);
    for (const o of orders) {
      await insertOrderToSupabase(o);
    }
    console.log('Orders migrated successfully.');
  }

  // 3. Migrate Users
  const usersFile = path.join(DATA_DIR, 'users.json');
  if (fs.existsSync(usersFile)) {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    console.log(`Pushing ${users.length} users to Supabase PostgreSQL...`);
    for (const u of users) {
      await insertUserToSupabase(u);
    }
    console.log('Users migrated successfully.');
  }

  // 4. Migrate Consultations
  const consultationsFile = path.join(DATA_DIR, 'consultations.json');
  if (fs.existsSync(consultationsFile)) {
    const consultations = JSON.parse(fs.readFileSync(consultationsFile, 'utf-8'));
    console.log(`Pushing ${consultations.length} consultations to Supabase PostgreSQL...`);
    for (const c of consultations) {
      await insertConsultationToSupabase(c);
    }
    console.log('Consultations migrated successfully.');
  }

  console.log('--- Migration completed successfully! ---');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
