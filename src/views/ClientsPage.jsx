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
        title="Clients | Made by Chanan"
        description="Explore client collaborations and creative work by Made by Chanan across digital experiences, 3D WebGL environments, and brand systems."
        canonicalUrl="https://www.madebychanan.com/clients"
      />
      <h1 style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}>
        Made by Chanan Clients and Creative Collaborations
      </h1>
      <SchemeSpatialGallery onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
