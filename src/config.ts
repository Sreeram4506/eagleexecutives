// ─── Site ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Eagle Executive Transport & Security Inc | Premier Luxury Chauffeur & Private Security",
  description: "Experience unparalleled luxury transportation and professional private security with Eagle Executive Transport & Security Inc. Premium chauffeur services for airport transfers, corporate travel, and elite protection. Available 24/7 in Massachusetts and beyond.",
  language: "en",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  cartEmptyText: string;
  cartCheckoutText: string;
  continueShoppingText: string;
  menuBackgroundImage: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "Eagle Executive Transport & Security Inc",
  menuLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Locations", href: "/locations" },
    { label: "Reservation", href: "/reservation" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
  searchPlaceholder: "Search services...",
  cartEmptyText: "Your booking cart is empty",
  cartCheckoutText: "Proceed to Booking",
  continueShoppingText: "Continue Browsing",
  menuBackgroundImage: "/images/night-city.jpg",
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  tagline: "Elite Chauffeur & Protection Services",
  title: "Premium\nExecutive\nSecurity & Travel",
  ctaPrimaryText: "Book Your Journey",
  ctaPrimaryTarget: "#reservation",
  ctaSecondaryText: "View Our Fleet",
  ctaSecondaryTarget: "#fleet",
  backgroundImage: "/images/hero-car.jpg",
};

// ─── SubHero ─────────────────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const subHeroConfig: SubHeroConfig = {
  tag: "Our Excellence",
  heading: "Redefining Luxury Transportation",
  bodyParagraphs: [
    "At Eagle Executive Transport & Security Inc, we believe that every journey should be an experience worth remembering. Our commitment to excellence has made us the preferred choice for discerning clients who demand nothing but the best.",
    "From the moment you book with us, you'll experience the difference that true professionalism makes. Our meticulously maintained fleet and highly trained chauffeurs ensure that your transportation needs are exceeded at every turn.",
  ],
  linkText: "Discover Our Story",
  linkTarget: "/about",
  image1: "/images/chauffeur-service.jpg",
  image2: "/images/corporate-travel.jpg",
  stats: [
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 50000, suffix: "+", label: "Rides Completed" },
    { value: 99, suffix: "%", label: "Client Satisfaction" },
    { value: 24, suffix: "/7", label: "Availability" },
  ],
};

// ─── Video Section ───────────────────────────────────────────────────────────

export interface VideoSectionConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const videoSectionConfig: VideoSectionConfig = {
  tag: "Our Promise",
  heading: "Where Elegance Meets Excellence",
  bodyParagraphs: [
    "Every detail of our service is designed with your comfort and satisfaction in mind. From our immaculately presented vehicles to our professionally attired chauffeurs, we create an atmosphere of refined luxury.",
    "Whether you're heading to an important business meeting, catching a flight, or celebrating a special occasion, Eagle Executive Transport & Security Inc ensures you arrive in style, relaxed, and on time.",
  ],
  ctaText: "View Our Services",
  ctaTarget: "#services",
  backgroundImage: "/images/luxury-interior.jpg",
};

// ─── Products (Fleet) ────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface ProductsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  products: Product[];
}

export const productsConfig: ProductsConfig = {
  tag: "Our Fleet",
  heading: "Luxury Vehicles for Every Occasion",
  description: "Choose from our meticulously maintained collection of premium vehicles, each offering the perfect blend of comfort, style, and performance.",
  viewAllText: "View All Vehicles",
  addToCartText: "Book This Vehicle",
  addedToCartText: "Added to Booking",
  categories: ["All", "Sedans", "SUVs", "Limousines", "Sprinters"],
  products: [
    { 
      id: 1, 
      name: "Business Class", 
      price: 0, 
      category: "Sedans", 
      image: "/images/hero-car.jpg" 
    },
    { 
      id: 2, 
      name: "Business SUV", 
      price: 0, 
      category: "SUVs", 
      image: "/images/fleet-escalade.jpg" 
    },
    { 
      id: 3, 
      name: "First Class", 
      price: 0, 
      category: "Sedans", 
      image: "/images/fleet-bmw.jpg" 
    },
    { 
      id: 4, 
      name: "First Class SUV", 
      price: 0, 
      category: "SUVs", 
      image: "/images/hero-car.jpg" 
    },
    { 
      id: 5, 
      name: "Stretch Limo", 
      price: 0, 
      category: "Limousines", 
      image: "/images/fleet-limousine.jpg" 
    },
    { 
      id: 6, 
      name: "MERCEDES SPRINTER EXECUTIVE COACH", 
      price: 0, 
      category: "Sprinters", 
      image: "/images/fleet-sprinter.png" 
    },
  ],
};

