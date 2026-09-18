import { z } from "zod";
import { quantileSorted } from "d3-array";
import { seededRandom } from "./random";

export const gamblerRuinInputSchema = z
  .object({
    wealth: z.number().min(100).max(1_000_000),
    risk: z.number().min(0).max(1),
    win: z.number().min(0).max(1),
    payoff: z.number().min(0).max(3),
    rounds: z.number().int().min(1).max(500),
    lives: z.number().int().min(1).max(5000),
    threshold: z.number().min(1).max(999_999),
  })
  .refine((input) => input.threshold < input.wealth, {
    message: "Ruin threshold must be below starting wealth.",
    path: ["threshold"],
  });
export type GamblerRuinInput = z.infer<typeof gamblerRuinInputSchema>;
export type SingleLifeResult = {
  path: number[];
  startingWealth: number;
  finalWealth: number;
  maximumWealth: number;
  maximumDrawdown: number;
  ruinRound: number | null;
};
export type WealthBand = {
  round: number;
  q25: number;
  median: number;
  q75: number;
};
export type ManyLivesResult = {
  count: number;
  ruinProbability: number;
  medianEndingWealth: number;
  meanEndingWealth: number;
  q25: number;
  q75: number;
  fractionAboveStart: number;
  meanMaximumDrawdown: number;
  endingWealth: number[];
  sampledPaths: SingleLifeResult[];
  bands: WealthBand[];
};
export const defaultGamblerInput: GamblerRuinInput = {
  wealth: 10_000,
  risk: 0.1,
  win: 0.55,
  payoff: 1,
  rounds: 500,
  lives: 1000,
  threshold: 1000,
};

/** Payoff is net profit on the stake; a loss removes the stake. No fees,
 * leverage, borrowing, cash flows, changing probabilities, or correlations.
 * Bounds ensure even 500 consecutive maximum wins remain finite in JS.
 */
export function wealthAfterRound(
  wealth: number,
  risk: number,
  payoff: number,
  won: boolean,
) {
  return wealth * (won ? 1 + risk * payoff : 1 - risk);
}

function runLife(
  input: GamblerRuinInput,
  random: () => number,
): SingleLifeResult {
  let wealth = input.wealth;
  let maximumWealth = wealth;
  let maximumDrawdown = 0;
  let ruinRound: number | null = null;
  const path = [wealth];
  for (let round = 1; round <= input.rounds; round++) {
    if (ruinRound === null) {
      wealth = wealthAfterRound(
        wealth,
        input.risk,
        input.payoff,
        random() < input.win,
      );
      maximumWealth = Math.max(maximumWealth, wealth);
      maximumDrawdown = Math.max(maximumDrawdown, 1 - wealth / maximumWealth);
      if (wealth <= input.threshold) ruinRound = round;
    }
    // Absorption freezes actual remaining wealth; it is never replaced with
    // the threshold or zero. No betting resumes after crossing the barrier.
    path.push(wealth);
  }
  return {
    path,
    startingWealth: input.wealth,
    finalWealth: wealth,
    maximumWealth,
    maximumDrawdown,
    ruinRound,
  };
}

function validateSeed(seed: number) {
  return z.number().int().min(0).max(4294967295).parse(seed);
}
export function simulateOneLife(
  raw: GamblerRuinInput,
  seed = 42,
): SingleLifeResult {
  return runLife(
    gamblerRuinInputSchema.parse(raw),
    seededRandom(validateSeed(seed)),
  );
}

/** One generator supports synchronous tests and cooperative browser execution.
 * Only 24 full paths and up to 101 cross-sectional checkpoints are retained.
 * Each life has a stable independent seed, so changing batch size is harmless.
 */
