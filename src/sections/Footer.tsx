import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { footerConfig } from '../config';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Instagram,
  Facebook,
  Twitter,
};

const Footer = () => {
  if (!footerConfig.brandName) return null;

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0a0a0a] py-16 md:py-24 border-t border-[#d4af37]/10">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-xl md:text-2xl mb-6 text-white leading-tight">
              <span className="text-[#d4af37]">E</span>agle<br className="md:hidden" /> Executive Transport<br /> & Security Inc
            </h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
              {footerConfig.brandDescription}
            </p>
            <div className="flex items-center gap-4">
              {footerConfig.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                if (!IconComponent) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center border border-[#d4af37]/20 text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent size={18} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Groups */}
          {footerConfig.linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-sans text-sm font-medium uppercase tracking-wider mb-6 text-white">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 text-base font-light link-hover inline-block transition-colors hover:text-[#d4af37]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {footerConfig.newsletterHeading && (
            <div className="lg:col-span-1">
              <h4 className="font-sans text-sm font-medium uppercase tracking-wider mb-6 text-white">{footerConfig.newsletterHeading}</h4>
              <p className="text-gray-400 text-sm font-light mb-4">
                {footerConfig.newsletterDescription}
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder={footerConfig.newsletterPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#d4af37]/20 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 btn-primary text-sm"
                >
                  {isSubscribed ? (
                    <span>{footerConfig.newsletterSuccessText}</span>
                  ) : (
                    <>
                      <span>{footerConfig.newsletterButtonText}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-[#d4af37]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">
              {footerConfig.copyrightText}
            </p>
            <div className="flex items-center gap-6">
              {footerConfig.legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 text-xs hover:text-[#d4af37] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
