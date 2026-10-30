import React, { useState } from 'react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSuccess(true);
  };

  return (
    <section className="py-20 bg-[#FFFFFF] border-b border-[#E8DFD1]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
          <Sparkles size={14} />
          <span>The Atelier Gazette</span>
        </div> */}

        <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light tracking-wide mb-3">
          Join the Circle of Discerning Patrons
        </h2>

        <p className="text-sm text-[#24211D]/75 font-light max-w-xl mx-auto mb-8 leading-relaxed">
          Receive private previews of limited Sualkuchi loom releases, invitations to our seasonal trunk shows, 
          and curated monographs on Assamese textile heritage.
        </p>

        {isSuccess ? (
          <div className="p-6 bg-[#FFFFFF] border border-[#B69A62]/40 max-w-md mx-auto flex items-center justify-center gap-3 text-emerald-800 shadow-sm animate-fade-in">
            <CheckCircle2 size={22} className="text-[#B69A62] flex-shrink-0" />
            <div className="text-left">
              <p className="font-serif text-base text-[#24211D] font-medium">Welcome to the Juthika by Momita Sanctuary</p>
              <p className="text-xs text-[#24211D]/70 font-light">
                Thank you for subscribing with <span className="font-medium text-[#B69A62]">{email}</span>. Your private dossier is on its way.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address..."
                  className={`w-full bg-[#FFFFFF] border px-4 py-3.5 text-xs text-[#24211D] placeholder:text-[#24211D]/45 focus:outline-none transition-colors ${
                    error ? 'border-red-500' : 'border-[#E8DFD1] focus:border-[#B69A62]'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight size={13} />
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-600 mt-2 text-left font-light">{error}</p>
            )}
            <p className="text-[10px] text-[#24211D]/50 mt-3 font-light tracking-wide">
              We respect your privacy. Unsubscribe at any time with one click.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
