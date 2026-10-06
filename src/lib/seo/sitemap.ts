import type { MetadataRoute } from "next";
import { effects, categories, thinkers } from "@/lib/catalog";
import { siteUrl } from "@/lib/metadata";
import { insights } from "@/content/insights";

export type SitemapGroup = { id: string; entries: MetadataRoute.Sitemap };
export const sitemapPageSize = 1000;

export function paginateSitemap(id: string, urls: string[]): SitemapGroup[] {
  const groups: SitemapGroup[] = [];
  for (let offset = 0; offset < urls.length; offset += sitemapPageSize) {
    const page = offset / sitemapPageSize + 1;
    groups.push({
      id: page === 1 ? id : `${id}-${page}`,
      entries: urls
        .slice(offset, offset + sitemapPageSize)
        .map((url) => ({ url })),
    });
  }
  return groups;
}

export function sitemapGroups(): SitemapGroup[] {
  const published = effects.filter((effect) => effect.status === "live");
  const sortedSlugs = (items: { slug: string }[]) =>
    items.map((item) => item.slug).sort();
  const collections = {
    pages: [
      "",
      "/effects",
      "/categories",
      "/thinkers",
      "/explore",
      "/learn",
      "/about",
      "/insights",
    ],
    effects: sortedSlugs(published).map((slug) => `/effects/${slug}`),
    categories: sortedSlugs(
      categories.filter((category) =>
        published.some((effect) => effect.categoryIds.includes(category.id)),
      ),
    ).map((slug) => `/categories/${slug}`),
    thinkers: sortedSlugs(
      thinkers.filter((thinker) =>
        published.some((effect) =>
          effect.thinkerRelationships.some(
            (link) => link.thinkerId === thinker.id,
          ),
        ),
      ),
    ).map((slug) => `/thinkers/${slug}`),
    insights: sortedSlugs(insights).map((slug) => `/insights/${slug}`),
  };
  return Object.entries(collections).flatMap(([id, paths]) =>
    paginateSitemap(
      id,
      paths.map((path) => new URL(path, siteUrl).href),
    ),
  );
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  return sitemapGroups().flatMap((group) => group.entries);
}

export function sitemapIndexUrls() {
  return sitemapGroups().map(
    (group) => new URL(`/sitemap/${group.id}.xml`, siteUrl).href,
  );
}

export function xmlSitemapResponse(
  root: "urlset" | "sitemapindex",
  urls: string[],
) {
  const escapeXml = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&apos;",
        })[character]!,
    );
  const item = root === "urlset" ? "url" : "sitemap";
  const children = urls
    .map((url) => `  <${item}><loc>${escapeXml(url)}</loc></${item}>`)
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<${root} xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${children}\n</${root}>\n`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "X-Robots-Tag": "noindex, follow",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    },
  );
}
