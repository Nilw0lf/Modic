import lindy from "@/content/effects/lindy-effect.json";
import planned from "@/content/effects/planned.json";
import ruin from "@/content/effects/gamblers-ruin.json";
import extensions from "@/content/effects/discovery.json";
import foundations from "@/content/effects/foundations.json";
import { z } from "zod";
export const articleSchema = z.object({
  whatToNotice: z.string().optional(),
  explanationTitle: z.string().optional(),
  sections: z
    .array(z.object({ title: z.string(), paragraphs: z.array(z.string()) }))
    .optional(),
  explanation: z.array(z.string()),
  whyItMatters: z.array(z.string()).optional(),
  examples: z
    .array(z.object({ title: z.string(), text: z.string() }))
    .optional(),
  limitations: z.array(z.string()).optional(),
  furtherReading: z.string().optional(),
  readingLinks: z
    .array(z.object({ title: z.string(), url: z.string().url() }))
    .optional(),
  limitationsTitle: z.string().optional(),
});
export type Article = z.infer<typeof articleSchema>;
const content: Record<string, unknown> = {
  ...planned,
  ...extensions,
  ...foundations,
  "lindy-effect": lindy,
  "gamblers-ruin": ruin,
};
export function getArticle(slug: string): Article {
  return articleSchema.parse(content[slug]);
}
