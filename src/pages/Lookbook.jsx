import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';
import { products } from '../data/collectionsData';
import { ZoomIn } from 'lucide-react';

const Lookbook = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Extract the last 2 campaign images from all 13 articles/products
  const lookbookImages = useMemo(() => {
    return products.flatMap((product) => product.images.slice(-2));
  }, []);

  // Shuffle them deterministically using a seeded randomizer to mix collections
  // and guarantee that consecutive items do not share the same folder prefix
  const uniqueImages = useMemo(() => {
    let seed = 17; // Chosen seed for a highly balanced visual mix
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const arr = [...lookbookImages];
    
    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Secondary pass to swap adjacent duplicates from same categories
    const getFolder = (path) => {
      const parts = path.split('/');
      return parts.slice(0, parts.length - 1).join('/');
    };

    for (let i = 0; i < arr.length - 1; i++) {
      if (getFolder(arr[i]) === getFolder(arr[i + 1])) {
        // Find next image that has a different category folder and swap
        for (let j = i + 2; j < arr.length; j++) {
          if (getFolder(arr[i]) !== getFolder(arr[j])) {
            [arr[i + 1], arr[j]] = [arr[j], arr[i + 1]];
            break;
          }
        }
      }
    }
    return arr;
  }, [lookbookImages]);

  return (
    <div className="pb-24 px-6 md:px-12" style={{ paddingTop: 'calc(var(--navbar-height, 64px) + 4rem)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <SectionTitle
          title="The Lookbook"
          subtitle="Editorial Campaigns"
          align="center"
        />

        {/* CSS Column Masonry Gallery */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 mt-16">
          {uniqueImages.map((imageSrc, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="break-inside-avoid relative overflow-hidden bg-brand-stone group cursor-pointer shadow-sm"
            >
              <img
                src={imageSrc}
                alt={`Habibti Lookbook Campaign ${idx + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 bg-white/95 text-brand-dark hover:bg-brand-gold hover:text-white transition-colors duration-300 shadow">
                  <ZoomIn size={16} className="stroke-[1.5]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Sliding Lightbox Modal */}
      <Lightbox
        isOpen={activeIndex !== null}
        images={uniqueImages}
        activeIndex={activeIndex}
        onChangeIndex={setActiveIndex}
        onClose={() => setActiveIndex(null)}
      />
    </div>
  );
};

export default Lookbook;
