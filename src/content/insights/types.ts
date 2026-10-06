export type InsightSection = {
  id: string;
  title: string;
  paragraphs: string[];
  steps?: string[];
  checklist?: string[];
  deeper?: { title: string; text: string };
};
export type Insight = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  published: string;
  takeaway: string;
  intro: string;
  sections: InsightSection[];
  experiments: { slug: string; task: string }[];
  sources: { title: string; url: string; note: string }[];
  reflection: string;
};
