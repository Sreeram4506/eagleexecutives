import { useEffect, useRef, useState } from 'react';
import { videoSectionConfig } from '../config';

const VideoSection = () => {
  if (!videoSectionConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col lg:flex-row"
    >
      {/* Image Side */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${videoSectionConfig.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Gold accent line */}
        <div 
          className="absolute top-1/2 right-0 w-20 h-[2px] bg-[#d4af37] hidden lg:block"
          style={{ transform: 'translateY(-50%)' }}
        />
      </div>

      {/* Content Side */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-[#0a0a0a]"
      >
        <div className="max-w-lg">
          <span
            className={`inline-block mb-4 text-xs tracking-[0.3em] text-[#d4af37] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {videoSectionConfig.tag}
          </span>

          <div 
            className={`gold-line mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          />

          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-[54px] text-white leading-tight mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms', lineHeight: '1.2' }}
          >
            {videoSectionConfig.heading}
          </h2>

          {videoSectionConfig.bodyParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-gray-400 text-lg leading-relaxed mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
            >
              {paragraph}
            </p>
          ))}

          {videoSectionConfig.ctaText && (
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${600 + videoSectionConfig.bodyParagraphs.length * 200 + 200}ms` }}
            >
              <a
                href={videoSectionConfig.ctaTarget}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(videoSectionConfig.ctaTarget)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center btn-primary"
              >
                {videoSectionConfig.ctaText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
