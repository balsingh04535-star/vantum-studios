import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary SEO Meta Tags */}
        <meta name="title" content="Chanan — Creative Digital Agency | Web Design, Branding & 3D" />
        <meta name="description" content="Chanan is a creative digital agency building standout websites, brand identities, 3D product visuals and motion experiences for ambitious brands worldwide." />
        <meta name="keywords" content="creative digital agency, web design studio, creative development studio, branding agency, 3D product visualization, motion design studio, WebGL, Three.js, Chanan, madebychanan" />
        <meta name="author" content="Chanan" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Theme & Icons */}
        <meta name="theme-color" content="#0002b5" />
        <meta name="msapplication-TileColor" content="#0002b5" />
        <link rel="icon" type="image/svg+xml" href="/logo-mark.svg" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.madebychanan.com/" />
        <meta property="og:site_name" content="Chanan" />
        <meta property="og:title" content="Chanan — Creative Digital Agency | Web Design, Branding & 3D" />
        <meta property="og:description" content="Chanan is a creative digital agency building standout websites, brand identities, 3D product visuals and motion experiences for ambitious brands worldwide." />
        <meta property="og:image" content="https://www.madebychanan.com/hero-bg.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Chanan Creative Agency Showreel & 3D Spatial Interfaces" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.madebychanan.com/" />
        <meta name="twitter:site" content="@madebychanan" />
        <meta name="twitter:creator" content="@madebychanan" />
        <meta name="twitter:title" content="Chanan — Creative Digital Agency | Web Design, Branding & 3D" />
        <meta name="twitter:description" content="Chanan is a creative digital agency building standout websites, brand identities, 3D product visuals and motion experiences for ambitious brands worldwide." />
        <meta name="twitter:image" content="https://www.madebychanan.com/hero-bg.webp" />

        {/* Geographic Meta */}
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="London" />
        <meta name="geo.position" content="51.5074;-0.1278" />
        <meta name="ICBM" content="51.5074, -0.1278" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://use.typekit.net/rhw1vur.css" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Syncopate:wght@200;400;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://www.madebychanan.com/#organization",
                  "name": "Chanan",
                  "alternateName": "Chanan Creative Digital Agency",
                  "url": "https://www.madebychanan.com/",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.madebychanan.com/logo.png",
                    "width": 512,
                    "height": 512
                  },
                  "image": "https://www.madebychanan.com/hero-bg.webp",
                  "description": "Chanan is an independent creative digital agency specialising in bespoke web design and development, brand identity systems, 3D product visuals and motion design for ambitious brands worldwide.",
                  "email": "hello@madebychanan.com",
                  "priceRange": "$$$$",
                  "foundingDate": "2022",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "London",
                    "addressCountry": "GB"
                  },
                  "areaServed": "Worldwide",
                  "serviceType": ["Web Design", "Web Development", "Brand Identity", "3D Product Visualization", "Motion Design", "WebGL Shader Engineering"],
                  "knowsAbout": ["WebGL", "Three.js", "GSAP", "React", "Next.js", "GLSL Shaders", "Brand Identity Design", "UX/UI Design", "3D CGI Rendering", "Motion Design"],
                  "sameAs": [
                    "https://twitter.com/madebychanan",
                    "https://instagram.com/madebychanan",
                    "https://linkedin.com/company/madebychanan",
                    "https://bsky.app/profile/madebychanan.com"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.madebychanan.com/#website",
                  "url": "https://www.madebychanan.com/",
                  "name": "Chanan",
                  "description": "Creative Digital Agency specializing in Web Design, Branding, 3D Product Visuals & Motion.",
                  "publisher": { "@id": "https://www.madebychanan.com/#organization" },
                  "inLanguage": "en-GB",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": { "@type": "EntryPoint", "urlTemplate": "https://www.madebychanan.com/work?q={search_term_string}" },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
