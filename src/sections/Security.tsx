import { useNavigate } from 'react-router-dom';
import { featuresConfig, type Feature } from '../config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Shield,
  ShieldAlert,
  ShieldCheck,
};

const Security = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Feature | null>(null);
  const navigate = useNavigate();

  const securityServices = featuresConfig.features.filter(f => f.category === 'security');

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
      id="security"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#050505] relative overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/security-team.jpg" 
          alt="Security Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Left */}
          <div className={`${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'} transition-all duration-1000`}>
            <span className="inline-block mb-4 text-xs tracking-[0.4em] text-[#d4af37] font-medium uppercase">
              Private Security
            </span>
            <div className="gold-line mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
              Discreet Protection <br />
              <span className="text-[#d4af37]">For What Matters Most</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed max-w-xl">
              Eagle Executive Transport & Security Inc provides elite protection services through trained and licensed former military affiliates. We ensure your safety with the highest level of professionalism and situational awareness.
            </p>

            <div className="space-y-6">
              {securityServices.map((service, idx) => {
                const Icon = iconMap[service.icon] || Shield;
                return (
                  <div 
                    key={service.title}
                    onClick={() => setSelectedService(service)}
                    className="group flex gap-6 p-6 bg-white/5 border border-white/10 hover:border-[#d4af37]/30 transition-all duration-500 rounded-sm cursor-pointer"
                    style={{ transitionDelay: `${idx * 200}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-black/40 border border-[#d4af37]/20 group-hover:border-[#d4af37] transition-all duration-500">
                      <Icon size={22} className="text-[#d4af37]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features?.map(feat => (
                          <li key={feat} className="flex items-center gap-2 text-[11px] text-[#d4af37]/70 uppercase tracking-widest font-medium">
                            <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => navigate('/reservation')}
              className="mt-12 btn-primary group flex items-center gap-3"
            >
              Request Custom Security Plan
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-[10px] text-gray-600 italic">
              *Provided by trained and licensed former military affiliate. More information upon request.
            </p>
          </div>

          {/* Image/Visual Right (Optional decorative element or second image) */}
          <div className={`hidden lg:block relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'} transition-all duration-1000 delay-300`}>
            <div className="relative aspect-[4/5] overflow-hidden border border-[#d4af37]/20">
              <img 
                src="/images/security-team.jpg" 
                alt="Executive Protection" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            {/* Floating accent box */}
            <div className="absolute -bottom-10 -left-10 p-8 bg-[#111] border border-[#d4af37]/30 max-w-[280px]">
              <div className="text-[#d4af37] font-serif text-4xl mb-2">24/7</div>
              <div className="text-white text-sm tracking-[0.2em] uppercase">Elite Protection & Response Team</div>
            </div>
          </div>

        </div>
      </div>
      <Dialog 
        open={!!selectedService} 
        onOpenChange={(open) => !open && setSelectedService(null)}
      >
        <DialogContent className="sm:max-w-[700px] bg-[#0c0c0c] border-[#d4af37]/20 text-white p-8 md:p-12">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="relative w-full aspect-video mb-8 overflow-hidden border border-white/5 group">
                  {selectedService.image ? (
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <Shield size={48} className="text-white/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black/40 border border-[#d4af37]/20">
                    {(() => {
                      const Icon = iconMap[selectedService.icon] || Shield;
                      return <Icon size={32} className="text-[#d4af37]" />;
                    })()}
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-medium mb-1 block">Security Protocols</span>
                    <DialogTitle className="font-serif text-3xl md:text-4xl text-white">
                      {selectedService.title}
                    </DialogTitle>
                  </div>
                </div>
                <div className="gold-line mb-8" />
                <DialogDescription className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10">
                  {selectedService.longDescription || selectedService.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 grid lg:grid-cols-2 gap-12 border-t border-white/5 pt-10">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-6">Service Standards</h4>
                  <ul className="space-y-4">
                    {selectedService.features?.map((feat) => (
                      <li key={feat} className="flex items-start gap-4 text-sm text-gray-300 font-light group">
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col justify-end gap-4">
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      navigate('/reservation');
                    }}
                    className="w-full bg-[#d4af37] hover:bg-white text-black py-4 px-8 text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 outline-none"
                  >
                    Request Custom Plan
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="w-full border border-gray-800 hover:border-[#d4af37]/40 py-4 px-8 text-[10px] text-gray-400 uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Security;
