import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Logout = () => {
  const { user, logout } = useCart();

  useEffect(() => {
    if (user) {
      logout();
    }
  }, [user, logout]);

  return (
    <div className="bg-[#FFFFFF] min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-[#FFFFFF] border border-[#E8DFD1] shadow-2xl p-8 sm:p-14 text-center">
        
        {/* Gold Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#B69A62]/15 text-[#B69A62] flex items-center justify-center">
          <CheckCircle2 size={36} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#B69A62]/40 rounded-full mb-4">
          <Sparkles size={12} className="text-[#B69A62]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold">
            Secure Session Concluded
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light mb-4">
          Farewell from the Atelier
        </h1>

        <p className="text-xs sm:text-sm text-[#24211D]/75 font-light leading-relaxed max-w-md mx-auto mb-8">
          You have successfully and securely signed out of your Juthika by Momita client salon. 
          May the golden warmth of Muga silk and the tranquility of Brahmaputra heritage accompany your path.
        </p>

        <div className="p-4 bg-[#FFFFFF] border border-[#E8DFD1] max-w-sm mx-auto mb-8 text-xs text-[#24211D]/70 space-y-1 text-left">
          <p>&bull; Client session terminated</p>
          <p>&bull; Shopping bag saved to local device</p>
          <p>&bull; Concierge hotline remains available 24/7</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/login"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
          >
            <LogIn size={14} />
            <span>Sign In Again</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#FFFFFF] border border-[#24211D] text-[#24211D] hover:bg-[#24211D] hover:text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to Boutique</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </div>
  );
};
