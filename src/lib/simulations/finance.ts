import { seededRandom } from "./random";

export function wealthPath(returns: number[], withdrawal = 0, start = 100) {
  let wealth = start,
    shortfall = 0;
  const values = [start];
  for (const rate of returns) {
    const available = Math.max(0, wealth * (1 + rate));
    shortfall += Math.max(0, withdrawal - available);
    wealth = Math.max(0, available - withdrawal);
    values.push(wealth);
  }
  return { values, wealth, shortfall };
}
export function feePath(rate: number, fee: number, years: number) {
  let net = 1000,
    gross = 1000,
    paid = 0;
  const values = [net],
    benchmark = [gross];
  for (let i = 0; i < years; i++) {
    gross *= 1 + rate / 100;
    const beforeFee = net * (1 + rate / 100);
    const charge = (beforeFee * fee) / 100;
    paid += charge;
    net = beforeFee - charge;
    values.push(net);
    benchmark.push(gross);
  }
  return { values, benchmark, paid, gap: gross - net, net };
}
export const realRate = (nominal: number, inflation: number) =>
  (1 + nominal / 100) / (1 + inflation / 100) - 1;
export function bond(coupon: number, years: number, yieldPercent: number) {
  const y = yieldPercent / 100;
  const flows = Array.from({ length: years }, (_, i) => ({
    year: i + 1,
    cash: coupon + (i === years - 1 ? 100 : 0),
    pv: (coupon + (i === years - 1 ? 100 : 0)) / (1 + y) ** (i + 1),
  }));
  const price = flows.reduce((s, f) => s + f.pv, 0);
  const duration = flows.reduce((s, f) => s + f.year * f.pv, 0) / price;
  return { price, duration, modified: duration / (1 + y), flows };
}
export function dcf(growth: number, discount: number, years = 5) {
  const flows = Array.from({ length: years }, (_, i) => ({
    year: i + 1,
    cash: 20 * (1 + growth / 100) ** i,
    pv: (20 * (1 + growth / 100) ** i) / (1 + discount / 100) ** (i + 1),
  }));
  return { flows, value: flows.reduce((sum, f) => sum + f.pv, 0) };
}
export function marginState(assets: number, debt: number, maintenance = 0.3) {
  const equity = assets - debt;
  const ratio = assets > 0 ? equity / assets : -Infinity;
  return {
    equity,
    ratio,
    call: ratio < maintenance - 1e-10,
    deposit: Math.max(0, (maintenance * assets - equity) / (1 - maintenance)),
    sale: Math.min(assets, Math.max(0, assets - equity / maintenance)),
  };
}
export function rebalance(a: number, b: number, feePercent: number) {
  const total = a + b,
    trade = Math.abs(a - total / 2),
    fee = (trade * feePercent) / 100;
  return { a: (total - fee) / 2, b: (total - fee) / 2, trade, fee };
}
export const pricePaths: Record<string, number[]> = {
  rising: [10, 12, 14, 16, 18, 20],
  falling: [20, 18, 16, 14, 12, 10],
  recovery: [20, 12, 8, 10, 15, 20],
};
export function averaging(prices: number[]) {
  let shares = 0;
  const amount = 600 / prices.length;
  const rows = prices.map((price, i) => {
    shares += amount / price;
    return {
      price,
      shares,
      cash: 600 - amount * (i + 1),
      staged: shares * price + 600 - amount * (i + 1),
      lump: (600 / prices[0]) * price,
    };
  });
  return { rows, shares, averageCost: 600 / shares };
}
export function financing(
  cashFlow: number,
  debt: number,
  interestPercent: number,
  principalDue = 20,
) {
  const interest = (debt * interestPercent) / 100;
  return {
    interest,
    regime:
      cashFlow >= interest + principalDue
        ? "Hedge finance"
        : cashFlow >= interest
          ? "Speculative finance"
          : "Ponzi finance",
    gap: Math.max(0, interest + principalDue - cashFlow),
  };
}
export function studio(buildHours: number, users: number) {
  const quality = Math.min(1, buildHours / 8);
  const revenue = users * quality * 2,
    delivery = users * 0.1,
    buildCost = buildHours * 10;
  return {
    quality,
    service: (12 - buildHours) * 10,
    revenue,
    delivery,
    buildCost,
    netProduct: revenue - delivery - buildCost,
  };
}
export const skillCards = [
  "Coding",
  "Design",
  "Logistics",
  "Teaching",
  "Writing",
  "Data analysis",
];
export const skillBriefs = [
  { name: "Help a local shop track deliveries", needed: [0, 2, 5] },
  { name: "Teach a confusing topic online", needed: [1, 3, 4] },
  { name: "Make a clear data dashboard", needed: [0, 1, 5] },
];
export function skillFit(selected: number[], brief: number) {
  const covered = skillBriefs[brief].needed.filter((n) =>
    selected.includes(n),
  ).length;
  return { covered, score: covered * 10 + (covered === 3 ? 20 : 0) };
}
export function competenceCards(seed: number) {
  const rng = seededRandom(seed);
  return Array.from({ length: 6 }, (_, i) => {
    const familiar = i % 2 === 0,
      low = familiar ? 80 : 30,
      high = familiar ? 120 : 170;
    return {
      familiar,
      low,
      high,
      ask: 70 + Math.floor(rng() * 61),
      value: low + Math.floor(rng() * (high - low + 1)),
    };
  });
}
