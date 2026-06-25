import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Publish navbar height as a CSS custom property so all pages
  // and the Hero can consume the real rendered height without
  // hardcoded magic numbers (fixes Chrome subpixel rounding bug).
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        const h = navRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--navbar-height', `${h}px`);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Collections', path: '/collections' },
    { name: 'Lookbook', path: '/lookbook' },
  ];

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 bg-[#FAF8F4] border-b border-brand-stone/40 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center group select-none text-brand-dark hover:text-brand-gold transition-colors duration-300">
          <span className="text-xl md:text-[22px] lg:text-[24px] font-light tracking-[0.3em] leading-none uppercase font-sans">
            HABIBTI
          </span>
          <span className="text-[10px] md:text-[11px] lg:text-[12px] font-medium tracking-wider mt-1 text-brand-gold font-arabic leading-none">
            حبيبتي
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:text-brand-gold ${
                  isActive ? 'text-brand-gold font-medium' : 'text-brand-dark/70'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-brand-dark focus:outline-none p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} className="stroke-[1.5]" /> : <Menu size={20} className="stroke-[1.5]" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-[60px] bg-brand-light z-40 transition-transform duration-500 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}>
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-8 px-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg uppercase tracking-[0.25em] transition-colors duration-300 hover:text-brand-gold ${
                  isActive ? 'text-brand-gold font-medium' : 'text-brand-dark'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
