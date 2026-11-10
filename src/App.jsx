import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { isAdminSubdomain, getAdminSubdomainUrl, getMainStoreUrl } from './utils/subdomain';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppConcierge } from './components/WhatsAppConcierge';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Collections } from './pages/Collections';
import { Bridal } from './pages/Bridal';
import { Lookbook } from './pages/Lookbook';
import { OurCraft } from './pages/OurCraft';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Global Notification Toast
function GlobalToast() {
  const { notification } = useCart();
  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-[#FFFFFF] px-5 py-3.5 shadow-2xl border border-[#111111]/50 text-xs flex items-center gap-3 animate-fade-in">
      <span className="w-2 h-2 rounded-full bg-[#111111] animate-ping" />
      <span>{notification}</span>
    </div>
  );
}

// 1. DEDICATED ADMIN SUBDOMAIN APP (admin.yourdomain.com / admin.localhost)
function AdminSubdomainApp() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#111111]">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <GlobalToast />
    </div>
  );
}

// 2. MAIN CUSTOMER STOREFRONT APP (yourdomain.com / localhost)
function StorefrontApp() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#111111]">
      {/* Premium Navbar with MegaMenu */}
      <Navbar />

      {/* Main Routing Outlet */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/bridal" element={<Bridal />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/our-craft" element={<OurCraft />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Premium Footer */}
      <Footer />

      {/* Global Consultation Modal */}
      <ConsultationModal />

      {/* Global Wishlist Slide-over Drawer */}
      <WishlistDrawer />

      {/* Global Cart Slide-over Drawer */}
      <CartDrawer />

      {/* Floating WhatsApp Concierge Button */}
      <WhatsAppConcierge />

      {/* Toast Notification */}
      <GlobalToast />
    </div>
  );
}

export function App() {
  const onAdminSubdomain = isAdminSubdomain();

  return (
    <CartProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        {onAdminSubdomain ? <AdminSubdomainApp /> : <StorefrontApp />}
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
