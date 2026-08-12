import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import InquiryModal from './components/InquiryModal';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import { TransitionProvider } from './components/TransitionProvider';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ClientsPage from './pages/ClientsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <SmoothScroll isLoading={isLoading}>
      <TransitionProvider>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        <Navigation onOpenInquiry={() => setIsInquiryOpen(true)} />

        <Routes>
          <Route path="/" element={<HomePage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/work" element={<WorkPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/clients" element={<ClientsPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/services" element={<ServicesPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/about" element={<AboutPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      </TransitionProvider>
    </SmoothScroll>
  );
}

