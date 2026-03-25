import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { heroConfig } from '../config';

const Hero = () => {
  if (!heroConfig.title) return null;

  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#subhero');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleLines = heroConfig.title.split('\n');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 parallax-bg scale-105"
        style={{
          backgroundImage: `url(${heroConfig.backgroundImage})`,
        }}
      />

      {/* Luxury Dark Overlay with Gradient */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Gold Accent Glow */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center text-white px-8 md:px-16 lg:px-24">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <span className="inline-block mb-6 text-xs tracking-[0.4em] font-light uppercase text-[#d4af37]">
            {heroConfig.tagline}
          </span>
        </div>

        {/* Gold Line Accent */}
        <div 
          className={`gold-line mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 w-20' : 'opacity-0 w-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        />

        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl max-w-4xl leading-[0.95] transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p 
          className={`mt-8 max-w-lg text-lg text-gray-300 font-light transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          Experience the pinnacle of luxury transportation. Where every journey becomes an unforgettable experience.
        </p>

        <div
          className={`mt-12 flex flex-col sm:flex-row gap-5 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          {heroConfig.ctaPrimaryText && (
            <a
              href={heroConfig.ctaPrimaryTarget}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(heroConfig.ctaPrimaryTarget)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-center"
            >
              {heroConfig.ctaPrimaryText}
            </a>
          )}
          {heroConfig.ctaSecondaryText && (
            <a
              href={heroConfig.ctaSecondaryTarget}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(heroConfig.ctaSecondaryTarget)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary text-center"
            >
              {heroConfig.ctaSecondaryText}
            </a>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-[#d4af37] transition-all duration-1000 hover:text-white ${
          isVisible ? 'opacity-70' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={28} strokeWidth={1} className="animate-bounce" />
        </div>
      </button>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
};

export default Hero;
