import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Quote, Star } from 'lucide-react';
import { blogConfig } from '../config';

const Blog = () => {
  if (!blogConfig.heading && blogConfig.posts.length === 0) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="testimonials"
      ref={sectionRef}
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Gold accent glow */}
      <div 
        className="absolute right-0 bottom-0 w-[500px] h-[500px] opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block mb-4 text-xs tracking-[0.3em] text-[#d4af37] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {blogConfig.tag}
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
            {blogConfig.heading}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogConfig.posts.map((post, index) => (
            <article
              key={post.id}
              className={`group relative h-[500px] overflow-hidden cursor-pointer transition-all duration-700 testimonial-card border border-[#d4af37]/10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-600"
                style={{ backgroundImage: `url(${post.image})` }}
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-600"
              />

              {/* Quote Icon */}
              <div className="absolute top-6 left-6">
                <Quote size={32} className="text-[#d4af37]/40" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#d4af37] fill-[#d4af37]" />
                  ))}
                </div>

                {/* Date */}
                <span className="text-xs font-light tracking-wide text-gray-400 mb-3">
                  {post.date}
                </span>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl leading-tight mb-4 text-white">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm font-light text-gray-300 leading-relaxed mb-4">
                  "{post.excerpt}"
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
                  <span className="text-sm tracking-[0.2em] uppercase text-[#d4af37]">{blogConfig.readMoreText}</span>
                  <ArrowRight size={16} className="text-[#d4af37]" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        {blogConfig.viewAllText && (
          <div
            className={`text-center mt-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#d4af37] font-medium tracking-wide hover:gap-4 transition-all duration-300"
            >
              {blogConfig.viewAllText}
              <ArrowRight size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
