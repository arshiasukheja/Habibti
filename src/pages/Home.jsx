import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import CollectionCard from '../components/CollectionCard';
import Button from '../components/Button';
import { collections } from '../data/collectionsData';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  // Take first 3 collections as featured
  const featuredCollections = collections.slice(0, 3);

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <Hero
        title="HABIBTI"
        tagline="QUIETLY. BOLD."
        backgroundVideo="/Images/vid1.mp4"
        buttonText="Explore the Collection"
        buttonLink="/collections"
      />

      {/* Brand Teaser / About Section */}
      <section className="relative w-full bg-gradient-to-br from-[#F5EFE7] via-[#F2ECE4] to-[#EEE6DA] py-[120px] px-4 md:px-12 overflow-hidden select-none">
        {/* Subtle geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23c5a880' stroke-width='0.5'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%23c5a880'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px' 
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto bg-[#fdfbf7] rounded-[24px] shadow-lg border border-brand-stone/60 p-6 sm:p-10 md:p-[60px] lg:p-[70px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Image (55-60% width = lg:col-span-7) */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] xl:h-[760px] overflow-hidden rounded-[16px] bg-transparent flex items-center justify-center">
                <img
                  src="/Images/7.jpg"
                  alt="Habibti Campaign Portrait"
                  className="w-full h-full object-contain rounded-[16px]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text Content (40-45% width = lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:pl-6 text-left">
              <span className="text-sm md:text-base uppercase tracking-[0.35em] text-brand-gold font-medium block">
                OUR STORY
              </span>
              <div className="space-y-4">
                <h2 className="text-5xl md:text-[56px] lg:text-[72px] font-light tracking-tight text-brand-dark font-serif leading-none">
                  Habibti.
                </h2>
                <p className="text-xl md:text-[26px] lg:text-[30px] font-serif italic text-brand-gold/90 leading-tight">
                  A word spoken with love.
                </p>
              </div>
              <p className="text-base md:text-[20px] lg:text-[21px] text-brand-muted font-light leading-[1.8] max-w-[620px]">
                Habibti is more than a fashion label. Inspired by the Arabic word of endearment, our collections celebrate warmth, belonging, and confidence through modern modest fashion. Every silhouette is designed to honour heritage while embracing contemporary elegance.
              </p>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="group relative inline-block text-xs md:text-sm uppercase tracking-[0.25em] text-brand-dark hover:text-brand-gold transition-colors duration-300 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  READ OUR STORY &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="py-24 px-6 md:px-12 bg-brand-stone/20 border-y border-brand-stone/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Featured Collections"
            subtitle="The Seasonal Edit"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12">
            {featuredCollections.map((col) => (
              <CollectionCard
                key={col.id}
                id={col.id}
                title={col.title}
                subtitle={col.subtitle}
                description={col.description}
                coverImage={col.coverImage}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Button to="/collections" variant="secondary">
              View All Collections
            </Button>
          </div>
        </div>
      </section>

      {/* Editorial Preview */}
      <section className="w-full bg-[#F5EFE7] py-[100px] px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Column 1: Left Campaign Image */}
          <div className="w-full h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[720px] overflow-hidden rounded-[16px] shadow-md bg-brand-stone">
            <img
              src="/Images/6.jpg"
              alt="Editorial Lookbook Detail"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-103"
              loading="lazy"
            />
          </div>

          {/* Column 2: Centered Text Content */}
          <div className="flex flex-col items-center text-center space-y-6 lg:px-4">
            <span className="text-sm uppercase tracking-[0.3em] text-brand-gold font-medium block">
              Lookbook Preview
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-light leading-tight tracking-tight text-brand-dark">
              A Study of <br />
              <span className="italic font-serif">Form & Texture</span>
            </h2>
            <p className="text-sm md:text-base lg:text-[17px] text-brand-muted font-light leading-[1.7] max-w-[340px]">
              Capturing light, movement, and the subtle luxury of modest drapery. Our latest campaign explore the softness of organic linens alongside structural blazers.
            </p>
            <div className="pt-2">
              <Link 
                to="/lookbook" 
                className="group relative inline-block text-xs md:text-sm uppercase tracking-[0.25em] text-brand-dark hover:text-brand-gold transition-colors duration-300 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300"
              >
                EXPLORE LOOKBOOK &rarr;
              </Link>
            </div>
          </div>

          {/* Column 3: Right Campaign Image */}
          <div className="w-full h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[720px] overflow-hidden rounded-[16px] shadow-md bg-brand-stone">
            <img
              src="/Images/4.jpg"
              alt="Editorial Lookbook Portrait"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-103"
              loading="lazy"
            />
          </div>

        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 px-6 md:px-12 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-wide text-white">
              The Habibti Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Value 1 */}
            <div className="space-y-4 px-4">
              <div className="text-brand-gold font-serif text-3xl font-light">01</div>
              <h3 className="text-lg font-light uppercase tracking-widest text-white">
                Intentional Modesty
              </h3>
              <p className="text-xs text-brand-stone/60 font-light leading-relaxed max-w-xs mx-auto">
                Modesty is not about hiding; it is about self-expression, composure, and confidence. We style silhouettes that flow naturally without compromise.
              </p>
            </div>

            {/* Value 2 */}
            <div className="space-y-4 px-4 border-t md:border-t-0 md:border-x border-white/10 pt-8 md:pt-0">
              <div className="text-brand-gold font-serif text-3xl font-light">02</div>
              <h3 className="text-lg font-light uppercase tracking-widest text-white">
                Artisanal Craft
              </h3>
              <p className="text-xs text-brand-stone/60 font-light leading-relaxed max-w-xs mx-auto">
                From luxury double-stitch seamings to high-grade textile sourcing, every piece undergoes precise construction to ensure durability and touch.
              </p>
            </div>

            {/* Value 3 */}
            <div className="space-y-4 px-4 border-t md:border-t-0 pt-8 md:pt-0">
              <div className="text-brand-gold font-serif text-3xl font-light">03</div>
              <h3 className="text-lg font-light uppercase tracking-widest text-white">
                Modern Sensibility
              </h3>
              <p className="text-xs text-brand-stone/60 font-light leading-relaxed max-w-xs mx-auto">
                We believe in creating capsule structures that bridge professional, casual, and formal requirements, forming a timeless and functional wardrobe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
