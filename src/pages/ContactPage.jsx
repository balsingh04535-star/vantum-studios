import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '8rem' }}>
      <div className="section-padding dark-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Direct Line</div>
          <h1 style={{ marginBottom: '1.5rem', maxWidth: '900px' }}>
            Initiate a Project Conversation
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '750px', marginBottom: '4rem' }}>
            We accept a maximum of 4 major client engagements per quarter to guarantee uncompromised focus.
          </p>

          <div className="grid-2" style={{ gap: '3.5rem' }}>
            {/* Direct Contact Info */}
            <div>
              <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '2rem', fontSize: '1.6rem' }}>Studio Headquarters</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <MapPin size={24} color="var(--accent-volt)" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>London (HQ)</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        140 Soho Square, Soho<br />London W1D 3QN, United Kingdom
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <Mail size={24} color="var(--accent-volt)" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Electronic Mail</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        New Inquiries: hello@vantumstudios.com<br />
                        Press & Media: press@vantumstudios.com
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <Phone size={24} color="var(--accent-volt)" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Direct Line</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        +44 (0) 20 7946 0912
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem', background: 'var(--accent-volt-glow)', borderColor: 'var(--border-highlight)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-volt)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Current Q3 Slot Availability
                </span>
                <h4 style={{ fontSize: '1.3rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  2 / 4 Production Slots Reserved
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Average onboard timeline from contract execution is 7 business days.
                </p>
              </div>
            </div>

            {/* Direct Form */}
            <div className="glass-card" style={{ padding: '3rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <CheckCircle2 size={64} color="var(--accent-volt)" style={{ margin: '0 auto 1.5rem auto' }} />
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Parameters Received</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                    Our executive partner team will review your inquiry and schedule an initial discovery call within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Direct Project Submission</h3>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Full Name</label>
                    <input type="text" required placeholder="Jordan Hayes" className="form-input" />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Work Email</label>
                    <input type="email" required placeholder="jordan@brand.com" className="form-input" />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Scope & Requirements</label>
                    <textarea placeholder="Describe your vision, target launch date, and key features..." className="form-input" rows="5" required />
                  </div>

                  <button type="submit" className="btn-volt" style={{ width: '100%', justifyContent: 'center' }}>
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