// ─── Features (Services) ────────────────────────────────────────────────────────────────

export interface Feature {
  icon: "Truck" | "ShieldCheck" | "Leaf" | "Heart" | "Shield" | "Clock" | "Gem" | "Compass" | "ParkingCircle" | "Utensils" | "Hospital" | "Hotel" | "Castle" | "PartyPopper" | "Users";
  title: string;
  description: string;
  features?: string[];
  longDescription?: string;
  category: "security" | "transport" | "valet";
  image?: string;
}

export interface FeaturesConfig {
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  features: [
    {
      icon: "Shield",
      title: "Executive Protection",
      description: "The highest level of personal security for clients who require constant, close-range protection for public appearances or private events.",
      longDescription: "Our Executive Protection services are designed for individuals whose high-profile status or sensitive nature of work requires discreet yet robust security. We provide a comprehensive umbrella of safety that includes risk assessment, advance team coordination, and close-range protection. Our agents are trained to blend into any environment, from corporate boardrooms to red-carpet events, ensuring that your privacy is respected while your safety is guaranteed.",
      features: [
        "Law enforcement/Military backgrounds",
        "Threat mitigation expertise",
        "24/7 Close-range surveillance"
      ],
      category: "security",
      image: "/images/service-executive.png",
    },
    {
      icon: "ShieldCheck",
      title: "Unarmed Security",
      description: "A seamless blend of professional driving and discreet personal protection. Ideal for executives and families who value safety without visible weapons.",
      longDescription: "Unarmed security provides a sophisticated layer of protection for those who prioritize a non-confrontational and professional atmosphere. Our agents focus on superior situational awareness, route planning, and conflict de-escalation. This service is particularly popular among families and corporate executives who require a secure environment that remains welcoming to guests and the public, all while maintaining the highest standards of vigilance.",
      features: [
        "Non-confrontational protection",
        "Real-time route monitoring",
        "Ideal for executives & families"
      ],
      category: "security",
      image: "/images/service-unarmed.png",
    },
    {
      icon: "Shield",
      title: "Armed Security",
      description: "Higher-level protection staffed by licensed professionals trained in firearms and threat response. Designed for high-risk individuals and asset protection.",
      longDescription: "When the situation demands the highest level of defensive capability, our Armed Security services provide an uncompromising shield. Staffed exclusively by licensed professionals with extensive firearms training and real-world tactical experience, this service is tailored for high-risk individuals, asset transfers, and sensitive corporate sites. We prioritize proactive threat detection and rapid, professional response to ensure that every potential risk is mitigated before it can escalate.",
      features: [
        "Licensed & firearm-certified",
        "Professional hostile response",
        "Ideal for high-risk individuals"
      ],
      category: "security",
      image: "/images/service-armed.png",
    },
    {
      icon: "ShieldCheck",
      title: "Bodyguard Services",
      description: "Top-tier personal protection for public appearances or high-risk travel, providing discreet and vigilant security agents.",
      longDescription: "Our Bodyguard services provide dedicated, individual protection that moves with you. Whether attending a high-stakes meeting, traveling through unfamiliar territories, or appearing at public venues, our bodyguards serve as your personal security detail. They are trained in personal safe-room procedures, crowds and venue management, and emergency medical response, ensuring that you can focus on your agenda while we handle all aspects of your physical security.",
      features: [
        "Private escort services",
        "Discreet travel protection",
        "Crowd & venue security"
      ],
      category: "security",
      image: "/images/service-bodyguard.png",
    },
    {
      icon: "Truck",
      title: "Airport Transfers",
      description: "Premium flight tracking and meet-and-greet services at all major airports, providing a seamless transition.",
      longDescription: "Experience the ultimate in airport luxury with our comprehensive transfer service. We track your flight in real-time, ensuring your chauffeur is waiting for you the moment you land, regardless of delays or early arrivals. Our 'Meet and Greet' service includes luggage assistance and a seamless transition from the terminal to our waiting premium vehicle, allowing you to start or end your journey in complete comfort and relaxation.",
      features: [
          "24/7 Flight tracking",
          "Meet & Greet service",
          "Curbside assistance"
      ],
      category: "transport",
      image: "/images/service-airport.png",
    },
    {
      icon: "Clock",
      title: "Hourly Chauffeur",
      description: "Flexible, 'as-directed' services providing you with a dedicated vehicle and chauffeur for as long as your schedule requires.",
      longDescription: "Our Hourly Chauffeur service is designed for those who require the ultimate flexibility in their schedule. Whether you have multiple meetings across the city, a day of shopping, or a social event with an uncertain end time, our chauffeur remains on standby exclusively for you. You have total control over the itinerary, and our professional driver will be ready to move whenever you are, ensuring that your transportation is the one thing you never have to worry about.",
      features: [
          "Total route flexibility",
          "Dedicated standby vehicle",
          "Multi-stop capabilities"
      ],
      category: "transport",
      image: "/images/service-hourly.png",
    },
    {
      icon: "Gem",
      title: "VIP Special Events",
      description: "Elevate weddings, galas, and red-carpet events with our flagship limousines and white-glove chauffeur service.",
      longDescription: "Make every occasion unforgettable with our specialized event services. We provide white-glove treatment for weddings, galas, and high-profile social events. Our team coordinates closely with event planners to ensure synchronized arrivals and departures. Our flagship vehicles are meticulously prepared to meet the highest standards of luxury, ensuring that your arrival is as impressive as the event itself.",
      features: [
          "Immaculate fleet prep",
          "Uniformed chauffeurs",
          "Champagne service available"
      ],
      category: "transport",
      image: "/images/service-events.png",
    },
    {
      icon: "Compass",
      title: "Long Distance Travel",
      description: "Luxurious city-to-city transfers that turn a long commute into a relaxing experience with high-speed Wi-Fi.",
      longDescription: "Ditch the stress of regional flights or train travel with our exclusive Long Distance service. We transform city-to-city commutes into productive and relaxing experiences. Our premium vehicles are equipped with high-speed Wi-Fi, refreshment centers, and ergonomic seating, allowing you to work, rest, or simply enjoy the scenery. Our expert chauffeurs handle all navigation and road conditions, ensuring a safe and timely arrival at your destination.",
      features: [
          "State-to-state travel",
          "Premium vehicle amenities",
          "Refreshment & entertainment"
      ],
      category: "transport",
    },
    {
      icon: "Utensils",
      title: "Restaurant Valet",
      description: "Elevation of the dining experience with professional, white-glove valet services for premium restaurants and fine dining establishments.",
      longDescription: "Our restaurant valet services are designed to complement the excellence of your culinary offerings. From the moment guests arrive, they are greeted with professional courtesy and efficient service, ensuring their evening starts and ends on a high note of luxury and convenience.",
      features: [
        "Professional front-door greeting",
        "Expert parking coordination",
        "Seamless guest arrival/departure"
      ],
      category: "valet",
      image: "/images/valet-restaurant.jpg",
    },
    {
      icon: "Hospital",
      title: "Healthcare Valet",
      description: "Compassionate and efficient valet solutions for medical centers and hospitals, prioritizing patient ease and accessibility.",
      longDescription: "In healthcare settings, we understand that ease and accessibility are paramount. Our valet teams are trained to provide compassionate assistance to patients and visitors, ensuring that parking is never a stressor during medical visits.",
      features: [
        "Patient-first service approach",
        "Wheelchair & mobility assistance",
        "High-volume traffic management"
      ],
      category: "valet",
      image: "/images/valet-healthcare.jpg",
    },
    {
      icon: "ParkingCircle",
      title: "Parking Management",
      description: "Comprehensive parking solutions for commercial and private facilities, optimizing space and ensuring security.",
      longDescription: "Our parking management services transform standard parking areas into efficient, revenue-optimized assets. We handle everything from staffing and equipment setup to security and traffic flow optimization.",
      features: [
        "Space optimization strategies",
        "Surveillance & lot security",
        "Automated reporting systems"
      ],
      category: "valet",
      image: "/images/valet-parking.jpg",
    },
    {
      icon: "Gem",
      title: "Wedding Valet",
      description: "Sophisticated valet services tailored for weddings, ensuring a grand and organized arrival for all your guests.",
      longDescription: "Every detail matters on your special day. Our wedding valet service provides a touch of elegance and organization that sets the tone for a beautiful celebration, handling high-volume arrivals with grace and efficiency.",
      features: [
        "Uniformed professional staff",
        "Synchronized guest arrivals",
        "Custom signage & coordination"
      ],
      category: "valet",
      image: "/images/valet-wedding.jpg",
    },
    {
      icon: "Castle",
      title: "Country Club Valet",
      description: "Elite valet parking services for private clubs, reflecting the exclusive and refined standards of your membership.",
      longDescription: "We provide valet services that mirror the prestige of your country club. Our staff is trained in private club etiquette, ensuring that every member feels valued and recognized from the moment they arrive.",
      features: [
        "Member recognition protocols",
        "Private club etiquette",
        "Dedicated club-front service"
      ],
      category: "valet",
      image: "/images/valet-club.jpg",
    },
    {
      icon: "PartyPopper",
      title: "Private Event Valet",
      description: "Bespoke valet solutions for private parties and corporate events, providing a seamless luxury experience for attendees.",
      longDescription: "Whether it's an intimate home gathering or a large-scale corporate event, our valet team ensures that the arrival process is flawless. We manage everything from residential street parking to complex venue layouts.",
      features: [
        "Intimate & large-scale event support",
        "Logistics & traffic planning",
        "Discreet & professional staff"
      ],
      category: "valet",
      image: "/images/valet-private.jpg",
    },
    {
      icon: "Hotel",
      title: "Hotel Valet",
      description: "24/7 valet and bellhop services for premium hotels, ensuring guest satisfaction from check-in to check-out.",
      longDescription: "Our hotel valet programs are built on the pillars of hospitality. We act as an extension of your hotel staff, providing 24/7 support that enhances the guest experience and drives positive reviews.",
      features: [
        "24/7 Guest support",
        "Bellhop & luggage assistance",
        "Seamless check-in integration"
      ],
      category: "valet",
      image: "/images/valet-hotel.jpg",
    },
  ],
};

