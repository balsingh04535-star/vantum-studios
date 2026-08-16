import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send, PhoneCall } from 'lucide-react';

export default function Footer({ onOpenInquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('DESIGN/WORK');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const categories = ['SENIOR ROLE', 'CONTRACT', 'DESIGN/WORK', 'OTHER'];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@madebychanan.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || '981806c7-87b7-42d7-894b-2bf20a957760';
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          category: selectedCategory,
          message: note,
          subject: `⚡ New Agency Inquiry from ${name} [${selectedCategory}]`
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setNote('');
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        setSubmitError(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="breedlove-footer-root">
      
      {/* ── Top Ticker Status Bar ── */}
      <div className="breedlove-ticker-bar">
        <span>CURRENTLY REMOTE-FIRST</span>
        <span className="dot">·</span>
        <span>51.5074° N, 0.1278° W</span>
        <span className="dot">·</span>
        <span>2026 ACCEPTING INQUIRIES</span>
        <span className="dot">·</span>
        <span>OPEN: HIGH-END WEBGL & BRAND SYSTEMS</span>
        <span className="dot">·</span>
        <span>TECH-LEAD DESIGN PRACTICE</span>
      </div>

      {/* ── Main Centered Floating Container Card ── */}
      <div className="breedlove-container-card">
        
        {/* Header Tags */}
        <div className="card-top-meta">
          <span className="meta-left">05 / CONTACT & AVAILABILITY</span>
          <span className="meta-right">VOL. 06 / '26</span>
        </div>

        {/* Main Headline */}
        <h2 className="breedlove-headline">
          Let's build <br />
          <span className="headline-serif-italic">something good.</span>
        </h2>

        {/* Subtitle Paragraph */}
        <p className="breedlove-subtext">
          Open to high-impact web design, WebGL, & tech-lead projects where craft and ownership matter. Available for global or remote-first engagements in 2026. Reply within 24h.
        </p>

        {/* ── Single Interactive Inquiry Card ── */}
        <div className="breedlove-grid">
          
          {/* § SEND A NOTE */}
          <div className="breedlove-inner-card">
            <div className="inner-card-header">
              <span className="inner-title">§ SEND A NOTE</span>
              <span className="inner-sub">DIRECT SUBMISSION</span>
            </div>

            {/* Category Pills */}
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`pill-btn ${selectedCategory === cat ? 'is-selected' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="breedlove-form">
              <div className="form-row-2">
                <div className="input-group">
                  <label>NAME</label>
                  <input
                    type="text"
                    placeholder="Your name or company..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    placeholder="your@email.com..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>NOTE</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the role, team, and what vision you want us leading..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
              </div>

              {submitError && (
                <div style={{ fontSize: '0.8rem', color: '#ff4d4d', fontFamily: 'monospace', margin: '0.2rem 0' }}>
                  {submitError}
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="form-actions">
                <button type="submit" disabled={isSubmitting} className="action-btn btn-dark" style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                  <span>{isSubmitting ? 'SENDING...' : isSubmitted ? 'SENT TO INBOX!' : 'SEND MESSAGE'}</span>
                  {isSubmitted ? <Check size={14} /> : <Send size={14} />}
                </button>

                <button type="button" onClick={onOpenInquiry} className="action-btn btn-light">
                  <span>BOOK A CALL</span>
                  <ArrowUpRight size={14} />
                </button>

                <button type="button" onClick={handleCopyEmail} className="action-btn btn-light">
                  <span>{isCopied ? 'COPIED!' : 'COPY EMAIL'}</span>
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* ── Giant Full-Bleed Brand Signature Hero SVG Logo at Very Bottom (4X Scale) ── */}
      <div className="breedlove-giant-brand">
        <img
          src="/hero-logo.svg"
          alt="Chanan"
          style={{
            width: '100vw',
            maxWidth: 'none',
            height: 'auto',
            maxHeight: '85vh',
            objectFit: 'contain',
            transform: 'scale(1.35)',
            transformOrigin: 'center center',
            filter: 'brightness(0) invert(1) drop-shadow(0 10px 40px rgba(255,255,255,0.12))'
          }}
        />
      </div>

      {/* ── 1:1 Royal Blue & Ice Periwinkle Luxury Editorial Styling ── */}
      <style>{`
        .breedlove-footer-root {
          position: relative;
          width: 100%;
          background-color: #bfd7ff;
          color: #020b4d;
          padding: 4rem 1.5rem 2rem 1.5rem;
          box-sizing: border-box;
          font-family: var(--font-main, "Plus Jakarta Sans", sans-serif);
          overflow: hidden;
        }

        /* Top Ticker Status Bar */
        .breedlove-ticker-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          flex-wrap: wrap;
          font-family: monospace, sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #001db8;
          margin-bottom: 2.5rem;
          text-align: center;
          font-weight: 700;
        }
        .breedlove-ticker-bar .dot {
          color: rgba(0, 29, 184, 0.4);
        }

        /* Main Container Card */
        .breedlove-container-card {
          max-width: 1180px;
          margin: 0 auto;
          background: #020b4d;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 28px;
          padding: 3.5rem 3.5rem 3rem 3.5rem;
          box-shadow: 0 24px 60px rgba(0, 29, 184, 0.25);
          box-sizing: border-box;
        }

        .card-top-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: monospace, sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          color: #bfd7ff;
          margin-bottom: 2rem;
          text-transform: uppercase;
        }

        .breedlove-headline {
          font-family: var(--font-heading, "Outfit", sans-serif);
          font-size: clamp(2.8rem, 5.5vw, 5.2rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: 1.5rem;
        }

        .headline-serif-italic {
          font-family: var(--font-luxury-slim, "Cormorant Garamond", serif);
          font-style: italic;
          font-weight: 400;
          color: #fff8ed;
        }

        .breedlove-subtext {
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          color: #dbe7ff;
          max-width: 780px;
          line-height: 1.6;
          margin-bottom: 3.5rem;
        }

        /* Single Column Inquiry Grid */
        .breedlove-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: stretch;
        }

        .breedlove-inner-card {
          background: #001db8;
          border: 1px solid rgba(191, 215, 255, 0.25);
          border-radius: 20px;
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .inner-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: monospace, sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          color: #bfd7ff;
          margin-bottom: 1.8rem;
          text-transform: uppercase;
        }
        .inner-title {
          font-weight: 700;
          color: #ffffff;
        }

        /* Category Pills */
        .category-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.8rem;
        }

        .pill-btn {
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(191, 215, 255, 0.3);
          background: rgba(255, 255, 255, 0.08);
          color: #bfd7ff;
          font-family: monospace, sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pill-btn:hover {
          background: rgba(191, 215, 255, 0.2);
          color: #ffffff;
        }

        .pill-btn.is-selected {
          background: #bfd7ff;
          color: #020b4d;
          border-color: #bfd7ff;
        }

        /* Form Inputs */
        .breedlove-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          flex: 1;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-family: monospace, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          color: #bfd7ff;
          font-weight: 700;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid rgba(191, 215, 255, 0.25);
          background: rgba(255, 255, 255, 0.07);
          font-family: var(--font-main, sans-serif);
          font-size: 0.9rem;
          color: #ffffff;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          box-sizing: border-box;
        }

        .input-group input::placeholder,
        .input-group textarea::placeholder {
          color: rgba(191, 215, 255, 0.45);
        }

        .input-group input:focus,
        .input-group textarea:focus {
          border-color: #bfd7ff;
          background: rgba(255, 255, 255, 0.12);
        }

        .form-actions {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1.15rem;
          border-radius: 999px;
          font-family: monospace, sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-dark {
          background: #bfd7ff;
          color: #020b4d;
          border: 1px solid #bfd7ff;
        }

        .btn-dark:hover {
          background: #ffffff;
          border-color: #ffffff;
        }

        .btn-light {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(191, 215, 255, 0.25);
        }

        .btn-light:hover {
          background: rgba(191, 215, 255, 0.2);
          border-color: rgba(191, 215, 255, 0.45);
        }

        /* Correspondence Column */
        .correspondence-list {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          margin-top: 0.5rem;
        }

        .channel-row {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding-bottom: 1.1rem;
          border-bottom: 1px solid rgba(191, 215, 255, 0.12);
        }

        .channel-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .channel-label {
          font-family: monospace, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          color: #bfd7ff;
          font-weight: 700;
        }

        .channel-value {
          font-size: 0.95rem;
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .channel-value:hover {
          color: #bfd7ff;
        }

        .email-val {
          font-weight: 600;
        }

        .status-val {
          color: #bfd7ff;
          font-weight: 600;
        }

        /* Giant Signature Title at Very Bottom (4X Scale) */
        .breedlove-giant-brand {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 6rem;
          margin-bottom: 2rem;
          overflow: hidden;
          padding: 3rem 0;
          user-select: none;
          box-sizing: border-box;
        }

        @media (max-width: 968px) {
          .breedlove-footer-root {
            padding: 2.5rem 1rem 1.5rem 1rem;
          }
          .breedlove-container-card {
            padding: 2rem 1.25rem;
            border-radius: 20px;
          }
          .card-top-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.4rem;
            margin-bottom: 1.5rem;
          }
          .breedlove-headline {
            font-size: clamp(2.2rem, 8vw, 3.2rem);
          }
          .breedlove-subtext {
            margin-bottom: 2rem;
            font-size: 0.98rem;
          }
          .breedlove-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .breedlove-inner-card {
            padding: 1.4rem;
            border-radius: 16px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }
          .category-pills {
            gap: 0.4rem;
            margin-bottom: 1.2rem;
          }
          .pill-btn {
            font-size: 0.62rem;
            padding: 0.35rem 0.65rem;
          }
          .form-actions {
            flex-direction: column;
            width: 100%;
          }
          .action-btn {
            width: 100%;
            justify-content: center;
          }
          .channel-row {
            word-break: break-word;
          }
          .channel-value {
            font-size: 0.85rem;
          }
          .breedlove-giant-brand {
            margin-top: 3rem;
            margin-bottom: 1rem;
            padding: 1rem 0;
          }
          .breedlove-giant-brand img {
            width: 100% !important;
            maxWidth: 100% !important;
            transform: scale(1.0) !important;
            maxHeight: 220px !important;
          }
        }
      `}</style>
    </footer>
  );
}
