import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import InquiryModal from './components/InquiryModal';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <ScrollToTop />
      <Navigation onOpenInquiry={() => setIsInquiryOpen(true)} />

      <Routes>
        <Route path="/" element={<HomePage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
        <Route path="/work" element={<WorkPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
        <Route path="/services" element={<ServicesPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
        <Route path="/about" element={<AboutPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </>
  );
}
