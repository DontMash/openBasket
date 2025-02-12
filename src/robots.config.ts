type RobotConfig = {
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
  robots: [
    {
      userAgent: ['*'],
      allow: ['/'],
    },
  ],
} satisfies RobotConfig;
