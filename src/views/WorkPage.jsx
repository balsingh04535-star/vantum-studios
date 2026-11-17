import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { projects as allProjects } from '../data/projects';

// Projects with a film get the full editorial spread.
const FEATURED = allProjects.filter((project) => project.video);

const pad = (value) => String(value).padStart(2, '0');
const projectName = (project) => project.title.split('—')[0].trim();
const descriptor = (project) => project.title.split('—')[1]?.trim() || project.industry;

/* A film that plays muted while it is on screen and rests on its poster otherwise. */
function FeatureFilm({ project }) {
  const video = useRef(null);

  useEffect(() => {
    const element = video.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.play().catch(() => {});
      else element.pause();
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={video}
      src={project.video}
      poster={project.image}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${projectName(project)} — ${descriptor(project)}`}
    />
  );
}

function FeaturedProject({ project, index }) {
  return (
    <section id={project.slug} className="services-world work-feature">
      <div className="services-world-heading">
        <span className="services-world-number">({pad(index + 1)})</span>
        <div className="services-world-title">
          <span>{project.category} — {project.year}</span>
          <h2>{projectName(project)}</h2>
        </div>
        <div className="services-world-copy">
          <p>{project.summary}</p>
          <div className="services-world-links">
            <TransitionLink to={`/work/${project.slug}`}>
              <span>View case study</span>
              <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
            </TransitionLink>
          </div>
        </div>
      </div>

      <TransitionLink
        to={`/work/${project.slug}`}
        className="work-feature-media"
        transitionType="case-study"
        aria-label={`View the ${projectName(project)} case study`}
      >
        <span className="work-feature-frame" data-transition-source>
          <FeatureFilm project={project} />
        </span>
        <span className="work-feature-cue" aria-hidden="true">
          View case study <ArrowUpRight size={15} strokeWidth={1.8} />
        </span>
      </TransitionLink>

      <div className="services-capability-list work-feature-facts" aria-label={`${projectName(project)} project details`}>
        <div><span>Client</span><p>{project.client}</p></div>
        <div><span>Industry</span><p>{project.industry}</p></div>
        <div><span>Our part</span><p>{project.services.slice(0, 3).join(', ')}</p></div>
        <div><span>Delivered</span><p>{project.metric}</p></div>
      </div>
    </section>
  );
}

export default function WorkPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('services-light-chrome');
    return () => document.body.classList.remove('services-light-chrome');
  }, []);

  const workSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.madebychanan.com/work#collection',
        'name': 'Selected Work | Made by Chanan',
        'description': 'Explore case studies in bespoke WebGL websites, 3D interactive product experiences, and brand identity systems by Made by Chanan.',
        'url': 'https://www.madebychanan.com/work',
        'isPartOf': {
          '@type': 'WebSite',
          '@id': 'https://www.madebychanan.com/#website'
        },
        'about': {
          '@type': 'Organization',
          'name': 'Made by Chanan'
        },
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': allProjects.map((proj, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'url': `https://www.madebychanan.com/work/${proj.slug}`,
            'name': proj.title
          }))
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.madebychanan.com/work#breadcrumb',
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
            'name': 'Work',
            'item': 'https://www.madebychanan.com/work'
          }
        ]
      }
    ]
  };

  return (
    <main className="services-editorial-root work-editorial-root">
      <SEO
        title="Selected Work | Made by Chanan"
        description="Explore selected case studies in 3D WebGL experiences, brand identity design, and kinetic web development created by Made by Chanan."
        canonicalUrl="https://www.madebychanan.com/work"
        ogType="website"
        schemaData={workSchema}
      />

      <header className="services-editorial-hero">
        <div className="services-hero-topline">
          <span className="services-overline">Chanan / Work</span>

          <nav className="services-jump" aria-label="Jump to a featured project">
            <span>Featured:</span>
            <div>
              {FEATURED.map((project) => (
                <a key={project.slug} href={`#${project.slug}`}>{projectName(project)}</a>
              ))}
            </div>
          </nav>
        </div>

        <h1>Selected work</h1>

        <div className="services-hero-bottom">
          <a className="services-scroll-cue" href={`#${FEATURED[0]?.slug}`}>
            <ArrowDown size={16} strokeWidth={1.7} aria-hidden="true" />
            <span>Explore</span>
          </a>
          <p>
            Brands, products and worlds we’ve helped bring to life.
          </p>
        </div>
      </header>

      <div className="services-worlds">
        {FEATURED.map((project, index) => (
          <FeaturedProject key={project.slug} project={project} index={index} />
        ))}
      </div>

      <section className="services-editorial-cta">
        <span>Have something in mind?</span>
        <h2>Your project<br /><em>could be next.</em></h2>
        <button type="button" onClick={onOpenInquiry}>
          Start a project
          <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </section>

      <Footer onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
