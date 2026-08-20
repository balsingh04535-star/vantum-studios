import React, { useEffect } from 'react';

/**
 * Production-Grade Dynamic SEO Component for Chanan
 * Updates document title, meta tags, canonical link, OpenGraph, Twitter Cards,
 * and injects dynamic JSON-LD structured data per page.
 */
export default function SEO({
  title = 'Chanan — Creative Digital Agency | Web Design, Branding & 3D',
  description = 'Chanan is a creative digital agency building standout websites, brand identities, 3D product visuals and motion experiences for ambitious brands worldwide.',
  canonicalUrl = 'https://www.madebychanan.com/',
  ogImage = 'https://www.madebychanan.com/hero-bg.webp',
  ogImageAlt = 'Chanan Creative Digital Agency',
  ogType = 'website',
  schemaData = null,
  articlePublishedTime = null,
  articleModifiedTime = null,
}) {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // Helper to get or create meta tag
    const setMeta = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const removeMeta = (attrName, attrValue) => {
      const el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (el) el.remove();
    };

    // 2. Standard Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'title', title);
    setMeta('name', 'author', 'Chanan');
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Open Graph Tags
    setMeta('property', 'og:site_name', 'Chanan');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', ogImageAlt);
    setMeta('property', 'og:image:type', 'image/webp');
    setMeta('property', 'og:locale', 'en_GB');

    // 4. Article dates (for case studies)
    if (articlePublishedTime) {
      setMeta('property', 'article:published_time', articlePublishedTime);
      setMeta('property', 'article:modified_time', articleModifiedTime || articlePublishedTime);
      setMeta('property', 'article:author', 'https://www.madebychanan.com/');
    } else {
      removeMeta('property', 'article:published_time');
      removeMeta('property', 'article:modified_time');
    }

    // 5. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'twitter:image:alt', ogImageAlt);
    setMeta('name', 'twitter:site', '@madebychanan');
    setMeta('name', 'twitter:creator', '@madebychanan');

    // 6. Canonical URL
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }

    // 7. Dynamic JSON-LD Structured Data
    const schemaId = 'dynamic-page-jsonld';
    let scriptTag = document.getElementById(schemaId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (schemaData) {
      scriptTag.textContent = JSON.stringify(schemaData);
    } else {
      // Default to Chanan Organization Schema
      scriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://www.madebychanan.com/#organization',
            'name': 'Chanan',
            'alternateName': 'Chanan Creative Digital Agency',
            'url': 'https://www.madebychanan.com/',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://www.madebychanan.com/logo.png',
              'width': 512,
              'height': 512
            },
            'description': description,
            'email': 'hello@madebychanan.com',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'London',
              'addressCountry': 'GB'
            },
            'areaServed': 'Worldwide',
            'sameAs': [
              'https://twitter.com/madebychanan',
              'https://instagram.com/madebychanan',
              'https://linkedin.com/company/madebychanan'
            ]
          },
          {
            '@type': 'WebPage',
            '@id': `${canonicalUrl}#webpage`,
            'url': canonicalUrl,
            'name': title,
            'description': description,
            'isPartOf': { '@id': 'https://www.madebychanan.com/#website' },
            'inLanguage': 'en-GB',
          }
        ]
      });
    }
  }, [title, description, canonicalUrl, ogImage, ogImageAlt, ogType, schemaData, articlePublishedTime, articleModifiedTime]);

  return null;
}
