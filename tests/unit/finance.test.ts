import { describe, expect, it } from "vitest";
import {
  averaging,
  bond,
  competenceCards,
  dcf,
  feePath,
  financing,
  marginState,
  pricePaths,
  realRate,
  rebalance,
  skillFit,
  studio,
  wealthPath,
} from "@/lib/simulations/finance";
import { financeEntries, financeThinkers } from "@/data/finance-expansion";

describe("finance teaching models", () => {
  it("distinguishes the return product from arithmetic averaging and cash-flow order", () => {
    expect(wealthPath([0.5, -0.5]).wealth).toBe(75);
    expect(wealthPath([-0.5, 0.5]).wealth).toBe(75);
    expect(wealthPath([-0.3, 0.3], 10).wealth).toBe(68);
    expect(wealthPath([0.3, -0.3], 10).wealth).toBe(74);
    expect(wealthPath([-0.5, -0.5], 80)).toEqual({
      values: [100, 0, 0],
      wealth: 0,
      shortfall: 110,
    });
  });
  it("separates annual fee charges from their foregone growth", () => {
    expect(feePath(6, 1, 1).net).toBeCloseTo(1049.4);
    expect(feePath(6, 1, 1).paid).toBeCloseTo(10.6);
    const result = feePath(6, 1, 20);
    expect(result.gap).toBeGreaterThan(result.paid);
    expect(feePath(6, 0, 20).gap).toBe(0);
    expect(feePath(6, 0.2, 20).net).toBeGreaterThan(result.net);
  });
  it("calculates exact purchasing-power growth", () => {
    expect(realRate(5, 8)).toBeCloseTo(1.05 / 1.08 - 1);
    expect(realRate(5, 5)).toBe(0);
    expect(realRate(5, 0)).toBeCloseTo(0.05);
  });
  it("prices every bond payment and recovers zero-coupon duration", () => {
    const result = bond(0, 5, 5);
    expect(result.price).toBeCloseTo(100 / 1.05 ** 5);
    expect(result.duration).toBe(5);
    expect(result.modified).toBeCloseTo(5 / 1.05);
    expect(bond(5, 10, 5).price).toBeCloseTo(100);
    expect(bond(5, 10, 5).duration).toBeLessThan(10);
    expect(bond(5, 10, 6).price).toBeLessThan(100);
  });
  it("keeps a finite valuation conditional on growth and discount assumptions", () => {
    expect(dcf(0, 8).value).toBeCloseTo(79.8542, 3);
    expect(dcf(5, 8).value).toBeGreaterThan(dcf(0, 8).value);
    expect(dcf(0, 15).value).toBeLessThan(dcf(0, 8).value);
    expect(dcf(0, 8).flows).toHaveLength(5);
  });
  it("repairs a margin ratio without mistaking outside cash for gains", () => {
    const r = marginState(240, 200);
    expect(r.equity).toBe(40);
    expect(r.call).toBe(true);
    expect(marginState(240 + r.deposit, 200).ratio).toBeCloseTo(0.3);
    expect(marginState(240 - r.sale, 200 - r.sale).ratio).toBeCloseTo(0.3);
    expect(marginState(240 - r.sale, 200 - r.sale).equity).toBeCloseTo(40);
    expect(marginState(200, 100).call).toBe(false);
    expect(marginState(90, 100).equity).toBe(-10);
  });
  it("conserves rebalanced wealth after the disclosed fee", () => {
    const r = rebalance(600, 500, 0.5);
    expect(r.trade).toBe(50);
    expect(r.fee).toBe(0.25);
    expect(r.a).toBe(r.b);
    expect(r.a + r.b).toBeCloseTo(1100 - r.fee);
    expect(rebalance(500, 500, 2).fee).toBe(0);
  });
  it("includes uninvested cash and allows staged or lump-sum purchase to win", () => {
    const rising = averaging(pricePaths.rising),
      falling = averaging(pricePaths.falling),
      recovery = averaging(pricePaths.recovery);
    expect(rising.rows[0].cash).toBe(500);
    expect(rising.rows[0].staged).toBe(600);
    expect(rising.rows.at(-1)!.staged).toBeLessThan(rising.rows.at(-1)!.lump);
    expect(falling.rows.at(-1)!.staged).toBeGreaterThan(
      falling.rows.at(-1)!.lump,
    );
    expect(recovery.rows.at(-1)!.cash).toBe(0);
    expect(recovery.averageCost).toBeCloseTo(600 / recovery.shares);
  });
  it("labels operating-income coverage independently of cash reserves", () => {
    expect(financing(30, 200, 5).regime).toBe("Hedge finance");
    expect(financing(20, 200, 5).regime).toBe("Speculative finance");
    expect(financing(5, 200, 5).regime).toBe("Ponzi finance");
    expect(financing(30, 200, 20).interest).toBe(40);
  });
  it("makes reusable output sensitive to build costs and supplied demand", () => {
    expect(studio(8, 20)).toEqual({
      quality: 1,
      service: 40,
      revenue: 40,
      delivery: 2,
      buildCost: 80,
      netProduct: -42,
    });
    expect(studio(8, 200).netProduct).toBe(300);
    expect(studio(0, 200).revenue).toBe(0);
    expect(studio(12, 200).quality).toBe(1);
    expect(skillFit([0, 2, 5], 0)).toEqual({ covered: 3, score: 50 });
    expect(skillFit([0, 2, 5], 1).covered).toBe(0);
  });
  it("keeps deal values within stated ranges with reproducible sample rounds", () => {
    for (let seed = 0; seed < 100; seed++)
      for (const card of competenceCards(seed)) {
        expect(card.value).toBeGreaterThanOrEqual(card.low);
        expect(card.value).toBeLessThanOrEqual(card.high);
        expect(card.ask).toBeGreaterThanOrEqual(70);
        expect(card.ask).toBeLessThanOrEqual(130);
      }
    expect(competenceCards(241)).toEqual(competenceCards(241));
    expect(financeEntries).toHaveLength(15);
    expect(financeThinkers).toHaveLength(10);
  });
});
