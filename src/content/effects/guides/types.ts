import { z } from "zod";

export const readerGuideSchema = z.object({
  definition: z.string().min(20),
  reasoning: z.string().min(20),
  readResult: z.string().min(20),
  scenario: z.object({
    title: z.string(),
    steps: z.tuple([z.string(), z.string(), z.string()]),
  }),
  misconception: z.object({ claim: z.string(), correction: z.string() }),
  question: z.object({ question: z.string(), answer: z.string() }),
  reflection: z.string(),
});
export type ReaderGuide = z.infer<typeof readerGuideSchema>;

// Each entry is authored individually. The helper only names the reading blocks.
export function guide(
  definition: string,
  reasoning: string,
  readResult: string,
  scenario: [title: string, setup: string, change: string, conclusion: string],
  misconception: [claim: string, correction: string],
  question: [question: string, answer: string],
  reflection: string,
): ReaderGuide {
  return {
    definition,
    reasoning,
    readResult,
    scenario: {
      title: scenario[0],
      steps: [scenario[1], scenario[2], scenario[3]],
    },
    misconception: { claim: misconception[0], correction: misconception[1] },
    question: { question: question[0], answer: question[1] },
    reflection,
  };
}
