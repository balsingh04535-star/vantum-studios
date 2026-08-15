import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': 'https://www.madebychanan.com/contact#contact',
        'name': 'Contact Chanan — Start a Project',
        'description': 'Initiate a project inquiry with Chanan. Reserve production slots for custom web design, 3D WebGL environments, and brand design systems.',
        'url': 'https://www.madebychanan.com/contact',
        'mainEntity': {
          '@type': 'Organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/',
          'email': 'hello@madebychanan.com'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.madebychanan.com/contact#breadcrumb',
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
            'name': 'Contact',
            'item': 'https://www.madebychanan.com/contact'
          }
        ]
      }
    ]
  };

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#09090b', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title="Contact Chanan — Start a Project"
        description="Initiate a project inquiry with Chanan. Reserve production slots for custom web design, 3D WebGL environments, and brand design systems."
        canonicalUrl="https://www.madebychanan.com/contact"
        ogImage="https://www.madebychanan.com/hero-bg.webp"
        schemaData={contactSchema}
      />
      <div className="section-padding" style={{ backgroundColor: '#09090b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            border: '1px solid rgba(226, 232, 240, 0.35)',
            backgroundColor: 'rgba(226, 232, 240, 0.08)',
            color: '#e2e8f0',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            Direct Line
          </div>

          <h1 style={{
            marginBottom: '1.5rem',
            maxWidth: '900px',
            color: '#ffffff',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.05
          }}>
            Initiate a Project Conversation
          </h1>

          <p style={{ fontSize: '1.25rem', color: '#a1a1aa', maxWidth: '750px', marginBottom: '4rem', lineHeight: '1.6' }}>
            We accept a curated number of client engagements per quarter to guarantee uncompromised craft and direct senior partner attention.
          </p>

          <div className="grid-2" style={{ gap: '3.5rem' }}>
            {/* Direct Contact Info */}
            <div>
              <div
                style={{
                  background: 'linear-gradient(180deg, #121318 0%, #09090b 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '20px',
                  padding: '3rem',
                  marginBottom: '2rem',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
                }}
              >
                <h2 style={{ marginBottom: '2rem', fontSize: '1.6rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  Studio Information
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <MapPin size={24} color="#e2e8f0" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#ffffff' }}>Global Practice</h3>
                      <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Remote-First Studio<br />Partnering with ambitious brands worldwide
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <Mail size={24} color="#e2e8f0" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#ffffff' }}>Electronic Mail</h3>
                      <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        New Inquiries: hello@madebychanan.com<br />
                        Press &amp; Collaborations: press@madebychanan.com
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <Phone size={24} color="#e2e8f0" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#ffffff' }}>Response Timeline</h3>
                      <p style={{ color: '#a1a1aa', fontSize: '0.95rem' }}>
                        Guaranteed direct partner response within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: 'linear-gradient(180deg, rgba(226, 232, 240, 0.08) 0%, rgba(9, 9, 11, 0.9) 100%)',
                  border: '1px solid rgba(226, 232, 240, 0.25)',
                  borderRadius: '20px',
                  padding: '2rem'
                }}
              >
                <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Current Production Availability
                </span>
                <h3 style={{ fontSize: '1.3rem', marginTop: '0.5rem', marginBottom: '0.5rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  Accepting Q3 / Q4 Direct Engagements
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>
                  Average onboard timeline from initial brief alignment is 7 business days.
                </p>
              </div>
            </div>

            {/* Direct Form */}
            <div
              style={{
                background: 'linear-gradient(180deg, #121318 0%, #09090b 100%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '3rem',
                boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <CheckCircle2 size={64} color="#e2e8f0" style={{ margin: '0 auto 1.5rem auto' }} />
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                    Parameters Received
                  </h2>
                  <p style={{ color: '#a1a1aa', fontSize: '1.05rem' }}>
                    Our team will review your project requirements and reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                    Direct Project Submission
                  </h2>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Full Name</label>
                    <input type="text" required placeholder="Jordan Hayes" className="form-input" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }} />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Work Email</label>
                    <input type="email" required placeholder="jordan@brand.com" className="form-input" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }} />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Scope &amp; Requirements</label>
                    <textarea placeholder="Describe your vision, target launch date, and key capabilities required..." className="form-input" rows="5" required style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }} />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      background: '#e2e8f0',
                      color: '#09090b',
                      border: 'none',
                      padding: '0.9rem 1.5rem',
                      borderRadius: '24px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>Send Project Inquiry</span>
                    <ArrowUpRight size={20} />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
      <Footer onOpenInquiry={() => {}} />
    </div>
  );
}
