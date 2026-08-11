import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Interactive 3D Web',
    budget: '$25,000 - $50,000',
    details: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle2 size={64} color="var(--accent-volt)" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Inquiry Received</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Thank you, {formData.name || 'Visionary'}. A partner from Vantum Studios will review your project parameters and contact you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span className="badge" style={{ marginBottom: '1rem' }}>Project Brief</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Initiate Agency Engagement</h2>

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '0' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Mercer"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '0' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Company / Brand</label>
                <input
                  type="text"
                  placeholder="Cybernetic Labs"
                  className="form-input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Primary Capability Needed</label>
                <select
                  className="form-input"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  style={{ background: '#1c1c20' }}
                >
                  <option>Interactive 3D Web</option>
                  <option>Generative Brand System</option>
                  <option>Kinetic Web Application</option>
                  <option>Full Digital Overhaul</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Estimated Investment Budget</label>
              <select
                className="form-input"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{ background: '#1c1c20' }}
              >
                <option>$15,000 - $30,000</option>
                <option>$30,000 - $60,000</option>
                <option>$60,000 - $120,000</option>
                <option>$120,000+</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Project Goals & Vision</label>
              <textarea
                placeholder="Tell us about your project objectives, timeline, or reference websites..."
                className="form-input"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-volt" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Submit Project Parameters</span>
              <ArrowUpRight size={20} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
