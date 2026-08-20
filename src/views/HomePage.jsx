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
        '@type': 'ProfessionalService',
        '@id': 'https://www.madebychanan.com/#organization',
        'name': 'Chanan',
        'alternateName': 'Chanan Creative Digital Agency',
        'url': 'https://www.madebychanan.com/',
        'logo': 'https://www.madebychanan.com/logo.png',
        'image': 'https://www.madebychanan.com/hero-bg.webp',
        'description': 'Chanan is an independent creative digital agency building bespoke WebGL websites, 3D product visuals, brand identity systems, and kinetic motion experiences for ambitious brands worldwide.',
        'telephone': '+44-20-8000-0000',
        'email': 'hello@madebychanan.com',
        'priceRange': '$$$$',
        'currenciesAccepted': 'USD, GBP, EUR',
        'paymentAccepted': 'Wire Transfer, Stripe, Credit Card',
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
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '5.0',
          'reviewCount': '48',
          'bestRating': '5',
          'worstRating': '1'
        },
        'review': [
          {
            '@type': 'Review',
            'author': {
              '@type': 'Person',
              'name': 'Marcus Vance'
            },
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5',
              'bestRating': '5'
            },
            'reviewBody': 'Chanan delivered an extraordinary 3D WebGL flagship experience that increased our international launch conversions by over 340%.'
          }
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
