import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

export const defaultSpiralImages = [
  { id: 1, image: '/img1.jpg', title: 'SYNTHETIC HORIZON', category: 'WebGL / Spatial', client: 'VANTUM LABS' },
  { id: 2, image: '/img2.jpg', title: 'KINETIC MATRIX', category: 'Generative Tech', client: 'AURA INC' },
  { id: 3, image: '/img3.jpg', title: 'NEBULA AUDIO', category: 'Interactive Sound', client: 'SONIC STUDIOS' },
  { id: 4, image: '/img4.jpg', title: 'ECHOES OF TOMORROW', category: 'Brand Architecture', client: 'CHRONO' },
  { id: 5, image: '/img5.jpg', title: 'CYBERNETIC RHYTHM', category: 'CGI Art Direction', client: 'PULSE' },
  { id: 6, image: '/img6.jpg', title: 'QUANTUM VISION', category: '3D Simulation', client: 'NEXUS DIGITAL' },
  { id: 7, image: '/img7.jpg', title: 'AURA APPAREL', category: 'Luxury Motion', client: 'HAUTE MONDE' },
  { id: 8, image: '/img8.jpg', title: 'VANTUM CORE', category: 'Digital Reality', client: 'FORGE GRAPHICS' },
  { id: 9, image: '/img9.jpg', title: 'PULSE ARCHITECTURE', category: 'Living Catalogue', client: 'SCHEME ENGINE' },
  { id: 10, image: '/grid-new-1.png', title: 'STATION ZERO', category: 'Future Interface', client: 'ORBIT CORE' },
  { id: 11, image: '/grid-new-2.png', title: 'CHRONO DYNAMICS', category: 'Kinetic Canvas', client: 'TITAN LABS' },
  { id: 12, image: '/2.png', title: 'UNREAL ARCHIVE', category: 'Immersive System', client: 'VANTUM' },
  { id: 13, image: '/mobile-hero.png', title: 'HYPERDRIVE UI', category: 'Mobile Spatial', client: 'NEXUS' },
  { id: 14, image: '/hero-bg.webp', title: 'DARK MATTER', category: 'Particle Engine', client: 'AURA SOUND' },
  { id: 15, image: '/mask-1.webp', title: 'SPECTRUM FLOW', category: 'Shader Art', client: 'KINETIC REALITY' },
  { id: 16, image: '/mask-2.webp', title: 'LIVING METROPOLIS', category: 'CGI Environment', client: 'VANTUM CITIES' }
];

export default function SpiralGallery({ items = defaultSpiralImages, height = '70vh' }) {
  const containerRef = useRef(null);
  const animationProps = useRef({ progress: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.spiral-card');
      const totalCards = cards.length;
      if (totalCards === 0) return;

      const isMobile = window.innerWidth < 768;
      const radiusX = isMobile ? 160 : 360;
      const radiusZ = isMobile ? 160 : 320;
      const heightGap = isMobile ? 38 : 52;
      const waveCycles = 1.35;

      const updateSpiral = () => {
        const globalProgress = animationProps.current.progress;

        cards.forEach((card, i) => {
          let cardProgress = (i / totalCards + globalProgress) % 1;
          if (cardProgress < 0) cardProgress += 1;

          const angle = cardProgress * Math.PI * 2 * waveCycles;

          const x = Math.sin(angle) * radiusX;
          const z = Math.cos(angle) * radiusZ;
          const y = (cardProgress - 0.48) * totalCards * heightGap + 20;

          const rotationY = Math.sin(angle) * -32;
          const rotationZ = (cardProgress - 0.5) * -8;

          const baseScale = gsap.utils.mapRange(-radiusZ, radiusZ, 0.72, 1.12, z);

          gsap.set(card, {
            x: x,
            y: y,
            z: z,
            rotationY: rotationY,
            rotationZ: rotationZ,
            scale: baseScale,
            zIndex: Math.round(gsap.utils.mapRange(-radiusZ, radiusZ, 1, 100, z))
          });
        });
      };

      const autoPlayTween = gsap.to(animationProps.current, {
        progress: '+=1',
        duration: 38,
        ease: 'none',
        repeat: -1,
        onUpdate: updateSpiral
      });

      const observer = Observer.create({
        target: window,
        type: 'wheel,touch',
        onChangeY: (self) => {
          const currentScale = autoPlayTween.timeScale();
          const speedMultiplier = 0.012;
          const targetScale = currentScale + self.deltaY * speedMultiplier;

          gsap.to(autoPlayTween, {
            timeScale: targetScale,
            duration: 0.1,
            overwrite: 'auto',
            onComplete: () => {
              gsap.to(autoPlayTween, {
                timeScale: 1,
                duration: 1.5,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }
          });
        }
      });

      updateSpiral();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [items]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        userSelect: 'none',
        margin: '0.5rem 0'
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 'clamp(260px, 22vw, 340px)',
          height: 'clamp(170px, 15vw, 215px)',
          transformStyle: 'preserve-3d'
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="spiral-card"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.35), 0 0 0 1px rgba(15,15,15,0.12)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              backgroundColor: '#0f0f12',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
            />
            {/* Dark Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.2) 65%, transparent 100%)',
                padding: '1.1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#c4d600',
                  textTransform: 'uppercase',
                  marginBottom: '0.2rem'
                }}
              >
                {item.category}
              </div>
              <div
                style={{
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2
                }}
              >
                {item.title}
              </div>
              {item.client && (
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.65)',
                    marginTop: '0.15rem',
                    fontWeight: 500
                  }}
                >
                  {item.client}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
