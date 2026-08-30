import { projects } from '../data/projects';
import { servicesData } from '../data/servicesData';

const SITE_URL = 'https://www.madebychanan.com';

const coreRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly', image: `${SITE_URL}/og-chanan.webp` },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/work', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/clients', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/chanan-one', priority: '0.7', changefreq: 'monthly' },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry({ loc, priority, changefreq, image }) {
  const imageEntry = image
    ? `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`
    : '';

  return [
    '<url>',
    `<loc>${escapeXml(loc)}</loc>`,
    `<changefreq>${changefreq}</changefreq>`,
    `<priority>${priority}</priority>`,
    imageEntry,
    '</url>',
  ].join('');
}

function buildSitemap() {
  const entries = [
    ...coreRoutes.map((route) => ({
      ...route,
      loc: route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`,
    })),
    ...Object.values(servicesData).map((service) => ({
      loc: service.canonicalUrl,
      priority: '0.9',
      changefreq: 'monthly',
    })),
    ...projects.map((project) => ({
      loc: project.seo.canonicalUrl,
      priority: '0.8',
      changefreq: 'monthly',
      image: project.seo.ogImage,
    })),
  ];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    entries.map(urlEntry).join(''),
    '</urlset>',
  ].join('');
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.write(buildSitemap());
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
