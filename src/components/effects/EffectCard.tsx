import Link from "next/link";
import type { Effect } from "@/types/catalog";
import { relationshipLabels } from "@/types/catalog";
import { categories } from "@/data/categories";
import { thinkers } from "@/data/thinkers";
import { EffectGlyph } from "./EffectGlyph";
export function EffectCard({
  effect,
  index = 0,
}: {
  effect: Effect;
  index?: number;
}) {
  const thinker = thinkers.find(
    (item) => item.id === effect.thinkerRelationships[0]?.thinkerId,
  );
  const attribution = effect.thinkerRelationships[0];
  const relationship =
    attribution?.editorialStatus === "verified"
      ? `${relationshipLabels[attribution.relationship]}${["ASSOCIATED_WITH"].includes(attribution.relationship) ? "" : " by"}`
      : "Associated with";
  return (
    <article className="effect-card">
      <div className="card-top">
        <span className="index-label">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`status ${effect.status}`}>
          {effect.status === "live" ? "Interactive" : "○ Planned"}
        </span>
      </div>
      <EffectGlyph kind={effect.id} />
      <div className="card-title">
        <h3>
          <Link className="card-main-link" href={`/effects/${effect.slug}`}>
            {effect.name}
          </Link>
        </h3>
        <span aria-hidden="true">↗</span>
      </div>
      <p>{effect.shortDescription}</p>
      <div className="card-categories">
        {effect.categoryIds.map((id, index) => {
          const category = categories.find((c) => c.id === id)!;
          return (
            <span key={id}>
              {index > 0 && <span aria-hidden="true"> / </span>}
              <Link href={`/categories/${category.slug}`}>{category.name}</Link>
            </span>
          );
        })}
      </div>
      {thinker && (
        <div
          className="card-thinker"
          title={
            attribution.editorialStatus === "provisional"
              ? "Provisional editorial association"
              : undefined
          }
        >
          {relationship}{" "}
          <Link href={`/thinkers/${thinker.slug}`}>{thinker.name}</Link>
          {attribution.editorialStatus === "provisional" && (
            <span className="sr-only"> (provisional)</span>
          )}
        </div>
      )}
    </article>
  );
}
