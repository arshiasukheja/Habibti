import React from 'react';
import Button from './Button';

const CollectionCard = ({ id, title, subtitle, description, coverImage }) => {
  return (
    <div className="group flex flex-col justify-between overflow-hidden bg-transparent transition-all duration-300">
      {/* Card Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-stone mb-6">
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Soft elegant overlay on hover */}
        <div className="absolute inset-0 bg-brand-dark/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow text-center items-center px-2">
        {subtitle && (
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-light mb-2 block">
            {subtitle}
          </span>
        )}
        <h3 className="text-xl md:text-2xl font-light tracking-wide text-brand-dark mb-3">
          {title}
        </h3>
        <p className="text-xs text-brand-muted font-light leading-relaxed mb-6 max-w-sm">
          {description}
        </p>
        <div className="mt-auto">
          <Button to="/collections" state={{ filter: id }} variant="text">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
