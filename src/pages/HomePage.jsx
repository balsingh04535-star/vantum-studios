import React from 'react';
import Hero from '../components/Hero';
import StudioOverview from '../components/StudioOverview';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';

export default function HomePage({ onOpenInquiry }) {
  return (
    <main>
      <Hero onOpenInquiry={onOpenInquiry} />
      <StudioOverview />
      <ServicesSection onOpenInquiry={onOpenInquiry} />
      <Footer onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
