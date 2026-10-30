import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { UserCheck, LogOut, Check } from 'lucide-react';

export const Login = () => {
  const { user, login, logout } = useCart();
  const navigate = useNavigate();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [forgotMessage, setForgotMessage] = useState(false);

  // Quick fill for test demo
  const handleDemoFill = (role) => {
    if (role === 'admin') {
      setEmail('admin@juthikabymomita.com');
      setPassword('adminpassword123');
      setName('Curator Hemanta Saikia');
    } else {
      setEmail('patron@juthikabymomita.com');
      setPassword('patronpassword123');
      setName('Maharani Priyadarshini Barooah');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    try {
      const loggedUser = await login(email, password);
      // Admin login opens Admin portal (/admin), Customer login opens Home page (/)
      if (loggedUser?.role === 'admin' || email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-[82vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md mx-auto">
        
        {/* If user is already logged in */}
        {user ? (
          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-10 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#B69A62]/15 text-[#B69A62] flex items-center justify-center">
              <UserCheck size={28} />
            </div>

            <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A62] font-semibold block mb-1">
              Active Session
            </span>
            <h2 className="font-serif text-2xl text-[#24211D] mb-1">
              Welcome, {user.name}
            </h2>
            <p className="text-xs text-[#24211D]/60 mb-6 font-mono">
              {user.email} &bull; <span className="text-[#B69A62] font-sans font-medium">{user.role}</span>
            </p>

            <div className="space-y-3 pt-2">
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block w-full py-3.5 bg-[#B69A62] hover:bg-[#A0834E] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  ADMIN
                </Link>
              )}
              <Link
                to="/shop"
                className="block w-full py-3.5 bg-[#24211D] hover:bg-[#B69A62] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                Explore Silk Catalog
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full py-3 border border-[#24211D] text-[#24211D] hover:bg-[#24211D] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={13} />
                <span>Sign Out / Logout</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login / Sign Up Form matching Screenshot 2 */
          <div className="text-center animate-fade-in">
            
            {/* Title */}
            <h1 className="font-sans text-xl sm:text-2xl font-normal tracking-[0.22em] text-[#24211D] uppercase mb-2">
              {isSignUpMode ? 'SIGN UP' : 'LOGIN'}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-[#24211D]/75 font-normal mb-8">
              {isSignUpMode 
                ? 'Enter your details to create an account:' 
                : 'Enter your email and password to login:'
              }
            </p>

            {/* Forgot password feedback notice */}
            {forgotMessage && (
              <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2">
                <Check size={14} className="text-emerald-600 flex-shrink-0" />
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
              
              {/* Optional Name for Sign Up */}
              {isSignUpMode && (
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#E0E0E0] focus:border-[#24211D] px-4 py-3.5 text-xs text-[#24211D] placeholder:text-[#24211D]/45 focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* E-mail Input */}
              <div>
                <input
                  type="email"
                  required
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E0E0E0] focus:border-[#24211D] px-4 py-3.5 text-xs text-[#24211D] placeholder:text-[#24211D]/45 focus:outline-none transition-colors"
                />
              </div>

              {/* Password Input with inline "Forgot your password?" on the right */}
              <div className="relative flex items-center border border-[#E0E0E0] focus-within:border-[#24211D] bg-white transition-colors">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent px-4 py-3.5 text-xs text-[#24211D] placeholder:text-[#24211D]/45 focus:outline-none"
                />
                {!isSignUpMode && (
                  <button
                    type="button"
                    onClick={() => setForgotMessage(true)}
                    className="pr-4 text-xs text-[#24211D]/55 hover:text-[#24211D] whitespace-nowrap transition-colors cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                )}
              </div>

              {/* LOGIN / SIGN UP Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#4A4744] hover:bg-[#24211D] text-white text-xs uppercase tracking-[0.24em] font-medium transition-colors cursor-pointer shadow-sm"
                >
                  {isSignUpMode ? 'CREATE ACCOUNT' : 'LOGIN'}
                </button>
              </div>

              {/* Footer Toggle: "Don't have an account? Sign up" */}
              <div className="text-center pt-3 text-xs sm:text-[13px] text-[#24211D]/75">
                {isSignUpMode ? (
                  <>
                    <span>Already have an account?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUpMode(false);
                        setError('');
                      }}
                      className="text-[#24211D] font-medium hover:text-[#B69A62] ml-1.5 underline underline-offset-2 cursor-pointer"
                    >
                      Log in
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
                      className="text-[#24211D] font-medium hover:text-[#B69A62] ml-1.5 underline underline-offset-2 cursor-pointer"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>

              {/* Demo Credentials Helper */}
              <div className="pt-8 border-t border-[#F0EBE1] text-center">
                <p className="text-[10px] uppercase tracking-wider text-[#24211D]/50 mb-2 font-medium">
                  Quick Demo Credentials:
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoFill('admin')}
                    className="text-[10px] px-3 py-1 bg-stone-100 hover:bg-[#24211D] hover:text-white text-[#24211D] border border-stone-200 transition-colors"
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('patron')}
                    className="text-[10px] px-3 py-1 bg-stone-100 hover:bg-[#24211D] hover:text-white text-[#24211D] border border-stone-200 transition-colors"
                  >
                    Customer
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
