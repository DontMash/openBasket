import type { APIRoute } from 'astro';

type Robot = {
  userAgent: Array<string>;
} & (RobotAllow | RobotDisallow);
type RobotAllow = {
  allow: Array<string>;
  disallow?: Array<string>;
};
type RobotDisallow = {
  allow?: Array<string>;
  disallow: Array<string>;
};

export const GET: APIRoute = ({ url }) => {
  const baseSitemap = `${url.protocol}//${url.host}/sitemap-index.xml`;
  const subSitemap = `${url.origin}/sitemap-index.xml`;
  const sitemaps = [baseSitemap];
  if (baseSitemap !== subSitemap) {
    sitemaps.push(subSitemap);
  }

  const robots: Array<Robot> = [
    {
      userAgent: ['*'],
      allow: ['/'],
    },
  ];
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

${robots
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
