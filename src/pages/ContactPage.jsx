import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
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

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#bfd7ff', color: '#020b4d', minHeight: '100vh' }}>
      <div className="section-padding" style={{ backgroundColor: '#bfd7ff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            border: '1px solid #020b4d',
            backgroundColor: '#020b4d',
            color: '#bfd7ff',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}>
            Direct Line
          </div>

          <h1 style={{ marginBottom: '1.5rem', maxWidth: '900px', color: '#020b4d', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-heading)' }}>
            Initiate a Project Conversation
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#001db8', maxWidth: '750px', marginBottom: '4rem', lineHeight: '1.6', fontWeight: 500 }}>
            We accept a maximum of 4 major client engagements per quarter to guarantee uncompromised focus.
          </p>

          <div className="grid-2" style={{ gap: '3.5rem' }}>
            {/* Direct Contact Info */}
            <div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(0, 29, 184, 0.15)',
                  borderRadius: '20px',
                  padding: '3rem',
                  marginBottom: '2rem',
                  boxShadow: '0 12px 40px rgba(0, 29, 184, 0.08)'
                }}
              >
                <h3 style={{ marginBottom: '2rem', fontSize: '1.6rem', color: '#020b4d' }}>Studio Headquarters</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <MapPin size={24} color="#001db8" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#020b4d' }}>London (HQ)</h4>
                      <p style={{ color: '#001db8', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        140 Soho Square, Soho<br />London W1D 3QN, United Kingdom
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <Mail size={24} color="#001db8" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#020b4d' }}>Electronic Mail</h4>
                      <p style={{ color: '#001db8', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        New Inquiries: hello@vantumstudios.com<br />
                        Press & Media: press@vantumstudios.com
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <Phone size={24} color="#001db8" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#020b4d' }}>Direct Line</h4>
                      <p style={{ color: '#001db8', fontSize: '0.95rem' }}>
                        +44 (0) 20 7946 0912
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#020b4d',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 12px 30px rgba(0, 29, 184, 0.15)'
                }}
              >
                <span style={{ fontSize: '0.85rem', color: '#bfd7ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Current Q3 Slot Availability
                </span>
                <h4 style={{ fontSize: '1.3rem', marginTop: '0.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>
                  2 / 4 Production Slots Reserved
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#dbe7ff' }}>
                  Average onboard timeline from contract execution is 7 business days.
                </p>
              </div>
            </div>

            {/* Direct Form */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(0, 29, 184, 0.15)',
                borderRadius: '20px',
                padding: '3rem',
                boxShadow: '0 12px 40px rgba(0, 29, 184, 0.08)'
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <CheckCircle2 size={64} color="#001db8" style={{ margin: '0 auto 1.5rem auto' }} />
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#020b4d' }}>Parameters Received</h2>
                  <p style={{ color: '#001db8', fontSize: '1.05rem' }}>
                    Our executive partner team will review your inquiry and schedule an initial discovery call within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: '#020b4d' }}>Direct Project Submission</h3>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: '#001db8', fontWeight: 700 }}>Full Name</label>
                    <input type="text" required placeholder="Jordan Hayes" className="form-input" style={{ background: '#ffffff', color: '#020b4d', borderColor: 'rgba(0,29,184,0.2)' }} />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: '#001db8', fontWeight: 700 }}>Work Email</label>
                    <input type="email" required placeholder="jordan@brand.com" className="form-input" style={{ background: '#ffffff', color: '#020b4d', borderColor: 'rgba(0,29,184,0.2)' }} />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: '#001db8', fontWeight: 700 }}>Scope & Requirements</label>
                    <textarea placeholder="Describe your vision, target launch date, and key features..." className="form-input" rows="5" required style={{ background: '#ffffff', color: '#020b4d', borderColor: 'rgba(0,29,184,0.2)' }} />
                  </div>

                  <button
                    type="submit"
                    className="btn-volt"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      height: 'auto',
                      padding: '0.9rem 1.5rem',
                    }}
                  >
                    <span>Send Project Inquiry</span>
                    <ArrowUpRight size={18} />
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
