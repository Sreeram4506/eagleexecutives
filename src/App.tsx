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
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { Toaster } from 'sonner';
import './App.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage = () => (
  <>
    <Hero />
    <SubHero />
    <VideoSection />
    <Products onAddToCart={() => {}} />
  </>
);

const ServicesPage = () => (
    <>
        <Features />
        <Products onAddToCart={() => {}} />
        <Blog />
        <FAQ />
    </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0a]" lang={siteConfig.language || undefined}>
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
        <Toaster position="top-right" richColors />
      </div>
    </BrowserRouter>
  );
}

export default App;
