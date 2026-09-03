import React, { useEffect } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  Clapperboard,
  Palette,
  PanelsTopLeft,
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { getProjectBySlug } from '../data/projects';

const SERVICE_WORLDS = [
  {
    id: 'brand-systems',
    number: '01',
    icon: Palette,
    glow: ['#a76bd6', '#e38eaf', '#e5b364'],
    pretitle: 'We make',
    title: 'Brand systems',
    description: 'Distinct identities with a real point of view—built to stay coherent from the smallest product detail to the biggest launch moment.',
    links: [
      { label: 'Explore branding', to: '/branding' },
    ],
    capabilities: [
      'Strategy & positioning',
      'Visual identity',
      'Art direction',
      'Brand guidelines',
    ],
    projects: ['nebbi-ai', 'tee-bloc'],
  },
  {
    id: 'digital-products',
    number: '02',
    icon: PanelsTopLeft,
    glow: ['#6259d6', '#7ea9dd', '#9bd1ba'],
    pretitle: 'We build',
    title: 'Digital products',
    description: 'Websites and products where sharp thinking, memorable design and clean engineering all pull in the same direction.',
    links: [
      { label: 'Web design', to: '/web-design' },
      { label: 'Creative development', to: '/web-development' },
    ],
    capabilities: [
      'Product strategy & UX',
      'Interface design',
      'Creative development',
      'Design systems',
    ],
    projects: ['codevantum', 'tee-bloc'],
  },
  {
    id: 'interactive-worlds',
    number: '03',
    icon: Box,
    glow: ['#5b7dbf', '#7bb6b3', '#e49557'],
    pretitle: 'We shape',
    title: 'Interactive worlds',
    description: 'Cinematic CGI and real-time 3D experiences that make products feel tangible before anyone can hold them.',
    links: [
      { label: 'Explore 3D & CGI', to: '/3d-product-animation' },
    ],
    capabilities: [
      '3D product films',
      'CGI campaigns',
      'WebGL experiences',
      'Material & lighting design',
    ],
    projects: ['drift', 'flava'],
  },
  {
    id: 'motion-systems',
    number: '04',
    icon: Clapperboard,
    glow: ['#d85c78', '#9368d5', '#5e8bc9'],
    pretitle: 'We choreograph',
    title: 'Motion systems',
    description: 'Movement with purpose—from a single tactile interaction to a complete motion language that makes the whole brand feel alive.',
    links: [
      { label: 'Explore motion design', to: '/motion-design' },
    ],
    capabilities: [
      'Motion direction',
      'Kinetic typography',
      'UI choreography',
      'Launch films',
    ],
    projects: ['nebbi-ai', 'flava'],
  },
];

const SERVICE_LINKS = SERVICE_WORLDS.flatMap((world) => world.links);

function ProjectProof({ slug }) {
  const project = getProjectBySlug(slug);

  if (!project) return null;

  return (
    <TransitionLink
      to={`/work/${project.slug}`}
      className="services-proof"
      transitionType="case-study"
      aria-label={`View ${project.client} case study`}
    >
      <span className="services-proof-media" data-transition-source>
        <img src={project.image} alt="" loading="lazy" />
      </span>
      <span className="services-proof-meta">
        <span>
          <small>Selected work</small>
          <strong>{project.client}</strong>
        </span>
        <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
      </span>
    </TransitionLink>
  );
}

