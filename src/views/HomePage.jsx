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
        'name': 'Made by Chanan',
        'alternateName': 'Chanan',
        'url': 'https://www.madebychanan.com/',
        'logo': 'https://www.madebychanan.com/logo.png',
        'image': 'https://www.madebychanan.com/og-chanan.webp',
        'description': 'Made by Chanan is an independent creative digital agency building bespoke WebGL websites, 3D product visuals, brand identity systems, and kinetic motion experiences for ambitious brands worldwide.',
        'email': 'hello@madebychanan.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '140 Soho Square',
          'addressLocality': 'London',
          'postalCode': 'W1D 3QN',
          'addressCountry': 'GB'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 51.5074,
          'longitude': -0.1278
        },
        'areaServed': [
          'United Kingdom',
          'United States',
          'Europe',
          'Worldwide'
        ],
        'serviceType': [
          'Bespoke Web Design',
          'WebGL & Three.js Development',
          'Brand Identity Systems',
          '3D Product Animation',
          'Kinetic Motion Design'
        ],
        'sameAs': [
          'https://twitter.com/madebychanan',
          'https://instagram.com/madebychanan',
          'https://linkedin.com/company/madebychanan'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.madebychanan.com/#website',
        'url': 'https://www.madebychanan.com/',
        'name': 'Made by Chanan',
        'alternateName': 'Chanan',
        'description': 'Made by Chanan is a creative digital agency specializing in web design, branding, 3D product visuals, and motion.',
        'publisher': {
          '@id': 'https://www.madebychanan.com/#organization'
        },
        'inLanguage': 'en-GB'
      }
    ]
  };

  return (
    <main>
      <SEO
        title="Made by Chanan | Creative Digital Agency"
        description="Made by Chanan is a creative digital agency creating distinctive websites, brand identities, 3D product visuals, and motion experiences for ambitious brands."
        canonicalUrl="https://www.madebychanan.com/"
        schemaData={homepageSchema}
      />
      <Hero onOpenInquiry={onOpenInquiry} />
      <StudioOverview onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
