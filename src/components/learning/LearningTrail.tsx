import Link from "next/link";
import { learningPath } from "@/data/learning";
export function LearningTrail({ slug }: { slug: string }) {
  const index = learningPath.findIndex((s) => s.slug === slug);
  if (index < 0) return null;
  const current = learningPath[index],
    next = learningPath[index + 1],
    previous = learningPath[index - 1];
  return (
    <aside className="learning-trail" aria-label="Learning path">
      <div>
        <Link className="eyebrow" href="/learn">
          THE LEARNING PATH · {index + 1} OF {learningPath.length} ↗︎
        </Link>
        <h2>Before you move on</h2>
        <p>{current.task}</p>
      </div>
      <div className="trail-links">
        {previous && (
          <Link href={"/effects/" + previous.slug}>← Previous experiment</Link>
        )}
        <Link
          className="modic-action primary"
          href={next ? "/effects/" + next.slug : "/learn#glossary"}
        >
          {next ? "Next: " + next.title : "Finish with the glossary"}{" "}
          <span aria-hidden="true">↗︎</span>
        </Link>
      </div>
    </aside>
  );
}
