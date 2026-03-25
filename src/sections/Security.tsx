import { useEffect, useRef, useState } from 'react';
import { Shield, ShieldAlert, Users, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Security = () => {
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

  const securityServices = [
    {
      title: "Unarmed Security",
      icon: Shield,
      description: "A seamless blend of professional driving and discreet personal protection. Designed for clients who value safety, comfort, and discretion without visible weapons.",
      features: [
        "Non-confrontational protection",
        "Real-time route monitoring",
        "Ideal for executives & families"
      ]
    },
    {
      title: "Armed Security",
      icon: ShieldAlert,
      description: "Higher-level protection for clients requiring enhanced safety during travel - staffed by licensed professionals trained in firearms and threat response.",
      features: [
        "Licensed & firearm-certified",
        "Professional hostile response",
        "Ideal for high-risk individuals"
      ]
    },
    {
      title: "Executive Protection",
      icon: Users,
      description: "The highest level of personal security for clients who require constant, close-range protection for public appearances or private events.",
      features: [
        "Law enforcement/Military backgrounds",
        "Threat mitigation expertise",
        "24/7 Close-range surveillance"
      ]
    }
  ];

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
              {securityServices.map((service, idx) => (
                <div 
                  key={service.title}
                  className="group flex gap-6 p-6 bg-white/5 border border-white/10 hover:border-[#d4af37]/30 transition-all duration-500 rounded-sm"
                  style={{ transitionDelay: `${idx * 200}ms` }}
                >
                  <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-black/40 border border-[#d4af37]/20 group-hover:border-[#d4af37] transition-all duration-500">
                    <service.icon size={22} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map(feat => (
                        <li key={feat} className="flex items-center gap-2 text-[11px] text-[#d4af37]/70 uppercase tracking-widest font-medium">
                          <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
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
    </section>
  );
};

export default Security;
