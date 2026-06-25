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

  return (
    <footer className="bg-[#F3ECE2] border-t border-brand-stone/60 pt-[50px] pb-[35px] px-6 md:px-12 mt-auto">
      <div className="max-w-[1200px] mx-auto">
        {/* Columns Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-[60px] xl:gap-[80px] mb-10 text-center sm:text-left items-start select-none">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col items-center sm:items-start space-y-4 max-w-xs mx-auto sm:mx-0">
            <img 
              src="/Images/habibti%20logo.png" 
              alt="Habibti Logo" 
              className="w-28 md:w-[120px] h-auto object-contain mx-auto sm:mx-0" 
            />
            <div className="flex flex-col items-center sm:items-start space-y-1">
              <Link 
                to="/" 
                className="text-xl md:text-2xl font-light tracking-[0.35em] text-brand-dark hover:text-brand-gold transition-colors duration-300 font-serif"
              >
                HABIBTI
              </Link>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-light block">
                Luxury Modest Fashion
              </span>
            </div>
            <p className="text-xs text-brand-muted font-light leading-relaxed">
              Timeless modest wear crafted with elegance, comfort, and sophistication.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-dark/95 mb-1">
              Navigation
            </h4>
            <ul className="space-y-3 flex flex-col items-center sm:items-start">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-xs uppercase tracking-[0.2em] text-brand-dark/70 hover:text-brand-gold transition-colors duration-300 relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="flex flex-col items-center sm:items-start space-y-4 max-w-xs mx-auto sm:mx-0">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-dark/95 mb-1">
              Contact
            </h4>
            <div className="space-y-3 flex flex-col items-center sm:items-start text-xs font-light text-brand-muted">
              <a
                href="mailto:habibtifashions18@gmail.com"
                className="flex items-center gap-3 text-brand-dark/70 hover:text-brand-gold transition-colors duration-300 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark/60 group-hover:text-brand-gold transition-colors duration-300 shrink-0">
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
                className="flex items-center gap-3 text-brand-dark/70 hover:text-brand-gold transition-colors duration-300 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark/60 group-hover:text-brand-gold transition-colors duration-300 shrink-0">
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

          {/* Column 4: Powered By Partner */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-dark/95 mb-1">
              Powered By
            </h4>
            <div className="relative group inline-block">
              {/* Luxury Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-brand-dark text-[9px] text-[#FAF8F4] font-sans tracking-[0.2em] uppercase whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none rounded-[4px] shadow-lg z-50">
                Turning Ideas Into Ventures
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-dark"></span>
              </span>
              
              {/* Partner Link */}
              <a
                href="https://www.foundrhub.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-[22px] font-light tracking-[0.25em] font-serif text-brand-dark hover:text-brand-gold transition-colors duration-300 relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
              >
                FOUNDRHUB
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar divider */}
        <div className="w-full h-[1px] bg-brand-stone/80 mt-10 mb-[20px]"></div>

        {/* Copyright notice */}
        <div className="text-center">
          <span className="text-[10px] tracking-[0.25em] uppercase text-brand-dark/45 font-light">
            © {currentYear} HABIBTI. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
