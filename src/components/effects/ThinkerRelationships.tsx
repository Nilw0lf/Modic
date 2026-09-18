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
            </div>
          );
        })}
      </div>
      <p className="small-note">
        Provisional editorial associations; source review is pending.
      </p>
    </section>
  );
}
