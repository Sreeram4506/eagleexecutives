import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, Phone, Send, MessageCircle } from 'lucide-react';
import { contactConfig, emailJSConfig } from '../config';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

const Contact = () => {
  if (!contactConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_name: "Eagle Executive Transport Team",
      };

      await emailjs.send(
        emailJSConfig.contactServiceId,
        emailJSConfig.contactTemplateId,
        templateParams,
        emailJSConfig.publicKey
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      toast.success(contactConfig.successMessage);

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setIsSubmitting(false);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      {contactConfig.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${contactConfig.backgroundImage})` }}
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gold accent glow */}
      <div 
        className="absolute left-1/4 top-1/2 w-[500px] h-[500px] opacity-10 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Left Side - Info */}
          <div
            className={`lg:w-1/2 text-white transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Tag */}
            <span className="inline-block mb-4 text-xs tracking-[0.3em] text-[#d4af37] font-medium uppercase">
              Get in Touch
            </span>
            <div className="gold-line mb-8" />

            {/* Logo */}
            <h2 className="font-serif text-5xl md:text-6xl lg:text-[70px] mb-8 leading-tight">
              {contactConfig.heading}
            </h2>

            <p className="text-xl font-light leading-relaxed text-gray-300 mb-12 max-w-md">
              {contactConfig.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              {contactConfig.location && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#d4af37]/30">
                    <MapPin size={18} strokeWidth={1.5} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">{contactConfig.locationLabel}</span>
                    <span className="font-light text-gray-300">{contactConfig.location}</span>
                  </div>
                </div>
              )}

              {contactConfig.email && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#d4af37]/30">
                    <Mail size={18} strokeWidth={1.5} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">{contactConfig.emailLabel}</span>
                    <a href={`mailto:${contactConfig.email}`} className="font-light text-gray-300 hover:text-[#d4af37] transition-colors">
                      {contactConfig.email}
                    </a>
                  </div>
                </div>
              )}

              {contactConfig.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#d4af37]/30">
                    <Phone size={18} strokeWidth={1.5} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">{contactConfig.phoneLabel}</span>
                    <a href={`tel:${contactConfig.phone}`} className="font-light text-gray-300 hover:text-[#d4af37] transition-colors">
                      {contactConfig.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${contactConfig.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300"
            >
              <MessageCircle size={20} />
              <span className="text-sm tracking-wide">Chat on WhatsApp</span>
            </a>
          </div>

          {/* Right Side - Form */}
          <div
            className={`lg:w-1/2 max-w-md w-full transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="glass p-8 md:p-10">
              <h3 className="font-serif text-2xl text-white mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    {contactConfig.formFields.nameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={contactConfig.formFields.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-[#1a1a1a] border border-[#d4af37]/20 text-white placeholder-gray-600 px-4 py-4 focus:outline-none focus:border-[#d4af37] transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    {contactConfig.formFields.emailLabel}
                  </label>
                  <input
                    type="email"
                    placeholder={contactConfig.formFields.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-[#1a1a1a] border border-[#d4af37]/20 text-white placeholder-gray-600 px-4 py-4 focus:outline-none focus:border-[#d4af37] transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    {contactConfig.formFields.messageLabel}
                  </label>
                  <textarea
                    placeholder={contactConfig.formFields.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-[#1a1a1a] border border-[#d4af37]/20 text-white placeholder-gray-600 px-4 py-4 focus:outline-none focus:border-[#d4af37] transition-colors font-light resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">{contactConfig.submittingText}</span>
                  ) : isSubmitted ? (
                    <>
                      <span>{contactConfig.submittedText}</span>
                    </>
                  ) : (
                    <>
                      <span>{contactConfig.submitText}</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>

              {isSubmitted && (
                <p className="mt-6 text-[#d4af37] text-center font-light">
                  {contactConfig.successMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
