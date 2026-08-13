import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const typographyProjects = [
  {
    id: 'project-1',
    num: '01',
    meta: 'PROJECT 01 — SPATIAL AUDIO',
    client: 'VOLTLITES AUDIO INC.',
    category: '3D Web & Generative Shaders',
    year: '2026',
    titleLine1: 'Gratitude is our',
    titleLine2: 'new response',
    titleLine3Prefix: 'to ',
    titleExpandWord: 'judgement.',
    image: '/img1.jpg',
    summary: 'Behold the boundless dance of generative soundscapes, where spatial audio waveforms hold shape for a fleeting breath. Interactive WebGL spatial audio interface with real-time waveform visualization.',
    deliverables: ['Creative Direction', 'WebGL Architecture', 'Generative Shaders', 'Spatial Acoustics'],
  },
  {
    id: 'project-2',
    num: '02',
    meta: 'PROJECT 02 — CYBERNETIC HOROLOGY',
    client: 'CHRONOS LUXURY',
    category: 'Brand Systems & E-Commerce',
    year: '2026',
    titleLine1: "Life's a wild journey;",
    titleLine2: 'embrace the',
    titleLine3Prefix: 'detours ',
    titleExpandWord: 'and dance under stars.',
    image: '/img4.jpg',
    summary: 'High-fashion digital flagship store for next-generation timepiece collectors featuring real-time 3D watch customization and high-speed headless CMS.',
    deliverables: ['E-Commerce Architecture', '3D Asset Pipeline', 'Global Headless CMS', 'Motion Graphics'],
  },
  {
    id: 'project-3',
    num: '03',
    meta: 'PROJECT 03 — NEURAL COMPUTE',
    client: 'AETHER LABS',
    category: 'Kinetic UI & AI Dashboards',
    year: '2025',
    titleLine1: 'Let the miles unfurl',
    titleLine2: 'like stories each',
    titleLine3Prefix: 'one a ',
    titleExpandWord: 'saga of the soul.',
    image: '/img5.jpg',
    summary: 'High-speed AI model training dashboard featuring GPU-accelerated canvas charts, real-time telemetry websockets, and dark mode UI design system.',
    deliverables: ['Design System', 'React Performance Optimization', 'Dark Mode UI', 'WebGL Canvas Engine'],
  },
  {
    id: 'project-4',
    num: '04',
    meta: 'PROJECT 04 — AUTONOMOUS RACING',
    client: 'HYPERION DYNAMIC',
    category: 'Custom Canvas Engine',
    year: '2025',
    titleLine1: 'Soar above peaks into',
    titleLine2: 'whispers of wind like',
    titleLine3Prefix: 'the ',
    titleExpandWord: 'electric hypercar telemetry.',
    image: '/img8.jpg',
    summary: 'Immersive 3D telemetry experience for electric hypercar telemetry stream and real-time aerodynamic simulation across global race circuits.',
    deliverables: ['Custom Canvas Engine', 'Sound Design', 'Realtime Telemetry Websockets', '3D Aerodynamic Shaders'],
  },
];

