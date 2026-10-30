
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#24211D]">

      {/* Background Fashion Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/boutique-poster.jpg"
          className="w-full h-full object-cover object-top brightness-110 contrast-100"
        >
          <source
            src="/videos/boutique-hero.mp4"
            type="video/mp4"
          />
          Your browser does not support video playback.
        </video>

        {/* Editorial Gradients for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/40 via-[#24211D]/10 to-transparent" />
        <div className="absolute inset-0 bg-[#24211D]/5" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center text-[#FFFFFF] flex flex-col items-center">

        {/* Add your existing heading, description and buttons here */}

        {/* Scroll Indicator
        <div className="mt-16 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#E8DFD1] mb-1">
            Scroll to Discover
          </span>

          <ChevronDown className="w-4 h-4 text-[#B69A62] animate-bounce" />
        </div> */}

      </div>

      
    </section>
  );
};
