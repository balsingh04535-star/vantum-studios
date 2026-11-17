import React, { useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Gauge, PenTool, Sparkles, Users } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';

const SECTIONS = [
  { id: 'studio', label: 'The studio' },
  { id: 'how-we-work', label: 'How we work' },
  { id: 'people', label: 'The people' },
];

const STUDIO_FACTS = [
  ['Founded', 'London'],
  ['Working', 'Worldwide'],
  ['Team', 'Senior designers and engineers'],
  ['Focus', 'Brand, web, 3D and motion'],
];

const PRINCIPLES = [
  {
    number: '01',
    icon: PenTool,
    glow: ['#a76bd6', '#e38eaf', '#e5b364'],
    title: 'Nothing off the shelf',
    description: 'Every layout, interaction and line of code is made for the project in front of us. No templates, ever.',
  },
  {
    number: '02',
    icon: Gauge,
    glow: ['#6259d6', '#7ea9dd', '#9bd1ba'],
    title: 'Smooth, always',
    description: 'Motion should feel effortless. We build and test for fluid performance on real devices, not just fast laptops.',
  },
  {
    number: '03',
    icon: Sparkles,
    glow: ['#5b7dbf', '#7bb6b3', '#e49557'],
    title: 'Human and precise',
    description: 'Expressive, organic visuals backed by systematic thinking, so the work feels alive and still holds together.',
  },
  {
    number: '04',
    icon: Users,
    glow: ['#d85c78', '#9368d5', '#5e8bc9'],
    title: 'Direct access',
    description: 'You work with the senior designers and engineers making your project. No layers, no hand-offs.',
  },
];

const LEADERSHIP = [
  { name: 'Kaelen Vance', role: 'Executive Creative Director', image: '/img2.jpg' },
  { name: 'Sora Tanaka', role: 'Head of 3D & Kinetic Web', image: '/img6.jpg' },
  { name: 'Elena Rostova', role: 'Director of Brand Engineering', image: '/img9.jpg' },
];

export default function AboutPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('services-light-chrome');
    return () => document.body.classList.remove('services-light-chrome');
  }, []);

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.madebychanan.com/about#about',
        'name': 'About Chanan — Independent Creative Digital Agency',
        'description': 'Learn about Chanan, an independent creative digital agency founded in London, engineering bespoke WebGL experiences, 3D brand systems, and high-performance websites.',
        'url': 'https://www.madebychanan.com/about',
        'mainEntity': {
          '@type': 'Organization',
          'name': 'Made by Chanan',
          'alternateName': 'Chanan',
          'url': 'https://www.madebychanan.com/',
          'logo': 'https://www.madebychanan.com/logo.png',
          'foundingLocation': {
            '@type': 'Place',
            'name': 'London, United Kingdom'
          },
          'knowsAbout': [
            'Bespoke Web Design',
            'Three.js / WebGL Development',
            'Brand Identity Systems',
            '3D Product Visualization',
            'GSAP Kinetic Motion Engineering'
          ]
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.madebychanan.com/about#breadcrumb',
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
            'name': 'About',
            'item': 'https://www.madebychanan.com/about'
          }
        ]
      }
    ]
  };

  return (
    <main className="services-editorial-root about-editorial-root">
      <SEO
        title="About | Made by Chanan"
        description="Learn about Made by Chanan, an independent creative digital agency building distinctive websites, WebGL experiences, and brand identities."
        canonicalUrl="https://www.madebychanan.com/about"
        ogType="website"
        schemaData={aboutSchema}
      />

      <header className="services-editorial-hero">
        <div className="services-hero-topline">
          <span className="services-overline">Chanan / About</span>

          <nav className="services-jump" aria-label="Jump to a section">
            <span>Jump ahead:</span>
            <div>
              {SECTIONS.map((section) => (
                <a key={section.id} href={`#${section.id}`}>{section.label}</a>
              ))}
            </div>
          </nav>
        </div>

        <h1>Who we are</h1>

        <div className="services-hero-bottom">
          <a className="services-scroll-cue" href="#studio">
            <ArrowDown size={16} strokeWidth={1.7} aria-hidden="true" />
            <span>Explore</span>
          </a>
          <p>
            An independent studio for brands that refuse to look like everyone else.
          </p>
        </div>
      </header>

      <div className="services-worlds">
        <section id="studio" className="services-world">
          <div className="services-world-heading">
            <span className="services-world-number">(01)</span>
            <div className="services-world-title">
              <span>The studio</span>
              <h2>Independent by design</h2>
            </div>
            <div className="services-world-copy">
              <p>
                Chanan started as a reaction to cookie-cutter websites. Today we are a small,
                senior team making identities, websites and 3D worlds from first principles,
                for brands that want more than a template.
              </p>
              <div className="services-world-links">
                <TransitionLink to="/work">
                  <span>See our work</span>
                  <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
                </TransitionLink>
                <TransitionLink to="/services">
                  <span>What we make</span>
                  <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
                </TransitionLink>
              </div>
            </div>
          </div>

          <figure className="about-frame">
            <img src="/img5.jpg" alt="An editorial portrait from the Chanan studio" loading="lazy" />
          </figure>

          <div className="services-capability-list about-facts" aria-label="Studio facts">
            {STUDIO_FACTS.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="how-we-work" className="services-card-section about-principles" aria-labelledby="about-principles-title">
        <div className="services-card-heading">
          <span>How we work</span>
          <h2 id="about-principles-title">Four rules we<br />don’t bend.</h2>
        </div>

        <div className="services-card-grid">
          {PRINCIPLES.map((principle) => {
            const Icon = principle.icon;
            return (
              <article
                key={principle.number}
                className="services-glow-card"
                style={{
                  '--service-glow-one': principle.glow[0],
                  '--service-glow-two': principle.glow[1],
                  '--service-glow-three': principle.glow[2],
                }}
              >
                <span className="services-glow-card-icon" aria-hidden="true">
                  <Icon size={34} strokeWidth={1.45} />
                </span>
                <span className="services-glow-card-copy">
                  <span className="services-glow-card-number">({principle.number})</span>
                  <strong>{principle.title}</strong>
                  <span className="services-glow-card-description">{principle.description}</span>
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <div className="services-worlds">
        <section id="people" className="services-world">
          <div className="services-world-heading">
            <span className="services-world-number">(02)</span>
            <div className="services-world-title">
              <span>The people</span>
              <h2>Creative leadership</h2>
            </div>
            <div className="services-world-copy">
              <p>Senior people lead every project, from the first conversation to launch day.</p>
            </div>
          </div>

          <div className="about-people-grid">
            {LEADERSHIP.map((member) => (
              <figure key={member.name} className="about-person">
                <span className="about-person-media">
                  <img src={member.image} alt={`${member.name}, ${member.role} at Chanan`} loading="lazy" />
                </span>
                <figcaption className="services-proof-meta">
                  <span>
                    <small>{member.role}</small>
                    <strong>{member.name}</strong>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      <section className="services-editorial-cta">
        <span>Have something in mind?</span>
        <h2>Let’s build it<br /><em>together.</em></h2>
        <button type="button" onClick={onOpenInquiry}>
          Start a project
          <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </section>

      <Footer onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
