import { useEffect, useRef, useState } from 'react';
import { Truck, ShieldCheck, Shield, Clock, Gem, Compass, ChevronRight, ShieldAlert } from 'lucide-react';
import { featuresConfig, type Feature } from '../config';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Truck,
  ShieldCheck,
  Shield,
  ShieldAlert,
  Clock,
  Gem,
  Compass,
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Feature | null>(null);
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
      <div className="section-container mb-20">
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
            className={`font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Unrivaled Executive Services
          </h2>
          <p
            className={`max-w-3xl mx-auto text-gray-400 text-base md:text-lg lg:text-xl font-light leading-relaxed transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Eagle Executive Transport & Security Inc provides a sophisticated suite of transportation solutions, seamlessly blending elite security with unparalleled luxury.
          </p>
        </div>
      </div>

      <div className="section-container">
        {/* Security Services Section */}
        <div className="mb-20">
          <div 
            className={`flex items-center gap-6 mb-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <h3 className="font-serif text-2xl md:text-3xl text-white whitespace-nowrap">Security Services</h3>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresConfig.features.slice(0, 4).map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div
                  key={service.title}
                  onClick={() => setSelectedService(service)}
                  className={`group relative p-8 bg-[#111] border border-gray-800/50 hover:border-[#d4af37]/40 transition-all duration-700 card-hover overflow-hidden rounded-sm cursor-pointer ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 600}ms` }}
                >
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700" 
                    style={{ 
                      backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', 
                      backgroundSize: '20px 20px' 
                    }} 
                  />

                  <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center bg-black/40 border border-[#d4af37]/20 group-hover:border-[#d4af37] transition-all duration-500 mb-6">
                    {IconComponent && (
                      <IconComponent
                        size={24}
                        strokeWidth={1}
                        className="text-[#d4af37]"
                      />
                    )}
                  </div>

                  <div className="relative z-10">
                    <h4 className="font-serif text-xl text-white mb-3 leading-tight group-hover:text-[#d4af37] transition-colors duration-500">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-light mb-6 group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>
                    
                    {service.features && (
                      <ul className="mb-8 space-y-2">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-[10px] text-[#d4af37]/70 uppercase tracking-widest font-medium">
                            <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    )}

                    <button 
                      onClick={() => navigate('/reservation')}
                      className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#d4af37] hover:text-white transition-all duration-300"
                    >
                      Inquire
                      <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transportation Services Section */}
        <div>
          <div 
            className={`flex items-center gap-6 mb-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <h3 className="font-serif text-2xl md:text-3xl text-white whitespace-nowrap">Transportation Services</h3>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresConfig.features.slice(4).map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div
                  key={service.title}
                  onClick={() => setSelectedService(service)}
                  className={`group relative p-8 bg-[#111] border border-gray-800/50 hover:border-[#d4af37]/40 transition-all duration-700 card-hover overflow-hidden rounded-sm cursor-pointer ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 900}ms` }}
                >
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700" 
                    style={{ 
                      backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', 
                      backgroundSize: '20px 20px' 
                    }} 
                  />

                  <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center bg-black/40 border border-[#d4af37]/20 group-hover:border-[#d4af37] transition-all duration-500 mb-6">
                    {IconComponent && (
                      <IconComponent
                        size={24}
                        strokeWidth={1}
                        className="text-[#d4af37]"
                      />
                    )}
                  </div>

                  <div className="relative z-10">
                    <h4 className="font-serif text-xl text-white mb-3 leading-tight group-hover:text-[#d4af37] transition-colors duration-500">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-light mb-6 group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>

                    {service.features && (
                      <ul className="mb-8 space-y-2">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-[10px] text-[#d4af37]/70 uppercase tracking-widest font-medium">
                            <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    )}

                    <button 
                      onClick={() => navigate('/reservation')}
                      className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#d4af37] hover:text-white transition-all duration-300"
                    >
                      Book Now
                      <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog 
        open={!!selectedService} 
        onOpenChange={(open) => !open && setSelectedService(null)}
      >
        <DialogContent className="sm:max-w-[800px] bg-[#0c0c0c] border-[#d4af37]/20 text-white p-0 overflow-hidden">
          {selectedService && (
            <div className="flex flex-col">
              <DialogHeader className="p-0">
                <div className="relative w-full aspect-video overflow-hidden group">
                  {selectedService.image ? (
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <Gem size={48} className="text-white/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-8 md:p-12 pb-6">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black/40 border border-[#d4af37]/20">
                      {(() => {
                        const Icon = iconMap[selectedService.icon] || Truck;
                        return <Icon size={32} strokeWidth={1} className="text-[#d4af37]" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-medium mb-1 block">Elite Standard</span>
                      <DialogTitle className="font-serif text-3xl md:text-4xl text-white">
                        {selectedService.title}
                      </DialogTitle>
                    </div>
                  </div>
                  <div className="gold-line mb-8" />
                  <DialogDescription className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                    {selectedService.longDescription || selectedService.description}
                  </DialogDescription>
                </div>
              </DialogHeader>

              <div className="p-8 md:p-12 pt-6 grid lg:grid-cols-2 gap-12 border-t border-white/5 bg-black/20">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]">Core Benefits</h4>
                  <ul className="space-y-4">
                    {selectedService.features?.map((feat) => (
                      <li key={feat} className="flex items-start gap-4 text-sm text-gray-300 font-light group">
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col justify-end gap-4 h-full">
                  <p className="text-[11px] text-gray-500 italic mb-2">
                    * Available 24/7. Contact us for custom arrangements and specific equipment requirements.
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      navigate('/reservation');
                    }}
                    className="w-full bg-[#d4af37] hover:bg-white text-black py-4 px-8 text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 outline-none hover:-translate-y-1"
                  >
                    Proceed to Booking
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="w-full border border-gray-800 hover:border-[#d4af37]/40 py-4 px-8 text-[10px] text-gray-400 uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    Return to Services
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Features;
