import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { projects } from '../data/projects';

export default function CaseStudyPage({ project, onOpenInquiry }) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project?.slug]);

  if (!project) {
    return null;
  }

  // Find next project in circular order
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Title formatting with editorial serif styling
  const titleParts = project.title.split('—');
  const brandName = titleParts[0]?.trim() || project.title;
  const projectSubtitle = titleParts[1]?.trim() || '';

  // Schema.org Structured Data: Article + CreativeWork + BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Article', 'CreativeWork'],
        '@id': `https://www.madebychanan.com/work/${project.slug}#article`,
        'headline': project.title,
        'name': project.title,
        'description': project.summary,
        'image': {
          '@type': 'ImageObject',
          'url': project.seo.ogImage,
          'width': 1200,
          'height': 630
        },
        'author': {
          '@type': 'Organization',
          '@id': 'https://www.madebychanan.com/#organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/'
        },
        'publisher': {
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
        'datePublished': `${project.year}-01-01`,
        'dateModified': '2026-08-20',
        'url': project.seo.canonicalUrl,
        'mainEntityOfPage': { '@id': `${project.seo.canonicalUrl}#webpage` },
        'keywords': project.services.join(', '),
        'about': {
          '@type': 'Thing',
          'name': project.industry
        },
        'inLanguage': 'en-GB'
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
      },
      {
        '@type': 'WebPage',
        '@id': `${project.seo.canonicalUrl}#webpage`,
        'url': project.seo.canonicalUrl,
        'name': project.seo.title,
        'description': project.seo.description,
        'isPartOf': { '@id': 'https://www.madebychanan.com/#website' },
        'breadcrumb': { '@id': `https://www.madebychanan.com/work/${project.slug}#breadcrumb` },
        'inLanguage': 'en-GB',
        'datePublished': `${project.year}-01-01`,
        'dateModified': '2026-08-20'
      }
    ]
  };

  return (
    <div style={{ paddingTop: '7.5rem', backgroundColor: '#0002b5', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title={project.seo.title}
        description={project.seo.description}
        canonicalUrl={project.seo.canonicalUrl}
        ogImage={project.seo.ogImage}
        ogImageAlt={`${project.title} — Case Study by Chanan`}
        ogType="article"
        schemaData={schemaData}
        articlePublishedTime={`${project.year}-01-01T00:00:00+00:00`}
        articleModifiedTime="2026-08-20T00:00:00+00:00"
      />


      <article className="section-padding" style={{ backgroundColor: '#0002b5', minHeight: '60vh', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Breadcrumb & Back Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <nav aria-label="Breadcrumb">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8faed9' }}>
                <TransitionLink to="/" style={{ color: '#bfd7ff', textDecoration: 'none', transition: 'color 0.2s' }}>Home</TransitionLink>
                <span>/</span>
                <TransitionLink to="/work" style={{ color: '#bfd7ff', textDecoration: 'none', transition: 'color 0.2s' }}>Work</TransitionLink>
                <span>/</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{brandName}</span>
              </div>
            </nav>

            <TransitionLink
              to="/work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.45rem 1rem',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Archive</span>
            </TransitionLink>
          </div>

          {/* Project Category & Year Pill */}
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
            <span>{project.category} · {project.year} · Case Study</span>
          </div>

          {/* Editorial Headline */}
          <h1 style={{
            marginBottom: '1.5rem',
            maxWidth: '1050px',
            color: '#ffffff',
            fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '-0.025em',
            lineHeight: 1.06
          }}>
            {brandName} {projectSubtitle && (
              <>
                <span style={{ opacity: 0.5, fontWeight: 200, margin: '0 0.4rem' }}>—</span>
                <span style={{
                  fontFamily: 'var(--font-luxury-slim)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#dbe7ff',
                  textTransform: 'none',
                  letterSpacing: '0.01em'
                }}>
                  {projectSubtitle}
                </span>
              </>
            )}
          </h1>

          {/* Lead Intro Paragraph */}
          <p style={{
            fontSize: 'clamp(1.15rem, 1.7vw, 1.4rem)',
            color: '#dbe7ff',
            maxWidth: '920px',
            marginBottom: '3.5rem',
            lineHeight: '1.6',
            fontWeight: 400
          }}>
            {project.intro}
          </p>

          {/* Project Metadata Glass Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            padding: '2rem 2.5rem',
            borderRadius: '20px',
            background: 'rgba(2, 11, 77, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)',
            marginBottom: '4.5rem'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8faed9', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
                Client
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 600 }}>{project.client}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8faed9', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
                Industry
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 600 }}>{project.industry}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8faed9', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
                Year
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 600 }}>{project.year}</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8faed9', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
                Impact Metric
              </span>
              <strong style={{ fontSize: '1.15rem', color: '#7dd3fc', fontWeight: 700 }}>{project.metric}</strong>
            </div>
          </div>

          {/* Primary Hero Showcase Image */}
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '5rem',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.55)',
            aspectRatio: '16/9',
            backgroundColor: '#00014a'
          }}>
            <img
              src={project.image}
              alt={`${project.title} — Digital Flagship by Chanan`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Narrative Chapters (2x2 Glass Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
            {/* Chapter 01 */}
            <div style={{
              background: '#020b4d',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '24px',
              padding: '2.8rem',
              boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#7dd3fc', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                01 / Strategy &amp; Problem
              </div>
              <h2 style={{ fontSize: '1.65rem', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                The Challenge
              </h2>
              <p style={{ color: '#dbe7ff', fontSize: '1.02rem', lineHeight: '1.7', fontWeight: 300 }}>
                {project.challenge}
              </p>
            </div>

            {/* Chapter 02 */}
            <div style={{
              background: '#020b4d',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '24px',
              padding: '2.8rem',
              boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#7dd3fc', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                02 / Aesthetics &amp; Vision
              </div>
              <h2 style={{ fontSize: '1.65rem', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                Creative Direction
              </h2>
              <p style={{ color: '#dbe7ff', fontSize: '1.02rem', lineHeight: '1.7', fontWeight: 300 }}>
                {project.creativeDirection}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
            {/* Chapter 03 */}
            <div style={{
              background: '#020b4d',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '24px',
              padding: '2.8rem',
              boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#7dd3fc', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                03 / Spatial UX &amp; UI
              </div>
              <h2 style={{ fontSize: '1.65rem', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                Design &amp; Experience
              </h2>
              <p style={{ color: '#dbe7ff', fontSize: '1.02rem', lineHeight: '1.7', fontWeight: 300 }}>
                {project.designApproach}
              </p>
            </div>

            {/* Chapter 04 */}
            <div style={{
              background: '#020b4d',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '24px',
              padding: '2.8rem',
              boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#7dd3fc', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                04 / GPU &amp; Shader Execution
              </div>
              <h2 style={{ fontSize: '1.65rem', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                Engineering &amp; Motion
              </h2>
              <p style={{ color: '#dbe7ff', fontSize: '1.02rem', lineHeight: '1.7', fontWeight: 300 }}>
                {project.technicalApproach}
              </p>
            </div>
          </div>

          {/* Outcome & Deliverables Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #020b4d 0%, #00127a 100%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '24px',
            padding: '3.5rem',
            marginBottom: '5rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#7dd3fc', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Results &amp; Impact
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: '#ffffff', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
              Outcome &amp; Business <span style={{ fontFamily: 'var(--font-luxury-slim)', fontStyle: 'italic', color: '#dbe7ff' }}>Transformation</span>
            </h2>
            <p style={{ color: '#dbe7ff', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '880px', fontWeight: 300 }}>
              {project.outcome}
            </p>

            <h3 style={{ fontSize: '0.85rem', color: '#ffffff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem', fontWeight: 700 }}>
              Delivered Capabilities &amp; Artifacts
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {project.deliverables.map((deliv, idx) => (
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
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Gallery Grid */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#8faed9', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
                Visual Artifacts
              </span>
              <h2 style={{ fontSize: '2rem', color: '#ffffff', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                Stills &amp; <span style={{ fontFamily: 'var(--font-luxury-slim)', fontStyle: 'italic', color: '#dbe7ff' }}>Spatial Architecture</span>
              </h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {project.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '300px',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
                    backgroundColor: '#00014a'
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} Interface detail ${idx + 1} by Chanan`}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Related Services Internal Links */}
          <div style={{
            padding: '3rem',
            borderRadius: '24px',
            backgroundColor: '#020b4d',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            marginBottom: '4rem',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)'
          }}>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
              Related Agency Disciplines
            </h2>
            <p style={{ color: '#dbe7ff', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              Explore how Chanan executes these core capabilities across client flagships:
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
                  <span>Explore {srv.name}</span>
                  <ArrowUpRight size={15} color="#7dd3fc" />
                </TransitionLink>
              ))}
            </div>
          </div>

          {/* Next Case Study Navigation Banner */}
          <div style={{
            padding: '4rem 3.5rem',
            textAlign: 'center',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #020b4d 0%, #0002b5 100%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)'
          }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8faed9', display: 'block', marginBottom: '0.75rem', fontWeight: 700 }}>
              Next Selected Work
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#ffffff', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 300 }}>
              {nextProject.title}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <TransitionLink
                to={`/work/${nextProject.slug}`}
                style={{
                  padding: '1.05rem 2.4rem',
                  backgroundColor: '#ffffff',
                  color: '#0002b5',
                  borderRadius: '28px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 6px 25px rgba(255, 255, 255, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>View Next Project</span>
                <ArrowUpRight size={18} />
              </TransitionLink>

              <button
                onClick={onOpenInquiry}
                style={{
                  padding: '1.05rem 2.4rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '28px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
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
