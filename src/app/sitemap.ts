import type { MetadataRoute } from "next";
import { effects, categories, thinkers } from "@/lib/catalog";
import { siteUrl } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/effects",
    "/categories",
    "/thinkers",
    "/explore",
    "/learn",
    "/about",
    ...effects.map((e) => `/effects/${e.slug}`),
    ...categories.map((c) => `/categories/${c.slug}`),
    ...thinkers.map((t) => `/thinkers/${t.slug}`),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
