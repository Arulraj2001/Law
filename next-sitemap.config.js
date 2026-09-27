/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    "/studio",
    "/studio/*",
    "/thank-you",
    "/api/*",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio",
          "/api/",
          "/thank-you",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/studio",
          "/api/",
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority per path type
    const priorities = {
      "/": 1.0,
      "/courses/civil-judge": 0.95,
      "/courses/app-exam": 0.95,
      "/courses/patent-agent": 0.90,
      "/courses/trademark-agent": 0.90,
      "/courses/ugc-net-law": 0.85,
      "/courses/set-law": 0.85,
      "/results": 0.85,
      "/faculty": 0.80,
      "/about": 0.80,
      "/demo-class": 0.90,
      "/contact": 0.80,
      "/faq": 0.75,
      "/blog": 0.80,
      "/testimonials": 0.75,
    };

    const changefreqs = {
      "/": "daily",
      "/courses/civil-judge": "weekly",
      "/courses/app-exam": "weekly",
      "/blog": "daily",
      "/demo-class": "weekly",
    };

    return {
      loc: path,
      changefreq: changefreqs[path] || config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    return [];
  },
};
