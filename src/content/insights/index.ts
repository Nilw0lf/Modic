import { workAndAi } from "./work-and-ai";
import { everydayDecisions } from "./everyday-decisions";
import { uncertainty } from "./uncertainty";
import type { Insight } from "./types";

export const insights: Insight[] = [
  workAndAi[0],
  everydayDecisions[0],
  uncertainty[0],
  workAndAi[1],
  workAndAi[2],
  uncertainty[2],
  everydayDecisions[2],
  uncertainty[1],
  uncertainty[3],
  everydayDecisions[1],
];
export const getInsight = (slug: string) =>
  insights.find((post) => post.slug === slug);
export function readingMinutes(post: Insight) {
  const text = [
    post.intro,
    post.takeaway,
    post.reflection,
    ...post.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.steps ?? []),
      ...(section.checklist ?? []),
      section.deeper?.text ?? "",
    ]),
  ]
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
export function insightDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
export function relatedInsights(post: Insight) {
  return insights
    .filter((item) => item.slug !== post.slug)
    .sort(
      (a, b) => Number(b.topic === post.topic) - Number(a.topic === post.topic),
    )
    .slice(0, 3);
}
