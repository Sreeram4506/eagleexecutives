import { useEffect, useRef, useState } from 'react';
import { Truck, ShieldCheck, Shield, Clock, Gem, Compass, ChevronRight } from 'lucide-react';
import { featuresConfig } from '../config';
import { useNavigate } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Truck,
  ShieldCheck,
  Shield,
  Clock,
  Gem,
  Compass,
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-[150px] bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Gold accent glow */}
      <div 
        className="absolute left-1/2 top-0 w-[600px] h-[400px] opacity-10 -translate-x-1/2"
        style={{
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto px-6 mb-20">
        <div className="text-center">
          <span
            className={`inline-block mb-4 text-xs tracking-[0.4em] text-[#d4af37] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Distinctive Offerings
          </span>
          <div 
            className={`gold-line mx-auto mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          />
          <h2
            className={`font-serif text-5xl md:text-6xl text-white mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Unrivaled Executive Services
          </h2>
          <p
            className={`max-w-3xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Eagle Executive Transport & Security Inc provides a sophisticated suite of transportation solutions, seamlessly blending elite security with unparalleled luxury.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresConfig.features.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.title}
                className={`group relative p-10 bg-[#111] border border-gray-800/50 hover:border-[#d4af37]/40 transition-all duration-700 card-hover overflow-hidden rounded-sm ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700" 
                  style={{ 
                    backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', 
                    backgroundSize: '20px 20px' 
                  }} 
                />

                {/* Service Icon */}
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-black/40 border border-[#d4af37]/20 group-hover:border-[#d4af37] transition-all duration-500 mb-8">
                  {IconComponent && (
                    <IconComponent
                      size={28}
                      strokeWidth={1}
                      className="text-[#d4af37]"
                    />
                  )}
                </div>

                <div className="relative z-10">
                  <h3 className="font-serif text-2xl text-white mb-4 leading-tight group-hover:text-[#d4af37] transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed font-light mb-8 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  {/* Enhanced CTA */}
                  <button 
                    onClick={() => navigate('/reservation')}
                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37] hover:text-white transition-all duration-300 transform"
                  >
                    Inquire Now
                    <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
