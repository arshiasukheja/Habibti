import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Collections', path: '/collections' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'Contact', path: '/contact' },
  ];

  const headingClass =
    'text-[12px] uppercase tracking-[0.25em] font-medium text-brand-dark/95 mb-[19px]';

  return (
    <footer className="bg-[#F3ECE2] border-t border-brand-stone/60 pt-6 pb-5 px-6 md:px-12 mt-auto">
      <div className="max-w-[1200px] mx-auto">
        {/* Columns Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12 mb-5 text-left items-stretch select-none">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col items-start max-w-[240px]">
            <img 
              src="/Images/habibti%20logo.png" 
              alt="Habibti Logo" 
              className="w-[136px] md:w-[148px] h-auto object-contain mb-2.5" 
            />
            <Link 
              to="/" 
              className="text-xl md:text-[22px] font-light tracking-[0.35em] text-brand-dark hover:text-brand-gold transition-colors duration-300 font-serif mb-1"
            >
              HABIBTI
            </Link>
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-light block mb-2.5">
              Luxury Modest Fashion
            </span>
            <p className="text-[13px] text-brand-muted font-light leading-[1.6]">
              Timeless modest wear crafted with elegance, comfort, and sophistication.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-start">
            <h4 className={headingClass}>Navigation</h4>
            <ul className="space-y-2 flex flex-col items-start">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[13px] uppercase tracking-[0.2em] text-brand-dark/70 hover:text-brand-gold transition-colors duration-300 relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="flex flex-col items-start max-w-[260px]">
            <h4 className={headingClass}>Contact</h4>
            <div className="space-y-3 flex flex-col items-start text-[13px] font-light text-brand-muted">
              <a
                href="mailto:habibtifashions18@gmail.com"
                className="flex items-center gap-2.5 text-brand-dark/70 hover:text-brand-gold transition-colors duration-300 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark/60 group-hover:text-brand-gold transition-colors duration-300 shrink-0">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300 break-all">
                  habibtifashions18@gmail.com
                </span>
              </a>
              <a
                href="https://www.instagram.com/habibtifashions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-brand-dark/70 hover:text-brand-gold transition-colors duration-300 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark/60 group-hover:text-brand-gold transition-colors duration-300 shrink-0">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300">
                  @habibtifashions
                </span>
              </a>
            </div>
          </div>

          {/* Column 4: Powered By — anchored bottom-right */}
          <div className="flex flex-col items-start lg:items-end justify-end h-full">
            <div className="flex flex-col items-start lg:items-end">
              <h4 className={`${headingClass} lg:text-right`}>Powered By</h4>
              <div className="relative group inline-block">
                <span className="absolute bottom-full left-1/2 lg:left-auto lg:right-0 lg:translate-x-0 -translate-x-1/2 mb-2 px-3 py-1.5 bg-brand-dark text-[10px] text-[#FAF8F4] font-sans tracking-[0.2em] uppercase whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none rounded-[4px] shadow-lg z-50">
                  Turning Ideas Into Ventures
                  <span className="absolute top-full left-1/2 lg:left-auto lg:right-4 -translate-x-1/2 lg:translate-x-0 border-4 border-transparent border-t-brand-dark"></span>
                </span>
                <a
                  href="https://www.foundrhub.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-[15px] font-light tracking-[0.22em] font-serif text-brand-dark hover:text-brand-gold transition-colors duration-300 relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                >
                  FOUNDRHUB
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar divider */}
        <div className="w-full h-px bg-brand-stone/80 mt-4 mb-3"></div>

        {/* Copyright notice */}
        <div className="text-center">
          <span className="text-[11px] tracking-[0.25em] uppercase text-brand-dark/45 font-light">
            © {currentYear} HABIBTI. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
