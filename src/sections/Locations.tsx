import React, { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronRight, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { locationsConfig } from '../config';

const Locations: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(locationsConfig.categories[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const currentCategory = locationsConfig.categories.find(c => c.id === activeCategory);

  return (
    <section 
      id="locations" 
      ref={sectionRef}
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <div className="text-center mb-16">
          <span className={`inline-block mb-4 text-xs tracking-[0.4em] font-medium uppercase text-[#d4af37] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {locationsConfig.tag}
          </span>
          <div className={`gold-line mx-auto mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
          <h2 className={`font-serif text-5xl md:text-6xl text-white mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {currentCategory?.title.toUpperCase()}
          </h2>
        </div>

        {/* Premium Category Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {locationsConfig.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative px-8 py-4 transition-all duration-500 rounded-lg overflow-hidden ${
                activeCategory === cat.id 
                  ? 'bg-[#d4af37] text-black shadow-[0_10px_30px_rgba(212,175,55,0.3)]' 
                  : 'bg-[#111] text-gray-400 border border-gray-800 hover:border-[#d4af37] hover:text-white'
              }`}
            >
              <span className="relative z-10 text-[11px] tracking-[0.2em] font-bold uppercase">{cat.title}</span>
              {activeCategory === cat.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
              )}
            </button>
          ))}
        </div>

        {/* The Card Grid (Inspired by reference) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-1000">
          {currentCategory?.items.map((item, index) => (
            <div 
              key={item.id}
              className={`group bg-[#111] border border-gray-800/50 rounded-xl p-8 hover:bg-[#1a1a1a] hover:border-[#d4af37]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center relative overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index % 8) * 50}ms` }}
            >
              {/* Subtle background icon */}
              <Map className="absolute -right-4 -bottom-4 text-white/[0.02] w-24 h-24 rotate-12 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-0" />
              
              <div className="mb-6 bg-[#0a0a0a] p-4 rounded-full border border-gray-800 group-hover:border-[#8b0000]/30 transition-colors">
                <MapPin size={24} className="text-[#d4af37]" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-4 tracking-wide uppercase group-hover:text-[#d4af37] transition-colors">
                {item.name}
              </h3>
              
              <div className="w-8 h-[1px] bg-gray-800 mb-6 group-hover:w-full group-hover:bg-[#d4af37]/40 transition-all duration-500" />
              
              <button 
                onClick={() => navigate('/reservation')}
                className="group/link flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] hover:text-white transition-colors"
              >
                Reserve Now
                <div className="flex items-center -ml-1 transition-transform duration-300 group-hover/link:translate-x-2">
                  <ChevronRight size={12} className="opacity-40" />
                  <ChevronRight size={12} className="-ml-1.5 opacity-70" />
                  <ChevronRight size={12} className="-ml-1.5" />
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Global Reach Indicator */}
        <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-4 bg-[#d4af37]/5 border border-[#d4af37]/10 px-8 py-4 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">Serving over 100+ Premier Destinations Worldwide</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
