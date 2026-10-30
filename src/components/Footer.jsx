import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Award,
  ArrowUp
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24211D] text-[#FFFFFF] pt-16 pb-12 border-t border-[#B69A62]/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#B69A62]/20">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.22em] text-[#FFFFFF] uppercase block leading-none">
                JUTHIKA
              </span>
              <span className="text-[10px] uppercase tracking-[0.38em] text-[#B69A62] font-medium block mt-1.5">
                BY MOMITA &bull; LUXURY ASSAMESE SILK
              </span>
            </Link>

            <p className="text-xs text-[#E8DFD1]/75 font-light leading-relaxed max-w-sm pt-2">
              Celebrating six hundred years of Sualkuchi handloom grandeur. 
              We curate rare wild Muga, cruelty-free Ahimsa Eri, and royal mulberry Paat silk into timeless haute couture.
            </p>

            

            {/* Social Icons (SVGs) */}
            <div className="pt-4 flex items-center space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#B69A62]/40 flex items-center justify-center text-[#E8DFD1] hover:text-[#FFFFFF] hover:border-[#B69A62] hover:bg-[#B69A62]/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#B69A62]/40 flex items-center justify-center text-[#E8DFD1] hover:text-[#FFFFFF] hover:border-[#B69A62] hover:bg-[#B69A62]/20 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              
            </div>
          </div>

          {/* Shop Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg text-[#FFFFFF] tracking-wider uppercase mb-4 text-[#B69A62]">
              The Silk Collections
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#E8DFD1]/80">
              <li>
                <Link to="/shop?category=Muga%20Silk" className="hover:text-[#B69A62] transition-colors">
                  Muga Silk — The Golden Weave
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Eri%20Silk" className="hover:text-[#B69A62] transition-colors">
                  Eri Silk — Ahimsa Peace Silk
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Paat%20Silk" className="hover:text-[#B69A62] transition-colors">
                  Paat Silk — Royal Mulberry
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Sarees" className="hover:text-[#B69A62] transition-colors">
                  Sualkuchi Heritage Sarees
                </Link>
              </li>
              <li>
                <Link to="/bridal" className="hover:text-[#B69A62] transition-colors">
                  Imperial Bridal Couture
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Occasion%20Wear" className="hover:text-[#B69A62] transition-colors">
                  Occasion & Festive Wear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Ready-to-Wear" className="hover:text-[#B69A62] transition-colors">
                  Modern Silk Ready-to-Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Craftsmanship (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-lg text-[#FFFFFF] tracking-wider uppercase mb-4 text-[#B69A62]">
              Atelier & Craft
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#E8DFD1]/80">
              <li>
                <Link to="/our-craft" className="hover:text-[#B69A62] transition-colors">
                  Our Handloom Heritage
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#B69A62] transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="hover:text-[#B69A62] transition-colors">
                  Editorial Lookbook
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B69A62] transition-colors">
                  The Juthika Story
                </Link>
              </li>
              <li>
                <Link to="/bridal" className="hover:text-[#B69A62] transition-colors">
                  Bespoke Bridal Salon
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#B69A62] transition-colors">
                  Client Concierge
                </Link>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <Link to="/login" className="hover:text-[#B69A62] transition-colors">
                  Patron Sign In
                </Link>
                <span className="text-[#B69A62]/40">&bull;</span>
                <Link to="/admin" className="text-[#B69A62] hover:text-white transition-colors">
                  Admin Portal &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Private Suites (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg text-[#FFFFFF] tracking-wider uppercase mb-4 text-[#B69A62]">
              Private Ateliers
            </h4>
            <div className="space-y-3 text-xs text-[#E8DFD1]/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#B69A62] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FFFFFF]">Flagship Atelier:</p>
                  <p>Silk Quarter, Sualkuchi & GS Road, Guwahati, Assam 781005</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#B69A62] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FFFFFF]">Private Suite:</p>
                  <p>The Chanakya & Mehrauli, New Delhi 110030</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail size={15} className="text-[#B69A62] flex-shrink-0" />
                <a href="mailto:concierge@juthikabymomita.com" className="hover:text-[#B69A62]">
                  concierge@juthikabymomita.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#B69A62] flex-shrink-0" />
                <span>+91 361 298 7654 / +91 98110 54321</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#E8DFD1]/60">
          <p className="font-light text-center md:text-left mb-4 md:mb-0">
            &copy; {CURRENT_YEAR} Juthika by Momita. All Rights Reserved. Luxury Assamese Silk Handcrafted with Reverence in Assam, India.
          </p>

          <div className="flex items-center space-x-6 text-[11px]">
            <Link to="/about" className="hover:text-[#B69A62] transition-colors">
              Handloom Ethics
            </Link>
            <Link to="/contact" className="hover:text-[#B69A62] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-[#B69A62] transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#B69A62] hover:text-[#FFFFFF] transition-colors ml-4"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
