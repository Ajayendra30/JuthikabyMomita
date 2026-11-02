-- =============================================================================
-- Juthika by Momita Luxury Assamese Silk Boutique
-- Supabase PostgreSQL Database Schema
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- =============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. USERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'customer',
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast user lookup during login
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- -----------------------------------------------------------------------------
-- 2. PRODUCTS TABLE (Handloom Silk Catalog)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  assamese_name TEXT,
  slug TEXT UNIQUE,
  fabric TEXT NOT NULL,
  category TEXT NOT NULL,
  secondary_category TEXT,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  featured BOOLEAN DEFAULT FALSE,
  tag TEXT DEFAULT 'Handloom Silk',
  in_stock BOOLEAN DEFAULT TRUE,
  stock_count INTEGER DEFAULT 5,
  images JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  sizes JSONB DEFAULT '["Standard Unstitched"]'::jsonb,
  loom_days INTEGER DEFAULT 20,
  artisan_location TEXT DEFAULT 'Sualkuchi, Assam',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for filtering by category, fabric, and featured
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_fabric ON public.products(fabric);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);

-- -----------------------------------------------------------------------------
-- 3. ORDERS TABLE (Client Checkouts & Tracking)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC(10, 2) NOT NULL,
  payment_method TEXT DEFAULT 'VIP Concierge Wire / Card Payment Link',
  status TEXT DEFAULT 'Loom Quality Inspection',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for searching orders by customer email and status
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- -----------------------------------------------------------------------------
-- 4. BESPOKE BRIDAL CONSULTATIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.consultations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  occasion TEXT,
  preferred_fabric TEXT,
  consultation_type TEXT,
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'Requested',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON public.consultations(created_at DESC);

-- -----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Products full CRUD access
CREATE POLICY "Public products viewable" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Public products insertable" ON public.products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public products updatable" ON public.products
  FOR UPDATE USING (true);

CREATE POLICY "Public products deletable" ON public.products
  FOR DELETE USING (true);

-- Orders full CRUD access
CREATE POLICY "Public orders viewable" ON public.orders
  FOR SELECT USING (true);

CREATE POLICY "Public orders insertable" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public orders updatable" ON public.orders
  FOR UPDATE USING (true);

CREATE POLICY "Public orders deletable" ON public.orders
  FOR DELETE USING (true);

-- Consultations full CRUD access
CREATE POLICY "Public consultations viewable" ON public.consultations
  FOR SELECT USING (true);

CREATE POLICY "Public consultations insertable" ON public.consultations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public consultations updatable" ON public.consultations
  FOR UPDATE USING (true);

CREATE POLICY "Public consultations deletable" ON public.consultations
  FOR DELETE USING (true);

-- Users access
CREATE POLICY "Users readable" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users insertable" ON public.users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users updatable" ON public.users
  FOR UPDATE USING (true);

-- -----------------------------------------------------------------------------
-- NOTE: For full unrestricted backend operation via the publishable key,
-- you can also simply run:
-- ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.consultations DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
-- -----------------------------------------------------------------------------
