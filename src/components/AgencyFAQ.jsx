import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import TransitionLink from './TransitionLink';

export default function AgencyFAQ({ onOpenInquiry }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What makes Chanan different from traditional web design agencies?',
      answer: 'Chanan operates as an elite creative laboratory. We have a strict Zero Template Policy: every 3D WebGL shader, kinetic GSAP motion curve, and interface layout is engineered bespoke from scratch. We guarantee 60-120fps hardware-accelerated performance, direct access to senior creative directors, and custom digital flagship experiences that command global market authority.'
    },
    {
      question: 'What services does Chanan offer for high-growth & luxury brands?',
      answer: 'Our core disciplines include Bespoke Web Design & UI/UX Architecture, Custom WebGL & Three.js 3D Environments, Full-Stack Kinetic Web Development (React/Vite/Jamstack), Brand Identity Systems & Digital Design Languages, and 3D CGI Product Animation & Spatial Motion Graphics.'
    },
    {
      question: 'How much does a bespoke WebGL or 3D digital flagship project cost?',
      answer: 'Every project is tailored to the client\'s ambitious scope and technical complexity. Full flagship engagements typically range from $25,000 to $120,000+. We offer milestone-based sprints, dedicated quarterly retainer partnerships, and fixed-scope flagship deployments with clear deliverables and transparent timelines.'
    },
    {
      question: 'What is the typical timeline for an agency website launch?',
      answer: 'Standard bespoke flagship web projects are delivered in 6 to 12 weeks. Sprints move through 4 distinct phases: 1) Strategy & Technical Blueprint, 2) High-Fidelity Design & 3D Spatial Concepts, 3) WebGL Shader Engineering & GSAP Motion Craft, and 4) Performance Calibration, Cross-Browser QA, and Global Edge CDN Deployment.'
    },
    {
      question: 'How do you ensure 60fps performance and technical SEO on 3D WebGL websites?',
      answer: 'Performance is engineered from the first line of code. We utilize lazy-loaded Three.js geometry buffers, compressed Draco 3D meshes, GLSL GPU shaders, WebP/AVIF imagery, and strict Core Web Vitals optimizations (LCP < 1.2s, FID < 50ms, CLS = 0). Every route is pre-rendered with dynamic Schema.org JSON-LD structured data and semantic HTML5 for maximum search engine dominance.'
    },
    {
      question: 'Do you collaborate with international clients outside London?',
      answer: 'Yes. While headquartered in London, over 70% of our client partnerships are based in New York, San Francisco, Tokyo, Dubai, Paris, and Zurich. We operate with asynchronous luxury communication workflows, dedicated staging environments, and flexible timezone alignments.'
    }
  ];

  // Dynamic Schema.org FAQPage Structured Data for Google SERP Accordions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.madebychanan.com/#faq',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="agency-faq-section">
      {/* Dynamic JSON-LD for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="faq-container">
        
        {/* Section Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <HelpCircle size={14} />
            <span>KNOWLEDGE BASE &amp; FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="faq-title">
            Answers for <span className="faq-title-italic">Visionary Brands</span>
          </h2>

          <p className="faq-description">
            Everything you need to know about partnering with Chanan, our technical standards, WebGL engineering, and production timelines.
          </p>
        </div>

        {/* Accordion Grid */}
        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
                onClick={() => toggleAccordion(idx)}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                >
                  <span className="faq-index">0{idx + 1}.</span>
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon-pill">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer-wrapper">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="faq-bottom-card">
          <div className="faq-bottom-content">
            <div className="faq-bottom-badge">
              <Sparkles size={16} color="#bfd7ff" />
              <span>HAVE A UNIQUE TECHNICAL OR DESIGN INQUIRY?</span>
            </div>
            <h3>Let's architect your brand's digital dominance.</h3>
            <p>Our senior partners review inquiries and respond with comprehensive project proposals within 24 hours.</p>
          </div>

          <div className="faq-bottom-actions">
            <button onClick={onOpenInquiry} className="btn-volt">
              <span>Book Discovery Session</span>
              <ArrowUpRight size={18} />
            </button>
            <TransitionLink to="/work" className="btn-glass">
              <span>View Case Studies</span>
            </TransitionLink>
          </div>
        </div>

      </div>

      <style>{`
        .agency-faq-section {
          position: relative;
          width: 100%;
          background-color: #0002b5;
          color: #ffffff;
          padding: 6rem 1.5rem;
          box-sizing: border-box;
          z-index: 10;
        }

        .faq-container {
          max-width: 1180px;
          margin: 0 auto;
        }

        .faq-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem auto;
        }

        .faq-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1.2rem;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: #020b4d;
          color: #bfd7ff;
          font-size: 0.72rem;
          font-family: monospace, sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .faq-title {
          font-family: var(--font-heading, "Outfit", sans-serif);
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #ffffff;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
        }

        .faq-title-italic {
          font-family: var(--font-luxury-slim, "Cormorant Garamond", serif);
          font-style: italic;
          font-weight: 400;
          color: #dbe7ff;
        }

        .faq-description {
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          color: #dbe7ff;
          line-height: 1.6;
        }

        .faq-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 4.5rem;
        }

        .faq-item {
          background: #020b4d;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 1.75rem 2.25rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        .faq-item:hover {
          border-color: rgba(191, 215, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
        }

        .faq-item.is-open {
          border-color: #bfd7ff;
          background: rgba(2, 11, 77, 0.95);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          padding: 0;
          color: #ffffff;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-main, "Plus Jakarta Sans", sans-serif);
        }

        .faq-index {
          font-family: monospace, sans-serif;
          font-size: 0.9rem;
          color: #bfd7ff;
          font-weight: 700;
          margin-right: 1.25rem;
          flex-shrink: 0;
        }

        .faq-question-text {
          flex: 1;
          font-size: clamp(1.05rem, 1.5vw, 1.25rem);
          font-weight: 600;
          line-height: 1.4;
          color: #ffffff;
        }

        .faq-icon-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #bfd7ff;
          margin-left: 1rem;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .faq-item.is-open .faq-icon-pill {
          background: #bfd7ff;
          color: #020b4d;
          border-color: #ffffff;
        }

        .faq-answer-wrapper {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .faq-answer-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #dbe7ff;
          margin: 0;
        }

        /* Bottom Card */
        .faq-bottom-card {
          background: #020b4d;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 24px;
          padding: 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
          flex-wrap: wrap;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }

        .faq-bottom-content {
          max-width: 650px;
        }

        .faq-bottom-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: monospace, sans-serif;
          font-size: 0.72rem;
          color: #bfd7ff;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .faq-bottom-content h3 {
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: #ffffff;
          margin-bottom: 0.75rem;
          font-family: var(--font-heading, "Outfit", sans-serif);
        }

        .faq-bottom-content p {
          color: #dbe7ff;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
        }

        .faq-bottom-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 900px) {
          .agency-faq-section {
            padding: 4rem 1rem;
          }
          .faq-item {
            padding: 1.25rem 1.25rem;
          }
          .faq-bottom-card {
            padding: 2rem 1.5rem;
            flex-direction: column;
            align-items: flex-start;
          }
          .faq-bottom-actions {
            width: 100%;
          }
          .faq-bottom-actions button,
          .faq-bottom-actions a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
