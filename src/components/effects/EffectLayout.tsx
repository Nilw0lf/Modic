import Link from "next/link";
import type { Effect } from "@/types/catalog";
import type { Article } from "@/lib/content";
import { simulations } from "@/components/simulations/registry";
import { EffectHeader } from "./EffectHeader";
import { EffectReading } from "./EffectReading";
import { RelatedEffects } from "./RelatedEffects";
import { LearningTrail } from "@/components/learning/LearningTrail";
export function EffectLayout({
  effect,
  article,
}: {
  effect: Effect;
  article: Article;
}) {
  const Simulation = effect.simulationType
    ? simulations[effect.simulationType]
    : undefined;
  return (
    <>
      <EffectHeader effect={effect} />
      <div id="experiment">
        {Simulation ? (
          <Simulation />
        ) : (
          <section className="planned-panel">
            <span className="eyebrow">IN THE WORKS</span>
            <h2>An experiment is taking shape.</h2>
            <p>
              The interactive simulation for this idea is planned. In the
              meantime, start with the field notes below.
            </p>
            <Link className="text-link" href="/effects/lindy-effect">
              Try the Lindy Effect experiment ↗
            </Link>
          </section>
        )}
      </div>
      <EffectReading effect={effect} article={article} />
      <LearningTrail slug={effect.slug} />
      <RelatedEffects ids={effect.relatedEffectIds} />
    </>
  );
}
