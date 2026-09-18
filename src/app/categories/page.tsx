import Link from "next/link";
import { categories, categoryEffects } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Categories",
  "Seven ways into the collection: probability, decisions, risk, economics, complex systems, psychology, and game theory.",
  "/categories",
);
export default function CategoriesPage() {
  return (
    <>
      <header className="directory-header">
        <span className="eyebrow">FIND YOUR WAY IN</span>
        <h1>
          Many lenses.
          <br />
          One complicated world<span className="accent">.</span>
        </h1>
        <p>
          Ideas don’t stay inside neat boundaries. These are starting points.
        </p>
      </header>
      <div className="directory-list">
        {categories.map((category, index) => {
          const entries = categoryEffects(category.id);
          return (
            <Link
              className="directory-row"
              key={category.id}
              href={`/categories/${category.slug}`}
            >
              <span className="index-label">0{index + 1}</span>
              <div>
                <h2>{category.name}</h2>
                <p>{category.description}</p>
              </div>
              <div className="directory-row-meta">
                <span>
                  {entries.filter((e) => e.status === "live").length} live ·{" "}
                  {entries.filter((e) => e.status === "planned").length} planned
                </span>
                <span aria-hidden="true">↗</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
