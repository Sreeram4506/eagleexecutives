import { useEffect, useRef, useState } from 'react';
import { aboutConfig } from '../config';

interface AboutSectionProps {
  id: string;
  section: typeof aboutConfig.sections[0];
  reverse?: boolean;
}

const useParallax = () => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setOffset((progress - 0.5) * 80); // Parallax strength
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, offset };
};

const AboutSection = ({ id, section, reverse }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ref: imgRef, offset } = useParallax();

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
      className={`min-h-screen flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      {/* Image Side */}
      <div
        ref={imgRef}
        className="w-full lg:w-3/5 h-[60vh] lg:h-auto min-h-[400px] overflow-hidden relative shadow-2xl"
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[1.5s] ease-out-expo ${
            isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
          style={{ 
            backgroundImage: `url(${section.image})`,
            transform: `scale(1.1) translateY(${offset}px)`,
          }}
        />
        {/* Luxury Overlay */}
        <div 
          className={`absolute inset-0 bg-black/20 transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Highlight Reveal */}
        <div 
          className={`absolute inset-0 bg-[#d4af37]/5 transition-all duration-[1.4s] ${
            isVisible ? 'translate-x-full' : 'translate-x-0'
          } z-10`}
          style={{ transitionDelay: '0.2s' }}
        />
      </div>

      {/* Content Side */}
      <div
        className="w-full lg:w-2/5 flex items-center justify-center p-8 md:p-16 lg:p-20 relative z-10"
        style={{ backgroundColor: section.backgroundColor, color: section.textColor }}
      >
        <div
          className={`max-w-md transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1)`}
        >
          <div className={`transition-all duration-1000 delay-[200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-block mb-4 text-xs tracking-[0.3em] font-medium uppercase text-[#d4af37]">
              {section.tag}
            </span>
            <div className="gold-line mb-6" />
          </div>

          <h2 className={`font-serif text-3xl md:text-[40px] leading-tight mb-6 text-white transition-all duration-1000 delay-[400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {section.heading}
          </h2>

          {section.quote ? (
            <div className={`transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg font-light leading-relaxed text-gray-300 mb-6 italic">
                &ldquo;{section.quote}&rdquo;
              </p>
              {section.attribution && (
                <p className="text-base font-light text-[#d4af37]">
                  {section.attribution}
                </p>
              )}
            </div>
          ) : (
            section.paragraphs.map((paragraph, pIndex) => (
              <p 
                key={pIndex} 
                className={`text-lg font-light leading-relaxed text-gray-400 mb-6 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${600 + pIndex * 150}ms` }}
              >
                {paragraph}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  if (aboutConfig.sections.length === 0) return null;

  return (
    <section id="about" className="relative">
      {aboutConfig.sections.map((section, index) => (
        <AboutSection
          key={index}
          id={`about-${index}`}
          section={section}
          reverse={index % 2 !== 0}
        />
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
