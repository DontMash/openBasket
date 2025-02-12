import type { APIRoute } from 'astro';
import config from '@/sitemap.config';

export const GET: APIRoute = ({ params, site }) => {
  if (!params.slug) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }
  const map = config.maps.find((map) => map.slug === params.slug);
  if (!map) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }
  const { pages } = map;

  const sitemapXML = `
<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${pages.map(
  ({ path, title, lastModified }) => `
<url>

  <loc title="${title}">${site}${path}</loc>

  <lastmod>${lastModified}</lastmod>

</url>`,
)}

</urlset>`.trim();

  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
