import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Zap, Eye, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function StudioOverview() {
  const headingRef = useRef(null);

  const headlineText = "We design digital experiences that command awe, disrupt markets, and transform brands into cultural icons.";
  const words = headlineText.split(" ");

  const stats = [
    { label: 'Client Value Generated', value: '$480M+' },
    { label: 'AWAWDS & FWA Recognitions', value: '38x' },
    { label: 'Interactive Framerate Standard', value: '120 FPS' },
    { label: 'Global Launch Execution', value: '100%' },
  ];

  const highlights = [
    {
      icon: <Zap size={28} color="#0f0f0f" />,
      title: 'Real-time Kinetic Engineering',
      desc: 'We engineer WebGL, WebGPU, and GSAP scroll experiences designed to mesmerize audience attention and elevate brand perception.'
    },
    {
      icon: <Eye size={28} color="#0f0f0f" />,
      title: 'Art Directing the Unreal',
      desc: 'From generative 3D assets to high-fashion CGI imagery, we curate synthetic visuals that blur reality.'
    },
    {
      icon: <Globe size={28} color="#0f0f0f" />,
      title: 'Borderless Digital Products',
      desc: 'Clean architectural web systems engineered for global performance, instant response times, and bulletproof security.'
    }
  ];

  useEffect(() => {
    const wordElements = headingRef.current?.querySelectorAll('.studio-headline-word');
    if (!wordElements || wordElements.length === 0) return;

    const trigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: 'top 85%',
      end: 'bottom 45%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalWords = wordElements.length;

        wordElements.forEach((word, index) => {
          const wordProgress = index / totalWords;
          const nextWordProgress = (index + 1) / totalWords;

          let opacity = 0.15;
          if (progress >= nextWordProgress) {
            opacity = 1;
          } else if (progress >= wordProgress) {
            const fadeProgress = (progress - wordProgress) / (nextWordProgress - wordProgress);
            opacity = fadeProgress;
          }

          gsap.to(word, {
            opacity: opacity,
            duration: 0.1,
            overwrite: true,
          });
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="studio-section">
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
        <div className="badge" style={{ marginBottom: '1.5rem' }}>
          <SparklesIcon /> Studio Manifesto
        </div>

        {/* Word-by-Word Scroll Reveal Heading */}
        <h2 ref={headingRef} style={{ marginBottom: '2.5rem', maxWidth: '1000px', fontSize: 'clamp(2.2rem, 4vw, 4.5rem)', textTransform: 'uppercase', fontWeight: 300, color: '#0f0f0f' }}>
          {words.map((word, idx) => (
            <span key={idx} className="studio-headline-word">
              {word}
            </span>
          ))}
        </h2>

        <p style={{ fontSize: '1.25rem', maxWidth: '800px', marginBottom: '4rem', color: '#27272a' }}>
          Vantum Studios operates at the intersection of high-end design, generative graphics, and state-of-the-art web technology. We don’t build website templates; we craft living digital realities.
        </p>

        {/* Stats Row */}
        <div className="grid-3" style={{ marginBottom: '6rem' }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#0f0f0f', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ color: '#52525b', fontSize: '0.95rem', fontWeight: 600 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Studio Highlights */}
        <div className="grid-3">
          {highlights.map((h, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ marginBottom: '1.5rem' }}>{h.icon}</div>
              <h4 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#0f0f0f' }}>{h.title}</h4>
              <p style={{ fontSize: '0.95rem', color: '#52525b' }}>{h.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/about" className="btn-volt" style={{ backgroundColor: '#0f0f0f', color: '#ebf5df' }}>
            <span>Explore Studio Philosophy</span>
            <ArrowUpRight size={18} />
          </Link>
          <Link to="/work" className="btn-glass" style={{ borderColor: '#0f0f0f', color: '#0f0f0f' }}>
            <span>View Featured Cases</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SparklesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}
