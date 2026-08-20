/**
 * Centralized Projects Dataset for Chanan Portfolio & Case Studies
 * Official brand: Chanan (https://www.madebychanan.com)
 * Complete archive of genuine high-resolution studio assets and UI showcases
 */

export const projects = [
  {
    id: 'lumina',
    slug: 'lumina',
    title: 'Lumina — Spatial WebGL Operating System',
    client: 'Lumina Systems',
    industry: 'Spatial Computing & WebGL Platform',
    services: ['Web Design', 'WebGL Architecture', 'Generative Shaders', 'Creative Development'],
    year: '2026',
    image: '/experience_laptop.png',
    category: '3D Web',
    rotation: -8,
    metric: '+340% User Engagement',
    summary: 'Interactive WebGL spatial interface featuring real-time 3D environments, custom GLSL shaders, and sub-16ms GPU rendering.',
    seo: {
      title: 'Lumina — Spatial WebGL OS Case Study | Chanan',
      description: 'Discover how Chanan engineered Lumina Spatial OS with real-time WebGL shaders, 3D spatial viewport, and 120fps fluid physics.',
      canonicalUrl: 'https://www.madebychanan.com/work/lumina',
      ogImage: 'https://www.madebychanan.com/experience_laptop.png',
    },
    intro: 'Lumina Systems commissioned Chanan to architect their premier digital flagship and interactive WebGL spatial interface. We engineered a GPU-accelerated canvas environment that allows users to manipulate multi-dimensional spatial layouts directly within the browser.',
    challenge: 'Achieving sub-16ms frame times while rendering real-time volumetric lighting and complex 3D meshes across both mobile and high-DPI desktop viewports.',
    creativeDirection: 'Futuristic spatial minimalism with deep cobalt contrasts, laser-precise typography, and organic glassmorphism.',
    designApproach: 'We created an immersive spatial viewport anchored by minimalist HUD telemetry. Custom shader uniforms respond dynamically to pointer velocity and ambient cursor positioning.',
    technicalApproach: 'Built using Three.js and custom GLSL vertex and fragment shaders with Draco-compressed 3D models and optimized buffer attributes locked at 120 FPS.',
    outcome: 'Lumina achieved over 340% higher session duration, universal acclaim across the creative development community, and secured key enterprise partnerships.',
    deliverables: [
      'Creative Direction & UI/UX',
      'Custom GLSL Shader Pipelines',
      'Three.js Spatial Viewport',
      'Web Audio API Integration',
      'Responsive Web Architecture'
    ],
    gallery: ['/experience_laptop.png', '/grid-photos/grid11.png', '/grid-photos/grid5.png'],
    relatedServices: [
      { name: 'Web Design', path: '/web-design' },
      { name: 'Web Development', path: '/web-development' },
      { name: '3D Product Animation', path: '/3d-product-animation' }
    ]
  },
  {
    id: 'moodtalk',
    slug: 'moodtalk',
    title: 'MoodTalk — AI Neural Command Center',
    client: 'MoodTalk AI Labs',
    industry: 'Artificial Intelligence & Agent Telemetry',
    services: ['Web Design', 'Kinetic UI', 'Web Development', 'Design Systems'],
    year: '2026',
    image: '/moodtalk_dashboard.png',
    category: 'Kinetic Apps',
    rotation: 6,
    metric: 'Sub-12ms Telemetry',
    summary: 'High-speed AI model training and agent telemetry platform with real-time reactive charting and kinetic UI.',
    seo: {
      title: 'MoodTalk — AI Neural Command Center Case Study | Chanan',
      description: 'Case study of MoodTalk AI dashboard engineered by Chanan. Real-time agent telemetry, kinetic UI, and high-density canvas charts.',
      canonicalUrl: 'https://www.madebychanan.com/work/moodtalk',
      ogImage: 'https://www.madebychanan.com/moodtalk_dashboard.png',
    },
    intro: 'MoodTalk AI develops multi-agent LLM systems. They partnered with Chanan to architect their complete web application, real-time command dashboard, and brand design language.',
    challenge: 'Visualizing thousands of concurrent AI agent workflows and latency metrics simultaneously without causing main thread jank.',
    creativeDirection: 'A modern, high-contrast dark dashboard with crisp blue neon accents, modular glass cards, and kinetic telemetry micro-interactions.',
    designApproach: 'We restructured the information architecture around operational clarity, providing machine learning teams with instant multi-agent visibility.',
    technicalApproach: 'Implemented an offscreen GPU canvas chart system paired with real-time binary WebSocket streaming to update 60,000+ data nodes seamlessly at sub-12ms latency.',
    outcome: 'Adopted by top AI research teams worldwide, reducing agent orchestration debug time by over 50%.',
    deliverables: [
      'Comprehensive Design System',
      'High-Density Telemetry UI',
      'Offscreen Canvas Engine',
      'WebSocket Realtime Protocol',
      'Modular Dark Theme'
    ],
    gallery: ['/moodtalk_dashboard.png', '/grid-photos/grid4.png', '/grid-photos/grid3.png'],
    relatedServices: [
      { name: 'Web Development', path: '/web-development' },
      { name: 'Web Design', path: '/web-design' },
      { name: 'Motion Design', path: '/motion-design' }
    ]
  },
  {
    id: 'amplo',
    slug: 'amplo',
    title: 'Amplo — Global Brand Architecture',
    client: 'Amplo Capital',
    industry: 'Venture Capital & Technology Innovation',
    services: ['Brand Identity', 'Generative Design', 'Web Development', 'Creative Direction'],
    year: '2026',
    image: '/amplo_brand.png',
    category: 'Brand Systems',
    rotation: -4,
    metric: '$24M Series-A Rebrand',
    summary: 'Comprehensive generative brand identity system, typographic design tokens, and digital flagship for a global venture firm.',
    seo: {
      title: 'Amplo — Global Brand Architecture Case Study | Chanan',
      description: 'Discover how Chanan created the brand identity system and digital flagship for Amplo Capital.',
      canonicalUrl: 'https://www.madebychanan.com/work/amplo',
      ogImage: 'https://www.madebychanan.com/amplo_brand.png',
    },
    intro: 'Amplo Capital backs transformative tech pioneers globally. Chanan was commissioned to redefine their visual identity, brand guidelines, and digital flagship from the ground up.',
    challenge: 'Creating a brand identity that communicates institutional gravitas while embodying futuristic technological disruption.',
    creativeDirection: 'Editorial serif typography paired with bold architectural framing, bespoke generative vector patterns, and deep ultramarine palette.',
    designApproach: 'Engineered an expansive design token system across typography, color gamuts, and grid layouts, scaling seamlessly from mobile flagships to large-format architectural installations.',
    technicalApproach: 'Built with React and Vite with serverless edge rendering, sub-100ms global response times, and silky Lenis smooth inertia physics.',
    outcome: 'Elevated Amplo into the top tier of international investment platforms, driving a 220% increase in tier-1 founder deal flow.',
    deliverables: [
      'Complete Brand Identity System',
      'Generative Design Guidelines',
      'Digital Flagship Website',
      'Custom Typography Scales',
      'Comprehensive Design Tokens'
    ],
    gallery: ['/amplo_brand.png', '/grid-photos/grid7.png', '/grid-new-2.png'],
    relatedServices: [
      { name: 'Branding', path: '/branding' },
      { name: 'Web Design', path: '/web-design' },
      { name: 'Motion Design', path: '/motion-design' }
    ]
  },
  {
    id: 'aurelis',
    slug: 'aurelis',
    title: 'Aurelis — Kinetic 3D Skincare Platform',
    client: 'Aurelis Luxury',
    industry: 'High-Luxury Botanical Skincare',
    services: ['3D Web', 'Creative Development', 'Motion Design', 'E-Commerce'],
    year: '2025',
    image: '/grid-photos/grid1.png',
    category: '3D Web',
    rotation: 8,
    metric: '+280% E-Commerce Conversion',
    summary: 'Interactive 3D product showcase and luxury e-commerce experience with custom physically-based shaders.',
    seo: {
      title: 'Aurelis — Kinetic 3D Skincare Case Study | Chanan',
      description: 'Chanan case study on Aurelis luxury skincare: 3D interactive product visualization and headless e-commerce flagship.',
      canonicalUrl: 'https://www.madebychanan.com/work/aurelis',
      ogImage: 'https://www.madebychanan.com/grid-photos/grid1.png',
    },
    intro: 'Aurelis creates organic bio-active luxury skincare formulations. They selected Chanan to build a sensory digital flagship that mirrors the organic purity and scientific precision of their products.',
    challenge: 'Simulating tactile glass bottle refractions, liquid viscosity, and organic botanical leaf textures in real time in WebGL.',
    creativeDirection: 'Sensual minimalism, golden botanical lighting, macroscopic textures, and fluid scroll-choreographed motion.',
    designApproach: 'Each product page features a 360-degree interactive 3D bottle configurator with real-time lighting adjustments and interactive ingredient stories.',
    technicalApproach: 'Physically-based rendering (PBR) pipelines with custom transmission shaders and compressed textures integrated into headless Shopify.',
    outcome: 'Aurelis saw a 280% surge in online sales conversion and sold out their limited reserve within 72 hours of launch.',
    deliverables: [
      'Interactive 3D Product Viewport',
      'Custom Botanical WebGL Shaders',
      'Headless Shopify Architecture',
      'Editorial Art Direction',
      'Mobile Performance Calibration'
    ],
    gallery: ['/grid-photos/grid1.png', '/skincare_leaf.png', '/untitled-design-7.png'],
    relatedServices: [
      { name: '3D Product Animation', path: '/3d-product-animation' },
      { name: 'Web Design', path: '/web-design' },
      { name: 'Web Development', path: '/web-development' }
    ]
  },
  {
    id: 'data-jungle',
    slug: 'data-jungle',
    title: 'Data Jungle — Real-Time Telemetry Engine',
    client: 'Data Jungle Cloud',
    industry: 'Enterprise Data Infrastructure & Observability',
    services: ['Web Design', 'Kinetic UI', 'Web Development', 'WebGL Visualizer'],
    year: '2025',
    image: '/data_jungle.png',
    category: 'Kinetic Apps',
    rotation: -6,
    metric: 'Awwwards Studio Winner',
    summary: 'High-density multi-cluster analytics canvas with GPU-accelerated stream visualization and kinetic interactions.',
    seo: {
      title: 'Data Jungle — Real-Time Telemetry Case Study | Chanan',
      description: 'Explore Chanan’s case study on Data Jungle: an interactive real-time telemetry engine with GPU-accelerated canvas visualization.',
      canonicalUrl: 'https://www.madebychanan.com/work/data-jungle',
      ogImage: 'https://www.madebychanan.com/data_jungle.png',
    },
    intro: 'Data Jungle provides enterprise-grade observability pipelines for distributed cloud systems. Chanan engineered their public marketing site and interactive telemetry canvas.',
    challenge: 'Transforming dense cloud telemetry metrics into an engaging, interactive visual story that resonates with enterprise CTOs and lead architects.',
    creativeDirection: 'Electric cybernetic aesthetic with fluorescent green data flows, stark black typography, and kinetic particle telemetry.',
    designApproach: 'We created an interactive live cluster sandbox where users can simulate traffic spikes and observe real-time load distribution animations.',
    technicalApproach: 'WebGL particle systems and instanced geometry arrays running synchronized with GSAP ScrollTrigger timelines at 120 FPS.',
    outcome: 'Awarded Awwwards Studio recognition and drove over 40,000 developer playground sessions in the first month.',
    deliverables: [
      'Interactive Telemetry Sandbox',
      'Particle Flow WebGL Shaders',
      'Technical Marketing Website',
      'Kinetic Micro-Interactions',
      'Cross-Device Performance Tuning'
    ],
    gallery: ['/data_jungle.png', '/showcase-extra-2.png', '/grid-photos/grid8.png'],
    relatedServices: [
      { name: 'Web Development', path: '/web-development' },
      { name: 'Motion Design', path: '/motion-design' },
      { name: 'Web Design', path: '/web-design' }
    ]
  },
  {
    id: 'voltaria',
    slug: 'voltaria',
    title: 'Voltaria — Magnetic Hardware Systems',
    client: 'Voltaria Dynamics',
    industry: 'Advanced Robotics & Industrial Hardware',
    services: ['Brand Identity', '3D Product Animation', 'Web Development', 'Creative Direction'],
    year: '2025',
    image: '/grid-photos/grid2.png',
    category: 'Brand Systems',
    rotation: 5,
    metric: 'FWA Site of the Day',
    summary: 'Futuristic industrial design showcase and interactive 3D product configurator for next-gen magnetic hardware.',
    seo: {
      title: 'Voltaria — Magnetic Hardware Systems Case Study | Chanan',
      description: 'Case study on Voltaria industrial hardware by Chanan. 3D magnetic mechanics, interactive product configurator, and brand systems.',
      canonicalUrl: 'https://www.madebychanan.com/work/voltaria',
      ogImage: 'https://www.madebychanan.com/grid-photos/grid2.png',
    },
    intro: 'Voltaria designs magnetic levitation couplings and robotic actuation components. Chanan was hired to develop their full brand identity and interactive 3D product showcase.',
    challenge: 'Demonstrating internal magnetic field physics and exploded mechanical assemblies in an intuitive, high-speed 3D web experience.',
    creativeDirection: 'Precision engineering aesthetic inspired by aerospace blueprints, metallic textures, and architectural lighting.',
    designApproach: 'Users can interactively explode complex multi-part magnetic mechanisms, inspect cross-sections, and observe real-time flux simulations.',
    technicalApproach: 'Built with Three.js custom depth shaders and GSAP camera choreography with sub-second asset streaming.',
    outcome: 'Recognized as FWA Site of the Day and secured multi-million dollar industrial manufacturing contracts.',
    deliverables: [
      'Exploded 3D Product Visualizer',
      'Magnetic Field Shader Physics',
      'Industrial Brand Identity',
      'Interactive Product Configurator',
      'Full Responsive Flagship'
    ],
    gallery: ['/grid-photos/grid2.png', '/showcase-extra-1.png', '/grid-photos/grid6.png'],
    relatedServices: [
      { name: '3D Product Animation', path: '/3d-product-animation' },
      { name: 'Branding', path: '/branding' },
      { name: 'Web Design', path: '/web-design' }
    ]
  },
  {
    id: 'velora',
    slug: 'velora',
    title: 'Velora — Kinetic Mobile Platform',
    client: 'Velora Studio',
    industry: 'Digital Lifestyle & Mobile Applications',
    services: ['Brand Identity', 'Kinetic UI', 'Mobile Development', 'Design System'],
    year: '2025',
    image: '/grid-photos/grid6.png',
    category: 'Kinetic Apps',
    rotation: -5,
    metric: '1.2M Active Users',
    summary: 'Fluid kinetic mobile and web application engineered with 120fps gesture physics and generative design systems.',
    seo: {
      title: 'Velora — Kinetic Mobile Platform Case Study | Chanan',
      description: 'Chanan case study on Velora: generative typography matrix, 120fps gesture physics, and kinetic mobile application.',
      canonicalUrl: 'https://www.madebychanan.com/work/velora',
      ogImage: 'https://www.madebychanan.com/grid-photos/grid6.png',
    },
    intro: 'Velora is a next-generation lifestyle platform for digital creators. Chanan designed and engineered the mobile app design system, web flagship, and kinetic motion guidelines.',
    challenge: 'Designing a typographic and motion system that scales effortlessly across diverse mobile screen aspect ratios while sustaining 120fps interaction physics.',
    creativeDirection: 'Neo-grotesque kinetic typography, vibrant periwinkle accents, and silky gestural transitions.',
    designApproach: 'Every interaction incorporates haptic-inspired animation physics, fluid gesture tracking, and responsive layout morphing.',
    technicalApproach: 'Utilized GSAP Flip and CSS hardware transforms with zero layout thrashing for flawless rendering on all devices.',
    outcome: 'Surpassed 1.2 million active users within 6 months and won global design recognition for interface innovation.',
    deliverables: [
      'Mobile UI/UX Design System',
      'Kinetic Motion Guidelines',
      'Web Flagship Portal',
      'Custom Typographic Matrix',
      'Interactive Prototype Suites'
    ],
    gallery: ['/grid-photos/grid6.png', '/grid-photos/grid7.png', '/work/work3.jpg'],
    relatedServices: [
      { name: 'Branding', path: '/branding' },
      { name: 'Motion Design', path: '/motion-design' },
      { name: 'Web Design', path: '/web-design' }
    ]
  },
  {
    id: 'verde',
    slug: 'verde',
    title: 'Verde — Dual Core Generative OS',
    client: 'Verde Technologies',
    industry: 'Generative Design & Spatial Canvas',
    services: ['Web Design', 'WebGL 3D Engine', 'Creative Direction', 'Web Development'],
    year: '2026',
    image: '/showcase-extra-2.png',
    category: '3D Web',
    rotation: 4,
    metric: 'Global Innovation Award',
    summary: 'Experimental spatial computing interface designed for generative art workflows and spatial canvas manipulation.',
    seo: {
      title: 'Verde — Dual Core Generative OS Case Study | Chanan',
      description: 'Explore the Verde Dual Core OS case study by Chanan. Experimental spatial computing, generative canvas, and WebGL shaders.',
      canonicalUrl: 'https://www.madebychanan.com/work/verde',
      ogImage: 'https://www.madebychanan.com/showcase-extra-2.png',
    },
    intro: 'Verde builds spatial computing environments for generative artists and creative technologists. Chanan designed and developed their experimental web portal and interactive spatial workspace.',
    challenge: 'Constructing a multi-layered canvas workspace supporting simultaneous 3D object rendering, node graph manipulation, and real-time shader compiling.',
    creativeDirection: 'Deep ultramarine and phosphor green cyberpunk aesthetics, modular grid systems, and tactile digital hardware tactile styling.',
    designApproach: 'Designed an expansive infinite-pan workspace with contextual radial menus and dynamic camera projections.',
    technicalApproach: 'Built on custom Three.js multi-viewport rendering pipelines and GLSL compute shaders with web worker multi-threading.',
    outcome: 'Celebrated as an avant-garde breakthrough in browser-based creative tools, winning international innovation accolades.',
    deliverables: [
      'Spatial Canvas UI Architecture',
      'Custom Node Graph Shaders',
      'Interactive WebGL Workspace',
      'Generative Design Standards',
      'Full Production Deployment'
    ],
    gallery: ['/showcase-extra-2.png', '/grid-new-1.png', '/work/work2.jpg'],
    relatedServices: [
      { name: 'Web Development', path: '/web-development' },
      { name: 'Web Design', path: '/web-design' },
      { name: '3D Product Animation', path: '/3d-product-animation' }
    ]
  },
  {
    id: 'botanical',
    slug: 'botanical',
    title: 'Botanical — Organic Skincare Canvas',
    client: 'Botanical Living',
    industry: 'Luxury Wellness & Direct-to-Consumer',
    services: ['Web Design', 'WebGL 3D Rendering', 'Brand Identity', 'Creative Direction'],
    year: '2025',
    image: '/skincare_leaf.png',
    category: '3D Web',
    rotation: -3,
    metric: '+310% Brand Recall',
    summary: 'Tactile WebGL visual canvas highlighting organic ingredients through real-time procedural lighting and botanical shaders.',
    seo: {
      title: 'Botanical — Organic Skincare Canvas Case Study | Chanan',
      description: 'Discover how Chanan crafted the tactile 3D botanical web experience for Botanical Living.',
      canonicalUrl: 'https://www.madebychanan.com/work/botanical',
      ogImage: 'https://www.madebychanan.com/skincare_leaf.png',
    },
    intro: 'Botanical Living crafts wild-harvested botanical skincare formulas. Chanan built an atmospheric web flagship celebrating the living texture of raw botanical ingredients.',
    challenge: 'Recreating realistic leaf translucency and light scattering in real-time WebGL on mobile devices.',
    creativeDirection: 'Earthy luxury, deep forest undertones, and microscopic plant geometry simulation.',
    designApproach: 'An organic narrative journey that unfolds layer by layer as users explore harvest origins and biological science.',
    technicalApproach: 'Custom three.js subsurface scattering shaders and Lenis smooth scrolling.',
    outcome: 'Increased DTC order value by 45% and established Botanical Living as a premier sustainable luxury brand.',
    deliverables: [
      'Subsurface WebGL Shaders',
      'Luxury E-Commerce UI',
      'Tactile Interactive Canvas',
      'Mobile Performance Optimization'
    ],
    gallery: ['/skincare_leaf.png', '/grid-photos/grid1.png', '/untitled-design-7.png'],
    relatedServices: [
      { name: '3D Product Animation', path: '/3d-product-animation' },
      { name: 'Web Design', path: '/web-design' }
    ]
  },
  {
    id: 'nexus',
    slug: 'nexus',
    title: 'Nexus — Neural Analytics Dashboard',
    client: 'Nexus Data Inc.',
    industry: 'Fintech & Quantitative Trading',
    services: ['Web Development', 'Kinetic UI', 'Web Design', 'Design Systems'],
    year: '2026',
    image: '/grid-photos/grid4.png',
    category: 'Kinetic Apps',
    rotation: 5,
    metric: 'Sub-10ms Live Execution',
    summary: 'High-frequency institutional trading dashboard featuring multi-chart canvas grids and real-time order books.',
    seo: {
      title: 'Nexus — Neural Analytics Dashboard Case Study | Chanan',
      description: 'Read the Nexus Data institutional trading dashboard case study engineered by Chanan.',
      canonicalUrl: 'https://www.madebychanan.com/work/nexus',
      ogImage: 'https://www.madebychanan.com/grid-photos/grid4.png',
    },
    intro: 'Nexus provides algorithmic execution infrastructure for quant funds. Chanan built their ultra-low latency command terminal and marketing portal.',
    challenge: 'Rendering dozens of active depth charts and live price feeds without dropped frames.',
    creativeDirection: 'Minimalist Bloomberg-inspired cybernetics with high-contrast monochrome charts and electric blue telemetry.',
    designApproach: 'Modular drag-and-drop workspace tailored for multi-monitor institutional setups.',
    technicalApproach: 'HTML5 2D Canvas chart rendering powered by WebAssembly data parsers.',
    outcome: 'Onboarded 28 institutional hedge funds in the first 90 days post-launch.',
    deliverables: [
      'Wasm Canvas Chart Engine',
      'Institutional UI System',
      'Dark Mode Terminal Ergonomics',
      'WebSocket Data Synchronization'
    ],
    gallery: ['/grid-photos/grid4.png', '/grid-photos/grid3.png', '/data_jungle.png'],
    relatedServices: [
      { name: 'Web Development', path: '/web-development' },
      { name: 'Web Design', path: '/web-design' }
    ]
  },
  {
    id: 'clarity',
    slug: 'clarity',
    title: 'Clarity — 3D Decision Engine',
    client: 'Clarity Intelligence',
    industry: 'Enterprise AI & Spatial Graph Visualization',
    services: ['3D Web', 'WebGL Architecture', 'Creative Development', 'Brand Systems'],
    year: '2025',
    image: '/grid-photos/grid5.png',
    category: '3D Web',
    rotation: -7,
    metric: 'Top AI Tool 2025',
    summary: 'Spatial 3D knowledge graph visualizer mapping complex multi-modal decision vectors in real-time WebGL.',
    seo: {
      title: 'Clarity — 3D Decision Engine Case Study | Chanan',
      description: 'Chanan case study on Clarity 3D Decision Engine: multi-dimensional spatial graph visualization and WebGL shaders.',
      canonicalUrl: 'https://www.madebychanan.com/work/clarity',
      ogImage: 'https://www.madebychanan.com/grid-photos/grid5.png',
    },
    intro: 'Clarity Intelligence visualizes deep enterprise knowledge graphs. Chanan crafted their 3D interactive web environment and spatial analytics sandbox.',
    challenge: 'Graphing 50,000+ interconnected vector nodes with force-directed physics running at 60 FPS in WebGL.',
    creativeDirection: 'Deep space nodes, luminous synaptic connections, and cinematic orbital cameras.',
    designApproach: 'A zero-friction navigation model allowing users to zoom from macro ecosystem view to microscopic document nodes seamlessly.',
    technicalApproach: 'Three.js instanced meshes with GPU compute shaders for real-time node force simulations.',
    outcome: 'Acquired by a major enterprise technology conglomerate for $85M.',
    deliverables: [
      '3D Graph Compute Engine',
      'Spatial Camera Choreography',
      'Interactive WebGL Sandbox',
      'Technical Brand Guidelines'
    ],
    gallery: ['/grid-photos/grid5.png', '/grid-photos/grid11.png', '/experience_laptop.png'],
    relatedServices: [
      { name: '3D Product Animation', path: '/3d-product-animation' },
      { name: 'Web Development', path: '/web-development' }
    ]
  },
  {
    id: 'nova-flow',
    slug: 'nova-flow',
    title: 'Nova Flow — Kinetic Interaction Suite',
    client: 'Nova Interactive',
    industry: 'Mobile UX & Design Tooling',
    services: ['Kinetic UI', 'Web Design', 'Web Development', 'Design System'],
    year: '2025',
    image: '/grid-photos/grid3.png',
    category: 'Kinetic Apps',
    rotation: 4,
    metric: '400k+ App Installs',
    summary: 'Modular mobile interface architecture with gesture-driven kinetic cards and micro-animations.',
    seo: {
      title: 'Nova Flow — Kinetic Interaction Suite Case Study | Chanan',
      description: 'Explore how Chanan designed Nova Flow’s gesture-driven mobile interaction suite and kinetic UI physics.',
      canonicalUrl: 'https://www.madebychanan.com/work/nova-flow',
      ogImage: 'https://www.madebychanan.com/grid-photos/grid3.png',
    },
    intro: 'Nova Interactive builds mobile workflow suites for creative teams. Chanan developed their core design system and kinetic web portal.',
    challenge: 'Creating natural, tactile physics that make touch gestures feel weightless yet physically tangible.',
    creativeDirection: 'Vibrant neon periwinkle accents against dark glass cards with fluid velocity response.',
    designApproach: 'Every state transition incorporates spring physics and continuous visual feedback.',
    technicalApproach: 'GSAP timeline choreographies combined with CSS hardware transform acceleration.',
    outcome: 'Surpassed 400,000 installs with a 4.9 App Store rating.',
    deliverables: [
      'Gesture Physics System',
      'Interactive Web Flagship',
      'Component Design System',
      'Micro-Animation Library'
    ],
    gallery: ['/grid-photos/grid3.png', '/grid-photos/grid4.png', '/work/work3.jpg'],
    relatedServices: [
      { name: 'Motion Design', path: '/motion-design' },
      { name: 'Web Design', path: '/web-design' }
    ]
  },
  {
    id: 'chanan-hardware',
    slug: 'chanan-hardware',
    title: 'Chanan — Industrial Hardware Core',
    client: 'Chanan Labs',
    industry: 'Next-Gen Computing & Physical Hardware',
    services: ['Brand Identity', '3D Product Animation', 'Web Development', 'Creative Direction'],
    year: '2026',
    image: '/showcase-extra-1.png',
    category: 'Brand Systems',
    rotation: -6,
    metric: 'Red Dot Design Award',
    summary: 'Precision industrial design showcase and interactive 3D exploded hardware explorer.',
    seo: {
      title: 'Chanan Hardware Core Case Study | Chanan',
      description: 'Chanan industrial hardware showcase: 3D exploded view rendering, physical materials, and luxury industrial branding.',
      canonicalUrl: 'https://www.madebychanan.com/work/chanan-hardware',
      ogImage: 'https://www.madebychanan.com/showcase-extra-1.png',
    },
    intro: 'Chanan Labs crafts bespoke physical computing accessories. We designed the complete hardware branding and interactive 3D product showcase.',
    challenge: 'Capturing microscopic aluminum milling details and magnetic coupling interactions in the browser.',
    creativeDirection: 'Monochrome precision, stark architectural shadows, and laser typography.',
    designApproach: 'Interactive exploded view allows collectors to inspect internal PCB routing and CNC chassis precision.',
    technicalApproach: 'Three.js PBR shaders with custom HDRI studio reflection maps.',
    outcome: 'Sold out first hardware batch in under 15 minutes post-launch.',
    deliverables: [
      '3D Exploded View Engine',
      'Physical Product Photography',
      'Brand Identity System',
      'Packaging Architecture'
    ],
    gallery: ['/showcase-extra-1.png', '/grid-photos/grid2.png', '/grid-new-1.png'],
    relatedServices: [
      { name: '3D Product Animation', path: '/3d-product-animation' },
      { name: 'Branding', path: '/branding' }
    ]
  },
  {
    id: 'amber-pulse',
    slug: 'amber-pulse',
    title: 'AmberPulse — Real-Time SaaS Analytics',
    client: 'AmberPulse Global',
    industry: 'SaaS & Enterprise Operations',
    services: ['Web Design', 'Kinetic UI', 'Web Development', 'Design System'],
    year: '2025',
    image: '/grid-photos/grid8.png',
    category: 'Kinetic Apps',
    rotation: 6,
    metric: 'Enterprise Leader 2025',
    summary: 'Modern SaaS operations dashboard with kinetic cards, real-time alerting, and automated anomaly detection.',
    seo: {
      title: 'AmberPulse — Real-Time SaaS Analytics Case Study | Chanan',
      description: 'Case study on AmberPulse SaaS analytics dashboard designed and engineered by Chanan.',
      canonicalUrl: 'https://www.madebychanan.com/work/amber-pulse',
      ogImage: 'https://www.madebychanan.com/grid-photos/grid8.png',
    },
    intro: 'AmberPulse provides live operations intelligence for high-traffic platforms. Chanan designed and developed their flagship portal.',
    challenge: 'Simplifying complex operational metrics into actionable visual intelligence.',
    creativeDirection: 'Warm amber glow accents against deep obsidian cards with crisp typography.',
    designApproach: 'Prioritizing rapid visual recognition of system health and incident escalation.',
    technicalApproach: 'High-speed React architecture with client-side caching and dynamic charting.',
    outcome: 'Increased user platform engagement by 65% in the first quarter.',
    deliverables: [
      'SaaS Web Architecture',
      'Real-Time Dashboard UI',
      'Design Token Hierarchy',
      'Responsive Touch Controls'
    ],
    gallery: ['/grid-photos/grid8.png', '/grid-photos/grid9.png', '/data_jungle.png'],
    relatedServices: [
      { name: 'Web Development', path: '/web-development' },
      { name: 'Web Design', path: '/web-design' }
    ]
  },
  {
    id: 'persona-studio',
    slug: 'persona-studio',
    title: 'Persona — Digital Studio Flagship',
    client: 'Persona Agency',
    industry: 'Creative Media & High-Fashion Portfolio',
    services: ['Web Design', '3D Web', 'Creative Direction', 'WebGL Motion'],
    year: '2025',
    image: '/grid-photos/grid9.png',
    category: '3D Web',
    rotation: -4,
    metric: 'FWA of the Month',
    summary: 'Editorial creative agency flagship featuring 3D liquid transitions and typography physics.',
    seo: {
      title: 'Persona — Digital Studio Flagship Case Study | Chanan',
      description: 'Chanan case study on Persona Digital Studio flagship: liquid WebGL transitions, editorial art direction, and 3D web motion.',
      canonicalUrl: 'https://www.madebychanan.com/work/persona-studio',
      ogImage: 'https://www.madebychanan.com/grid-photos/grid9.png',
    },
    intro: 'Persona is a high-fashion creative agency in Paris. Chanan was commissioned to craft their international portfolio flagship.',
    challenge: 'Creating high-concept liquid distort shaders that run at a locked 60fps on mobile Safari.',
    creativeDirection: 'Editorial high-fashion minimalism with bold typography and liquid distortion wipes.',
    designApproach: 'Every project navigation feels like turning the pages of an avant-garde magazine in 3D.',
    technicalApproach: 'WebGL GLSL displacement filters synchronized with Lenis inertia scrolling.',
    outcome: 'Awarded FWA of the Month and generated record global creative inquiries.',
    deliverables: [
      'Liquid Shader Transitions',
      'Editorial Grid Design',
      'Custom Motion Choreography',
      'Full Responsive Deployment'
    ],
    gallery: ['/grid-photos/grid9.png', '/work/work1.jpg', '/grid-photos/grid10.png'],
    relatedServices: [
      { name: 'Web Design', path: '/web-design' },
      { name: 'Motion Design', path: '/motion-design' }
    ]
  },
  {
    id: 'velora-brand',
    slug: 'velora-brand',
    title: 'Velora — Brand Identity System',
    client: 'Velora Systems',
    industry: 'Generative Typography & Design Tokens',
    services: ['Brand Identity', 'Creative Direction', 'Design System', 'Print & Digital'],
    year: '2025',
    image: '/grid-photos/grid7.png',
    category: 'Brand Systems',
    rotation: 5,
    metric: 'Global Design Award',
    summary: 'Complete brand identity architecture, generative typography scales, and tokenized design system.',
    seo: {
      title: 'Velora — Brand Identity System Case Study | Chanan',
      description: 'Discover how Chanan built the generative brand identity system and typographic standards for Velora Systems.',
      canonicalUrl: 'https://www.madebychanan.com/work/velora-brand',
      ogImage: 'https://www.madebychanan.com/grid-photos/grid7.png',
    },
    intro: 'Velora Systems needed a unified brand architecture to support their expanding suite of software applications. Chanan engineered their visual identity and design system.',
    challenge: 'Harmonizing diverse sub-brand applications under a cohesive, recognizable visual language.',
    creativeDirection: 'Stark precision typography, deep royal blues, and generative mathematical layout grids.',
    designApproach: 'Constructed an atomic design token system bridging Figma design files with production CSS variables.',
    technicalApproach: 'Tokenized export pipelines with automated multi-format vector generation.',
    outcome: 'Unified 14 product lines under a single design language, saving hundreds of engineering hours.',
    deliverables: [
      'Brand Identity Guidelines',
      'Atomic Design Token Suite',
      'Figma Component Library',
      'Generative Typographic Grid'
    ],
    gallery: ['/grid-photos/grid7.png', '/grid-photos/grid6.png', '/grid-new-2.png'],
    relatedServices: [
      { name: 'Branding', path: '/branding' },
      { name: 'Web Design', path: '/web-design' }
    ]
  }
];

export const getProjectBySlug = (slug) => {
  return projects.find((p) => p.slug === slug || p.id === slug);
};


