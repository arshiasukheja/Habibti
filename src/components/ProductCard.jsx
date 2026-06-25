import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

const ProductCard = ({ product, onClick }) => {
  const { id, collectionId, collectionName, name, images } = product;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Touch and Mouse Drag / Swipe Handlers
  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    isDragging.current = true;
    hasDragged.current = false;
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current) return;
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = clientX - dragStartX.current;

    // Set drag flag if movement is significant
    if (Math.abs(diff) > 10) {
      hasDragged.current = true;
    }

    // Minimum swipe threshold (50px)
    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
    isDragging.current = false;
  };

  const handleCardClick = (e) => {
    const cardEl = e.currentTarget.closest('.group');
    const imgEl = cardEl ? cardEl.querySelector('img') : null;
    const rect = imgEl ? imgEl.getBoundingClientRect() : null;
    if (onClick) {
      // Pass both product and rect (Collections.jsx can capture this in callback)
      onClick(rect);
    }
  };

  return (
    <div 
      className="group flex flex-col justify-between overflow-hidden bg-transparent select-none transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDragging.current = false;
      }}
    >
      {/* Image Slider Wrapper */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-brand-stone rounded-[10px] cursor-grab active:cursor-grabbing"
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onClick={(e) => {
          if (hasDragged.current) {
            e.stopPropagation();
            return;
          }
          handleCardClick(e);
        }}
      >
        {/* Soft Fade Image Stack */}
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${name} editorial view ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
              idx === activeIndex 
                ? 'opacity-100 scale-100 z-10' 
                : 'opacity-0 scale-98 z-0 pointer-events-none'
            } ${idx === activeIndex && isHovered ? 'scale-103' : 'scale-100'}`}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Hover Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-brand-dark shadow-md pointer-events-auto transition-colors focus:outline-none cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-brand-dark shadow-md pointer-events-auto transition-colors focus:outline-none cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Pagination dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? 'w-4 bg-brand-gold' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information Details */}
      <div className="mt-4 text-center flex flex-col items-center">
        <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold font-light mb-1.5">
          {collectionName}
        </span>
        <div onClick={handleCardClick} className="block mb-4 cursor-pointer">
          <h3 className="text-sm font-light tracking-wide text-brand-dark hover:text-brand-gold transition-colors duration-300">
            {name}
          </h3>
        </div>
        <div>
          <Button onClick={handleCardClick} variant="text">
            View Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
