import { describe, it, expect } from "vitest";
import { effects, categories, thinkers } from "@/lib/catalog";
import { collectionSummary, chooseLiveEffect } from "@/lib/search/discovery";
import { filterEffects } from "@/lib/search/filter";
import { effectSchema } from "@/types/catalog";
describe("discovery", () => {
  it("calculates all collection counts from metadata", () => {
    expect(collectionSummary(effects)).toBe(
      "44 ideas · 36 interactive · 8 in development",
    );
    expect(collectionSummary([])).toBe(
      "0 ideas · 0 interactive · 0 in development",
    );
  });
  it("chooses only live effects, including both ends of the random range", () => {
    expect(chooseLiveEffect(effects, () => 0)?.id).toBe("monty-hall");
    expect(chooseLiveEffect(effects, () => 0.9999)?.id).toBe("network");
    expect(
      chooseLiveEffect(effects.filter((e) => e.status === "planned")),
    ).toBeUndefined();
  });
  it("supports format filtering and validates experiment types", () => {
    expect(
      filterEffects(
        effects,
        categories,
        thinkers,
        "",
        "all",
        "thought-experiment",
      ).map((e) => e.id),
    ).toEqual([
      "sunk-cost-fallacy",
      "anchoring-bias",
      "present-bias",
      "ergodicity",
    ]);
    expect(
      effectSchema.safeParse({ ...effects[0], experimentType: "unknown" })
        .success,
    ).toBe(false);
  });
});
