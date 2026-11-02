import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Check, X } from 'lucide-react';
import { isAdminSubdomain, getAdminSubdomainUrl, getMainStoreUrl } from '../utils/subdomain';

export const Login = () => {
  const { user, login, signup, logout, orders = [] } = useCart();
  const navigate = useNavigate();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotMessage, setForgotMessage] = useState(false);

  // Address management state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState('');
  const [savedAddress, setSavedAddress] = useState(() => {
    try {
      const stored = localStorage.getItem('aiaxom_user_address');
      if (stored) return stored;
    } catch (e) {
      // ignore
    }
    return 'India';
  });

  // Filter orders for the currently logged in user
  const userOrders = (orders || []).filter(o => 
    o.email && user?.email && o.email.toLowerCase() === user.email.toLowerCase()
  );

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (tempAddress.trim()) {
      setSavedAddress(tempAddress.trim());
      try {
        localStorage.setItem('aiaxom_user_address', tempAddress.trim());
      } catch (err) {
        console.warn('Could not save address to localStorage:', err);
      }
    }
    setIsEditingAddress(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignUpMode && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    if (isSignUpMode && password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      let loggedUser = null;
      if (isSignUpMode) {
        loggedUser = await signup(name, email, password);
      } else {
        loggedUser = await login(email, password);
      }

      // Admin login opens Admin Subdomain portal, Customer login opens Storefront
      if (loggedUser?.role === 'admin' || email.toLowerCase().includes('admin')) {
        if (!isAdminSubdomain()) {
          window.location.href = getAdminSubdomainUrl('/');
        } else {
          navigate('/');
        }
      } else {
        if (isAdminSubdomain()) {
          window.location.href = getMainStoreUrl('/');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-[82vh] py-14 sm:py-20 px-6 sm:px-12 lg:px-16">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. MINIMALIST LUXURY ACCOUNT PAGE (Matches Exact Screenshot Style) */}
      {/* ------------------------------------------------------------------ */}
      {user ? (
        <div className="max-w-5xl mx-auto animate-fade-in font-sans">
          
          {/* Top Left Logout Link */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-[11px] uppercase tracking-[0.2em] text-[#666666] hover:text-[#111111] transition-colors inline-flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>&lsaquo;</span>
              <span>LOGOUT</span>
            </button>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-xl sm:text-2xl font-normal tracking-[0.2em] text-[#111111] uppercase mb-2">
            YOUR ACCOUNT
          </h1>
          <p className="text-xs sm:text-[13px] text-[#555555] mb-12 font-normal">
            View all your orders and manage your account information.
          </p>

          {/* Two-Column Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 border-t border-[#F5F5F5] pt-8">
            
            {/* Left Column: ORDERS (Takes 2 Columns) */}
            <div className="md:col-span-2">
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-[#777777] font-medium mb-8">
                ORDERS
              </h2>

              {userOrders.length === 0 ? (
                <div>
                  <p className="text-xs sm:text-[13px] text-[#444444] mb-8 font-normal leading-relaxed">
                    You haven't placed any orders yet.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-block px-8 py-3.5 bg-[#333333] hover:bg-[#111111] text-white text-[11px] uppercase tracking-[0.22em] font-medium transition-colors text-center"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border border-[#E5E5E5] divide-y divide-[#E5E5E5]">
                    {userOrders.map((ord) => (
                      <div key={ord.id} className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <span className="font-mono text-xs font-semibold text-[#111111] block">
                            {ord.id}
                          </span>
                          <span className="text-[11px] text-[#666666] mt-0.5 block">
                            {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            {' '}&bull; {ord.items?.length || 1} {(ord.items?.length || 1) === 1 ? 'creation' : 'creations'}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium text-[#111111] block">
                            ₹{Number(ord.total || 0).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-[#111111] font-medium">
                            {ord.status || 'Preparing Cedar Chest'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/shop"
                    className="inline-block px-8 py-3.5 bg-[#333333] hover:bg-[#111111] text-white text-[11px] uppercase tracking-[0.22em] font-medium transition-colors text-center"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column: PRIMARY ADDRESS (Takes 1 Column) */}
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-[#777777] font-medium mb-8">
                PRIMARY ADDRESS
              </h2>

              <div className="text-xs sm:text-[13px] text-[#444444] space-y-1 mb-8 leading-relaxed">
                <p className="font-medium text-[#111111]">{user.name}</p>
                <p className="text-[#333333]">{savedAddress}</p>
                <p className="text-[#777777] text-xs font-mono">{user.email}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setTempAddress(savedAddress);
                  setIsEditingAddress(true);
                }}
                className="px-8 py-3.5 bg-[#333333] hover:bg-[#111111] text-white text-[11px] uppercase tracking-[0.22em] font-medium transition-colors text-center cursor-pointer"
              >
                MANAGE
              </button>

              {user.role === 'admin' && (
                <div className="mt-8 pt-6 border-t border-[#F5F5F5]">
                  <a
                    href={isAdminSubdomain() ? '/' : getAdminSubdomainUrl('/')}
                    className="block w-full py-3 bg-[#111111] hover:bg-[#222222] text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-colors text-center"
                  >
                    ATELIER ADMIN CONSOLE
                  </a>
                </div>
              )}
            </div>

          </div>

          {/* Modal to Manage / Edit Address */}
          {isEditingAddress && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
              <div className="bg-white border border-[#E5E5E5] p-6 sm:p-8 max-w-md w-full shadow-lg relative animate-fade-in">
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(false)}
                  className="absolute top-4 right-4 text-[#111111]/60 hover:text-[#111111] cursor-pointer"
                >
                  <X size={18} />
                </button>
                <h3 className="font-serif text-lg text-[#111111] mb-1">Update Primary Address</h3>
                <p className="text-xs text-[#666666] mb-4">Set your default shipping destination for loom dispatches.</p>
                <form onSubmit={handleSaveAddress} className="space-y-4">
                  <textarea
                    rows={3}
                    required
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    placeholder="Enter full address, city, state, postal code"
                    className="w-full border border-[#D5CEBF] p-3 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#333333] hover:bg-[#111111] text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                    >
                      SAVE ADDRESS
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="px-5 py-3 border border-[#E5E5E5] text-[#111111] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#F5F2EC] transition-colors cursor-pointer"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* ------------------------------------------------------------------ */
        /* 2. CUSTOMER SIGN IN / SIGN UP FORM (When Not Logged In)           */
        /* ------------------------------------------------------------------ */
        <div className="w-full max-w-md mx-auto">
          <div className="text-center animate-fade-in font-sans">
            
            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-normal tracking-[0.22em] text-[#111111] uppercase mb-2">
              {isSignUpMode ? 'SIGN UP' : 'LOGIN'}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-[#111111]/75 font-normal mb-8">
              {isSignUpMode 
                ? 'Register with your name, email, and password to manage your silk orders:' 
                : 'Enter your registered email and password to sign in:'
              }
            </p>

            {/* Forgot password feedback notice */}
            {forgotMessage && (
              <div className="mb-5 p-3 bg-neutral-100 border border-neutral-300 text-black text-xs flex items-center justify-center gap-2">
                <Check size={14} className="text-black flex-shrink-0" />
                <span>Password reset link has been dispatched to your email.</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="text-left space-y-4">
              
              {/* Full Name for Sign Up */}
              {isSignUpMode && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#111111]/60 mb-1.5 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#E0E0E0] focus:border-[#111111] px-4 py-3.5 text-xs text-[#111111] placeholder:text-[#111111]/45 focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* E-mail Input */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#111111]/60 mb-1.5 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E0E0E0] focus:border-[#111111] px-4 py-3.5 text-xs text-[#111111] placeholder:text-[#111111]/45 focus:outline-none transition-colors"
                />
              </div>

              {/* Password Input with inline "Forgot your password?" on the right */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#111111]/60 mb-1.5 font-medium">
                  Password
                </label>
                <div className="relative flex items-center border border-[#E0E0E0] focus-within:border-[#111111] bg-white transition-colors">
                  <input
                    type="password"
                    required
                    placeholder={isSignUpMode ? "Create a secure password (min. 6 chars)" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent px-4 py-3.5 text-xs text-[#111111] placeholder:text-[#111111]/45 focus:outline-none"
                  />
                  {!isSignUpMode && (
                    <button
                      type="button"
                      onClick={() => setForgotMessage(true)}
                      className="pr-4 text-xs text-[#111111]/55 hover:text-[#111111] whitespace-nowrap transition-colors cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
              </div>

              {/* LOGIN / SIGN UP Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-[0.24em] font-medium transition-colors cursor-pointer shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>PLEASE WAIT...</span>
                    </>
                  ) : (
                    <span>{isSignUpMode ? 'SIGN UP' : 'SIGN IN'}</span>
                  )}
                </button>
              </div>

              {/* Footer Toggle: "Don't have an account? Sign up" */}
              <div className="text-center pt-3 text-xs sm:text-[13px] text-[#111111]/75">
                {isSignUpMode ? (
                  <>
                    <span>Already have an account?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUpMode(false);
                        setError('');
                      }}
                      className="text-[#111111] font-medium hover:text-black hover:opacity-70 ml-1.5 underline underline-offset-2 cursor-pointer"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    <span>Don't have an account?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUpMode(true);
                        setError('');
                      }}
                      className="text-[#111111] font-medium hover:text-black hover:opacity-70 ml-1.5 underline underline-offset-2 cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
