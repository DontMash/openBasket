import type { APIRoute } from 'astro';
import config, { type Robot } from '@/robots.config';

export const GET: APIRoute = ({ url }) => {
  const baseSitemap = `${url.protocol}//${url.host}/sitemap-index.xml`;
  const subSitemap = `${url.origin}/sitemap-index.xml`;
  const sitemaps = [baseSitemap];
  if (baseSitemap !== subSitemap) {
    sitemaps.push(subSitemap);
  }

  const robotsTxt = `                                      
#                               @@@@                "All your base are belong to us"
#                              @@@@@                
#                    @@@@@     @@@@                 
#                  @@@@@@@    @@@@@                 
#                @@@@@@@@    @@@@@@@@               
#               @@@@@@@@     @@@@@@@@@              
#              @@@@@@@@@    @@@@  @@@@@             
#              @@@@@@@@    @@@@    @@@@             
#             @@@@@@@@    @@@@@    @@@@@            
#              @@@@@@     @@@@     @@@@             
#              @@@@@@    @@@@     @@@@@             
#               @@@@    @@@@@    @@@@@              
#                @@     @@@@ @@@@@@@@               
#                      @@@@@@@@@@@@                 
#                     @@@@@@@@@@                    
#                    @@@@@                          
#                    @@@@                           made by soren.codes | Sören Maschmann

${config.robots
  .map((robot) => robotToString(robot))
  .join('\n\n')
  .trim()}
    
${sitemaps.map((sitemap) => `Sitemap: ${sitemap}`).join('\n')}
`.trim();

  return new Response(robotsTxt);
};

const robotToString = (robot: Robot): string => {
  let robotString = '';
  robotString += robot.userAgent
    .map((agent) => `User-agent: ${agent}`)
    .join('\n')
    .trim();

  if (robot.allow) {
    robotString +=
      '\n' +
      robot.allow
        .map((allow) => `Allow: ${allow}`)
        .join('\n')
        .trim();
  }

  if (robot.disallow) {
    robotString +=
      '\n' +
      robot.disallow
        .map((disallow) => `Disallow: ${disallow}`)
        .join('\n')
        .trim();
  }

  return robotString;
};
