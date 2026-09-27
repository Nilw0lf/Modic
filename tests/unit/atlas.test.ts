import { describe, expect, it } from "vitest";
import { atlasEntries } from "@/data/atlas-expansion";
import {
  atlasModel,
  braessTimes,
  entropy,
  secretarySuccess,
} from "@/lib/simulations/atlas";

describe("thirty new interactive models", () => {
  it("adds thirty distinct live lessons with controls, sources, and meaningful model changes", () => {
    expect(atlasEntries).toHaveLength(30);
    expect(new Set(atlasEntries.map((e) => e.id)).size).toBe(30);
    for (const entry of atlasEntries) {
      expect(entry.controls.length).toBeGreaterThan(0);
      expect(entry.source.url).toMatch(/^https:/);
      const defaults = Object.fromEntries(
        entry.controls.map((c) => [c.key, c.value]),
      );
      const baseline = atlasModel(entry.id, defaults, 41);
      expect(baseline.series.length).toBeGreaterThan(0);
      expect(Number.isFinite(parseFloat(baseline.stats[0][1]))).toBe(true);
      expect(baseline).toEqual(atlasModel(entry.id, defaults, 41));
      for (const control of entry.controls) {
        for (const value of [control.min, control.max]) {
          const output = atlasModel(
            entry.id,
            { ...defaults, [control.key]: value },
            41,
          );
          expect(output.stats.length).toBeGreaterThan(0);
          for (const series of output.series)
            for (const point of series.points) {
              expect(Number.isFinite(point.x)).toBe(true);
              expect(Number.isFinite(point.y)).toBe(true);
            }
          expect(JSON.stringify(output)).not.toMatch(/NaN|Infinity/);
        }
        const changed = atlasModel(
          entry.id,
          {
            ...defaults,
            [control.key]:
              control.value === control.max ? control.min : control.max,
          },
          41,
        );
        expect(changed).not.toEqual(baseline);
      }
    }
  });
  it("shows the secretary search tradeoff and symmetry of binary entropy", () => {
    expect(secretarySuccess(0)).toBeCloseTo(0.05);
    expect(secretarySuccess(7)).toBeGreaterThan(secretarySuccess(0));
    expect(secretarySuccess(19)).toBeCloseTo(0.05);
    expect(entropy(0.5)).toBe(1);
    expect(entropy(0.2)).toBeCloseTo(entropy(0.8));
    expect(entropy(0)).toBe(0);
  });
  it("reproduces Braess's demand-dependent shortcut reversal", () => {
    const low = braessTimes(2000),
      classic = braessTimes(4000);
    expect(low.withLink).toBeLessThan(low.without);
    expect(classic.withLink).toBe(80);
    expect(classic.without).toBe(65);
  });
  it("preserves mass in the SIR toy and Little's queue identity", () => {
    const sir = atlasModel("sir-epidemic", { contact: 25, recovery: 12 });
    for (let i = 0; i < sir.series[0].points.length; i++)
      expect(
        sir.series.reduce((n, series) => n + series.points[i].y, 0),
      ).toBeCloseTo(100, 7);
    const little = atlasModel("littles-law", { arrivals: 8, work: 24 });
    expect(little.stats[0][1]).toBe("3 hours");
  });
});
