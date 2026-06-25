import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

const ProductLightbox = ({ isOpen, product, clickedRect, onClose }) => {
  const [animationPhase, setAnimationPhase] = useState('idle'); // 'idle' | 'entering' | 'active' | 'leaving'
  const [isTransitionTargetActive, setIsTransitionTargetActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Track image loading state cache mapping for all images
  const [loadedImages, setLoadedImages] = useState({});
  const [failedImages, setFailedImages] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  // Update viewport size for centered dimensions
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload all product images as soon as product changes
  useEffect(() => {
    if (!product) return;
    const imagesToLoad = product.images || [];
    
    setLoadedImages({});
    setFailedImages({});

    imagesToLoad.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [idx]: true }));
      };
      img.onerror = () => {
        setFailedImages((prev) => ({ ...prev, [idx]: true }));
      };
    });
  }, [product]);

  // Manage morph entry and exit phases
  useEffect(() => {
    if (isOpen) {
      setAnimationPhase('entering');
      setIsTransitionTargetActive(false);
      setActiveIndex(0);
      document.body.style.overflow = 'hidden';

      // 1. Mount starting state
      const frameTimer = requestAnimationFrame(() => {
        // 2. Animate to target in the next frame
        setIsTransitionTargetActive(true);
      });

      // 3. Complete entering transition after 400ms
      const completeTimer = setTimeout(() => {
        setAnimationPhase('active');
      }, 400);

      return () => {
        cancelAnimationFrame(frameTimer);
        clearTimeout(completeTimer);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const images = product?.images || [];

  // Derive loading and error states for active index
  const isImageLoading = !loadedImages[activeIndex] && !failedImages[activeIndex];
  const isImageError = failedImages[activeIndex];

  // Delay loading spinner to prevent flashes for preloaded/cached images
  useEffect(() => {
    if (isImageLoading) {
      const timer = setTimeout(() => setShowSpinner(true), 150);
      return () => clearTimeout(timer);
    } else {
      setShowSpinner(false);
    }
  }, [isImageLoading]);

  const handleClose = () => {
    if (animationPhase !== 'active') return;

    setAnimationPhase('leaving');
    setIsTransitionTargetActive(true); // Start leaving from centered coordinates

    // Trigger leaving transition
    const frameTimer = requestAnimationFrame(() => {
      setIsTransitionTargetActive(false); // Animate back to clickedRect
    });

    const completeTimer = setTimeout(() => {
      setAnimationPhase('idle');
      document.body.style.overflow = '';
      onClose(); // Parent callback to unmount
    }, 400);

    return () => {
      cancelAnimationFrame(frameTimer);
      clearTimeout(completeTimer);
    };
  };

  const nextSlide = () => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (animationPhase !== 'active') return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [animationPhase, activeIndex, images]);

  // Touch and Swipe navigation
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

  if (animationPhase === 'idle' || !product) return null;

  // Calculate centered target dimensions (height is 90% of screen height)
  const vw = viewportSize.width;
  const vh = viewportSize.height;
  const targetW = Math.min(vw * 0.9, vh * 0.675); // Width matching 3:4 aspect ratio with 90vh max height limit
  const targetH = targetW * (4 / 3);
  const targetLeft = (vw - targetW) / 2;
  const targetTop = (vh - targetH) / 2;

  // Set up transition geometry styling
  const startStyle = clickedRect 
    ? {
        position: 'fixed',
        left: clickedRect.left,
        top: clickedRect.top,
        width: clickedRect.width,
        height: clickedRect.height,
        objectFit: 'cover',
        borderRadius: '10px',
        zIndex: 9999,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    : {
        position: 'fixed',
        left: targetLeft,
        top: targetTop,
        width: targetW,
        height: targetH,
        objectFit: 'contain',
        borderRadius: '8px',
        opacity: 0,
        transform: 'scale(0.9)',
        zIndex: 9999,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      };

  const endStyle = {
    position: 'fixed',
    left: targetLeft,
    top: targetTop,
    width: targetW,
    height: targetH,
    objectFit: 'contain',
    borderRadius: '8px',
    zIndex: 9999,
    opacity: 1,
    transform: 'scale(1)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  // Rendering entry or exit floating transitions
  if (animationPhase === 'entering' || animationPhase === 'leaving') {
    return (
      <>
        {/* Backdrop overlay */}
        <div
          className={`fixed inset-0 z-[9998] bg-brand-dark/80 backdrop-blur-[4px] transition-opacity duration-400 ease-out ${
            isTransitionTargetActive ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Morph Image */}
        <img
          src={images[activeIndex]}
          alt="Transition Frame"
          style={isTransitionTargetActive ? endStyle : startStyle}
        />
      </>
    );
  }

  // Active Main Lightbox Render
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-dark/80 backdrop-blur-[4px] transition-opacity duration-400 ease-out select-none ${
        animationPhase === 'active' ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Close button (×) */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-all duration-300 p-3 focus:outline-none cursor-pointer z-50 rounded-full hover:bg-white/10 hover:scale-105"
        aria-label="Close Lightbox"
      >
        <X size={26} className="stroke-[1.5]" />
      </button>

      {/* Main Flanked Layout */}
      <div 
        className="flex items-center gap-4 md:gap-8 max-w-full"
        onClick={(e) => e.stopPropagation()} // Prevent close on interaction
      >
        {/* Left Arrow (Desktop/Tablet) */}
        {images.length > 1 && (
          <button
            onClick={prevSlide}
            className="hidden sm:flex items-center justify-center p-4 text-white/40 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 bg-brand-dark/20 hover:bg-brand-dark/40 rounded-full focus:outline-none cursor-pointer border border-white/5 hover:border-white/20 shadow-md"
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} className="stroke-[1.5]" />
          </button>
        )}

        {/* Selected Image Wrapper */}
        <div
          className="relative w-[min(90vw,67.5vh)] aspect-[3/4] overflow-hidden bg-brand-stone/5 rounded-[8px] shadow-2xl cursor-grab active:cursor-grabbing border border-white/5"
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
        >
          {/* Custom Gold Spinner (Only shown if load exceeds 150ms) */}
          {showSpinner && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/20 backdrop-blur-sm z-20 transition-opacity duration-300">
              <div className="w-10 h-10 border-2 border-brand-stone/30 border-t-brand-gold rounded-full animate-spin"></div>
            </div>
          )}

          {/* Custom Error State */}
          {isImageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-stone/80 p-6 text-center z-20 rounded-[8px]">
              <AlertCircle className="text-brand-gold mb-3 stroke-[1.5]" size={32} />
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-dark/80 font-medium mb-1">
                Image Unavailable
              </span>
              <p className="text-[9px] text-brand-muted font-light tracking-wider max-w-[200px] leading-relaxed">
                This lookbook campaign image is temporarily offline.
              </p>
            </div>
          )}

          {/* Fade Gallery Images */}
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} lookbook frame ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
                idx === activeIndex && !isImageError
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            />
          ))}

          {/* Mobile Overlay Arrows */}
          {images.length > 1 && (
            <div className="sm:hidden absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between z-30 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="p-3 text-white/60 hover:text-white bg-brand-dark/40 hover:bg-brand-dark/60 rounded-full focus:outline-none pointer-events-auto shadow-md"
                aria-label="Previous Image"
              >
                <ChevronLeft size={20} className="stroke-[1.5]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="p-3 text-white/60 hover:text-white bg-brand-dark/40 hover:bg-brand-dark/60 rounded-full focus:outline-none pointer-events-auto shadow-md"
                aria-label="Next Image"
              >
                <ChevronRight size={20} className="stroke-[1.5]" />
              </button>
            </div>
          )}
        </div>

        {/* Right Arrow (Desktop/Tablet) */}
        {images.length > 1 && (
          <button
            onClick={nextSlide}
            className="hidden sm:flex items-center justify-center p-4 text-white/40 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 bg-brand-dark/20 hover:bg-brand-dark/40 rounded-full focus:outline-none cursor-pointer border border-white/5 hover:border-white/20 shadow-md"
            aria-label="Next Image"
          >
            <ChevronRight size={24} className="stroke-[1.5]" />
          </button>
        )}
      </div>

      {/* Centered Image Counter (e.g. 2 / 5) */}
      {images.length > 1 && (
        <div className="mt-4 text-center select-none z-30" onClick={(e) => e.stopPropagation()}>
          <span className="text-[11px] font-sans tracking-[0.25em] text-white/70 font-light uppercase">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* Hidden background preloader */}
      {images.length > 1 && (
        <div className="hidden">
          <img src={images[(activeIndex + 1) % images.length]} alt="preload-next" />
          <img src={images[(activeIndex - 1 + images.length) % images.length]} alt="preload-prev" />
        </div>
      )}
    </div>
  );
};

export default ProductLightbox;
