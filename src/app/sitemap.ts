import type { MetadataRoute } from "next";
import { effects, categories, thinkers } from "@/lib/catalog";
import { siteUrl } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  const published = effects.filter((effect) => effect.status === "live");
  const sortedSlugs = (items: { slug: string }[]) =>
    items.map((item) => item.slug).sort();

  // Generated from the catalog on every build: new published entries need no
  // separate sitemap edit. Keep stable groups and omit planned experiments.
  return [
    "",
    "/effects",
    "/categories",
    "/thinkers",
    "/explore",
    "/learn",
    "/about",
    ...sortedSlugs(published).map((slug) => `/effects/${slug}`),
    ...sortedSlugs(
      categories.filter((category) =>
        published.some((effect) => effect.categoryIds.includes(category.id)),
      ),
    ).map((slug) => `/categories/${slug}`),
    ...sortedSlugs(
      thinkers.filter((thinker) =>
        published.some((effect) =>
          effect.thinkerRelationships.some(
            (link) => link.thinkerId === thinker.id,
          ),
        ),
      ),
    ).map((slug) => `/thinkers/${slug}`),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
