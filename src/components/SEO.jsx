import Head from 'next/head';

export const SITE_URL = 'https://www.madebychanan.com';

const DEFAULT_TITLE = 'Made by Chanan | Creative Digital Agency';
const DEFAULT_DESCRIPTION =
  'Made by Chanan is a creative digital agency building standout websites, brand identities, 3D product visuals and motion experiences for ambitious brands worldwide.';
const DEFAULT_IMAGE = `${SITE_URL}/og-chanan.webp`;
const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Server-rendered metadata shared by every indexable page.
 * Keeping these tags in next/head makes them available to crawlers, link
 * unfurlers and users even before client-side JavaScript runs.
 */
export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl = `${SITE_URL}/`,
  ogImage = DEFAULT_IMAGE,
  ogImageAlt = 'Made by Chanan creative digital agency',
  ogImageWidth,
  ogImageHeight,
  ogType = 'website',
  schemaData = null,
  articlePublishedTime = null,
  articleModifiedTime = null,
  noIndex = false,
}) {
  const robots = noIndex ? 'noindex, nofollow, noarchive' : INDEX_ROBOTS;
  const resolvedImageWidth = ogImageWidth ?? (ogImage === DEFAULT_IMAGE ? 1200 : null);
  const resolvedImageHeight = ogImageHeight ?? (ogImage === DEFAULT_IMAGE ? 630 : null);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Made by Chanan" />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hrefLang="en-GB" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />}

      <meta property="og:site_name" content="Made by Chanan" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      {resolvedImageWidth && <meta property="og:image:width" content={String(resolvedImageWidth)} />}
      {resolvedImageHeight && <meta property="og:image:height" content={String(resolvedImageHeight)} />}
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:locale" content="en_GB" />

      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {articlePublishedTime && (
        <meta property="article:author" content={`${SITE_URL}/`} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@madebychanan" />
      <meta name="twitter:creator" content="@madebychanan" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {schemaData && (
        <script
          id="page-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(schemaData) }}
        />
      )}
    </Head>
  );
}
