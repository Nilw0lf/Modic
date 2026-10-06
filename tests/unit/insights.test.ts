import { describe, expect, it } from "vitest";
import {
  getInsight,
  insights,
  readingMinutes,
  relatedInsights,
} from "@/content/insights";
import { getEffect } from "@/lib/catalog";
import {
  generateMetadata,
  generateStaticParams,
} from "@/app/insights/[slug]/page";

describe("Insights editorial collection", () => {
  it("publishes ten substantial, distinct practical guides", () => {
    expect(insights).toHaveLength(10);
    expect(new Set(insights.map((post) => post.slug)).size).toBe(10);
    expect(new Set(insights.map((post) => post.intro)).size).toBe(10);
    expect(new Set(insights.map((post) => post.reflection)).size).toBe(10);
    for (const post of insights) {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
      const text = JSON.stringify(post.sections).replace(/https?:[^\s"]+/g, "");
      expect(text.split(/\s+/).length, post.slug).toBeGreaterThan(650);
      expect(post.sections.length).toBeGreaterThanOrEqual(6);
      expect(new Set(post.sections.map((section) => section.id)).size).toBe(
        post.sections.length,
      );
      expect(
        post.sections.find((section) => section.id === "worked-example")?.steps,
      ).toHaveLength(3);
      expect(post.sections.some((section) => section.checklist?.length)).toBe(
        true,
      );
      expect(post.sources.length).toBeGreaterThanOrEqual(2);
      expect(post.experiments.length).toBeGreaterThanOrEqual(3);
      expect(readingMinutes(post)).toBeGreaterThanOrEqual(4);
      expect(getInsight(post.slug)).toBe(post);
      expect(relatedInsights(post)).toHaveLength(3);
      expect(
        relatedInsights(post).some((item) => item.slug === post.slug),
      ).toBe(false);
    }
  });
  it("links only to live experiments and safe external readings", () => {
    for (const post of insights) {
      const links = [...JSON.stringify(post).matchAll(/\]\(([^)]+)\)/g)].map(
        (match) => match[1],
      );
      expect(
        links.filter((href) => href.startsWith("/effects/")).length,
        post.slug,
      ).toBeGreaterThanOrEqual(3);
      for (const href of links) {
        if (href.startsWith("/effects/"))
          expect(
            getEffect(href.slice(9))?.status,
            `${post.slug}: ${href}`,
          ).toBe("live");
        else expect(new URL(href).protocol).toBe("https:");
      }
      for (const experiment of post.experiments)
        expect(getEffect(experiment.slug)?.status, experiment.slug).toBe(
          "live",
        );
      for (const source of post.sources) {
        expect(new URL(source.url).protocol).toBe("https:");
        expect(links).toContain(source.url);
      }
    }
  });
  it("generates canonicals and article metadata from the same published collection", async () => {
    expect(generateStaticParams()).toEqual(
      insights.map(({ slug }) => ({ slug })),
    );
    for (const post of insights) {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: post.slug }),
      });
      expect(metadata.alternates?.canonical).toBe(`/insights/${post.slug}`);
      expect(metadata.description).toBe(post.description);
      expect(metadata.openGraph).toMatchObject({
        type: "article",
        publishedTime: post.published,
      });
    }
    expect(getInsight("not-a-real-article")).toBeUndefined();
  });
});
