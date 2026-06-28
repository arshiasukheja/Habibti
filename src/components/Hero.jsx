import React, { useEffect, useRef } from 'react';
import Button from './Button';

const Hero = ({ 
  title, 
  subtitle, 
  tagline,
  backgroundImage, 
  backgroundVideo, 
  buttonText, 
  buttonLink,
  height = 'h-[calc(100vh-var(--navbar-height,64px))]',
  overlayOpacity = 'bg-black/25'
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = true;
      videoElement.playsInline = true;
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay may still be blocked by some mobile browsers; keep the video muted and inline.
        });
      }
    }
  }, [backgroundVideo]);

  return (
    <div
      className={`relative ${height} w-full overflow-hidden flex items-center justify-center`}
      style={{ marginTop: 'var(--navbar-height, 64px)' }}
    >
      {/* Background Media */}
      {backgroundVideo ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        backgroundImage && (
          <img
            src={backgroundImage}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )
      )}

      {/* Dark Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`}></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white select-none">
        {subtitle && (
          <span className="text-xs md:text-sm uppercase tracking-[0.35em] block mb-4 text-brand-stone/90 font-light">
            {subtitle}
          </span>
        )}
        {title && (
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-extralight tracking-[0.1em] mb-4 leading-[1.1] text-white">
            {title}
          </h1>
        )}
        {tagline && (
          <span className="text-[10px] md:text-xs uppercase tracking-[0.45em] block mb-10 text-brand-stone/90 font-light">
            {tagline}
          </span>
        )}
        {buttonText && buttonLink && (
          <div className="mt-6">
            <Button to={buttonLink} variant="gold" className="!bg-white !text-brand-dark hover:!bg-brand-gold hover:!text-brand-dark">
              {buttonText}
            </Button>
          </div>
        )}
      </div>

      {/* Elegant scroll indicator */}
      {(height === 'h-screen' || height.includes('100vh')) && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 select-none animate-pulse">
          <span className="text-[10px] uppercase tracking-[0.25em] font-light">Scroll</span>
          <div className="w-[1px] h-8 bg-white/50"></div>
        </div>
      )}
    </div>
  );
};

export default Hero;
