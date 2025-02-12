type RobotConfig = {
  header?: string;
  robots: Array<Robot>;
};
export type Robot = {
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

export default {
  header: `
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
#                    @@@@                           made by soren.codes | Sören Maschmann`,
  robots: [
    {
      userAgent: ['*'],
      allow: ['/'],
    },
  ],
} satisfies RobotConfig;
