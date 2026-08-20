import React from 'react';
import LightRaysBackground from './LightRaysBackground';
import MasonryShowcaseGrid from './MasonryShowcaseGrid';
import SpotlightSVGPath from './SpotlightSVGPath';
import Footer from './Footer';

export default function SchemeSpatialGallery({ onOpenInquiry }) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-cream, #0002b5)',
        color: '#ffffff',
        padding: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── LIVE VOLUMETRIC LIGHT RAYS BACKGROUND ── */}
      <LightRaysBackground
        origin="top-center"
        color="#bfd7ff"
        speed={1.0}
        spread={0.65}
        length={3.0}
        followMouse={true}
        mouseInfluence={0.15}
        pulsating={true}
        fadeDistance={1.2}
      />

      {/* ── MASONRY SHOWCASE GRID (Parallax Columns) ── */}
      <MasonryShowcaseGrid onOpenInquiry={onOpenInquiry} />

      {/* ── SPOTLIGHT SVG PATH COMPONENT ── */}
      <SpotlightSVGPath />

      {/* ── HIGH-FASHION EDITORIAL FOOTER ── */}
      <Footer onOpenInquiry={onOpenInquiry} />
    </section>
  );
}

