import React from 'react';
import Hero from '../components/Hero';
import StudioOverview from '../components/StudioOverview';
import FeaturedWork from '../components/FeaturedWork';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';

export default function HomePage({ onOpenInquiry }) {
  return (
    <main>
      <Hero onOpenInquiry={onOpenInquiry} />
      <StudioOverview />
      <FeaturedWork onOpenInquiry={onOpenInquiry} />
      <ServicesSection onOpenInquiry={onOpenInquiry} />
      <Footer onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
