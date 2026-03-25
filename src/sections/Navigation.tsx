import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { X, Search, Instagram, Facebook, Twitter, Phone } from 'lucide-react';
import { navigationConfig } from '../config';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Instagram,
  Facebook,
  Twitter,
};

const Navigation = () => {
  if (!navigationConfig.brandName) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'nav-scrolled bg-[#0a0a0a]/95 border-b border-gray-800' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-[80px] px-6 md:px-12 lg:px-20">
          <Link
            to="/"
            className="flex flex-col sm:block font-serif text-base md:text-xl lg:text-2xl tracking-wide text-white leading-tight"
          >
            <span className="text-[#d4af37]">E</span>agle Executive Transport <span>& Security Inc</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationConfig.menuLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) => 
                    `text-sm tracking-[0.15em] uppercase transition-colors duration-300 underline-animation ${
                        isActive ? 'text-[#d4af37] active-link' : 'text-white/80 hover:text-[#d4af37]'
                    }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {/* Phone Button */}
            <a
              href="tel:+19786266999"
              className="hidden md:flex items-center gap-2 text-white/80 hover:text-[#d4af37] transition-colors"
            >
              <Phone size={18} strokeWidth={1.5} />
              <span className="text-sm tracking-wide md:hidden lg:inline">978-626-6999</span>
            </a>

            {/* Book Now Button */}
            <Link
              to="/reservation"
              className="hidden lg:block bg-[#d4af37] hover:bg-[#e8c547] text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95 btn-hover"
            >
              Book Now
            </Link>

            {/* Menu Button (Mobile) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex lg:hidden flex-col gap-1.5 w-7 group"
            >
              <span className="h-[2px] w-full bg-white transition-all group-hover:bg-[#d4af37]" />
              <span className="h-[2px] w-full bg-white transition-all group-hover:bg-[#d4af37]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-700 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="relative h-full flex">
          <div className="flex-1 flex flex-col justify-center items-center px-8 lg:px-20">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 lg:right-20 p-2 text-white hover:text-[#d4af37] transition-colors"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            <div className="w-full max-w-md mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder={navigationConfig.searchPlaceholder}
                  className="w-full py-3 border-b-2 border-[#d4af37] bg-transparent focus:outline-none font-light text-lg text-white placeholder:text-gray-500"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-[#d4af37]" size={20} />
              </div>
            </div>

            <nav className="flex flex-col items-center gap-6">
              {navigationConfig.menuLinks.map((link, index) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-serif text-3xl lg:text-[45px] text-white hover:text-[#d4af37] transition-colors duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease ${index * 0.1}s`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6 mt-12">
              {navigationConfig.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                if (!IconComponent) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-[#d4af37] transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {navigationConfig.menuBackgroundImage && (
            <div
              className="hidden lg:block w-[40%] bg-cover bg-center"
              style={{
                backgroundImage: `url(${navigationConfig.menuBackgroundImage})`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'all 0.7s ease 0.2s',
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
