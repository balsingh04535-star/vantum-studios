import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import InquiryModal from './components/InquiryModal';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import { TransitionProvider } from './components/TransitionProvider';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ClientsPage from './pages/ClientsPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <SmoothScroll isLoading={isLoading}>
      <TransitionProvider>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        <Navigation onOpenInquiry={() => setIsInquiryOpen(true)} />

        <Routes>
          {/* Main Index */}
          <Route path="/" element={<HomePage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          
          {/* Portfolio & Case Studies */}
          <Route path="/work" element={<WorkPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/work/:slug" element={<CaseStudyPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          
          {/* Services Hub & Dedicated Disciplines */}
          <Route path="/services" element={<ServicesPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/web-design" element={<ServiceDetailPage serviceKey="web-design" onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/web-development" element={<ServiceDetailPage serviceKey="web-development" onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/branding" element={<ServiceDetailPage serviceKey="branding" onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/3d-product-animation" element={<ServiceDetailPage serviceKey="3d-product-animation" onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/motion-design" element={<ServiceDetailPage serviceKey="motion-design" onOpenInquiry={() => setIsInquiryOpen(true)} />} />

          {/* Studio & Contact */}
          <Route path="/about" element={<AboutPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/clients" element={<ClientsPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />

          {/* 404 Wildcard */}
          <Route path="*" element={<NotFoundPage onOpenInquiry={() => setIsInquiryOpen(true)} />} />
        </Routes>

        <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      </TransitionProvider>
    </SmoothScroll>
  );
}
