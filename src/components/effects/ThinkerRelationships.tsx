import Link from "next/link";
import { thinkers } from "@/data/thinkers";
import { relationshipLabels, type Effect } from "@/types/catalog";
export function ThinkerRelationships({ effect }: { effect: Effect }) {
  if (!effect.thinkerRelationships.length) return null;
  return (
    <section className="article-section">
      <h2>Associated thinkers</h2>
      <div className="attributions">
        {effect.thinkerRelationships.map((link) => {
          const thinker = thinkers.find((item) => item.id === link.thinkerId)!;
          return (
            <div key={link.id}>
              <span className="eyebrow">
                {relationshipLabels[link.relationship]}
              </span>
              <Link href={`/thinkers/${thinker.slug}`}>{thinker.name} ↗</Link>
              {link.editorialStatus === "verified" &&
                link.sources.map((source, i) => (
                  <a key={source} className="text-link" href={source}>
                    Supporting reference
                    {link.sources.length > 1 ? ` ${i + 1}` : ""} ↗
                  </a>
                ))}
            </div>
          );
        })}
      </div>
      {effect.thinkerRelationships.some(
        (link) => link.editorialStatus === "provisional",
      ) && (
        <p className="small-note">
          Associations marked provisional are awaiting source review.
        </p>
      )}
    </section>
  );
}
