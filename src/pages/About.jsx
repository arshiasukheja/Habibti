import React from 'react';
import SectionTitle from '../components/SectionTitle';

const About = () => {
  return (
    <div className="pb-16">
      {/* Editorial Hero Header */}
      <div
        className="relative w-full h-[75vh] overflow-hidden bg-brand-stone mb-20"
        style={{ marginTop: 'var(--navbar-height, 64px)' }}
      >
        <img
          src="/Images/11.jpg"
          alt="Habibti Editorial Campaign Banner"
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-brand-dark/25"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="space-y-3 text-white">
            <span className="text-xs uppercase tracking-[0.35em] text-brand-stone/90 block font-light">
              About the Brand
            </span>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-wider text-white">
              Our Journey
            </h1>
          </div>
        </div>
      </div>

      {/* Meaning of Habibti & Story */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[13px] uppercase tracking-[0.3em] text-brand-gold font-semibold">
              The Translation
            </span>
            <h2 className="text-[35px] md:text-[42px] font-light tracking-tight text-brand-dark leading-tight">
              Habibti <span className="font-serif italic text-brand-gold">/حبيبتي/</span> <br />
              <span className="text-[28px] md:text-[35px] font-light">"My Love, My Beloved"</span>
            </h2>
            <div className="h-[1px] w-20 bg-brand-gold"></div>
            <p className="text-[14px] text-brand-muted font-light leading-[1.75]">
              In Arabic, <span className="font-serif font-medium">Habibti</span> is a term of deep endearment, whispered to those who hold a special place in one's heart. We chose this name because we believe garments should not be disposable; they should be cherished, loved, and worn with personal pride.
            </p>
            <p className="text-[14px] text-brand-muted font-light leading-[1.75]">
              Every fold, drape, and seam we design is a tribute to the grace of the wearer. Our garments reflect a relationship between structural comfort and beautiful, classic modesty.
            </p>
          </div>

          {/* Large Story Image */}
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-brand-stone">
            <img
              src="/Images/10.jpg"
              alt="Model posing in Habibti Campaign"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Mission & Inspiration */}
      <section className="bg-brand-stone/30 border-y border-brand-stone/40 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Mission */}
            <div className="space-y-4">
              <span className="text-[13px] uppercase tracking-[0.3em] text-brand-gold font-semibold">
                Our Mission
              </span>
              <h3 className="text-[28px] font-light tracking-wide text-brand-dark">
                Elevating Modest Wear
              </h3>
              <p className="text-[14px] text-brand-muted font-light leading-[1.75]">
                To design collections that seamlessly blend luxury and modest guidelines. We seek to challenge the standard binary of casual loose clothing and rigid structure, crafting custom collections that feel fluid, premium, and tailored for global settings.
              </p>
            </div>

            {/* Inspiration */}
            <div className="space-y-4">
              <span className="text-[13px] uppercase tracking-[0.3em] text-brand-gold font-semibold">
                Our Inspiration
              </span>
              <h3 className="text-[28px] font-light tracking-wide text-brand-dark">
                Architectural Grace
              </h3>
              <p className="text-[14px] text-brand-muted font-light leading-[1.75]">
                We draw styling inspiration from sand dunes, classical draping techniques, and clean modern architecture. We appreciate the way lightweight silks and heavyweight cotton wools hang, creating soft shadows and outlines that present elegance from every angle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Portrait Container */}
          <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden bg-brand-stone max-w-sm mx-auto lg:mx-0 shadow-lg">
            <img
              src="/Images/Varahi.JPG"
              alt="Founder of Habibti"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* Founder Bio */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold">
              The Founder's Note
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-brand-dark">
              A Vision for the <br />
              <span className="font-serif italic">Modern Woman</span>
            </h2>
            <div className="h-[1px] w-20 bg-brand-gold"></div>

            <blockquote className="border-l-2 border-brand-gold pl-6 py-1">
              <p className="text-sm font-serif italic text-brand-dark/80 leading-relaxed">
                "Modesty is not about concealment; it is an active statement of dignity, self-assurance, and refined tastes. Habibti was born out of a desire to create a wardrobe that honors this statement, without compromising on luxury styling or fabric choice."
              </p>
            </blockquote>

            <p className="text-xs text-brand-muted font-light leading-relaxed">
              Founded on the belief that modest garments should carry the same structural design standards as high-end contemporary couture, Habibti delivers custom curated seasonal edits that serve our community worldwide.
            </p>

            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-brand-dark font-medium">Varahi</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-light">Founder & Creative Director</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
