import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { getAssetUrl } from '../utils/assetPath';

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
          poster={getAssetUrl('/images/boutique-poster.jpg')}
          className="w-full h-full object-cover object-top brightness-[0.88] contrast-[1.02]"
        >
          <source
            src={getAssetUrl('/videos/boutique-hero.mp4')}
            type="video/mp4"
          />
          Your browser does not support video playback.
        </video>

        {/* Editorial Gradients for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/50 via-[#24211D]/15 to-transparent" />
        <div className="absolute inset-0 bg-[#24211D]/10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center text-[#FFFFFF] flex flex-col items-center">

        {/* Add your existing heading, description and buttons here */}

      </div>
    </section>
  );
};
