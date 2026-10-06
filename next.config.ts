import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  async headers() {
    // Vercel serves the prerendered index as a static XML asset; enforce the
    // crawler directive at the hosting layer as well as in route responses.
    return ["/sitemap.xml", "/sitemap/:file"].map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
    }));
  },
};
export default config;
