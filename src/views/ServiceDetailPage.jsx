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
          '@id': 'https://www.madebychanan.com/#organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.madebychanan.com/logo.png',
            'width': 512,
            'height': 512
          }
        },
        'serviceType': service.badge.split('·')[1].trim(),
        'areaServed': 'Worldwide',
        'url': service.canonicalUrl,
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
      },
      {
        '@type': 'WebPage',
        '@id': `${service.canonicalUrl}#webpage`,
        'url': service.canonicalUrl,
        'name': service.title,
        'description': service.metaDescription,
        'isPartOf': { '@id': 'https://www.madebychanan.com/#website' },
        'breadcrumb': { '@id': `${service.canonicalUrl}#breadcrumb` },
        'about': { '@id': `${service.canonicalUrl}#service` },
        'inLanguage': 'en-GB',
        'dateModified': '2026-08-20'
      }
    ]
  };

  return (
    <div style={{ paddingTop: '7.5rem', backgroundColor: '#0002b5', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title={service.title}
        description={service.metaDescription}
        canonicalUrl={service.canonicalUrl}
        ogImage="https://www.madebychanan.com/hero-bg.webp"
        ogImageAlt={`${service.badge.split('·')[1].trim()} Services — Chanan Creative Agency`}
        schemaData={schemaData}
      />


      <article className="section-padding" style={{ backgroundColor: '#0002b5', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8faed9' }}>
              <TransitionLink to="/" style={{ color: '#bfd7ff', textDecoration: 'none' }}>Home</TransitionLink>
              <span>/</span>
              <TransitionLink to="/services" style={{ color: '#bfd7ff', textDecoration: 'none' }}>Services</TransitionLink>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{service.badge.split('·')[1].trim()}</span>
            </div>
          </nav>

          {/* Discipline Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.2rem',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backgroundColor: '#020b4d',
            color: '#ffffff',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '1.75rem',
            boxShadow: '0 4px 18px rgba(0,0,0,0.25)'
          }}>
            <Sparkles size={13} color="#7dd3fc" />
            <span>{service.badge}</span>
          </div>

          {/* Primary Strategic H1 */}
          <h1 style={{
            marginBottom: '1.5rem',
            maxWidth: '1000px',
            color: '#ffffff',
            fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '-0.025em',
            lineHeight: 1.06
          }}>
            {service.h1.split(' ').slice(0, 2).join(' ')}{' '}
            <span style={{
              fontFamily: 'var(--font-luxury-slim)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#dbe7ff',
              textTransform: 'none'
            }}>
              {service.h1.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.15rem, 1.7vw, 1.4rem)',
            color: '#dbe7ff',
            maxWidth: '880px',
            marginBottom: '4.5rem',
            lineHeight: '1.6',
            fontWeight: 400
          }}>
            {service.lead}
          </p>

          {/* Core Capabilities Grid */}
          <section style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
              Core Capabilities &amp; <span style={{ fontFamily: 'var(--font-luxury-slim)', fontStyle: 'italic', color: '#dbe7ff' }}>Execution Matrix</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {service.disciplines.map((d, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#020b4d',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)'
                  }}
                >
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#7dd3fc',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                  }}>
                    0{idx + 1} //
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.85rem', fontWeight: 600 }}>
                    {d.title}
                  </h3>
                  <p style={{ color: '#dbe7ff', fontSize: '0.98rem', lineHeight: '1.6', fontWeight: 300 }}>
                    {d.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Specifications Matrix */}
          <section style={{
            background: 'linear-gradient(135deg, #020b4d 0%, #00127a 100%)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '24px',
            padding: '3.5rem',
            marginBottom: '6rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
          }}>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
              Technical Rigor &amp; <span style={{ fontFamily: 'var(--font-luxury-slim)', fontStyle: 'italic', color: '#dbe7ff' }}>Delivery Standards</span>
            </h2>
            <p style={{ color: '#dbe7ff', fontSize: '1.02rem', marginBottom: '2.5rem', maxWidth: '780px', fontWeight: 300 }}>
              Every Chanan deliverable adheres to uncompromising benchmarks in 120 FPS performance, accessibility, visual craft, and zero template policy.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {service.technicalHighlights.map((th, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    padding: '0.85rem 1.2rem',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <CheckCircle2 size={18} color="#7dd3fc" />
                  <span>{th}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Case Studies (Internal Linking) */}
          <section style={{ marginBottom: '6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8faed9', fontWeight: 700 }}>
                  Selected Practice
                </span>
                <h2 style={{ fontSize: '2rem', color: '#ffffff', marginTop: '0.35rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                  Relevant <span style={{ fontFamily: 'var(--font-luxury-slim)', fontStyle: 'italic', color: '#dbe7ff' }}>Case Studies</span>
                </h2>
              </div>
              <TransitionLink
                to="/work"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
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
                    background: '#020b4d',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '24px',
                    padding: '2rem',
                    boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem', backgroundColor: '#00014a' }}>
                      <img
                        src={project.image}
                        alt={`${project.title} by Chanan`}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                      />
                    </div>

                    <span style={{ fontSize: '0.75rem', color: '#7dd3fc', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {project.category} · {project.metric}
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: '#ffffff', margin: '0.5rem 0 0.75rem 0', fontWeight: 600 }}>
                      {project.title}
                    </h3>
                    <p style={{ color: '#dbe7ff', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem', fontWeight: 300 }}>
                      {project.summary}
                    </p>
                  </div>

                  <TransitionLink
                    to={`/work/${project.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      color: '#0002b5',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      padding: '0.85rem 1.4rem',
                      borderRadius: '20px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 18px rgba(255, 255, 255, 0.25)',
                      marginTop: 'auto'
                    }}
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight size={15} color="#0002b5" />
                  </TransitionLink>
                </div>
              ))}
            </div>
          </section>

          {/* Cross-Discipline Services Navigation */}
          <section style={{
            padding: '3rem',
            borderRadius: '24px',
            backgroundColor: '#020b4d',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            marginBottom: '5rem',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)'
          }}>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
              Explore Other Agency Disciplines
            </h2>
            <p style={{ color: '#dbe7ff', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              Chanan operates as an integrated creative laboratory across design, engineering, CGI, and brand strategy:
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
                    padding: '0.75rem 1.5rem',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{s.badge.split('·')[1].trim()}</span>
                  <ArrowUpRight size={14} color="#7dd3fc" />
                </TransitionLink>
              ))}
            </div>
          </section>

          {/* Conversion CTA Block */}
          <section style={{
            padding: '4.5rem 2.5rem',
            textAlign: 'center',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #020b4d 0%, #0002b5 100%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)'
          }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 300 }}>
              Have a Visionary <span style={{ fontFamily: 'var(--font-luxury-slim)', fontStyle: 'italic', color: '#dbe7ff' }}>Project in Mind?</span>
            </h2>
            <p style={{ maxWidth: '680px', margin: '0 auto 2.5rem auto', color: '#dbe7ff', fontSize: '1.1rem', lineHeight: '1.6', fontWeight: 300 }}>
              Whether you require a bespoke digital flagship, a custom WebGL environment, or a commanding brand identity, let's discuss your scope.
            </p>
            <button
              onClick={onOpenInquiry}
              style={{
                margin: '0 auto',
                fontSize: '1.05rem',
                padding: '1.1rem 2.6rem',
                background: '#ffffff',
                color: '#0002b5',
                border: 'none',
                borderRadius: '30px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 6px 25px rgba(255, 255, 255, 0.35)',
                transition: 'all 0.2s ease'
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