export default function ServicesPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('services-light-chrome');

    return () => document.body.classList.remove('services-light-chrome');
  }, []);

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.madebychanan.com/services#service',
        'name': 'Creative Services | Made by Chanan',
        'description': 'Creative services from Made by Chanan across brand identity, digital products, 3D experiences, and motion design.',
        'url': 'https://www.madebychanan.com/services',
        'provider': {
          '@type': 'Organization',
          'name': 'Made by Chanan',
          'url': 'https://www.madebychanan.com/'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Creative services',
          'itemListElement': SERVICE_LINKS.map((service, index) => ({
            '@type': 'Offer',
            'position': index + 1,
            'itemOffered': {
              '@type': 'Service',
              'name': service.label,
              'url': `https://www.madebychanan.com${service.to}`
            }
          }))
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.madebychanan.com/services#breadcrumb',
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
          }
        ]
      }
    ]
  };

  return (
    <main className="services-editorial-root">
      <SEO
        title="Creative Services | Made by Chanan"
        description="Explore Made by Chanan's services across web design, creative development, brand identity, 3D product animation, and motion design."
        canonicalUrl="https://www.madebychanan.com/services"
        ogType="website"
        schemaData={servicesSchema}
      />

      <header className="services-editorial-hero">
        <div className="services-hero-topline">
          <span className="services-overline">Chanan / Services</span>

          <nav className="services-jump" aria-label="Jump to a service">
            <span>Jump ahead:</span>
            <div>
              {SERVICE_WORLDS.map((world) => (
                <a key={world.id} href={`#${world.id}`}>{world.title}</a>
              ))}
            </div>
          </nav>
        </div>

        <h1>What we make</h1>

        <div className="services-hero-bottom">
          <a className="services-scroll-cue" href="#brand-systems">
            <ArrowDown size={16} strokeWidth={1.7} aria-hidden="true" />
            <span>Explore</span>
          </a>
          <p>
            We turn ambitious ideas into identities, products and digital
            experiences people remember.
          </p>
        </div>
      </header>

      <section className="services-card-section" aria-labelledby="services-card-title">
        <div className="services-card-heading">
          <span>What we can do together</span>
          <h2 id="services-card-title">Four ways to make<br />the idea hit harder.</h2>
        </div>

        <div className="services-card-grid">
          {SERVICE_WORLDS.map((world) => {
            const Icon = world.icon;

            return (
              <a
                key={world.id}
                href={`#${world.id}`}
                className="services-glow-card"
                style={{
                  '--service-glow-one': world.glow[0],
                  '--service-glow-two': world.glow[1],
                  '--service-glow-three': world.glow[2],
                }}
                aria-label={`Discover ${world.title}`}
              >
                <span className="services-glow-card-icon" aria-hidden="true">
                  <Icon size={34} strokeWidth={1.45} />
                </span>

                <span className="services-glow-card-copy">
                  <span className="services-glow-card-number">({world.number})</span>
                  <strong>{world.title}</strong>
                  <span className="services-glow-card-description">{world.description}</span>
                  <span className="services-glow-card-action">
                    Discover
                    <ArrowDown size={15} strokeWidth={2} aria-hidden="true" />
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <div className="services-worlds">
        {SERVICE_WORLDS.map((world) => (
          <section key={world.id} id={world.id} className="services-world">
            <div className="services-world-heading">
              <span className="services-world-number">({world.number})</span>
              <div className="services-world-title">
                <span>{world.pretitle}</span>
                <h2>{world.title}</h2>
              </div>
              <div className="services-world-copy">
                <p>{world.description}</p>
                <div className="services-world-links">
                  {world.links.map((link) => (
                    <TransitionLink key={link.to} to={link.to}>
                      <span>{link.label}</span>
                      <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
                    </TransitionLink>
                  ))}
                </div>
              </div>
            </div>

            <div className="services-capability-list" aria-label={`${world.title} capabilities`}>
              {world.capabilities.map((capability, index) => (
                <div key={capability}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{capability}</p>
                </div>
              ))}
            </div>

            <div className="services-proof-grid">
              {world.projects.map((slug) => (
                <ProjectProof key={slug} slug={slug} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="services-editorial-cta">
        <span>Have something in mind?</span>
        <h2>Let’s make it<br /><em>impossible to ignore.</em></h2>
        <button type="button" onClick={onOpenInquiry}>
          Start a project
          <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </section>

      <Footer onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
