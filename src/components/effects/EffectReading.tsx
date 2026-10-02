import katex from "katex";
import type { Effect } from "@/types/catalog";
import type { Article } from "@/lib/content";
import { ThinkerRelationships } from "./ThinkerRelationships";

export function EffectReading({
  effect,
  article,
}: {
  effect: Effect;
  article: Article;
}) {
  const guide = article.readerGuide;
  const modelSections = article.sections?.filter(
    (section) => !section.kind || section.kind === "model",
  );
  const applicationSections = article.sections?.filter(
    (section) => section.kind === "applications",
  );
  const hasModel = Boolean(
    modelSections?.length || effect.simulationType === "lindy",
  );
  const hasApplications = Boolean(
    article.examples?.length ||
    article.whyItMatters?.length ||
    applicationSections?.length,
  );
  const contents = [
    ["takeaway", "The short version"],
    ["explanation", "Why it happens"],
    ["worked-example", "A worked example"],
    ...(hasModel ? [["model-detail", "Inside the model"]] : []),
    ...(hasApplications ? [["applications", "Real-world uses"]] : []),
    ["misconceptions", "Misconceptions & limits"],
    ["reader-question", "A question worth asking"],
    ["sources", "Thinkers & further reading"],
  ];
  return (
    <div className="reading-layout">
      <aside className="reading-contents">
        <nav aria-label="On this page">
          <span className="eyebrow">FIELD NOTES</span>
          <p>Understand the idea.</p>
          <ol>
            {contents.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ol>
          {effect.status === "live" && (
            <a className="reading-back" href="#experiment">
              Back to the experiment ↑
            </a>
          )}
        </nav>
      </aside>
      <article
        className="effect-reading"
        aria-label={`${effect.name} field notes`}
      >
        <section id="takeaway" className="reading-takeaway">
          <span className="eyebrow">THE SHORT VERSION</span>
          <h2>{effect.name}, explained.</h2>
          <p>{guide.definition}</p>
        </section>
        <section id="explanation" className="reading-section">
          <span className="eyebrow">01 / THE MECHANISM</span>
          <h2>Why it happens</h2>
          <p>{guide.reasoning}</p>
          {article.explanation.map((text) => (
            <p key={text}>{text}</p>
          ))}
          {article.sections
            ?.filter((section) => section.kind === "explanation")
            .map((section) => (
              <section key={section.title}>
                <h3>{section.title}</h3>
                {section.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </section>
            ))}
          <div className="reading-result">
            <h3>
              {effect.status === "live"
                ? "Read the result"
                : "Look for this pattern"}
            </h3>
            <p>{guide.readResult}</p>
            {effect.status !== "live" && article.whatToNotice && (
              <p>{article.whatToNotice}</p>
            )}
          </div>
        </section>
        <section id="worked-example" className="reading-section">
          <span className="eyebrow">02 / FOLLOW IT THROUGH</span>
          <h2>A worked example</h2>
          <div className="reading-scenario">
            <h3>{guide.scenario.title}</h3>
            <ol>
              {guide.scenario.steps.map((step, index) => (
                <li key={step}>
                  <span className="reading-step" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        {hasModel && (
          <section id="model-detail" className="reading-section">
            <details className="reading-model">
              <summary>
                <span>
                  <span className="eyebrow">OPTIONAL DEEPER DETAIL</span>
                  <span className="reading-model-title">
                    Go deeper: inside the model
                  </span>
                </span>
                <span className="reading-model-mark" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="reading-model-body">
                {modelSections?.map((section) => (
                  <section key={section.title}>
                    <h3>{section.title}</h3>
                    {section.paragraphs.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </section>
                ))}
                {effect.simulationType === "lindy" && (
                  <>
                    <h3>Age, strength, and remaining life</h3>
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
                      <i>a</i> is observed age, <i>s</i> is Lindy strength, and{" "}
                      <i>m</i> is the model’s median remaining life in years. At
                      strength 0, the median is fixed at 50 years. At strength
                      1, it equals observed age.
                    </p>
                    <p>
                      Remaining lifetimes are sampled from a lognormal
                      distribution with log-median ln(<i>m</i>) and log-scale
                      spread 0.3, 0.7, or 1.2. Sample statistics vary slightly
                      with the seed. This convenient teaching model imposes an
                      age relationship; it is not a fitted survival
                      distribution.
                    </p>
                  </>
                )}
              </div>
            </details>
          </section>
        )}
        {hasApplications && (
          <section id="applications" className="reading-section">
            <span className="eyebrow">03 / BEYOND THE EXPERIMENT</span>
            <h2>Where this idea is useful</h2>
            {article.whyItMatters?.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {applicationSections?.map((section) => (
              <div key={section.title}>
                {section.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            ))}
            <div className="reading-applications">
              {article.examples?.map((example) => (
                <div key={example.title}>
                  <h3>{example.title}</h3>
                  <p>{example.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <section id="misconceptions" className="reading-section">
          <span className="eyebrow">CHECK YOUR INTUITION</span>
          <h2>A common misconception</h2>
          <div className="reading-misconception">
            <div>
              <span className="reading-label">THE TEMPTING CONCLUSION</span>
              <p>“{guide.misconception.claim}”</p>
            </div>
            <div>
              <span className="reading-label">THE MORE USEFUL DISTINCTION</span>
              <p>{guide.misconception.correction}</p>
            </div>
          </div>
          {Boolean(article.limitations?.length) && (
            <div className="reading-limits">
              <h3>What this explanation leaves out</h3>
              <ul>
                {article.limitations?.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <section id="reader-question" className="reading-section">
          <span className="eyebrow">ONE MORE QUESTION</span>
          <h2>{guide.question.question}</h2>
          <p>{guide.question.answer}</p>
          <div className="reading-reflection">
            <span className="eyebrow">TAKE THE IDEA WITH YOU</span>
            <p>{guide.reflection}</p>
          </div>
        </section>
        <section id="sources" className="reading-section reading-sources">
          <ThinkerRelationships effect={effect} />
          <h2>Further reading</h2>
          {article.furtherReading && <p>{article.furtherReading}</p>}
          {article.readingLinks?.length ? (
            <ul>
              {article.readingLinks.map((reading) => (
                <li key={reading.url}>
                  <a href={reading.url}>
                    {reading.title} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Use the associated thinker pages to explore the context and
              related concepts. These field notes are an educational
              introduction, not a substitute for the original work.
            </p>
          )}
        </section>
      </article>
    </div>
  );
}
