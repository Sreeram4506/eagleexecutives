import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Users, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productsConfig } from '../config';
import type { Product } from '../config';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

const Products = ({ onAddToCart }: ProductsProps) => {
  if (!productsConfig.heading && productsConfig.products.length === 0) return null;

  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(productsConfig.categories[0] || 'All');

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

  const filteredProducts = activeCategory === productsConfig.categories[0]
    ? productsConfig.products
    : productsConfig.products.filter(p => p.category === activeCategory);

  // Vehicle details based on type
  const getVehicleDetails = (category: string) => {
    switch(category) {
      case 'Sedans':
        return { passengers: '3-4', luggage: '3', amenity: 'Wi-Fi' };
      case 'SUVs':
        return { passengers: '6-7', luggage: '5', amenity: 'Entertainment' };
      case 'Limousines':
        return { passengers: '8-10', luggage: '4', amenity: 'Bar' };
      case 'Sprinters':
        return { passengers: '8-12', luggage: '10', amenity: 'Custom Coach' };
      default:
        return { passengers: '4', luggage: '3', amenity: 'Comfort' };
    }
  };

  return (
    <section
      id="fleet"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#0a0a0a] section-pattern"
    >
      {/* Gold accent glow */}
      <div 
        className="absolute right-0 top-1/2 w-96 h-96 opacity-10 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block mb-4 text-xs tracking-[0.3em] text-[#d4af37] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {productsConfig.tag}
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
            {productsConfig.heading}
          </h2>
          <p
            className={`max-w-2xl mx-auto text-gray-400 text-lg transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {productsConfig.description}
          </p>
        </div>

        {/* Category Filter */}
        {productsConfig.categories.length > 0 && (
          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {productsConfig.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20'
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2d2d2d] hover:text-white border border-[#d4af37]/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => {
            const details = getVehicleDetails(product.category);
            return (
              <div
                key={product.id}
                className={`group fleet-card bg-[#1a1a1a] border border-[#d4af37]/10 transition-all duration-700 card-hover ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-[280px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />


                  {/* Quick Book Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 shadow-2xl"
                  >
                    <ShoppingBag size={14} />
                    Book Your Appointment
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5 bg-[#1a1a1a] relative z-10">
                  <span className="text-xs text-[#d4af37]/60 tracking-wide uppercase">{product.category}</span>
                  <h3 className="font-serif text-xl text-white mt-1">{product.name}</h3>
                  
                  {/* Vehicle Details */}
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-[#d4af37]" />
                      <span>{details.passengers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={14} className="text-[#d4af37]" />
                      <span>{details.luggage}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        {productsConfig.viewAllText && (
          <div
            className={`text-center mt-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1200ms' }}
          >
            <button 
              onClick={() => navigate('/reservation')}
              className="btn-secondary"
            >
              {productsConfig.viewAllText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
