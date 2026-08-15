import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import StudioOverview from '../components/StudioOverview';

export default function HomePage({ onOpenInquiry }) {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            const id = entry.target.id;
            if (id && window.location.pathname === '/') {
              const newHash = id === 'hero' ? '' : `#${id}`;
              const targetUrl = window.location.pathname + newHash;
              if (window.location.hash !== newHash) {
                window.history.replaceState(null, '', targetUrl);
              }
            }
          }
        });
      },
      { threshold: [0.25] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const homepageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.madebychanan.com/#organization',
        'name': 'Chanan',
        'url': 'https://www.madebychanan.com/',
        'logo': 'https://www.madebychanan.com/logo.png',
        'description': 'Chanan is a creative digital agency building standout websites, brand identities, 3D product visuals and motion experiences for ambitious brands worldwide.',
        'sameAs': [
          'https://twitter.com/madebychanan',
          'https://instagram.com/madebychanan'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.madebychanan.com/#website',
        'url': 'https://www.madebychanan.com/',
        'name': 'Chanan',
        'description': 'Creative Digital Agency specializing in Web Design, Branding, 3D Product Visuals & Motion.',
        'publisher': {
          '@id': 'https://www.madebychanan.com/#organization'
        }
      }
    ]
  };

  return (
    <main>
      <SEO
        title="Chanan — Creative Digital Agency | Web Design, Branding & 3D"
        description="Chanan is a creative digital agency building standout websites, brand identities, 3D product visuals and motion experiences for ambitious brands worldwide."
        canonicalUrl="https://www.madebychanan.com/"
        schemaData={homepageSchema}
      />
      <Hero onOpenInquiry={onOpenInquiry} />
      <StudioOverview onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
