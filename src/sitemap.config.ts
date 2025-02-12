type SitemapConfig = {
  maps: Array<Sitemap>;
};
type Sitemap = {
  slug: string;
  title?: string;
  lastModified: Date;
  pages: Array<SitemapPage>;
};
type SitemapPage = {
  path: string;
  title?: string;
  lastModified: Date;
};

export default {
  maps: [
    {
      slug: 'pages',
      title: 'Pages',
      lastModified: new Date(),
      pages: [
        {
          path: '',
          title: 'Index',
          lastModified: new Date(),
        },
      ],
    },
  ],
} satisfies SitemapConfig;
