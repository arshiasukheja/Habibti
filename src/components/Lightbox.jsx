import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ isOpen, images = [], activeIndex, onChangeIndex, onClose }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset loaded cache when images list changes
  useEffect(() => {
    setLoadedImages({});
  }, [images]);

  // Preload adjacent images
  useEffect(() => {
    if (activeIndex === null || !images.length) return;
    
    const indicesToPreload = [
      activeIndex,
      (activeIndex + 1) % images.length,
      (activeIndex - 1 + images.length) % images.length
    ];

    indicesToPreload.forEach((idx) => {
      if (loadedImages[idx]) return;
      const img = new Image();
      img.src = images[idx];
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [idx]: true }));
      };
    });
  }, [activeIndex, images, loadedImages]);

  // Manage loading spinner
  const isCurrentLoading = activeIndex !== null && !loadedImages[activeIndex];
  useEffect(() => {
    if (isCurrentLoading) {
      const timer = setTimeout(() => setShowSpinner(true), 150);
      return () => clearTimeout(timer);
    } else {
      setShowSpinner(false);
    }
  }, [isCurrentLoading]);

  const nextSlide = () => {
    if (activeIndex === null || !images.length) return;
    onChangeIndex((activeIndex + 1) % images.length);
  };

  const prevSlide = () => {
    if (activeIndex === null || !images.length) return;
    onChangeIndex((activeIndex - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || activeIndex === null || !images.length) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, images.length, onClose]);

  // Swipe gesture support
  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    isDragging.current = true;
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current) return;
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = clientX - dragStartX.current;

    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
    isDragging.current = false;
  };

  if (!isOpen || activeIndex === null || !images.length) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-dark/95 backdrop-blur-sm p-4 select-none animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-all duration-300 p-3 focus:outline-none cursor-pointer z-50 rounded-full hover:bg-white/10 hover:scale-105"
        aria-label="Close lightbox"
      >
        <X size={26} className="stroke-[1.5]" />
      </button>

      {/* Image and Arrows Layout */}
      <div 
        className="relative flex items-center justify-center max-w-5xl w-full max-h-[80vh] gap-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content area
      >
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex items-center justify-center p-4 text-white/40 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 bg-brand-dark/20 hover:bg-brand-dark/40 rounded-full focus:outline-none cursor-pointer border border-white/5 hover:border-white/20 shadow-md animate-fade-in"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="stroke-[1.5]" />
        </button>

        {/* Image wrapper */}
        <div 
          className="relative w-[min(90vw,67.5vh)] aspect-[3/4] overflow-hidden bg-brand-stone/5 rounded-[8px] shadow-2xl cursor-grab active:cursor-grabbing border border-white/5"
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
        >
          {/* Loading spinner */}
          {showSpinner && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/20 backdrop-blur-sm z-20">
              <div className="w-10 h-10 border-2 border-brand-stone/30 border-t-brand-gold rounded-full animate-spin"></div>
            </div>
          )}

          {/* Fade Gallery Images */}
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Lookbook campaign frame ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
                idx === activeIndex
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            />
          ))}

          {/* Mobile Overlay Arrows */}
          <div className="sm:hidden absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between z-30 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="p-3 text-white/60 hover:text-white bg-brand-dark/40 hover:bg-brand-dark/60 rounded-full focus:outline-none pointer-events-auto shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="stroke-[1.5]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="p-3 text-white/60 hover:text-white bg-brand-dark/40 hover:bg-brand-dark/60 rounded-full focus:outline-none pointer-events-auto shadow-md"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="hidden sm:flex items-center justify-center p-4 text-white/40 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 bg-brand-dark/20 hover:bg-brand-dark/40 rounded-full focus:outline-none cursor-pointer border border-white/5 hover:border-white/20 shadow-md animate-fade-in"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="stroke-[1.5]" />
        </button>
      </div>

      {/* Image Counter */}
      <div className="mt-6 text-center select-none z-30">
        <span className="text-[11px] font-sans tracking-[0.25em] text-white/70 font-light uppercase">
          {activeIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};

export default Lightbox;
