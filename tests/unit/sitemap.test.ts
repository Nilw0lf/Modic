import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function production() {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://modic.vercel.app");
  vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "modic.vercel.app");
  vi.resetModules();
  const { default: sitemap } = await import("@/app/sitemap");
  const catalog = await import("@/lib/catalog");
  return { sitemap, ...catalog };
}

describe("production sitemap", () => {
  it("lists each published canonical exactly once and excludes planned experiments", async () => {
    const { sitemap, effects, categories, thinkers } = await production();
    const published = effects.filter((effect) => effect.status === "live");
    const expected = [
      "/",
      "/effects",
      "/categories",
      "/thinkers",
      "/explore",
      "/learn",
      "/about",
      ...published.map((effect) => `/effects/${effect.slug}`),
      ...categories
        .filter((category) =>
          published.some((effect) => effect.categoryIds.includes(category.id)),
        )
        .map((category) => `/categories/${category.slug}`),
      ...thinkers
        .filter((thinker) =>
          published.some((effect) =>
            effect.thinkerRelationships.some(
              (link) => link.thinkerId === thinker.id,
            ),
          ),
        )
        .map((thinker) => `/thinkers/${thinker.slug}`),
    ].map((path) => `https://modic.app${path}`);
    const urls = sitemap().map((entry) => entry.url);
    expect([...urls].sort()).toEqual(expected.sort());
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(new URL(url).origin).toBe("https://modic.app");
      expect(new URL(url).search).toBe("");
      expect(new URL(url).hash).toBe("");
    }
    for (const effect of effects.filter(
      (effect) => effect.status === "planned",
    ))
      expect(urls).not.toContain(`https://modic.app/effects/${effect.slug}`);
  });

  it("automatically includes future published effects, categories and thinkers", async () => {
    const { sitemap, effects, categories, thinkers } = await production();
    const originalCounts = [effects.length, categories.length, thinkers.length];
    try {
      categories.push({
        ...categories[0],
        id: "future-category",
        slug: "future-category",
      });
      thinkers.push({
        ...thinkers[0],
        id: "future-thinker",
        slug: "future-thinker",
      });
      effects.push({
        ...effects[0],
        id: "future-effect",
        slug: "future-effect",
        status: "planned",
        categoryIds: ["future-category"],
        thinkerRelationships: [
          {
            ...effects.find((effect) => effect.thinkerRelationships.length)!
              .thinkerRelationships[0],
            id: "future-link",
            thinkerId: "future-thinker",
          },
        ],
      });
      expect(sitemap().map((entry) => entry.url)).not.toContain(
        "https://modic.app/effects/future-effect",
      );
      effects.at(-1)!.status = "live";
      expect(sitemap().map((entry) => entry.url)).toEqual(
        expect.arrayContaining([
          "https://modic.app/effects/future-effect",
          "https://modic.app/categories/future-category",
          "https://modic.app/thinkers/future-thinker",
        ]),
      );
    } finally {
      effects.splice(originalCounts[0]);
      categories.splice(originalCounts[1]);
      thinkers.splice(originalCounts[2]);
    }
  });

  it("keeps entity groups sorted and does not invent freshness or ranking hints", async () => {
    const { sitemap } = await production();
    const entries = sitemap();
    for (const prefix of ["effects", "categories", "thinkers"]) {
      const urls = entries
        .map((entry) => entry.url)
        .filter((url) => url.startsWith(`https://modic.app/${prefix}/`));
      expect(urls).toEqual([...urls].sort());
    }
    expect(entries.every((entry) => Object.keys(entry).length === 1)).toBe(
      true,
    );
  });

  it("advertises the same domain in robots and page canonicals despite stale host variables", async () => {
    await production();
    const { default: robots } = await import("@/app/robots");
    const { siteUrl, pageMetadata } = await import("@/lib/metadata");
    expect(siteUrl).toBe("https://modic.app");
    expect(robots().sitemap).toBe("https://modic.app/sitemap.xml");
    expect(
      new URL(
        String(
          pageMetadata("Test", "Test", "/effects/secretary-problem").alternates
            ?.canonical,
        ),
        siteUrl,
      ).href,
    ).toBe("https://modic.app/effects/secretary-problem");
  });
});
