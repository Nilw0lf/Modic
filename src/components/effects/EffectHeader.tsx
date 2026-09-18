import Link from "next/link";
import type { Effect } from "@/types/catalog";
import { categories } from "@/data/categories";
export function EffectHeader({ effect }: { effect: Effect }) {
  return (
    <header className="effect-header">
      <Link href="/effects" className="back-link">
        ← The collection
      </Link>
      <div className="effect-eyebrow">
        {effect.categoryIds.map((id) => (
          <Link
            key={id}
            href={`/categories/${categories.find((c) => c.id === id)!.slug}`}
          >
            {categories.find((c) => c.id === id)!.name}
          </Link>
        ))}
      </div>
      <h1>
        {effect.name}
        <span className="accent">.</span>
      </h1>
      <p className="effect-deck">{effect.shortDescription}</p>
      <div className="effect-meta">
        <span className={`status ${effect.status}`}>
          {effect.status === "live"
            ? "Interactive experiment"
            : "Simulation planned"}
        </span>
        <span>{effect.difficulty}</span>
        <span>
          Field note{" "}
          {effect.id === "lindy" ? "001" : effect.id === "ruin" ? "002" : "·"}
        </span>
      </div>
    </header>
  );
}
