import React from 'react';
import { Link } from 'react-router-dom';

export const MegaMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const MENU_SECTIONS = [
    {
      title: 'WOMEN',
      items: [
        { name: 'ALL WOMENSWEAR', href: '/shop?category=All&department=women' },
        { name: 'LEHENGA SETS', href: '/shop?category=Lehenga%20Sets' },
        { name: 'SAREES', href: '/shop?category=Sarees' },
        { name: 'CONCEPT SAREES', href: '/shop?category=Concept%20Sarees' },
        { name: 'SUIT SETS', href: '/shop?category=Suit%20Sets' },
        { name: 'CAPES & JACKETS', href: '/shop?category=Capes%20%26%20Jackets' },
        { name: 'DRESSES', href: '/shop?category=Dresses' },
        { name: 'JUMPSUIT SETS', href: '/shop?category=Jumpsuit%20Sets' },
        { name: 'SKIRT & TROUSER SETS', href: '/shop?category=Skirt%20%26%20Trouser%20Sets' },
        { name: 'GOWNS', href: '/shop?category=Gowns' }
      ]
    },
    {
      title: 'MEN',
      items: [
        { name: 'ALL MENSWEAR', href: '/shop?category=All&department=men' },
        { name: 'KURTA SETS', href: '/shop?category=Kurta%20Sets' },
        { name: 'SHERWANI SETS', href: '/shop?category=Sherwani%20Sets' },
        { name: 'WAISTCOAT SETS', href: '/shop?category=Waistcoat%20Sets' },
        { name: 'BANDHGALA SETS', href: '/shop?category=Bandhgala%20Sets' }
      ]
    },
    {
      title: 'ACCESSORIES',
      items: [
        { name: 'ALL', href: '/shop?category=All&department=accessories' },
        { name: 'BAGS', href: '/shop?category=Bags' },
        { name: 'JEWELLERY', href: '/shop?category=Jewellery' },
        { name: 'BELTS', href: '/shop?category=Belts' }
      ]
    },
    {
      title: 'COLLECTIONS',
      items: [
        { name: 'ALL', href: '/shop' },
        { name: 'FALL WINTER OCCASSION WEAR', href: '/shop?collection=Fall%20Winter%20Occasion%20Wear' },
        { name: 'EVER BLOOM', href: '/shop?collection=Ever%20Bloom' },
        { name: 'QUINTESSENCE', href: '/shop?collection=Quintessence' },
        { name: 'OTHERWORLDLY', href: '/shop?collection=Otherworldly' },
        { name: 'GOLDEN LIGHT', href: '/shop?collection=Golden%20Light' },
        { name: 'LANGUID SUMMER', href: '/shop?collection=Languid%20Summer' },
        { name: 'TIMELESS', href: '/shop?collection=Timeless' },
        { name: 'SOL', href: '/shop?collection=Sol' },
        { name: 'DELAYED CHECKOUT', href: '/shop?collection=Delayed%20Checkout' },
        { name: 'PAINTERLY DREAMS', href: '/shop?collection=Painterly%20Dreams' }
      ]
    },
    {
      title: 'TRENDING',
      items: [
        { name: 'COFFEE TABLE BOOK', href: '/shop?category=Coffee%20Table%20Book' },
        { name: 'RECENTLY ADDED', href: '/shop?sort=newest' }
      ]
    }
  ];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#E8DFD1] shadow-2xl z-50 transition-all duration-300 animate-fade-in"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-10 sm:py-14">
        
        {/* Exact 5-Column High-Fashion Grid (1:1 with Screenshot) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {MENU_SECTIONS.map((sec) => (
            <div key={sec.title} className="flex flex-col">
              
              {/* Underlined Column Header */}
              <div className="mb-5 sm:mb-6">
                <span className="inline-block text-xs uppercase tracking-[0.24em] text-[#111111] font-semibold border-b border-[#111111] pb-1">
                  {sec.title}
                </span>
              </div>

              {/* Links List */}
              <ul className="space-y-3 sm:space-y-3.5">
                {sec.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="block text-[10.5px] sm:text-[11px] uppercase tracking-[0.18em] text-[#24211D]/80 hover:text-black hover:font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