// ─── Blog (Testimonials) ────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface BlogConfig {
  tag: string;
  heading: string;
  viewAllText: string;
  readMoreText: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  tag: "Client Stories",
  heading: "What Our Clients Say",
  viewAllText: "View All Testimonials",
  readMoreText: "Read Full Review",
  posts: [
    {
      id: 1,
      title: "Exceptional Service for Our Wedding Day",
      date: "March 2024",
      image: "/images/wedding-service.jpg",
      excerpt: "Eagle Executive Transport & Security Inc made our special day even more magical. The limousine was immaculate, and the chauffeur went above and beyond to ensure everything was perfect.",
    },
    {
      id: 2,
      title: "Reliable Corporate Transportation",
      date: "February 2024",
      image: "/images/corporate-travel.jpg",
      excerpt: "As a CEO, my time is valuable. Eagle Executive Transport & Security Inc understands this perfectly. Their punctuality and professionalism are unmatched in the industry.",
    },
    {
      id: 3,
      title: "Stress-Free Airport Transfers",
      date: "January 2024",
      image: "/images/airport-transfer.jpg",
      excerpt: "After years of using various car services, I've finally found one that consistently delivers excellence. Flight delays? No problem. They're always prepared.",
    },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const faqConfig: FaqConfig = {
  tag: "Common Questions",
  heading: "Frequently Asked Questions",
  ctaText: "Have more questions? Contact us",
  ctaTarget: "/contact",
  faqs: [
    {
      id: 1,
      question: "How do I book a ride with Eagle Executive Transport & Security Inc?",
      answer: "Booking is easy! You can use our online booking form, call our 24/7 reservation line, or use our mobile app. We recommend booking at least 24 hours in advance for standard rides and 48 hours for special events.",
    },
    {
      id: 2,
      question: "What areas do you service?",
      answer: "We provide service throughout the metropolitan area and surrounding regions. For city-to-city transfers, we cover all major destinations within a 200-mile radius. Contact us for specific location inquiries.",
    },
    {
      id: 3,
      question: "Are your chauffeurs professionally trained?",
      answer: "Absolutely. All our chauffeurs undergo rigorous training, including defensive driving, customer service excellence, and discretion protocols. They're also background-checked and fully licensed.",
    },
    {
      id: 4,
      question: "What amenities are included in your vehicles?",
      answer: "Our vehicles come equipped with complimentary Wi-Fi, bottled water, daily newspapers, phone chargers, and climate control. Limousines additionally feature premium sound systems, mood lighting, and beverage service.",
    },
    {
      id: 5,
      question: "What is your cancellation policy?",
      answer: "We offer free cancellation up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a 50% charge. No-shows are charged the full amount.",
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export const aboutConfig: AboutConfig = {
  sections: [
    {
      tag: "Our Story",
      heading: "A Legacy of Excellence",
      paragraphs: [
        "Founded in 2009, Eagle Executive Transport & Security Inc began with a simple vision: to provide transportation that transcends the ordinary. What started as a single luxury sedan has grown into one of the most respected chauffeur services in the region.",
        "Our journey has been defined by an unwavering commitment to excellence. Every milestone we've achieved is a testament to the trust our clients place in us.",
      ],
      quote: "",
      attribution: "",
      image: "/images/night-city.jpg",
      backgroundColor: "#1a1a1a",
      textColor: "#ffffff",
    },
    {
      tag: "Our Mission",
      heading: "Setting the Standard",
      paragraphs: [],
      quote: "We don't just drive you to your destination. We craft an experience that begins the moment you step into our vehicle.",
      attribution: "-- Jonathan Eagle Executive Transport & Security Inc, Founder",
      image: "/images/driver-portrait.jpg",
      backgroundColor: "#2d2d2d",
      textColor: "#ffffff",
    },
  ],
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
}

export const contactConfig: ContactConfig = {
  heading: "Begin Your Journey",
  description: "Ready to experience the Eagle Executive Transport & Security Inc difference? Reach out to us for bookings, inquiries, or custom transportation solutions.",
  locationLabel: "Our Location",
  location: "4995 Washington st App# 2, West Roxbury Ma 02132",
  emailLabel: "Email Us",
  email: "info@eagleexecutives.com",
  phoneLabel: "Call Us",
  phone: "978-626-6999",
  formFields: {
    nameLabel: "Your Name",
    namePlaceholder: "John Smith",
    emailLabel: "Email Address",
    emailPlaceholder: "john@example.com",
    messageLabel: "Your Message",
    messagePlaceholder: "Tell us about your transportation needs...",
  },
  submitText: "Send Message",
  submittingText: "Sending...",
  submittedText: "Message Sent",
  successMessage: "Thank you for reaching out. Our team will contact you within 24 hours.",
  backgroundImage: "/images/hero-car.jpg",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "Eagle Executive Transport & Security Inc",
  brandDescription: "Premium chauffeur services for discerning clients. Experience luxury transportation redefined.",
  newsletterHeading: "",
  newsletterDescription: "",
  newsletterPlaceholder: "",
  newsletterButtonText: "",
  newsletterSuccessText: "",
  linkGroups: [
    {
      title: "Services",
      links: [
        { label: "Airport Transfers", href: "/services" },
        { label: "Private Security", href: "/services#security" },
        { label: "Corporate Travel", href: "/services" },
        { label: "City to City", href: "/services" },
        { label: "Special Events", href: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Fleet", href: "/services" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQs", href: "/services" },
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ],
  legalLinks: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Cookies", href: "#" },
  ],
  copyrightText: "© 2024 Eagle Executive Transport & Security Inc Luxury Chauffeur Services. All rights reserved.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
};

// ─── Reservation ─────────────────────────────────────────────────────────────

export interface ReservationConfig {
  tag: string;
  heading: string;
  steps: {
    id: number;
    title: string;
  }[];
  serviceTypes: string[];
  selectVehicleText: string;
  submitText: string;
}

export const reservationConfig: ReservationConfig = {
  tag: "Reservation",
  heading: "Book Your Journey",
  steps: [
    { id: 1, title: "Ride Info" },
    { id: 2, title: "Select Vehicle" },
    { id: 3, title: "Final Details" },
  ],
  serviceTypes: [
    "From Airport",
    "To Airport",
    "Point to Point",
    "Hourly / Directed",
  ],
  selectVehicleText: "Select Vehicle",
  submitText: "Complete Reservation",
};

// ─── Locations ───────────────────────────────────────────────────────────────

export interface LocationSubItem {
  id: number;
  name: string;
}

export interface LocationCategory {
  id: number;
  title: string;
  image: string;
  items: LocationSubItem[];
}

export interface LocationsConfig {
  tag: string;
  heading: string;
  categories: LocationCategory[];
}

export const locationsConfig: LocationsConfig = {
  tag: "Service Regions",
  heading: "Expansive Reach Across Borders",
  categories: [
    {
      id: 1,
      title: "Massachusetts",
      image: "/images/hero-car.jpg",
      items: [
        { id: 101, name: "Boston" }, { id: 102, name: "Braintree" }, { id: 103, name: "Cape Cod" },
        { id: 104, name: "Wrentham" }, { id: 105, name: "Lynn" }, { id: 106, name: "Weymouth" },
        { id: 107, name: "Needham" }, { id: 108, name: "Franklin" }, { id: 109, name: "Encor Casino Boston" },
        { id: 110, name: "SOUTHBOROUGH / Northborough" }, { id: 111, name: "Swampscott" },
        { id: 112, name: "Cambridge" }, { id: 113, name: "Hingham" }, { id: 114, name: "Dedham" },
        { id: 115, name: "Norton" }, { id: 116, name: "Newton" }, { id: 117, name: "Hull" },
        { id: 118, name: "Westwood" }, { id: 119, name: "Mansfield" }, { id: 120, name: "Wellesley" },
        { id: 121, name: "Cohasset" }, { id: 122, name: "Dover" }, { id: 123, name: "Easton" },
        { id: 124, name: "Weston" }, { id: 125, name: "Scituate" }, { id: 126, name: "Medfield" },
        { id: 127, name: "Bridge Water" }, { id: 128, name: "Wyland" }, { id: 129, name: "Marshfield" },
        { id: 130, name: "Walpole" }, { id: 131, name: "Brockton" }, { id: 132, name: "Waltham" },
        { id: 133, name: "Duxbury" }, { id: 134, name: "Foxborough" }, { id: 135, name: "FRAMINGHAM" },
        { id: 136, name: "Lexington" }, { id: 137, name: "Kingston" }, { id: 138, name: "Salem" },
        { id: 139, name: "Sharon" }, { id: 140, name: "Bedford" }, { id: 141, name: "Plymouth" },
        { id: 142, name: "Sudbury" }, { id: 143, name: "Lincoln" }, { id: 144, name: "BURLINGTON" },
        { id: 145, name: "Quincy" }, { id: 146, name: "Concord" }, { id: 147, name: "Marlborough" }
      ]
    },
    {
      id: 2,
      title: "Rhode Island & Events",
      image: "/images/wedding-service.jpg",
      items: [
        { id: 201, name: "Providence" }, { id: 202, name: "Newport" }, { id: 203, name: "East Greenwich" },
        { id: 204, name: "Warwick" }, { id: 205, name: "T.F. Green Airport" }
      ]
    },
    {
      id: 3,
      title: "Long Distance Car Service",
      image: "/images/chauffeur-service.jpg",
      items: [
        { id: 301, name: "From Boston" }, { id: 302, name: "CT / NY / NH / VT" },
        { id: 303, name: "Connecticut" }, { id: 304, name: "New York" },
        { id: 305, name: "NEW HAMPSHIRE" }, { id: 306, name: "VERMONT" }
      ]
    },
    {
      id: 4,
      title: "Southern California",
      image: "/images/night-city.jpg",
      items: [
        { id: 401, name: "Los Angeles" }, { id: 402, name: "Anaheim" }, { id: 403, name: "San Clemente" },
        { id: 404, name: "Orange County" }, { id: 405, name: "Westminster" }, { id: 406, name: "Newport Beach" },
        { id: 407, name: "Tustin" }, { id: 408, name: "Huntington Beach" }, { id: 409, name: "Irvine" },
        { id: 410, name: "Laguna Beach" }, { id: 411, name: "Santa Ana Airport" }, { id: 412, name: "Long Beach" },
        { id: 413, name: "Yorba Linda" }, { id: 414, name: "Fullerton" }, { id: 415, name: "LAX Airport" },
        { id: 416, name: "Costa Mesa" }, { id: 417, name: "Brea" }, { id: 418, name: "Garden Grove" },
        { id: 419, name: "Disneyland" }, { id: 420, name: "Fountain Valley" }, { id: 421, name: "Santa Barbara" },
        { id: 422, name: "Buena Park" }, { id: 423, name: "Disney Park" }
      ]
    },
    {
      id: 5,
      title: "Game Car Service",
      image: "/images/fleet-escalade.jpg",
      items: [
        { id: 501, name: "Celtics" }, { id: 502, name: "Bruins" }, { id: 503, name: "Red Sox" },
        { id: 504, name: "Patriots" }, { id: 505, name: "TD Garden" }, { id: 506, name: "Gillette Stadium" },
        { id: 507, name: "Fenway Park" }
      ]
    },
    {
      id: 6,
      title: "Graduation Car Service",
      image: "/images/fleet-limousine.jpg",
      items: [
        { id: 601, name: "Harvard University" }, { id: 602, name: "Boston College" },
        { id: 603, name: "Berkeley University" }, { id: 604, name: "Northeastern University" },
        { id: 605, name: "MIT" }, { id: 606, name: "Boston University" }
      ]
    },
    {
      id: 7,
      title: "Corporate and Business",
      image: "/images/corporate-travel.jpg",
      items: [
        { id: 701, name: "Boston Convention Center" }, { id: 147, name: "Marlborough" },
        { id: 703, name: "Business Meetings" }, { id: 704, name: "Conferences" }
      ]
    },
    {
      id: 8,
      title: "Airport Transfer",
      image: "/images/airport-transfer.jpg",
      items: [
        { id: 801, name: "Logan Airport" }, { id: 802, name: "Hanscom AFB" },
        { id: 803, name: "JFK Airport" }, { id: 804, name: "Signature Flight" },
        { id: 805, name: "T.F. Green Airport" }, { id: 806, name: "LaGuardia Airport" }
      ]
    }
  ]
};

// ─── EmailJS Configuration ───────────────────────────────────────────────────────────

export interface EmailJSConfig {
  contactServiceId: string;
  contactTemplateId: string;
  reservationServiceId: string;
  reservationTemplateId: string;
  publicKey: string;
}

export const emailJSConfig: EmailJSConfig = {
  contactServiceId: "service_pg2xufp", // Updated Contact Service ID
  contactTemplateId: "template_4nsmiay", // Updated Contact Template ID
  reservationServiceId: "service_im7wesc", // Updated Reservation Service ID
  reservationTemplateId: "template_fhrz7yt", // Updated Reservation Template ID
  publicKey: "bHIQAWSoUnrRo-61u", // Updated Public Key
};
