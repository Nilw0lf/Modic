import { describe, it, expect } from "vitest";
import {
  intervalBatch,
  testPower,
  bootstrap,
  quartet,
  regression,
  payment,
  amortise,
  debtPlan,
  bond,
  portfolio,
  minVariance,
  knowsBlue,
  silentWorlds,
  contractChoice,
  equilibrium,
  albedoPath,
  oscillator,
  enrichment,
  dijkstraStep,
  aStarStep,
  searchStart,
  cacheTrace,
  objectiveFunctions,
  queryCost,
  districtVotes,
  districtTotals,
} from "@/lib/simulations/mosaic";
import { mosaicEntries, mosaicThinkers } from "@/data/mosaic-expansion";
import { mosaicGuides } from "@/content/effects/guides/mosaic";
describe("mosaic release", () => {
  it("adds forty individually guided concepts and distinct active author profiles", () => {
    expect(mosaicEntries).toHaveLength(40);
    expect(Object.keys(mosaicGuides).sort()).toEqual(
      mosaicEntries.map((e) => e.id).sort(),
    );
    expect(new Set(mosaicThinkers.map((t) => t.id)).size).toBe(
      mosaicThinkers.length,
    );
    expect(
      mosaicThinkers.every((t) =>
        mosaicEntries.some(
          (e) => e.thinker === t.id || e.coThinkers?.includes(t.id),
        ),
      ),
    ).toBe(true);
  });
  it("preserves nominal CI coverage while interval width scales with square-root sample size", () => {
    const a = intervalBatch(25, 941, 10000),
      b = intervalBatch(100, 941, 10000);
    expect(a.filter((v) => v.covers).length / 10000).toBeCloseTo(0.95, 1);
    expect(a[0].hi - a[0].lo).toBeCloseTo(2 * (b[0].hi - b[0].lo));
    expect(a.map((v) => v.covers)).toEqual(b.map((v) => v.covers));
  });
  it("distinguishes null error from power at a nonzero alternative", () => {
    expect(testPower(20, 0)).toBeCloseTo(0.05, 4);
    expect(testPower(100, 0.3)).toBeGreaterThan(testPower(20, 0.3));
    expect(testPower(20, 0.6)).toBeGreaterThan(testPower(20, 0.3));
  });
  it("resamples only observed values and respects replacement and sample size", () => {
    const b = bootstrap(941);
    expect(b).toHaveLength(200);
    for (const r of b) {
      expect(r.sample).toHaveLength(6);
      expect(r.sample.every((v) => [1, 2, 4, 7, 9].includes(v))).toBe(true);
      expect(r.mean).toBeCloseTo(r.sample.reduce((a, b) => a + b, 0) / 6);
    }
    expect(b.some((r) => new Set(r.sample).size < 6)).toBe(true);
  });
  it("retains the quartet summaries and reports a genuinely unidentified slope", () => {
    for (let i = 0; i < 4; i++) {
      const r = regression(quartet(i));
      expect(r.mx).toBe(9);
      expect(r.my).toBeCloseTo(7.5, 2);
      expect(r.slope).toBeCloseTo(0.5, 2);
      expect(r.corr).toBeCloseTo(0.816, 2);
    }
    expect(regression(quartet(3).filter((p) => p[0] === 8)).slope).toBeNull();
  });
  it("repays exactly principal, caps the final payment and supports zero interest", () => {
    expect(payment(1200, 0, 12)).toBe(100);
    const p = amortise(10000, 6, 60, 100),
      base = amortise(10000, 6, 60);
    expect(p.rows.reduce((s, r) => s + r.principal, 0)).toBeCloseTo(10000, 6);
    expect(p.rows.at(-1)!.balance).toBe(0);
    expect(p.totalInterest).toBeLessThan(base.totalInterest);
    expect(p.rows.length).toBeLessThan(60);
  });
  it("compares debt priorities under equal budgets without losing interest accounting", () => {
    for (const budget of [150, 300, 600]) {
      const a = debtPlan("avalanche", budget),
        s = debtPlan("snowball", budget);
      expect(a.history.at(-1)).toBeCloseTo(0);
      expect(s.history.at(-1)).toBeCloseTo(0);
      expect(a.interest).toBeLessThanOrEqual(s.interest);
      expect(s.milestones[0].loan).toBe(0);
      expect(a.history.every(Number.isFinite)).toBe(true);
    }
  });
  it("prices a par bond and matches analytical curvature to finite differences", () => {
    const b = bond(0.05, 10),
      h = 1e-4;
    expect(b.price).toBeCloseTo(100);
    expect(b.first).toBeLessThan(0);
    expect(b.second).toBeGreaterThan(0);
    expect(
      (bond(0.05 + h, 10).price - 2 * b.price + bond(0.05 - h, 10).price) /
        h ** 2,
    ).toBeCloseTo(b.second, 1);
    const d = 0.01,
      exact = bond(0.05 + d, 10).price,
      linear = b.price + b.first * d,
      quad = linear + 0.5 * b.second * d * d;
    expect(Math.abs(quad - exact)).toBeLessThan(Math.abs(linear - exact));
  });
  it("keeps portfolio endpoints fixed and computes the constrained minimum variance", () => {
    for (const rho of [-1, 0, 0.5, 1]) {
      expect(portfolio(0, rho)).toEqual({ ret: 5, risk: 10 });
      expect(portfolio(1, rho)).toEqual({ ret: 9, risk: 20 });
      const w = minVariance(rho);
      for (let i = 0; i <= 100; i++)
        expect(portfolio(w, rho).risk).toBeLessThanOrEqual(
          portfolio(i / 100, rho).risk + 1e-8,
        );
    }
    expect(portfolio(1 / 3, -1).risk).toBeCloseTo(0);
  });
  it("requires k silent rounds to identify k blue hats only after the public announcement", () => {
    for (let k = 1; k <= 3; k++) {
      const actual = (1 << k) - 1;
      let worlds = [1, 2, 3, 4, 5, 6, 7];
      for (let round = 1; round <= k; round++) {
        expect(knowsBlue(worlds, actual, 0)).toBe(round === k);
        if (round < k) worlds = silentWorlds(worlds);
      }
    }
    let worlds = [0, 1, 2, 3, 4, 5, 6, 7];
    for (let i = 0; i < 6; i++) {
      expect(knowsBlue(worlds, 7, 0)).toBe(false);
      worlds = silentWorlds(worlds);
    }
  });
  it("honours contract self-selection, outside option and the declared tie rule", () => {
    expect(contractChoice(4, 4, 12).q).toBe(1);
    expect(contractChoice(8, 4, 12).q).toBe(2);
    expect(contractChoice(8, 4, 14).q).toBe(1);
    expect(contractChoice(1, 4, 12).q).toBe(0);
  });
  it("conserves total material at an equilibrium satisfying B/A equals K", () => {
    for (const k of [0.25, 1, 4]) {
      const e = equilibrium(60, 50, k);
      expect(e.a + e.b).toBeCloseTo(110);
      expect(e.b / e.a).toBeCloseTo(k);
    }
  });
  it("isolates temperature feedback from a calibrated forecast", () => {
    const cold = albedoPath(1360, false, true, 200).at(-1)!,
      warm = albedoPath(1360, true, true, 200).at(-1)!;
    expect(warm - cold).toBeGreaterThan(20);
    expect(
      Math.abs(
        albedoPath(1360, true, false, 200).at(-1)! -
          albedoPath(1360, false, false, 200).at(-1)!,
      ),
    ).toBeLessThan(1);
  });
  it("approaches a nonzero locked phase gap above the Kuramoto threshold", () => {
    const o = oscillator(0.5, 400);
    expect(o.path.at(-1)).toBeCloseTo(Math.asin(0.4), 2);
    expect(o.a).toBeGreaterThan(0);
    expect(o.path.every((v) => v >= -Math.PI && v <= Math.PI)).toBe(true);
  });
  it("distinguishes stable coexistence from enriched late oscillations without inventing extinction", () => {
    const a = enrichment(1.5, 200),
      b = enrichment(6, 200),
      range = (v: number[]) => {
        const tail = v.slice(Math.floor(v.length * 0.75));
        return Math.max(...tail) - Math.min(...tail);
      };
    expect(range(a.prey)).toBeLessThan(0.01);
    expect(range(b.prey)).toBeGreaterThan(1);
    expect(b.prey.every((v) => v > 0 && Number.isFinite(v))).toBe(true);
  });
  it("settles the weighted graph at the exact shortest-path distances", () => {
    let d = [0, Infinity, Infinity, Infinity, Infinity],
      closed: number[] = [];
    for (let i = 0; i < 5; i++) {
      const n = dijkstraStep(d, closed)!;
      d = n.distance;
      closed = n.closed;
    }
    expect(d).toEqual([0, 2, 3, 4, 7]);
    expect(dijkstraStep(d, closed)).toBeNull();
  });
  it("returns valid shortest unit-grid paths with admissible guidance and handles unreachable goals", () => {
    const blocked = [2, 10, 18, 26, 34, 37, 38, 39, 40],
      solve = (w: number, walls = blocked) => {
        let s = searchStart();
        for (let i = 0; i < 300 && !s.done; i++) s = aStarStep(s, walls, w);
        return s;
      },
      a = solve(0),
      b = solve(1);
    expect(a.path.length).toBeGreaterThan(0);
    expect(b.path.length).toBe(a.path.length);
    for (const s of [a, b])
      for (let i = 1; i < s.path.length; i++) {
        const p = s.path[i - 1],
          q = s.path[i];
        expect(
          Math.abs((p % 8) - (q % 8)) +
            Math.abs(Math.floor(p / 8) - Math.floor(q / 8)),
        ).toBe(1);
        expect(blocked).not.toContain(q);
      }
    expect(solve(1, [1, 8]).path).toEqual([]);
  });
  it("reproduces the FIFO anomaly and LRU capacity inclusion on the declared workload", () => {
    expect(cacheTrace(3, "FIFO").faults).toBe(9);
    expect(cacheTrace(4, "FIFO").faults).toBe(10);
    for (let c = 1; c < 6; c++)
      expect(cacheTrace(c + 1, "LRU").faults).toBeLessThanOrEqual(
        cacheTrace(c, "LRU").faults,
      );
  });
  it("exhibits equal unrestricted search averages and unequal structured averages", () => {
    const average = (m: boolean, r: boolean) => {
      const f = objectiveFunctions(m);
      return f.reduce((s, v) => s + queryCost(v, r), 0) / f.length;
    };
    expect(average(false, false)).toBe(1.875);
    expect(average(false, true)).toBe(1.875);
    expect(average(true, false)).toBe(2.8);
    expect(average(true, true)).toBe(1.6);
  });
  it("changes district seats while preserving the same twenty-five votes", () => {
    expect(districtVotes.reduce((a, b) => a + b, 0)).toBe(13);
    expect(
      districtTotals(districtVotes, false).filter((v) => v >= 3),
    ).toHaveLength(4);
    expect(
      districtTotals(districtVotes, true).filter((v) => v >= 3),
    ).toHaveLength(2);
    expect(
      districtTotals(districtVotes, false).reduce((a, b) => a + b, 0),
    ).toBe(13);
  });
});
