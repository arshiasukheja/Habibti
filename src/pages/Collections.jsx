import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import ProductLightbox from '../components/ProductLightbox';
import { products } from '../data/collectionsData';

const Collections = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState(location.state?.filter || 'abaya');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [clickedRect, setClickedRect] = useState(null);

  useEffect(() => {
    if (location.state?.filter) {
      setActiveFilter(location.state.filter);
    }
  }, [location.state]);

  const filterTabs = [
    { id: 'abaya', label: 'Abayas' },
    { id: 'occasions', label: 'Occasions' },
    { id: 'hijabs', label: 'Hijabs & Scarves' },
    { id: 'modern-western', label: 'Modern Western' }
  ];

  // Filter products based on selected tab
  const filteredProducts = products.filter(p => p.collectionId === activeFilter);

  return (
    <div className="pb-24 px-6 md:px-12" style={{ paddingTop: 'calc(var(--navbar-height, 64px) + 4rem)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <SectionTitle
          title="The Collections Gallery"
          subtitle="Modest Luxury Edit"
          align="center"
        />

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 border-b border-brand-stone/60 pb-6 mb-16 select-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`text-xs uppercase tracking-[0.25em] transition-all duration-300 pb-2 relative focus:outline-none cursor-pointer ${
                activeFilter === tab.id 
                  ? 'text-brand-gold font-medium' 
                  : 'text-brand-dark/50 hover:text-brand-dark'
              }`}
            >
              {tab.label}
              {activeFilter === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"></span>
              )}
            </button>
          ))}
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={(rect) => {
                setClickedRect(rect);
                setSelectedProduct(product);
              }}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-xs tracking-widest text-brand-muted">
            NO ITEMS FOUND IN THIS CATEGORY.
          </div>
        )}
      </div>

      {/* Fullscreen Luxury Lightbox Viewer */}
      <ProductLightbox
        isOpen={!!selectedProduct}
        product={selectedProduct}
        clickedRect={clickedRect}
        onClose={() => {
          setSelectedProduct(null);
          setClickedRect(null);
        }}
      />
    </div>
  );
};

export default Collections;
