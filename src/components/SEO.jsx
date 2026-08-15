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
  ogType = 'website',
  schemaData = null,
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

    // 4. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'twitter:site', '@madebychanan');
    setMeta('name', 'twitter:creator', '@madebychanan');

    // 5. Canonical URL
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }

    // 6. Dynamic JSON-LD Structured Data
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
        '@type': 'Organization',
        'name': 'Chanan',
        'url': 'https://www.madebychanan.com/',
        'logo': 'https://www.madebychanan.com/logo.png',
        'description': description,
      });
    }
  }, [title, description, canonicalUrl, ogImage, ogType, schemaData]);

  return null;
}
