import { useNavigate } from 'react-router-dom';
import { featuresConfig, type Feature } from '../config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { useEffect, useRef, useState, useMemo, memo } from 'react';
import { ChevronRight, ParkingCircle, Utensils, Hospital, Hotel, Castle, PartyPopper, Gem, Car } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ParkingCircle,
  Utensils,
  Hospital,
  Hotel,
  Castle,
  PartyPopper,
  Gem,
};

// --- Sub-components (Tailored for Valet) ---

const ValetCard = memo(({ service, idx, onClick }: { service: Feature; idx: number; onClick: () => void }) => {
  const Icon = iconMap[service.icon] || Car;
  return (
    <div 
      onClick={onClick}
      className="group flex gap-6 p-6 bg-white/5 border border-white/10 hover:border-[#d4af37]/30 transition-all duration-500 rounded-sm cursor-pointer animate-fade-up"
      style={{ animationDelay: `${idx * 150}ms` }}
    >
      <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-black/40 border border-[#d4af37]/20 group-hover:border-[#d4af37] transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
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
});

const ValetDetails = memo(({ service, onClose, onAction }: { service: Feature; onClose: () => void; onAction: () => void }) => {
  const Icon = iconMap[service.icon] || Car;
  return (
    <>
      <DialogHeader className="text-left">
        <div className="relative w-full aspect-video mb-8 overflow-hidden border border-white/5 group">
          {service.image ? (
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <Car size={48} className="text-white/10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60" />
        </div>

        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black/40 border border-[#d4af37]/20 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
            <Icon size={32} className="text-[#d4af37]" />
          </div>
          <div>
            <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-medium mb-1 block">White-Glove Service</span>
            <DialogTitle className="font-serif text-3xl md:text-4xl text-white">
              {service.title}
            </DialogTitle>
          </div>
        </div>
        <div className="gold-line mb-8" />
        <DialogDescription className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10">
          {service.longDescription || service.description}
        </DialogDescription>
      </DialogHeader>
      
      <div className="mt-4 grid lg:grid-cols-2 gap-12 border-t border-white/5 pt-10">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-6">Service Standards</h4>
          <ul className="space-y-4">
            {service.features?.map((feat) => (
              <li key={feat} className="flex items-start gap-4 text-sm text-gray-300 font-light group">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col justify-end gap-4">
          <button 
            onClick={onAction}
            className="w-full bg-[#d4af37] hover:bg-white text-black py-4 px-8 text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 outline-none shadow-lg shadow-[#d4af37]/10"
          >
            Request Fleet Valet Quote
          </button>
          <button 
            onClick={onClose}
            className="w-full border border-gray-800 hover:border-[#d4af37]/40 py-4 px-8 text-[10px] text-gray-400 uppercase tracking-[0.2em] transition-all duration-300"
          >
            Close Details
          </button>
        </div>
      </div>
    </>
  );
});

const Valet = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Feature | null>(null);
  const navigate = useNavigate();

  const valetServices = useMemo(() => 
    featuresConfig.features.filter(f => f.category === 'valet'),
    []
  );

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

  const handleClose = () => setSelectedService(null);
  const handleAction = () => {
    setSelectedService(null);
    navigate('/contact');
  };

  return (
    <section
      id="valet"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#080808] relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[#d4af37]/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start flex-row-reverse">
          
          {/* Image/Visual Left (Flipped from Security) */}
          <div className={`hidden lg:block relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'} transition-all duration-1000 delay-300`}>
            <div className="relative aspect-[4/5] overflow-hidden border border-[#d4af37]/20 rounded-sm">
              <img 
                src="/images/valet-hero.jpg" 
                alt="Valet Excellence" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-40" />
            </div>
            {/* Floating accent box */}
            <div className="absolute -top-10 -right-10 p-8 bg-[#111] border border-[#d4af37]/30 max-w-[280px] shadow-2xl">
              <div className="text-[#d4af37] font-serif text-4xl mb-2">1st Class</div>
              <div className="text-white text-sm tracking-[0.2em] uppercase font-bold">White Glove Hospitality & Logistics</div>
            </div>
          </div>

          {/* Content Right */}
          <div className={`${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'} transition-all duration-1000`}>
            <span className="inline-block mb-4 text-xs tracking-[0.4em] text-[#d4af37] font-bold uppercase text-glow">
              Premier Valet Solutions
            </span>
            <div className="gold-line mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-[1.1]">
              First Impressions <br />
              <span className="text-gradient-gold">Crafted with Precision</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed max-w-xl">
              Eagle Executive Transport & Security Inc redefines hospitality through our specialized valet services. Whether it's a high-stakes healthcare facility or an exclusive private gala, our teams provide seamless logistical support with an elite touch.
            </p>

            <div className="space-y-6">
              {valetServices.map((service, idx) => (
                <ValetCard 
                  key={service.title} 
                  service={service} 
                  idx={idx} 
                  onClick={() => setSelectedService(service)} 
                />
              ))}
            </div>

            <button 
              onClick={() => navigate('/contact')}
              className="mt-12 btn-primary group flex items-center gap-3"
            >
              Partner with Eagle Valet
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      <Dialog 
        open={!!selectedService} 
        onOpenChange={(open) => !open && handleClose()}
      >
        <DialogContent className="sm:max-w-[700px] bg-[#0c0c0c] border-[#d4af37]/20 text-white p-6 md:p-12 max-h-[90vh] overflow-y-auto scrollbar-hide">
          {selectedService && (
            <ValetDetails 
              service={selectedService} 
              onClose={handleClose} 
              onAction={handleAction} 
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Valet;
