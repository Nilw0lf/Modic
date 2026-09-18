import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { effects } from "@/lib/catalog";
export const metadata = pageMetadata(
  "About",
  "Modic is an ongoing interactive field guide to how the world behaves.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <header className="directory-header">
        <span className="eyebrow">ABOUT MODIC</span>
        <h1>
          Less memorizing.
          <br />
          More noticing<span className="accent">.</span>
        </h1>
        <p>An interactive field guide to how the world behaves.</p>
      </header>
      <article className="article-body about-body">
        <section className="article-section">
          <h2>Ideas you can get your hands on.</h2>
          <p>
            Some ideas only become clear when you can change an assumption and
            see what happens. Modic brings that kind of exploration to
            probability, risk, decisions, markets, and complex systems.
          </p>
          <p>
            Each experiment is a small model: a way to make one relationship
            visible. Move a slider, compare outcomes, and look for the point
            where your intuition changes.
          </p>
        </section>
        <section className="article-section">
          <h2>Every model has edges.</h2>
          <p>
            A compelling chart can feel more certain than it should. We make
            assumptions visible, distinguish illustrative results from
            forecasts, and give limitations a place alongside the explanation.
          </p>
          <p>
            The collection currently contains {effects.length} field notes and{" "}
            {effects.filter((effect) => effect.status === "live").length}{" "}
            complete experiments spanning evidence, uncertainty, concentration,
            networks, and risk. Other simulations are marked as planned. Thinker
            associations and reading lists are provisional editorial content
            awaiting source review.
          </p>
        </section>
        <section className="article-section">
          <h2>A growing collection.</h2>
          <p>
            The aim is a useful library of connected ideas, explored with care.
            Follow a category, a thinker, or simply a question that catches your
            attention.
          </p>
          <Link className="text-link" href="/learn">
            Follow the learning path ↗
          </Link>
        </section>
      </article>
    </>
  );
}
