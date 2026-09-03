import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';

const projectTypes = ['Brand', 'Website', 'Product', 'Motion'];

const initialFormData = {
  name: '',
  email: '',
  service: 'Website',
  budget: '',
  details: '',
};

export default function InquiryModal({ isOpen, onClose }) {
  const firstFieldRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const lenis = window.lenis;
    document.body.style.overflow = 'hidden';
    lenis?.stop();

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 320);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '981806c7-87b7-42d7-894b-2bf20a957760';
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.details,
          subject: `New project inquiry from ${formData.name}`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Submission failed. Please try again.');
      }

      setSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Inquiry submission error:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="inquiry-overlay" onMouseDown={onClose}>
      <section
        className="inquiry-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <aside className="inquiry-illustration" aria-label="Creative messenger illustration">
          <img
            src="/contact-form-illustration.png"
            alt="An illustrated creative sending a golden paper airplane"
            decoding="async"
          />
        </aside>

        <div className="inquiry-form-panel" data-lenis-prevent>
          <button type="button" className="inquiry-close" onClick={onClose} aria-label="Close project form">
            <X size={19} strokeWidth={1.8} />
          </button>

          {submitted ? (
            <div className="inquiry-success" role="status">
              <span className="inquiry-success-icon"><CheckCircle2 size={28} /></span>
              <span className="inquiry-kicker">Signal received</span>
              <h2 id="inquiry-title">Thanks. We’ll be in touch.</h2>
              <p>
                Your project is officially on our radar. We’ll review the details
                and reply within two business days.
              </p>
              <button type="button" onClick={onClose}>Back to the studio</button>
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={handleSubmit}>
              <header className="inquiry-form-header">
                <span className="inquiry-kicker">Start a project</span>
                <span className="inquiry-progress">01 / 01</span>
                <h2 id="inquiry-title">Tell us what<br />you’re making.</h2>
                <p>A few details and we’ll take it from there.</p>
              </header>

              <div className="inquiry-field">
                <label htmlFor="inquiry-name">Name</label>
                <input
                  ref={firstFieldRef}
                  id="inquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(event) => updateField('name', event.target.value)}
                />
              </div>

              <div className="inquiry-field">
                <label htmlFor="inquiry-email">Email</label>
                <input
                  id="inquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(event) => updateField('email', event.target.value)}
                />
              </div>

              <fieldset className="inquiry-field inquiry-project-types">
                <legend>Project type</legend>
                <div className="inquiry-chip-row">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={formData.service === type ? 'is-selected' : ''}
                      aria-pressed={formData.service === type}
                      onClick={() => updateField('service', type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="inquiry-field inquiry-select-wrap">
                <label htmlFor="inquiry-budget">Budget</label>
                <select
                  id="inquiry-budget"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={(event) => updateField('budget', event.target.value)}
                >
                  <option value="" disabled>Select a range</option>
                  <option>$15,000 – $30,000</option>
                  <option>$30,000 – $60,000</option>
                  <option>$60,000 – $120,000</option>
                  <option>$120,000+</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div className="inquiry-field">
                <label htmlFor="inquiry-details">Tell us about it</label>
                <textarea
                  id="inquiry-details"
                  name="details"
                  rows="2"
                  required
                  value={formData.details}
                  onChange={(event) => updateField('details', event.target.value)}
                />
              </div>

              {submitError && <p className="inquiry-error" role="alert">{submitError}</p>}

              <button type="submit" className="inquiry-submit" disabled={submitting}>
                <span>{submitting ? 'Sending…' : 'Send the signal'}</span>
                <ArrowUpRight size={22} strokeWidth={1.8} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
