import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const QUADRANT_ITEMS = [
  {
    id: 'bridal',
    title: 'BRIDAL',
    subtitle: 'EXPLORE',
    link: '/bridal',
    videoSrc: '/videos/gmm.mp4',
    poster: '/images/bridal-curated-ensembles.jpg',
    ariaLabel: 'Explore Bridal Couture'
  },
  {
    id: 'menswear',
    title: 'MENSWEAR',
    subtitle: 'EXPLORE',
    link: '/shop?category=Menswear',
    videoSrc: '/videos/menswear-video.mp4',
    poster: '/images/bridal-heirloom-hero.jpg',
    ariaLabel: 'Explore Menswear Collection'
  },
  {
    id: 'fashion',
    title: 'FASHION',
    subtitle: 'EXPLORE',
    link: '/collections',
    videoSrc: '/videos/fashion-video.mp4',
    poster: 'https://thesilkchamber.com/cdn/shop/files/kperisari_4e0389a4-2f66-4583-bcce-3088a728a035.jpg?v=1739620090&width=1800',
    ariaLabel: 'Explore Fashion and Ready-to-Wear'
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES',
    subtitle: 'EXPLORE',
    link: '/shop?category=Accessories',
    videoSrc: '/videos/accessories-video.mp4',
    poster: '/images/bridal-emerald-gold.jpg',
    ariaLabel: 'Explore Heirloom Accessories'
  }
];

export const CoutureVideoGrid = () => {
  const videoRefs = useRef([]);

  // Ensure all 4 videos autoplay reliably across all modern browsers
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Quadrant video autoplay deferred:', err);
        });
      }
    });
  }, []);

  return (
    <section className="relative w-full bg-[#111111] overflow-hidden p-0 m-0 border-b border-[#E5E5E5]">
      
      {/* 2x2 Full-Width Grid with Equal Width & Height (1:1 Square Quadrants) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-0 relative">
        
        {QUADRANT_ITEMS.map((item, index) => (
          <Link
            key={item.id}
            to={item.link}
            aria-label={item.ariaLabel}
            style={{ aspectRatio: '1 / 1' }}
            className="group relative w-full aspect-square overflow-hidden bg-[#111111] flex flex-col justify-end items-center pb-4 sm:pb-6 md:pb-8 cursor-pointer select-none border-b sm:border-b-0 border-[#FFFFFF]/15 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(1)]:border-b sm:[&:nth-child(2)]:border-b [&:last-child]:border-b-0"
          >
            {/* Background Autoplay Video */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={item.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={item.poster}
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] saturate-[0.98] transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            {/* Subtle Gradient & Vignette Overlay (Deeper at bottom for flawless text legibility) */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

            {/* Quadrant Editorial Label & Explore Button (Positioned at bottom center, refined minimalist couture sizing) */}
            <div className="relative z-10 text-center px-4 mx-auto flex flex-col items-center justify-center">
              <h3 className="font-['Montserrat',sans-serif] text-xs sm:text-sm md:text-base text-[#FFFFFF] font-normal tracking-[0.26em] sm:tracking-[0.3em] uppercase leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] mb-1.5 sm:mb-2 transition-transform duration-300 group-hover:-translate-y-0.5">
                {item.title}
              </h3>
              
              <span className="font-['Montserrat',sans-serif] text-[9px] sm:text-[10px] md:text-[11px] text-[#FFFFFF]/90 group-hover:text-[#FFFFFF] tracking-[0.24em] sm:tracking-[0.28em] uppercase underline underline-offset-4 decoration-[0.75px] decoration-[#FFFFFF]/70 group-hover:decoration-[#FFFFFF] font-light sm:font-normal transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {item.subtitle}
              </span>
            </div>
          </Link>
        ))}

      </div>

    </section>
  );
};
