import { z } from "zod";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const experimentTypes = [
  "simulation",
  "game",
  "calculator",
  "thought-experiment",
  "visualization",
  "agent-model",
] as const;
export type ExperimentType = (typeof experimentTypes)[number];
export const experimentTypeLabels: Record<ExperimentType, string> = {
  simulation: "Simulations",
  game: "Games",
  calculator: "Calculators",
  "thought-experiment": "Thought experiments",
  visualization: "Visualizations",
  "agent-model": "Agent models",
};
export const relationshipTypes = [
  "COINED",
  "FORMALIZED",
  "DEVELOPED",
  "POPULARIZED",
  "EXTENDED",
  "DISCUSSED",
  "CRITIQUED",
  "ASSOCIATED_WITH",
] as const;
export const attributionSchema = z.object({
  id: slug,
  thinkerId: slug,
  relationship: z.enum(relationshipTypes),
  editorialStatus: z.enum(["provisional", "verified"]).default("provisional"),
  sources: z.array(z.string().url()).default([]),
});
export const effectSchema = z.object({
  id: slug,
  slug,
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  categoryIds: z.array(slug).min(1),
  thinkerRelationships: z.array(attributionSchema),
  status: z.enum(["live", "planned"]),
  difficulty: z.enum(["intuitive", "intermediate", "technical"]),
  simulationType: z.string().optional(),
  experimentType: z.enum(experimentTypes).default("simulation"),
  relatedEffectIds: z.array(slug),
});
export const categorySchema = z.object({
  id: slug,
  slug,
  name: z.string(),
  description: z.string(),
});
export const thinkerSchema = z.object({
  id: slug,
  slug,
  name: z.string(),
  description: z.string(),
  areaIds: z.array(slug),
});
export type Effect = z.infer<typeof effectSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Thinker = z.infer<typeof thinkerSchema>;
export type ThinkerRelationshipType = (typeof relationshipTypes)[number];
export const relationshipLabels: Record<ThinkerRelationshipType, string> = {
  COINED: "Coined",
  FORMALIZED: "Formalized",
  DEVELOPED: "Developed",
  POPULARIZED: "Popularized",
  EXTENDED: "Extended",
  DISCUSSED: "Discussed",
  CRITIQUED: "Critiqued",
  ASSOCIATED_WITH: "Associated with",
};
