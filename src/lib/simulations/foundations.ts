import { z } from "zod";
import { seededRandom } from "./random";
const probability = z.number().min(0).max(1);
const seedSchema = z.number().int().min(0).max(0xffffffff);
const normal = (random: () => number) =>
  Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random());
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

export function baseRate(
  prevalence: number,
  sensitivity: number,
  falsePositiveRate: number,
  seed: number,
) {
  z.tuple([probability, probability, probability, seedSchema]).parse([
    prevalence,
    sensitivity,
    falsePositiveRate,
    seed,
  ]);
  const random = seededRandom(seed);
  const population = Array.from({ length: 1000 }, () => {
    const target = random() < prevalence;
    return {
      target,
      flagged: random() < (target ? sensitivity : falsePositiveRate),
    };
  });
  const trueFlags = population.filter((x) => x.target && x.flagged).length;
  const falseFlags = population.filter((x) => !x.target && x.flagged).length;
  const denominator =
    prevalence * sensitivity + (1 - prevalence) * falsePositiveRate;
  return {
    population,
    trueFlags,
    falseFlags,
    expected: denominator ? (prevalence * sensitivity) / denominator : null,
    observed:
      trueFlags + falseFlags ? trueFlags / (trueFlags + falseFlags) : null,
  };
}

export function regression(noise: number, selection: number, seed: number) {
  z.tuple([
    z.number().min(0).max(30),
    z.number().min(5).max(50),
    seedSchema,
  ]).parse([noise, selection, seed]);
  const random = seededRandom(seed);
  const people = Array.from({ length: 200 }, (_, id) => {
    const ability = 50 + 10 * normal(random);
    return {
      id,
      ability,
      first: ability + noise * normal(random),
      second: ability + noise * normal(random),
    };
  });
  const selected = [...people]
    .sort((a, b) => b.first - a.first)
    .slice(0, Math.round((people.length * selection) / 100));
  return {
    people,
    selected,
    first: mean(selected.map((x) => x.first)),
    second: mean(selected.map((x) => x.second)),
    ability: mean(selected.map((x) => x.ability)),
    correlation: 100 / (100 + noise * noise),
  };
}

export function powerLaw(exponent: number, count: number, seed: number) {
  z.tuple([
    z.number().min(0).max(2),
    z.number().int().min(10).max(100),
    seedSchema,
  ]).parse([exponent, count, seed]);
  const weights = Array.from(
    { length: count },
    (_, i) => 1 / Math.pow(i + 1, exponent),
  );
  const total = weights.reduce((a, b) => a + b, 0);
  const shares = weights.map((x) => x / total);
  const random = seededRandom(seed);
  const draws = Array<number>(count).fill(0);
  for (let i = 0; i < 1000; i++) {
    const u = random();
    let cumulative = 0;
    for (let j = 0; j < count; j++) {
      cumulative += shares[j];
      if (u < cumulative || j === count - 1) {
        draws[j]++;
        break;
      }
    }
  }
  const top = Math.ceil(count * 0.1);
  return {
    shares,
    draws,
    top,
    expectedTop: shares.slice(0, top).reduce((a, b) => a + b, 0),
    observedTop: draws.slice(0, top).reduce((a, b) => a + b, 0) / 1000,
  };
}

export function network(count: number, density: number, seed: number) {
  z.tuple([z.number().int().min(2).max(30), probability, seedSchema]).parse([
    count,
    density,
    seed,
  ]);
  const random = seededRandom(seed);
  const edges: [number, number][] = [];
  const degree = Array<number>(count).fill(0);
  for (let i = 0; i < count; i++)
    for (let j = i + 1; j < count; j++) {
      if (random() < density) {
        edges.push([i, j]);
        degree[i]++;
        degree[j]++;
      }
    }
  return {
    edges,
    degree,
    potential: (count * (count - 1)) / 2,
    isolated: degree.filter((x) => x === 0).length,
    average: (2 * edges.length) / count,
  };
}
