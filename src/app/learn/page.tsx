import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { learningPath } from "@/data/learning";
import { effects } from "@/lib/catalog";
import { Glossary } from "@/components/learning/Glossary";
export const metadata = pageMetadata(
  "Learn",
  "A guided path through six interactive experiments, with a glossary of the ideas along the way.",
  "/learn",
);
export default function LearnPage() {
  return (
    <>
      <header className="learning-hero">
        <span className="eyebrow">A PATH THROUGH THE IDEAS</span>
        <h1>
          Build intuition.
          <br />
          <em>One experiment at a time.</em>
        </h1>
        <p>
          Start with a signal. Learn to question an average. End with the
          difference between doing well and being able to continue.
        </p>
        <div className="hero-actions">
          <Link
            className="modic-action primary"
            href={"/effects/" + learningPath[0].slug}
          >
            Begin the first experiment <span aria-hidden="true">↗︎</span>
          </Link>
          <a className="hero-browse" href="#glossary">
            Jump to the glossary ↓
          </a>
        </div>
        <p className="small-note">
          6 experiments · about 27 minutes · no prerequisites
        </p>
      </header>
      <section className="learning-path" aria-labelledby="path-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR ROUTE</span>
            <h2 id="path-heading">From evidence to consequences.</h2>
          </div>
          <span className="small-note">Follow in order, or take a detour.</span>
        </div>
        <ol>
          {learningPath.map((step, i) => (
            <li key={step.slug}>
              <span className="path-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="eyebrow">
                  {effects.find((e) => e.slug === step.slug)?.name} ·{" "}
                  {step.minutes} MIN
                </span>
                <h3>
                  <Link href={"/effects/" + step.slug}>
                    {step.title} <span aria-hidden="true">↗︎</span>
                  </Link>
                </h3>
                <p>{step.question}</p>
                <p className="path-task">{step.task}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <Glossary />
    </>
  );
}
