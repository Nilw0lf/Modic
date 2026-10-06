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
  const { sitemapEntries: sitemap } = await import("@/lib/seo/sitemap");
  const catalog = await import("@/lib/catalog");
  return { sitemap, ...catalog };
}

describe("production sitemap", () => {
  it("publishes an index of reachable, distinct XML child routes", async () => {
    await production();
    const { GET } = await import("@/app/sitemap.xml/route");
    const { GET: childSitemap, generateStaticParams } =
      await import("@/app/sitemap/[file]/route");
    const { sitemapIndexUrls, sitemapGroups } =
      await import("@/lib/seo/sitemap");
    const response = GET();
    const xml = await response.text();
    expect(response.headers.get("content-type")).toBe(
      "application/xml; charset=utf-8",
    );
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
    expect(xml).toContain(
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    expect(
      [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
    ).toEqual(sitemapIndexUrls());
    expect(generateStaticParams()).toEqual([
      { file: "pages.xml" },
      { file: "effects.xml" },
      { file: "categories.xml" },
      { file: "thinkers.xml" },
      { file: "insights.xml" },
    ]);
    const request = new Request("https://modic.app/sitemap.xml");
    for (const group of sitemapGroups()) {
      const child = await childSitemap(request, {
        params: Promise.resolve({ file: `${group.id}.xml` }),
      });
      expect(child.status).toBe(200);
      expect(child.headers.get("x-robots-tag")).toBe("noindex, follow");
      const body = await child.text();
      expect(body).toContain(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      );
      expect(
        [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
      ).toEqual(group.entries.map((entry) => entry.url));
    }
    for (const file of ["unknown.xml", "effects-2.xml", "effects.xml.xml"])
      expect(
        (await childSitemap(request, { params: Promise.resolve({ file }) }))
          .status,
      ).toBe(404);
  });

  it("escapes XML special characters without introducing extra nodes", async () => {
    await production();
    const { xmlSitemapResponse } = await import("@/lib/seo/sitemap");
    const body = await xmlSitemapResponse("urlset", [
      "https://modic.app/?a=1&b=<test>\"'",
    ]).text();
    expect(body).toContain(
      "https://modic.app/?a=1&amp;b=&lt;test&gt;&quot;&apos;",
    );
    expect([...body.matchAll(/<loc>/g)]).toHaveLength(1);
  });

  it("splits growing groups at 1000 entries without missing or repeating URLs", async () => {
    await production();
    const { paginateSitemap } = await import("@/lib/seo/sitemap");
    const urls = Array.from(
      { length: 2001 },
      (_, index) => `https://modic.app/effects/example-${index}`,
    );
    const groups = paginateSitemap("effects", urls);
    expect(groups.map((group) => group.id)).toEqual([
      "effects",
      "effects-2",
      "effects-3",
    ]);
    expect(groups.map((group) => group.entries.length)).toEqual([
      1000, 1000, 1,
    ]);
    expect(
      groups.flatMap((group) => group.entries.map((entry) => entry.url)),
    ).toEqual(urls);
    expect(paginateSitemap("empty", [])).toEqual([]);
    expect(paginateSitemap("effects", urls.slice(0, 1000))).toHaveLength(1);
  });
  it("lists each published canonical exactly once and excludes planned experiments", async () => {
    const { sitemap, effects, categories, thinkers } = await production();
    const { insights } = await import("@/content/insights");
    const published = effects.filter((effect) => effect.status === "live");
    const expected = [
      "/",
      "/effects",
      "/categories",
      "/thinkers",
      "/explore",
      "/learn",
      "/about",
      "/insights",
      ...insights.map((post) => `/insights/${post.slug}`),
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

  it("automatically includes new Insights without editing XML lists", async () => {
    const { sitemap } = await production();
    const { insights } = await import("@/content/insights");
    const count = insights.length;
    try {
      insights.push({ ...insights[0], slug: "future-insight" });
      expect(sitemap().map((entry) => entry.url)).toContain(
        "https://modic.app/insights/future-insight",
      );
    } finally {
      insights.splice(count);
    }
  });

  it("keeps entity groups sorted and does not invent freshness or ranking hints", async () => {
    const { sitemap } = await production();
    const entries = sitemap();
    for (const prefix of ["effects", "categories", "thinkers", "insights"]) {
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
