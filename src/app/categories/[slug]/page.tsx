import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryEffects, thinkers } from "@/lib/catalog";
import { EffectCard } from "@/components/effects/EffectCard";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = categories.find((c) => c.slug === slug);
  return item
    ? pageMetadata(item.name, item.description, `/categories/${slug}`)
    : {};
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const entries = categoryEffects(category.id);
  const related = thinkers.filter((t) =>
    entries.some((e) =>
      e.thinkerRelationships.some((r) => r.thinkerId === t.id),
    ),
  );
  return (
    <>
      <header className="directory-header">
        <Link href="/categories" className="back-link">
          ← All categories
        </Link>
        <span className="eyebrow">A WAY OF LOOKING</span>
        <h1>
          {category.name}
          <span className="accent">.</span>
        </h1>
        <p>{category.description}</p>
        <span className="small-note">
          {entries.filter((e) => e.status === "live").length} live experiment ·{" "}
          {entries.filter((e) => e.status === "planned").length} planned
        </span>
      </header>
      <div className="effect-grid">
        {entries.map((effect, index) => (
          <EffectCard key={effect.id} effect={effect} index={index} />
        ))}
      </div>
      {related.length > 0 && (
        <section className="related-thinkers">
          <h2>Related thinkers</h2>
          {related.map((t) => (
            <Link key={t.id} href={`/thinkers/${t.slug}`}>
              {t.name} ↗
            </Link>
          ))}
        </section>
      )}
    </>
  );
}
