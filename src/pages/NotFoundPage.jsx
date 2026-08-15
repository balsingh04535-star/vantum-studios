import React, { useEffect } from 'react';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';

export default function NotFoundPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#070709', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title="404 — Page Not Found | Chanan"
        description="The requested page could not be found. Return to the Chanan homepage or explore our selected creative work."
        canonicalUrl="https://www.madebychanan.com/404"
      />

      <main className="section-padding" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          
          <span style={{
            fontSize: '0.8rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#c4d600',
            fontWeight: 700,
            fontFamily: 'monospace',
            display: 'block',
            marginBottom: '1rem'
          }}>
            ERROR 404 // UNRESOLVED ROUTE
          </span>

          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#ffffff',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}>
            Page Not Found
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
            color: '#a1a1aa',
            lineHeight: '1.6',
            marginBottom: '3rem'
          }}>
            The digital coordinates you requested do not exist or have moved. Explore our selected creative archive or return to the main studio entrance.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <TransitionLink
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2rem',
                backgroundColor: '#ffffff',
                color: '#070709',
                borderRadius: '28px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={16} />
              <span>Return Home</span>
            </TransitionLink>

            <TransitionLink
              to="/work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                borderRadius: '28px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight size={16} color="#c4d600" />
            </TransitionLink>
          </div>

        </div>
      </main>

      <Footer onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