export function* manyLivesSteps(
  raw: GamblerRuinInput,
  seed = 42,
): Generator<number, ManyLivesResult> {
  const input = gamblerRuinInputSchema.parse(raw);
  validateSeed(seed);
  const checkpoints = [
    ...new Set(
      Array.from({ length: Math.min(100, input.rounds) + 1 }, (_, i) =>
        Math.round((i * input.rounds) / Math.min(100, input.rounds)),
      ),
    ),
  ];
  const values = checkpoints.map(() => [] as number[]);
  const endingWealth: number[] = [];
  const sampledPaths: SingleLifeResult[] = [];
  let ruined = 0,
    above = 0,
    mean = 0,
    meanDrawdown = 0;
  for (let i = 0; i < input.lives; i++) {
    const life = runLife(
      input,
      seededRandom((seed + Math.imul(i, 0x9e3779b9)) >>> 0),
    );
    if (i < 24) sampledPaths.push(life);
    endingWealth.push(life.finalWealth);
    if (life.ruinRound !== null) ruined++;
    if (life.finalWealth > input.wealth) above++;
    // Online means avoid overflow from summing thousands of large outcomes.
    mean += (life.finalWealth - mean) / (i + 1);
    meanDrawdown += (life.maximumDrawdown - meanDrawdown) / (i + 1);
    checkpoints.forEach((round, j) => values[j].push(life.path[round]));
    if ((i + 1) % 20 === 0) yield (0.8 * (i + 1)) / input.lives;
  }
  const bands: WealthBand[] = [];
  for (let j = 0; j < checkpoints.length; j++) {
    values[j].sort((a, b) => a - b);
    bands.push({
      round: checkpoints[j],
      q25: quantileSorted(values[j], 0.25)!,
      median: quantileSorted(values[j], 0.5)!,
      q75: quantileSorted(values[j], 0.75)!,
    });
    if (j % 5 === 0) yield 0.8 + (0.2 * j) / checkpoints.length;
  }
  endingWealth.sort((a, b) => a - b);
  return {
    count: input.lives,
    ruinProbability: ruined / input.lives,
    medianEndingWealth: quantileSorted(endingWealth, 0.5)!,
    meanEndingWealth: mean,
    q25: quantileSorted(endingWealth, 0.25)!,
    q75: quantileSorted(endingWealth, 0.75)!,
    fractionAboveStart: above / input.lives,
    meanMaximumDrawdown: meanDrawdown,
    endingWealth,
    sampledPaths,
    bands,
  };
}
export function simulateManyLives(
  input: GamblerRuinInput,
  seed = 42,
): ManyLivesResult {
  const steps = manyLivesSteps(input, seed);
  let next = steps.next();
  while (!next.done) next = steps.next();
  return next.value;
}

export function expectedRoundReturn(input: GamblerRuinInput) {
  return input.risk * (input.win * input.payoff - (1 - input.win));
}
export function expectedLogGrowth(input: GamblerRuinInput) {
  const gain =
    input.win === 0 ? 0 : input.win * Math.log1p(input.risk * input.payoff);
  const loss = input.win === 1 ? 0 : (1 - input.win) * Math.log1p(-input.risk);
  return gain + loss;
}
export function ruinObservations(
  input: GamblerRuinInput,
  result: ManyLivesResult,
): string[] {
  const notes: string[] = [];
  if (result.meanEndingWealth > 2 * result.medianEndingWealth)
    notes.push(
      "The average ending wealth is more than twice the median. Large outcomes are pulling the average upward; it does not describe a typical life.",
    );
  if (result.ruinProbability >= 0.25)
    notes.push(
      `${Math.round(result.ruinProbability * 100)}% of these lives crossed the ruin threshold and stopped. Later favorable rounds could not help them recover.`,
    );
  if (expectedRoundReturn(input) > 0 && expectedLogGrowth(input) < 0)
    notes.push(
      "The expected return per round is positive, but expected log growth is negative. Compounding losses can outweigh the advantage at this exposure.",
    );
  if (result.ruinProbability === 0)
    notes.push(
      "No simulated life reached ruin in this run. That is a finite sample over a limited horizon, not a guarantee of survival.",
    );
  if (input.risk === 0)
    notes.push("Nothing was put at risk. Every life kept its starting wealth.");
  if (!notes.length)
    notes.push(
      "These results describe this set of simulated lives. Change the exposure or time horizon and run again to compare survival and ending wealth.",
    );
  return notes;
}
