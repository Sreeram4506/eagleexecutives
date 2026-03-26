import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { siteConfig } from './config';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import SubHero from './sections/SubHero';
import VideoSection from './sections/VideoSection';
import Reservation from './sections/Reservation';
import Locations from './sections/Locations';
import Products from './sections/Products';
import Features from './sections/Features';
import Blog from './sections/Blog';
import FAQ from './sections/FAQ';
import About from './sections/About';
import Security from './sections/Security';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ChatBot from './components/ChatBot';
import { Toaster } from 'sonner';
import './App.css';

// Scroll to top or hash on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
};

const HomePage = () => (
  <>
    <Hero />
    <SubHero />
    <VideoSection />
    <Security />
    <Reservation />
    <Products onAddToCart={() => {}} />
  </>
);

const ServicesPage = () => (
    <>
        <Features />
        <Security />
        <Products onAddToCart={() => {}} />
        <Blog />
        <FAQ />
    </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden w-full relative" lang={siteConfig.language || undefined}>
        <ScrollToTop />
        <Navigation />
        <main className="pt-[80px]"> {/* Account for sticky header */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
        <Toaster position="top-right" richColors />
      </div>
    </BrowserRouter>
  );
}

export default App;
