import { effects } from "@/data/effects";
import { EffectCard } from "./EffectCard";
export function RelatedEffects({ ids }: { ids: string[] }) {
  return (
    <section className="related-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">KEEP EXPLORING</span>
          <h2>Ideas that connect.</h2>
        </div>
      </div>
      <div className="effect-grid">
        {effects
          .filter((effect) => ids.includes(effect.id))
          .map((effect) => (
            <EffectCard
              key={effect.id}
              effect={effect}
              index={effects.indexOf(effect)}
            />
          ))}
      </div>
    </section>
  );
}
