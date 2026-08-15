/**
 * Centralized Projects Dataset for Chanan Portfolio & Case Studies
 * Official brand: Chanan (https://www.madebychanan.com)
 */

export const projects = [
  {
    id: 'voltlites',
    slug: 'voltlites',
    title: 'Voltlites — Spatial Audio Platform',
    client: 'Voltlites Audio Inc.',
    industry: 'Audio Engineering & Spatial Computing',
    services: ['Web Design', 'WebGL Architecture', 'Generative Shaders', 'Creative Development'],
    year: '2026',
    image: '/img1.jpg',
    category: '3D Web',
    rotation: -12,
    metric: '+340% User Engagement',
    summary: 'Interactive WebGL spatial audio interface featuring real-time parametric waveform visualization and spatial acoustics.',
    seo: {
      title: 'Voltlites — Spatial Audio & WebGL Case Study | Chanan',
      description: 'Case study of the Voltlites spatial audio web platform engineered by Chanan. Custom GLSL shaders, real-time waveform visualization, and 3D acoustics.',
      canonicalUrl: 'https://www.madebychanan.com/work/voltlites',
      ogImage: 'https://www.madebychanan.com/img1.jpg',
    },
    intro: 'Voltlites required a premier digital flagship to demonstrate their proprietary spatial acoustics engine. We designed an interactive, GPU-accelerated spatial waveform environment that lets users experience multi-channel audio spatialization in real time directly within the browser.',
    challenge: 'Translating complex acoustic physics and multi-channel audio mathematics into an intuitive, lightweight web interface without sacrificing rendering performance on mobile devices.',
    creativeDirection: 'A dark, high-contrast visual architecture inspired by acoustic anechoic chambers, neon waveform telemetry, and minimalist Swiss typography.',
    designApproach: 'We created an immersive spatial viewport anchored by minimalist HUD telemetry. Custom shader uniforms respond dynamically to audio frequency spectra, providing instant visual feedback for user interactions.',
    technicalApproach: 'Built using Three.js and custom GLSL vertex and fragment shaders. We engineered a Web Audio API pipeline with sub-10ms audio-visual synchronization, running locked at 120 FPS across modern desktop and mobile GPUs.',
    outcome: 'Voltlites achieved over 340% higher session duration, universal acclaim across the creative development community, and secured key enterprise audio partnerships within 60 days of launch.',
    deliverables: [
      'Creative Direction & UI/UX',
      'Custom GLSL Shader Pipelines',
      'Three.js Spatial Viewport',
      'Web Audio API Integration',
      'Responsive Web Architecture'
    ],
    gallery: ['/img1.jpg', '/img2.jpg', '/grid-photos/grid1.png'],
    relatedServices: [
      { name: 'Web Design', path: '/web-design' },
      { name: 'Web Development', path: '/web-development' },
      { name: '3D Product Animation', path: '/3d-product-animation' }
    ]
  },
  {
    id: 'chronos',
    slug: 'chronos',
    title: 'Chronos — Cybernetic Horology Flagship',
    client: 'Chronos Luxury',
    industry: 'Haute Horlogerie & Luxury Goods',
    services: ['Brand Identity', '3D Product Animation', 'Web Development', 'E-Commerce'],
    year: '2026',
    image: '/img4.jpg',
    category: 'Brand Systems',
    rotation: 6,
    metric: '$18.4M Launch Volume',
    summary: 'High-fashion digital flagship store for next-generation timepiece collectors featuring real-time 3D watch customization.',
    seo: {
      title: 'Chronos — Luxury Horology Flagship Case Study | Chanan',
      description: 'Discover how Chanan engineered the Chronos cybernetic timepiece digital flagship with real-time 3D watch configurator and brand design systems.',
      canonicalUrl: 'https://www.madebychanan.com/work/chronos',
      ogImage: 'https://www.madebychanan.com/img4.jpg',
    },
    intro: 'Chronos bridges centuries-old Swiss watchmaking heritage with futuristic cybernetic aesthetics. Chanan was commissioned to build a digital flagship that reflects this juxtaposition through high-craft 3D product visualization and frictionless e-commerce architecture.',
    challenge: 'Rendering hyper-realistic horological materials—such as brushed titanium, sapphire crystal reflections, and exposed mechanical tourbillons—in an interactive 3D configurator with sub-second load times.',
    creativeDirection: 'Monochrome minimalism meets cinematic lighting. Bold editorial serif typography paired with precision macro photography and physical material simulation.',
    designApproach: 'Every product page operates as an interactive virtual boutique. Collectors can inspect microscopic horological complications, customize strap materials, and view photorealistic lighting angles.',
    technicalApproach: 'Leveraged physically-based rendering (PBR) workflows with compressed glTF Draco meshes and custom environmental reflection maps, integrated into a headless Shopify checkout engine.',
    outcome: 'Chronos generated $18.4M in launch-week pre-orders, completely selling out the initial production run of their flagship timepiece within 48 hours.',
    deliverables: [
      'Digital Brand Identity',
      'Interactive 3D Product Configurator',
      'Headless E-Commerce System',
      'Physically-Based Shader Assets',
      'Mobile-Optimized PBR Pipeline'
    ],
    gallery: ['/img4.jpg', '/img5.jpg', '/grid-photos/grid4.png'],
    relatedServices: [
      { name: 'Branding', path: '/branding' },
      { name: '3D Product Animation', path: '/3d-product-animation' },
      { name: 'Web Design', path: '/web-design' }
    ]
  },
  {
    id: 'aether',
    slug: 'aether',
    title: 'Aether — Neural Compute Studio',
    client: 'Aether Labs',
    industry: 'Artificial Intelligence & Cloud Computing',
    services: ['Web Design', 'Kinetic UI', 'Web Development', 'Design Systems'],
    year: '2025',
    image: '/img5.jpg',
    category: 'Kinetic Apps',
    rotation: -4,
    metric: 'Sub-16ms GPU Telemetry',
    summary: 'High-speed AI model training dashboard featuring GPU-accelerated canvas charts and real-time telemetry.',
    seo: {
      title: 'Aether — Neural Compute Dashboard Case Study | Chanan',
      description: 'Read the Aether Labs case study by Chanan. Real-time AI compute telemetry, GPU canvas architecture, and kinetic UI design.',
      canonicalUrl: 'https://www.madebychanan.com/work/aether',
      ogImage: 'https://www.madebychanan.com/img5.jpg',
    },
    intro: 'Aether Labs develops distributed neural infrastructure for AI model training clusters. They partnered with Chanan to architect a next-generation control panel and real-time GPU cluster visualization system.',
    challenge: 'Streaming tens of thousands of real-time telemetry data points per second without causing browser UI thread lockups or visual stuttering.',
    creativeDirection: 'A dark cybernetic dashboard aesthetic utilizing monospace data grids, subtle luminescence, and reactive kinetic micro-interactions.',
    designApproach: 'We restructured the information architecture around operational clarity, giving machine learning engineers instant multi-cluster visibility with zero cognitive clutter.',
    technicalApproach: 'Implemented an off-screen WebGL 2D canvas pipeline driven by Web Workers and binary WebSocket streams to render 60,000+ data nodes seamlessly at sub-16ms render times.',
    outcome: 'Adopted by top AI research teams across North America and Europe, reducing cluster diagnostic times by over 40%.',
    deliverables: [
      'Comprehensive Design System',
      'High-Density Telemetry UI',
      'Offscreen Canvas Engine',
      'WebSocket Realtime Protocol',
      'Dark Mode Architecture'
    ],
    gallery: ['/img5.jpg', '/img6.jpg', '/grid-photos/grid3.png'],
    relatedServices: [
      { name: 'Web Development', path: '/web-development' },
      { name: 'Web Design', path: '/web-design' },
      { name: 'Motion Design', path: '/motion-design' }
    ]
  },
  {
    id: 'hyperion',
    slug: 'hyperion',
    title: 'Hyperion — Autonomous Racing Telemetry',
    client: 'Hyperion Dynamic',
    industry: 'Motorsport & Electric Vehicles',
    services: ['3D Web', 'Creative Development', 'Motion Design', 'Sound Design'],
    year: '2025',
    image: '/img8.jpg',
    category: '3D Web',
    rotation: 10,
    metric: 'FWA Site of the Day',
    summary: 'Immersive 3D telemetry experience for electric hypercar telemetry stream and aerodynamic simulation.',
    seo: {
      title: 'Hyperion — Autonomous Racing Telemetry Case Study | Chanan',
      description: 'Explore Chanan’s case study on Hyperion Dynamic: an immersive 3D telemetry experience and aerodynamic vehicle simulator for electric hypercars.',
      canonicalUrl: 'https://www.madebychanan.com/work/hyperion',
      ogImage: 'https://www.madebychanan.com/img8.jpg',
    },
    intro: 'Hyperion Dynamic pioneers autonomous electric racing technologies. Chanan created an interactive browser simulation of their flagship hypercar track runs, combining live sensor streams with real-time aerodynamic airflow physics.',
    challenge: 'Simulating complex computational fluid dynamics (CFD) particle vectors in real time in WebGL while maintaining cross-device compatibility.',
    creativeDirection: 'High-octane telemetry aesthetic inspired by Formula 1 mission control, carbon-fiber textures, and precision laser instrumentation.',
    designApproach: 'Interactive 3D cockpit and track views allow viewers to inspect velocity vectors, G-force telemetry, and battery thermal dynamics in 360 degrees.',
    technicalApproach: 'Built with Three.js custom particle systems and WebGL instanced meshes, synchronised with spatial audio effects and GSAP camera trajectories.',
    outcome: 'Awarded FWA Site of the Day and featured as an industry benchmark in interactive 3D web engineering.',
    deliverables: [
      '3D Vehicle & Track Simulation',
      'Aerodynamic Particle Shaders',
      'Spatial Sound Design Pipeline',
      'Custom Telemetry Visualizer',
      'Motion Choreography'
    ],
    gallery: ['/img8.jpg', '/img9.jpg', '/grid-photos/grid2.png'],
    relatedServices: [
      { name: '3D Product Animation', path: '/3d-product-animation' },
      { name: 'Motion Design', path: '/motion-design' },
      { name: 'Web Development', path: '/web-development' }
    ]
  },
  {
    id: 'nebulus',
    slug: 'nebulus',
    title: 'Nebulus — Orbital Satellite System',
    client: 'Nebulus Aerospace',
    industry: 'Aerospace & Geospatial Analytics',
    services: ['Web Design', 'WebGL 3D Earth Engine', 'Kinetic UI', 'Web Development'],
    year: '2025',
    image: '/img3.jpg',
    category: 'Kinetic Apps',
    rotation: -8,
    metric: 'Awwwards Studio Winner',
    summary: 'Interactive 3D constellation planner with live trajectory computation and geospatial visualizer.',
    seo: {
      title: 'Nebulus — Orbital Satellite System Case Study | Chanan',
      description: 'Chanan’s case study on Nebulus Aerospace. 3D orbital constellation visualization, interactive globe physics, and mission planning interface.',
      canonicalUrl: 'https://www.madebychanan.com/work/nebulus',
      ogImage: 'https://www.madebychanan.com/img3.jpg',
    },
    intro: 'Nebulus Aerospace operates high-altitude Earth observation constellations. Chanan designed and developed their public-facing mission console and interactive satellite tracker.',
    challenge: 'Visualizing hundreds of orbiting satellites with accurate Keplerian orbital parameters on an interactive WebGL globe with minimal CPU overhead.',
    creativeDirection: 'Cosmic deep space minimalism, high-fidelity planetary textures, and precise telemetry typography.',
    designApproach: 'Engineered an intuitive mission flight planner that allows users to toggle sensor coverage, track satellite passes over target regions, and schedule payload capture windows.',
    technicalApproach: 'Utilized custom spherical shader projections and GPU compute shaders to calculate satellite orbit positions client-side with millisecond accuracy.',
    outcome: 'Won Awwwards Studio recognition and positioned Nebulus as the technological vanguard in commercial space analytics.',
    deliverables: [
      'Interactive 3D Globe Engine',
      'Orbital Trajectory Math Module',
      'Mission Control UI & HUD',
      'Responsive WebGL Architecture',
      'Performance Optimization'
    ],
    gallery: ['/img3.jpg', '/img7.jpg', '/grid-photos/grid5.png'],
    relatedServices: [
      { name: 'Web Design', path: '/web-design' },
      { name: 'Web Development', path: '/web-development' },
      { name: '3D Product Animation', path: '/3d-product-animation' }
    ]
  },
  {
    id: 'solaris',
    slug: 'solaris',
    title: 'Solaris — High Optics Lab',
    client: 'Solaris Design',
    industry: 'Optical Physics & Advanced Hardware',
    services: ['Brand Identity', 'Creative Direction', 'Motion Design', 'Web Design'],
    year: '2024',
    image: '/img7.jpg',
    category: 'Brand Systems',
    rotation: 5,
    metric: '+180% Organic Inquiries',
    summary: 'Generative brand identity system and spatial web showcase for an advanced optical physics studio.',
    seo: {
      title: 'Solaris — High Optics Lab Brand & Web Case Study | Chanan',
      description: 'Brand identity, generative art direction, and spatial web showcase engineered by Chanan for Solaris High Optics Lab.',
      canonicalUrl: 'https://www.madebychanan.com/work/solaris',
      ogImage: 'https://www.madebychanan.com/img7.jpg',
    },
    intro: 'Solaris produces next-generation prism optics and laser dispersion systems. Chanan engineered an identity system that reacts to light, refraction, and chromatic dispersion.',
    challenge: 'Capturing the ethereal physics of light refraction in digital media without resorting to static cliché photography.',
    creativeDirection: 'Prismatic chromatic dispersion, stark architectural typography, and generative light-beam geometries.',
    designApproach: 'Constructed an adaptive branding system where the logo and layout elements shift chromatic dispersion based on user scroll velocity and ambient cursor positioning.',
    technicalApproach: 'Built on custom WebGL refractive shaders and GSAP ScrollTrigger timelines for fluid, organic light bending.',
    outcome: 'Solaris experienced a 180% surge in qualified enterprise research inquiries within three months post-rebrand.',
    deliverables: [
      'Generative Brand Identity System',
      'Custom Typography & Vector Standards',
      'Refractive WebGL Showcase',
      'Art Direction & Motion Guidelines',
      'Full Responsive Deployment'
    ],
    gallery: ['/img7.jpg', '/img8.jpg', '/grid-photos/grid6.png'],
    relatedServices: [
      { name: 'Branding', path: '/branding' },
      { name: 'Motion Design', path: '/motion-design' },
      { name: 'Web Design', path: '/web-design' }
    ]
  },
  {
    id: 'luxeforma',
    slug: 'luxeforma',
    title: 'Luxeforma — Spatial Brand System',
    client: 'Luxeforma Identity',
    industry: 'Luxury Architecture & Spatial Design',
    services: ['Brand Identity', 'Creative Direction', '3D Motion', 'Web Design'],
    year: '2025',
    image: '/work/work1.jpg',
    category: 'Brand Systems',
    rotation: -2,
    metric: 'Global Design Recognition',
    summary: 'Architectural brand direction and digital flagship experience for a high-luxury Italian design house.',
    seo: {
      title: 'Luxeforma — Spatial Brand System Case Study | Chanan',
      description: 'Discover how Chanan crafted the digital flagship and architectural brand system for Luxeforma Italian design house.',
      canonicalUrl: 'https://www.madebychanan.com/work/luxeforma',
      ogImage: 'https://www.madebychanan.com/work/work1.jpg',
    },
    intro: 'Luxeforma creates bespoke architectural spaces and luxury furniture in Milan. Chanan crafted an editorial digital experience that mirrors their uncompromising attention to tactile texture, space, and form.',
    challenge: 'Translating physical material richness—monolithic marble, brushed brass, and raw linen—into a digital screen experience that feels tangible and weighty.',
    creativeDirection: 'Editorial high-fashion layout with generous whitespace, monumental serif typography, and tactile photography.',
    designApproach: 'Structured around fluid spatial transitions, oversized typographic hierarchies, and micro-smooth inertia scrolling.',
    technicalApproach: 'Implemented Lenis smooth inertia scrolling and GSAP morph transitions with strict asset optimization for instant image decoding.',
    outcome: 'Elevated Luxeforma into premier luxury markets across Europe, the Middle East, and Asia.',
    deliverables: [
      'Spatial Brand Identity',
      'Editorial Web Experience',
      '3D Architectural Visualization',
      'Motion Design & Transitions',
      'Full Digital Style Guide'
    ],
    gallery: ['/work/work1.jpg', '/work/work2.jpg', '/grid-photos/grid7.png'],
    relatedServices: [
      { name: 'Branding', path: '/branding' },
      { name: 'Web Design', path: '/web-design' },
      { name: 'Motion Design', path: '/motion-design' }
    ]
  }
];

export const getProjectBySlug = (slug) => {
  return projects.find((p) => p.slug === slug || p.id === slug);
};
