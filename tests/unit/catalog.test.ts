import { describe, expect, it } from "vitest";
import {
  effects,
  categories,
  thinkers,
  thinkerGroups,
  categoryEffects,
  validateCatalog,
} from "@/lib/catalog";
import { effectSchema } from "@/types/catalog";
import { getArticle } from "@/lib/content";
import { filterEffects } from "@/lib/search/filter";
import { simulations } from "@/components/simulations/registry";
describe("catalog", () => {
  it("validates unique identifiers and all relationship references", () => {
    expect(validateCatalog()).toBe(true);
    expect(effects).toHaveLength(14);
    expect(effects.filter((e) => e.status === "live")).toHaveLength(6);
  });
  it("rejects invalid statuses, missing categories, and relationship types", () => {
    expect(
      effectSchema.safeParse({ ...effects[0], status: "published" }).success,
    ).toBe(false);
    expect(
      effectSchema.safeParse({ ...effects[0], categoryIds: [] }).success,
    ).toBe(false);
    expect(
      effectSchema.safeParse({
        ...effects[0],
        thinkerRelationships: [
          { id: "bad", thinkerId: "taleb", relationship: "INVENTED" },
        ],
      }).success,
    ).toBe(false);
  });
  it("every live effect has a registered simulation and every effect has valid content", () => {
    for (const effect of effects) {
      expect(getArticle(effect.slug).explanation.length).toBeGreaterThan(0);
      if (effect.status === "live")
        expect(simulations[effect.simulationType!]).toBeDefined();
    }
  });
  it("groups thinker associations by their independent relationship", () => {
    const groups = thinkerGroups("taleb");
    expect(
      groups
        .find((g) => g.relationship === "POPULARIZED")
        ?.effects.map((e) => e.id),
    ).toEqual(["lindy"]);
    expect(
      groups
        .find((g) => g.relationship === "DISCUSSED")
        ?.effects.map((e) => e.id),
    ).toContain("fat-tails");
    expect(thinkerGroups("missing")).toEqual([]);
  });
  it("keeps category membership consistent", () => {
    for (const c of categories)
      expect(categoryEffects(c.id)).toEqual(
        effects.filter((e) => e.categoryIds.includes(c.id)),
      );
  });
});
describe("local search", () => {
  const search = (query: string, category = "all") =>
    filterEffects(effects, categories, thinkers, query, category).map(
      (e) => e.id,
    );
  it("finds names and descriptions case-insensitively", () => {
    expect(search("LINDY")).toEqual(["lindy"]);
    expect(search("finite")).toEqual(["ruin"]);
  });
  it("searches categories and thinker names, ignoring accents", () => {
    expect(search("complex systems")).toContain("lindy");
    expect(search("Benoit")).toEqual(["fat-tails", "power-laws"]);
    expect(search("Taleb")).toContain("lindy");
  });
  it("combines category and query, and normalizes apostrophes", () => {
    expect(search("Taleb", "complexity")).toEqual(["lindy"]);
    expect(search("Gambler's")).toEqual(["ruin"]);
  });
  it("handles empty and unmatched searches", () => {
    expect(search("   ")).toHaveLength(14);
    expect(search("zzzzzz")).toEqual([]);
  });
});
