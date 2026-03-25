import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { faqConfig } from '../config';

const FAQ = () => {
  if (!faqConfig.heading && faqConfig.faqs.length === 0) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);

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

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Gold accent glow */}
      <div 
        className="absolute left-0 top-1/2 w-[400px] h-[400px] opacity-10 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block mb-4 text-xs tracking-[0.3em] text-[#d4af37] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {faqConfig.tag}
          </span>
          <div 
            className={`gold-line mx-auto mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          />
          <h2
            className={`font-serif text-4xl md:text-5xl text-white mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {faqConfig.heading}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqConfig.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(faq.id)}
                className={`w-full flex items-center justify-between px-6 lg:px-8 py-5 bg-[#1a1a1a] border border-[#d4af37]/10 text-left transition-all duration-300 hover:border-[#d4af37]/30 hover:bg-[#1f1f1f] ${
                  openId === faq.id ? 'border-b-0' : ''
                }`}
              >
                <span className="font-sans text-lg text-white font-light pr-4">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border border-[#d4af37]/40 rounded-full transition-transform ${
                    openId === faq.id ? 'rotate-45 bg-[#d4af37]' : ''
                  }`}
                  style={{ transition: 'transform 0.7s cubic-bezier(0.55, 0.055, 0.675, 0.19), background 0.3s' }}
                >
                  <Plus size={14} strokeWidth={1.5} className={openId === faq.id ? 'text-black' : 'text-[#d4af37]'} />
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 lg:px-8 py-6 bg-[#1a1a1a] border border-t-0 border-[#d4af37]/10">
                  <p className="text-gray-400 text-base font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        {faqConfig.ctaText && (
          <div
            className={`text-center mt-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <a
              href={faqConfig.ctaTarget}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(faqConfig.ctaTarget)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-[#d4af37] font-medium tracking-wide hover:gap-4 transition-all duration-300"
            >
              {faqConfig.ctaText}
              <span className="text-lg">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
