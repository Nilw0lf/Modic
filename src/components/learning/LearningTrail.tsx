import Link from "next/link";
import { learningPath, learningCollections } from "@/data/learning";
import { newExperiments } from "@/data/expansion";
export function LearningTrail({ slug }: { slug: string }) {
  const index = learningPath.findIndex((s) => s.slug === slug);
  if (index < 0) {
    const collection = learningCollections.find((c) => c.slugs.includes(slug));
    if (!collection) return null;
    const position = collection.slugs.indexOf(slug);
    const current = newExperiments.find((e) => e.id === slug)!;
    const next = newExperiments.find(
      (e) => e.id === collection.slugs[position + 1],
    );
    return (
      <aside className="learning-trail" aria-label="Learning path">
        <div>
          <Link className="eyebrow" href="/learn">
            {collection.title} · {position + 1} OF {collection.slugs.length} ↗
          </Link>
          <h2>Before you move on</h2>
          <p>
            {current.challenge}. Explain what changed and which assumption
            caused it.
          </p>
        </div>
        <div className="trail-links">
          {position > 0 && (
            <Link href={`/effects/${collection.slugs[position - 1]}`}>
              ← Previous experiment
            </Link>
          )}
          <Link
            className="modic-action primary"
            href={next ? `/effects/${next.id}` : "/learn#glossary"}
          >
            {next ? `Next: ${next.name}` : "Finish with the glossary"} ↗
          </Link>
        </div>
      </aside>
    );
  }
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
