import React, { useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, Layers, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { servicesData } from '../data/servicesData';
import { projects } from '../data/projects';

export default function ServiceDetailPage({ serviceKey, onOpenInquiry }) {
  const service = servicesData[serviceKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceKey]);

  if (!service) {
    return null;
  }

  // Filter projects relevant to this service
  const featuredProjects = projects.filter((p) =>
    service.featuredSlugs.includes(p.slug)
  );

  // Other services for cross-navigation
  const otherServices = Object.values(servicesData).filter(
    (s) => s.slug !== service.slug
  );

  // Schema.org Structured Data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${service.canonicalUrl}#service`,
        'name': service.title.split('|')[0].trim(),
        'description': service.metaDescription,
        'provider': {
          '@type': 'Organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/',
          'logo': 'https://www.madebychanan.com/logo.png'
        },
        'serviceType': service.badge.split('·')[1].trim(),
        'areaServed': 'Worldwide',
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': service.title,
          'itemListElement': service.disciplines.map((d, idx) => ({
            '@type': 'Offer',
            'position': idx + 1,
            'itemOffered': {
              '@type': 'Service',
              'name': d.title,
              'description': d.description
            }
          }))
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${service.canonicalUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://www.madebychanan.com/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Services',
            'item': 'https://www.madebychanan.com/services'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': service.badge.split('·')[1].trim(),
            'item': service.canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#070709', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title={service.title}
        description={service.metaDescription}
        canonicalUrl={service.canonicalUrl}
        ogImage="https://www.madebychanan.com/hero-bg.webp"
        schemaData={schemaData}
      />

      <article className="section-padding" style={{ backgroundColor: '#070709' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#71717a' }}>
              <TransitionLink to="/" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Home</TransitionLink>
              <span>/</span>
              <TransitionLink to="/services" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Services</TransitionLink>
              <span>/</span>
              <span style={{ color: '#ffffff' }}>{service.badge.split('·')[1].trim()}</span>
            </div>
          </nav>

          {/* Discipline Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            border: `1px solid ${service.accentColor}55`,
            backgroundColor: `${service.accentColor}12`,
            color: service.accentColor,
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={14} />
            <span>{service.badge}</span>
          </div>

          {/* Primary Strategic H1 */}
          <h1 style={{
            marginBottom: '1.5rem',
            maxWidth: '950px',
            color: '#ffffff',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.05
          }}>
            {service.h1}
          </h1>

          <p style={{
            fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
            color: '#d4d4d8',
            maxWidth: '850px',
            marginBottom: '4.5rem',
            lineHeight: '1.6'
          }}>
            {service.lead}
          </p>

          {/* Core Capabilities Grid */}
          <section style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
              Core Capabilities &amp; Execution
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {service.disciplines.map((d, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(180deg, #111218 0%, #070709 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div style={{
                    fontSize: '0.85rem',
                    color: service.accentColor,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    marginBottom: '1rem',
                    fontFamily: 'monospace'
                  }}>
                    0{idx + 1} //
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.85rem' }}>
                    {d.title}
                  </h3>
                  <p style={{ color: '#a1a1aa', fontSize: '0.98rem', lineHeight: '1.6' }}>
                    {d.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Specifications Matrix */}
          <section style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(14, 15, 20, 0.9) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '3.5rem',
            marginBottom: '6rem'
          }}>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              Technical Rigor &amp; Delivery Standards
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '750px' }}>
              Every Chanan deliverable adheres to uncompromising benchmarks in performance, accessibility, visual craft, and maintainability.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {service.technicalHighlights.map((th, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color={service.accentColor} />
                  <span>{th}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Case Studies (Internal Linking) */}
          <section style={{ marginBottom: '6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: service.accentColor, fontWeight: 600 }}>
                  Selected Practice
                </span>
                <h2 style={{ fontSize: '2rem', color: '#ffffff', marginTop: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                  Relevant Case Studies
                </h2>
              </div>
              <TransitionLink
                to="/work"
                style={{
                  color: '#a1a1aa',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>View Full Archive</span>
                <ArrowUpRight size={16} />
              </TransitionLink>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    background: 'linear-gradient(180deg, #111218 0%, #070709 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  <div style={{ height: '240px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <img
                      src={project.image}
                      alt={`${project.title} by Chanan`}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <span style={{ fontSize: '0.75rem', color: service.accentColor, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {project.category} · {project.metric}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', color: '#ffffff', margin: '0.5rem 0 0.75rem 0' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: '#a1a1aa', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {project.summary}
                  </p>

                  <TransitionLink
                    to={`/work/${project.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      padding: '0.6rem 1.25rem',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight size={14} color={service.accentColor} />
                  </TransitionLink>
                </div>
              ))}
            </div>
          </section>

          {/* Cross-Discipline Services Navigation */}
          <section style={{
            padding: '3rem',
            borderRadius: '20px',
            backgroundColor: '#0e0f14',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '5rem'
          }}>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              Explore Other Agency Disciplines
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Chanan operates as an integrated studio across design, engineering, CGI, and brand strategy:
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {otherServices.map((s, idx) => (
                <TransitionLink
                  key={idx}
                  to={`/${s.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.4rem',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{s.badge.split('·')[1].trim()}</span>
                  <ArrowUpRight size={14} color={s.accentColor} />
                </TransitionLink>
              ))}
            </div>
          </section>

          {/* Conversion CTA Block */}
          <section style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            borderRadius: '24px',
            background: `linear-gradient(180deg, ${service.accentColor}18 0%, #0d0e14 100%)`,
            border: `1px solid ${service.accentColor}44`
          }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
              Have a Project in Mind?
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto 2.5rem auto', color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Whether you require a complete digital flagship, a custom WebGL experience, or a distinct brand identity, let's discuss your scope.
            </p>
            <button
              onClick={onOpenInquiry}
              style={{
                margin: '0 auto',
                fontSize: '1.05rem',
                padding: '1.1rem 2.5rem',
                background: service.accentColor,
                color: '#070709',
                border: 'none',
                borderRadius: '28px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <span>{service.ctaText}</span>
              <ArrowUpRight size={18} />
            </button>
          </section>

        </div>
      </article>

      <Footer onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
