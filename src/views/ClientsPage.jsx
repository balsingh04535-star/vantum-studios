import React, { useEffect } from 'react';
import SchemeSpatialGallery from '../components/SchemeSpatialGallery';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function ClientsPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-cream)' }}>
      <SEO
        title="Global Client Network &amp; Spatial Works | Chanan"
        description="Explore the global network of visionary brand partners collaborating with Chanan on bespoke digital experiences, 3D WebGL environments, and brand systems."
        canonicalUrl="https://www.madebychanan.com/clients"
      />
      <SchemeSpatialGallery onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
