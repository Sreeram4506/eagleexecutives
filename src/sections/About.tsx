import { useEffect, useRef, useState } from 'react';
import { aboutConfig } from '../config';

interface AboutSectionProps {
  id: string;
  section: typeof aboutConfig.sections[0];
  reverse?: boolean;
}

const useParallax = () => {
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        const p = (windowH - rect.top) / (windowH + rect.height);
        setProgress(p);
        setOffset((p - 0.5) * 120); // Stronger parallax
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, offset, progress };
};

const AboutSection = ({ id, section, reverse }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ref: imgRef, offset, progress } = useParallax();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`min-h-screen flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} overflow-hidden`}
    >
      {/* Image Side */}
      <div
        ref={imgRef}
        className="w-full lg:w-3/5 h-[65vh] lg:h-auto min-h-[500px] overflow-hidden relative shadow-2xl"
      >
        <div
          className={`absolute inset-0 bg-cover bg-top transition-opacity duration-[1.5s] ease-out-expo ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url(${section.image})`,
            transform: `scale(${1.1 + (progress - 0.5) * 0.05}) translateY(${offset * 0.5}px) rotate(${(progress - 0.5) * 1}deg)`,
            filter: `brightness(${0.85 + (progress - 0.5) * 0.15})`,
          }}
        />
        {/* Luxury Overlay */}
        <div 
          className={`absolute inset-0 bg-black/30 transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ opacity: 0.3 + (progress - 0.5) * 0.2 }}
        />
        {/* Gold Accent Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at ${reverse ? '70%' : '30%'} 50%, rgba(212,175,55,0.2) 0%, transparent 70%)`,
            transform: `translateY(${offset * -0.5}px)`,
          }}
        />
      </div>

      {/* Content Side */}
      <div
        className="w-full lg:w-2/5 flex items-center justify-center p-8 md:p-16 lg:p-24 relative z-10"
        style={{ 
          backgroundColor: section.backgroundColor, 
          color: section.textColor,
        }}
      >
        <div
          className="max-w-md w-full"
          style={{ transform: `translateY(${offset * -0.2}px)` }} // Subtle counter-parallax for text
        >
          <div className={`transition-all duration-1000 delay-[200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="inline-block mb-4 text-xs tracking-[0.4em] font-medium uppercase text-[#d4af37]">
              {section.tag}
            </span>
            <div className="gold-line mb-8" />
          </div>

          <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 text-white transition-all duration-1000 delay-[400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {section.heading}
          </h2>

          {section.quote ? (
            <div className={`transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="text-xl font-light leading-relaxed text-gray-300 mb-8 italic border-l-2 border-[#d4af37]/30 pl-6">
                &ldquo;{section.quote}&rdquo;
              </p>
              {section.attribution && (
                <p className="text-base font-medium tracking-wide text-[#d4af37]">
                  {section.attribution}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {section.paragraphs.map((paragraph, pIndex) => (
                <p 
                  key={pIndex} 
                  className={`text-lg font-light leading-relaxed text-gray-400 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ 
                    transitionDelay: `${600 + pIndex * 200}ms`,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  if (aboutConfig.sections.length === 0) return null;

  return (
    <section id="about" className="relative scroll-smooth">
      {aboutConfig.sections.map((section, index) => (
        <div key={index} className="snap-start scroll-mt-[80px]">
          <AboutSection
            id={`about-${index}`}
            section={section}
            reverse={index % 2 !== 0}
          />
        </div>
      ))}

      {/* Vertical Navigation Dots */}
      {aboutConfig.sections.length > 1 && (
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
          {aboutConfig.sections.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const element = document.getElementById(`about-${index}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-3 h-3 rounded-full border border-[#d4af37]/50 bg-transparent hover:bg-[#d4af37]/30 transition-colors"
              aria-label={`Scroll to section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default About;
