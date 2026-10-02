import { describe, expect, it } from "vitest";
import { effects } from "@/lib/catalog";
import { getArticle } from "@/lib/content";
import { readerGuides } from "@/content/effects/guides";
import { readerGuideSchema } from "@/content/effects/guides/types";

describe("reader field notes", () => {
  it("covers the entire catalog without orphaned or missing guides", () => {
    expect(Object.keys(readerGuides).sort()).toEqual(
      effects.map((e) => e.slug).sort(),
    );
    for (const effect of effects) {
      expect(
        readerGuideSchema.safeParse(getArticle(effect.slug).readerGuide)
          .success,
        effect.slug,
      ).toBe(true);
    }
  });
  it("gives every concept distinct worked examples, interpretations, questions and reflections", () => {
    const guides = effects.map((effect) => getArticle(effect.slug).readerGuide);
    for (const select of [
      (g: (typeof guides)[number]) => g.definition,
      (g: (typeof guides)[number]) => g.readResult,
      (g: (typeof guides)[number]) => g.scenario.title,
      (g: (typeof guides)[number]) => g.question.question,
      (g: (typeof guides)[number]) => g.reflection,
    ])
      expect(new Set(guides.map(select)).size).toBe(effects.length);
    for (const guide of guides) {
      expect(guide.scenario.steps).toHaveLength(3);
      expect(
        guide.scenario.steps.every((step) => step.trim().length > 30),
      ).toBe(true);
      expect(guide.misconception.correction.length).toBeGreaterThan(40);
      expect(guide.question.answer.length).toBeGreaterThan(40);
    }
  });
  it("preserves sources for every concept and rejects unauthored entries", () => {
    for (const effect of effects) {
      const links = getArticle(effect.slug).readingLinks;
      expect(links?.length, effect.slug).toBeGreaterThan(0);
      for (const link of links ?? [])
        expect(new URL(link.url).protocol).toBe("https:");
      expect(new Set(links?.map((link) => link.url)).size).toBe(links?.length);
    }
    expect(() => getArticle("not-an-effect")).toThrow();
  });
});