export default function ImageExpansionTypography({ onOpenInquiry }) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const imgWrap = item.querySelector('.type__expand-img');
        const imgInner = item.querySelector('.type__expand-img-inner');
        const textAnim = item.querySelector('.anim-skewed');
        const block = item.querySelector('.project-block-desc');

        if (imgWrap && imgInner) {
          gsap.fromTo(
            imgWrap,
            { width: '70px', borderRadius: '30px' },
            {
              width: 'clamp(200px, 24vw, 360px)',
              borderRadius: '16px',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                end: 'bottom 45%',
                scrub: 0.8,
              },
            }
          );
        }

        if (textAnim) {
          gsap.fromTo(
            textAnim,
            { x: -20, opacity: 0.7 },
            {
              x: 0,
              opacity: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                end: 'bottom 50%',
                scrub: 0.5,
              },
            }
          );
        }

        if (block) {
          gsap.fromTo(
            block,
            { y: 30, opacity: 0.4 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                end: 'bottom 60%',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '1250px',
        margin: '4rem auto 0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '6rem',
        position: 'relative',
        zIndex: 3,
      }}
    >
      {/* Header divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          paddingBottom: '1.2rem',
        }}
      >
        <span
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: '#c4d600',
            fontFamily: 'var(--font-main)',
          }}
        >
          CURATED PORTFOLIO SHOWCASE
        </span>

        <span
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#52525b',
            fontFamily: 'var(--font-main)',
          }}
        >
          4 Flagship Projects
        </span>
      </div>

      {/* Expandable Typographic Projects */}
      {typographyProjects.map((project, idx) => (
        <article
          key={project.id}
          ref={(el) => (itemsRef.current[idx] = el)}
          className="expansion-typography-card"
          onClick={() => setSelectedProject(project)}
        >
          <div className="project-meta-bar">
            <span className="project-meta-num">{project.num}</span>
            <span className="project-meta-client">{project.client}</span>
            <span className="project-meta-category">{project.category} · {project.year}</span>
          </div>

          <h2 className="expansion-headline">
            {project.titleLine1}<br />
            {project.titleLine2}<br />
            {project.titleLine3Prefix}
            <span className="type__expand">
              <span className="type__expand-img">
                <span
                  className="type__expand-img-inner"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </span>
              <span className="anim-skewed">{project.titleExpandWord}</span>
            </span>
          </h2>

          <p className="project-block-desc">
            {project.summary}
          </p>

          <div className="project-footer-action">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.deliverables.map((item, i) => (
                <span key={i} className="deliverable-pill">
                  {item}
                </span>
              ))}
            </div>

            <button className="explore-case-btn">
              <span>View Case Study</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </article>
      ))}

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge" style={{ color: '#c4d600', borderColor: 'rgba(196,214,0,0.3)' }}>
                  {selectedProject.category}
                </span>
                <h2 style={{ marginTop: '0.75rem', fontSize: '2rem', color: '#fff' }}>{selectedProject.titleLine1} {selectedProject.titleExpandWord}</h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ height: '320px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <img src={selectedProject.image} alt={selectedProject.client} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', color: '#a1a1aa', lineHeight: 1.6 }}>
              {selectedProject.summary}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#c4d600', marginBottom: '0.75rem' }}>
                Deliverables & Scope
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedProject.deliverables.map((item, idx) => (
                  <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', color: '#f4f4f5' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => { setSelectedProject(null); onOpenInquiry(); }}
                style={{
                  background: '#c4d600',
                  color: '#08080a',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '24px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Commission Similar Work</span>
                <ArrowUpRight size={18} />
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '24px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .expansion-typography-card {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 4rem;
        }
        .project-meta-bar {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-family: var(--font-main);
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .project-meta-num {
          color: #c4d600;
          font-weight: 600;
        }
        .project-meta-client {
          color: #ffffff;
          font-weight: 600;
        }
        .project-meta-category {
          color: #71717a;
          margin-left: auto;
        }

        .expansion-headline {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 5vw, 4.8rem);
          fontWeight: 400;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #ffffff;
        }

        .type__expand {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          vertical-align: middle;
          margin: 0 0.5rem;
        }
        .type__expand-img {
          display: inline-block;
          height: clamp(55px, 6vw, 95px);
          width: 80px;
          border-radius: 20px;
          overflow: hidden;
          vertical-align: middle;
          background: #18181b;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
        }
        .expansion-typography-card:hover .type__expand-img {
          transform: scale(1.06);
          border-color: #c4d600;
        }
        .type__expand-img-inner {
          display: block;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          filter: brightness(0.9) contrast(1.05);
        }
        .anim-skewed {
          display: inline-block;
          color: #c4d600;
          font-style: italic;
          font-weight: 300;
        }

        .project-block-desc {
          font-family: var(--font-main);
          font-size: clamp(0.95rem, 1.15vw, 1.1rem);
          line-height: 1.65;
          color: #8e8e93;
          max-width: 780px;
        }

        .project-footer-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
        }
        .deliverable-pill {
          font-size: 0.72rem;
          color: #71717a;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.35rem 0.85rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .explore-case-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.35s ease;
        }
        .expansion-typography-card:hover .explore-case-btn {
          background: #c4d600;
          color: #08080a;
          border-color: #c4d600;
        }
      `}</style>
    </div>
  );
}
