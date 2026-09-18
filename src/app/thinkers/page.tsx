import Link from "next/link";
import { thinkers, effects, categories } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Thinkers",
  "Meet some of the people connected to ideas in the Modic field guide.",
  "/thinkers",
);
export default function ThinkersPage() {
  return (
    <>
      <header className="directory-header">
        <span className="eyebrow">PEOPLE BEHIND THE QUESTIONS</span>
        <h1>
          Ideas have company<span className="accent">.</span>
        </h1>
        <p>
          A directory of thinkers and the ideas they developed, discussed, and
          helped bring into view.
        </p>
        <span className="small-note">
          Seed editorial content · attribution review in progress
        </span>
      </header>
      <div className="directory-list">
        {[...thinkers]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((thinker, index) => (
            <Link
              key={thinker.id}
              className="directory-row"
              href={`/thinkers/${thinker.slug}`}
            >
              <span className="index-label">0{index + 1}</span>
              <div>
                <h2>{thinker.name}</h2>
                <p>{thinker.description}</p>
                <span className="card-categories">
                  {categories
                    .filter((c) => thinker.areaIds.includes(c.id))
                    .map((c) => c.name)
                    .join(" / ")}
                </span>
              </div>
              <div className="directory-row-meta">
                <span>
                  {
                    effects.filter((e) =>
                      e.thinkerRelationships.some(
                        (r) => r.thinkerId === thinker.id,
                      ),
                    ).length
                  }{" "}
                  ideas
                </span>
                <span aria-hidden="true">↗</span>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
