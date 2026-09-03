import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { projects } from '../data/projects';

export default function CaseStudyPage({ project, onOpenInquiry }) {
  const router = useRouter();

  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project?.slug]);

  /* Light up the chapter whose section is crossing the upper third of the
     viewport, so the sidebar tracks where the reader actually is. */
  useEffect(() => {
    const sections = chapterRefs.current.filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.chapter);
          if (!Number.isNaN(index)) setActiveChapter(index);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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

  /* Narrative chapters, in reading order. Anything the project data
     doesn't carry simply drops out rather than rendering an empty section. */
  const chapters = [
    { id: 'overview', label: 'Overview', body: project.intro },
    { id: 'challenge', label: 'Challenge', body: project.challenge },
    { id: 'direction', label: 'Direction', body: project.creativeDirection },
    { id: 'design', label: 'Design', body: project.designApproach },
    { id: 'build', label: 'Build', body: project.technicalApproach },
    { id: 'outcome', label: 'Outcome', body: project.outcome },
  ].filter((chapter) => Boolean(chapter.body));

  // Stills used to break up the chapters
  const media = [...new Set([...(project.gallery || []), project.image].filter(Boolean))];

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
          'url': project.seo.ogImage
        },
        'author': {
          '@type': 'Organization',
          '@id': 'https://www.madebychanan.com/#organization',
          'name': 'Made by Chanan',
          'url': 'https://www.madebychanan.com/'
        },
        'publisher': {
          '@type': 'Organization',
          '@id': 'https://www.madebychanan.com/#organization',
          'name': 'Made by Chanan',
          'url': 'https://www.madebychanan.com/',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.madebychanan.com/logo.png'
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
    <div className="cs-root">
      <SEO
        title={project.seo.title}
        description={project.seo.description}
        canonicalUrl={project.seo.canonicalUrl}
        ogImage={project.seo.ogImage}
        ogImageAlt={`${project.title} \u2014 Case study by Made by Chanan`}
        ogType="article"
        schemaData={schemaData}
        articlePublishedTime={`${project.year}-01-01T00:00:00+00:00`}
        articleModifiedTime="2026-08-20T00:00:00+00:00"
      />

      <div className="cs-layout">

        {/* ── Sticky sidebar ── */}
        <aside className="cs-sidebar">
          <div className="cs-sidebar-inner">
            <div className="cs-ident">
              <h1 className="cs-mark">{brandName}</h1>
              {projectSubtitle && <p className="cs-descriptor">{projectSubtitle}</p>}
              <p className="cs-meta">
                {project.category.toUpperCase()} &middot; {project.year}
              </p>
            </div>

            <nav className="cs-chapters" aria-label="Case study sections">
              {chapters.map((chapter, i) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  className={`cs-chapter-link${i === activeChapter ? ' is-active' : ''}`}
                >
                  {chapter.label}
                </a>
              ))}
            </nav>

            <TransitionLink to="/work" className="cs-back">
              All work
              <ArrowUpRight size={14} />
            </TransitionLink>
          </div>
        </aside>

        {/* ── Content ── */}
        <div className="cs-content">

          {/* Hero */}
          <div className="cs-hero case-study-transition-target">
            {project.video ? (
              <video src={project.video} poster={project.image} autoPlay muted loop playsInline />
            ) : (
              <img src={project.image} alt={project.title} />
            )}
          </div>

          {/* Chapters, with stills breaking them up */}
          {chapters.map((chapter, i) => (
            <React.Fragment key={chapter.id}>
              <section
                id={chapter.id}
                className="cs-chapter"
                data-chapter={i}
                ref={(el) => { chapterRefs.current[i] = el; }}
              >
                <p className="cs-chapter-eyebrow">{chapter.label}</p>
                <div className="cs-chapter-body">
                  <p>{chapter.body}</p>
                </div>
              </section>

              {media[i % media.length] && i < chapters.length - 1 && (
                <div className="cs-still">
                  <img src={media[i % media.length]} alt="" loading="lazy" decoding="async" />
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Process board, where the project carries one. Rendered at its
              own ratio rather than in a 16:9 still frame — these boards are
              built to be read, and cover-cropping one cuts its header and
              notes away. */}
          {project.processBoard && (
            <section className="cs-process">
              <p className="cs-chapter-eyebrow">{project.processBoard.eyebrow || 'Process'}</p>
              <figure className="cs-process-figure">
                <div className="cs-process-frame">
                  <img
                    src={project.processBoard.src}
                    alt={project.processBoard.alt || ''}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {project.processBoard.caption && (
                  <figcaption>{project.processBoard.caption}</figcaption>
                )}
              </figure>
            </section>
          )}

          {/* Credits */}
          <section className="cs-credits">
            <div className="cs-credit-col">
              <p className="cs-chapter-eyebrow">Services</p>
              <ul>
                {(project.services || []).map((service) => <li key={service}>{service}</li>)}
              </ul>
            </div>
            <div className="cs-credit-col">
              <p className="cs-chapter-eyebrow">Deliverables</p>
              <ul>
                {(project.deliverables || []).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="cs-credit-col">
              <p className="cs-chapter-eyebrow">Details</p>
              <ul>
                <li>{project.client}</li>
                <li>{project.industry}</li>
                <li>{project.year}</li>
              </ul>
            </div>
          </section>

          {/* Related services */}
          {project.relatedServices && project.relatedServices.length > 0 && (
            <section className="cs-related">
              <p className="cs-chapter-eyebrow">Capabilities</p>
              <div className="cs-related-links">
                {project.relatedServices.map((service) => (
                  <TransitionLink key={service.path} to={service.path} className="cs-related-link">
                    {service.name}
                    <ArrowUpRight size={14} />
                  </TransitionLink>
                ))}
              </div>
            </section>
          )}

          {/* Next case study */}
          <TransitionLink to={`/work/${nextProject.slug}`} className="cs-next">
            <p className="cs-chapter-eyebrow">Read more</p>
            <div className="cs-next-body">
              <span className="cs-next-mark">
                {(nextProject.title.split('\u2014')[0] || nextProject.title).trim()}
              </span>
              <span className="cs-next-sub">
                {(nextProject.title.split('\u2014')[1] || '').trim()}
              </span>
            </div>
            <div className="cs-next-media">
              <img src={nextProject.image} alt="" loading="lazy" decoding="async" />
            </div>
          </TransitionLink>

        </div>
      </div>

      <Footer onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
