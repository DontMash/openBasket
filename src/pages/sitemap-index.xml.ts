import type { APIRoute } from 'astro';
import config from '@/sitemap.config';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const sitemapXML = `
<?xml version="1.0" encoding="UTF-8"?>

<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${Object.entries(config.maps).map(
  ([slug, { title, lastModified }]) => `
   <sitemap>

      <loc title="${title}">${new URL(`sitemap-${slug}.xml`, site)}</loc>

      <lastmod>${lastModified.toISOString()}</lastmod>

   </sitemap>`,
)}

</sitemapindex>`.trim();

  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
