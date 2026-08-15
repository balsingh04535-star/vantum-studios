import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { projects, getProjectBySlug } from '../data/projects';

export default function CaseStudyPage({ onOpenInquiry }) {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Find next project in circular order
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Schema.org Structured Data: CreativeWork & BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `https://www.madebychanan.com/work/${project.slug}#creativework`,
        'name': project.title,
        'headline': project.title,
        'description': project.summary,
        'image': `https://www.madebychanan.com${project.image}`,
        'creator': {
          '@type': 'Organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/',
          'logo': 'https://www.madebychanan.com/logo.png'
        },
        'datePublished': `${project.year}-01-01`,
        'keywords': project.services.join(', ')
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://www.madebychanan.com/work/${project.slug}#breadcrumb`,
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
            'name': 'Selected Work',
            'item': 'https://www.madebychanan.com/work'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': project.title,
            'item': `https://www.madebychanan.com/work/${project.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#070709', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title={project.seo.title}
        description={project.seo.description}
        canonicalUrl={project.seo.canonicalUrl}
        ogImage={project.seo.ogImage}
        ogType="article"
        schemaData={schemaData}
      />

      <article className="section-padding" style={{ backgroundColor: '#070709', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#71717a' }}>
              <TransitionLink to="/" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s' }}>Home</TransitionLink>
              <span>/</span>
              <TransitionLink to="/work" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s' }}>Work</TransitionLink>
              <span>/</span>
              <span style={{ color: '#ffffff' }}>{project.title.split('—')[0].trim()}</span>
            </div>
          </nav>

          {/* Back to Work Link */}
          <div style={{ marginBottom: '2rem' }}>
            <TransitionLink
              to="/work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#a1a1aa',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.2s'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Archive</span>
            </TransitionLink>
          </div>

          {/* Project Title & Category Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            backgroundColor: 'rgba(0, 240, 255, 0.08)',
            color: '#00f0ff',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={14} />
            <span>{project.category} · {project.year}</span>
          </div>

          <h1 style={{
            marginBottom: '1.5rem',
            maxWidth: '1000px',
            color: '#ffffff',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.05
          }}>
            {project.title}
          </h1>

          <p style={{
            fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
            color: '#d4d4d8',
            maxWidth: '900px',
            marginBottom: '3.5rem',
            lineHeight: '1.6'
          }}>
            {project.intro}
          </p>

          {/* Project Metadata Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            padding: '2.5rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            marginBottom: '4rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '0.4rem' }}>
                Client
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>{project.client}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '0.4rem' }}>
                Industry
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>{project.industry}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '0.4rem' }}>
                Year
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>{project.year}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '0.4rem' }}>
                Impact Metric
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#00f0ff' }}>{project.metric}</strong>
            </div>
          </div>

          {/* Primary Hero Showcase Image */}
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '5rem',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
            aspectRatio: '16/9'
          }}>
            <img
              src={project.image}
              alt={`${project.title} — Digital Experience Design by Chanan`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Narrative Content Sections */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
            <div style={{
              background: 'linear-gradient(180deg, #111218 0%, #070709 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2.5rem'
            }}>
              <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                The Challenge
              </h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {project.challenge}
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(180deg, #111218 0%, #070709 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2.5rem'
            }}>
              <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                Creative Direction
              </h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {project.creativeDirection}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
            <div style={{
              background: 'linear-gradient(180deg, #111218 0%, #070709 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2.5rem'
            }}>
              <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                Design &amp; Experience
              </h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {project.designApproach}
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(180deg, #111218 0%, #070709 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2.5rem'
            }}>
              <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                Engineering &amp; Motion
              </h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {project.technicalApproach}
              </p>
            </div>
          </div>

          {/* Outcome & Deliverables Banner */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(0, 240, 255, 0.06) 0%, rgba(14, 15, 20, 0.9) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: '24px',
            padding: '3.5rem',
            marginBottom: '5rem'
          }}>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
              Outcome &amp; Business Impact
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '850px' }}>
              {project.outcome}
            </p>

            <h3 style={{ fontSize: '1rem', color: '#00f0ff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem', fontWeight: 600 }}>
              Delivered Capabilities
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {project.deliverables.map((deliv, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color="#00f0ff" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Gallery Grid */}
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
              Visual Stills &amp; Architecture
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {project.gallery.map((imgUrl, idx) => (
                <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden', height: '280px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <img
                    src={imgUrl}
                    alt={`${project.title} Interface detail ${idx + 1} by Chanan`}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Related Services Internal Links */}
          <div style={{
            padding: '3rem',
            borderRadius: '20px',
            backgroundColor: '#0e0f14',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '4rem'
          }}>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              Related Agency Disciplines
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Explore how Chanan executes these core capabilities across client projects:
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {project.relatedServices.map((srv, idx) => (
                <TransitionLink
                  key={idx}
                  to={srv.path}
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
                  <span>Explore {srv.name}</span>
                  <ArrowUpRight size={14} color="#00f0ff" />
                </TransitionLink>
              ))}
            </div>
          </div>

          {/* Next Case Study Navigation CTA */}
          <div style={{
            padding: '3.5rem',
            textAlign: 'center',
            borderRadius: '24px',
            background: 'linear-gradient(180deg, #12131a 0%, #08080a 100%)',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: '0.75rem' }}>
              Next Selected Work
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#ffffff', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
              {nextProject.title}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <TransitionLink
                to={`/work/${nextProject.slug}`}
                style={{
                  padding: '1rem 2.2rem',
                  backgroundColor: '#00f0ff',
                  color: '#070709',
                  borderRadius: '28px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>View Next Project</span>
                <ArrowUpRight size={18} />
              </TransitionLink>

              <button
                onClick={onOpenInquiry}
                style={{
                  padding: '1rem 2.2rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '28px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Discuss Similar Project</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </article>

      <Footer onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
