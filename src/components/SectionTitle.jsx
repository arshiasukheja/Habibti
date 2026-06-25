import React from 'react';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  const alignmentClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  return (
    <div className={`mb-12 md:mb-16 ${alignmentClass}`}>
      {subtitle && (
        <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-brand-dark">
        {title}
      </h2>
      <div className={`mt-4 h-[1px] w-12 bg-brand-gold ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;
