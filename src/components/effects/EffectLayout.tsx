import Link from "next/link";
import katex from "katex";
import type { Effect } from "@/types/catalog";
import type { Article } from "@/lib/content";
import { simulations } from "@/components/simulations/registry";
import { EffectHeader } from "./EffectHeader";
import { ThinkerRelationships } from "./ThinkerRelationships";
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
      <article className="article-body">
        {article.whatToNotice && !Simulation && (
          <section className="article-section">
            <h2>What to notice</h2>
            <p>{article.whatToNotice}</p>
          </section>
        )}
        <section className="article-section" id="explanation">
          <span className="eyebrow">THE IDEA</span>
          <h2>
            {article.explanationTitle ||
              (effect.id === "lindy"
                ? "What survival can tell us."
                : "A closer look.")}
          </h2>
          {article.explanation.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </section>
        {article.sections?.map((section) => (
          <section className="article-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        {effect.simulationType === "lindy" && (
          <section className="model-notes">
            <h3>Inside this model</h3>
            <div
              className="formula"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(
                  "m = 50\\left(\\frac{a}{50}\\right)^s",
                  { throwOnError: false, displayMode: true },
                ),
              }}
            />
            <p>
              <i>a</i> is observed age, <i>s</i> is Lindy strength, and <i>m</i>{" "}
              is the model’s median remaining life in years. At strength 0, the
              median is fixed at 50 years. At strength 1, it equals observed
              age.
            </p>
            <p>
              Remaining lifetimes are sampled from a lognormal distribution with
              log-median ln(<i>m</i>) and log-scale spread 0.3, 0.7, or 1.2.
              Sample statistics vary slightly with the seed. This convenient
              teaching model imposes an age relationship; it is not a fitted
              survival distribution.
            </p>
          </section>
        )}
        {article.whyItMatters && (
          <section className="article-section">
            <h2>Why it matters</h2>
            {article.whyItMatters.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
        )}
        {article.examples && (
          <section className="article-section">
            <h2>Out in the world</h2>
            {article.examples.map((example) => (
              <div className="real-example" key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.text}</p>
              </div>
            ))}
          </section>
        )}
        {article.limitations && (
          <section className="article-section limitations">
            <span className="eyebrow">WHERE IT BREAKS</span>
            <h2>
              {article.limitationsTitle ||
                "A useful lens. Not a universal law."}
            </h2>
            <ul>
              {article.limitations.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </section>
        )}
        <ThinkerRelationships effect={effect} />
        <section className="article-section further-reading">
          <h2>Further reading</h2>
          <p>
            {article.furtherReading ||
              "A researched reading list is planned for this entry. The current field notes and thinker associations are provisional editorial content."}
          </p>
          {article.readingLinks?.map((reading) => (
            <a key={reading.url} className="text-link" href={reading.url}>
              {reading.title} ↗
            </a>
          ))}
        </section>
      </article>
      <LearningTrail slug={effect.slug} />
      <RelatedEffects ids={effect.relatedEffectIds} />
    </>
  );
}
