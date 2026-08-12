import React, { useEffect } from 'react';
import SchemeSpatialGallery from '../components/SchemeSpatialGallery';
import Footer from '../components/Footer';

export default function ClientsPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-cream)' }}>
      <SchemeSpatialGallery />
      <Footer onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
