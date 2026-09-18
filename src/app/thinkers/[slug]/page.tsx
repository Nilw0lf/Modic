import Link from "next/link";
import { notFound } from "next/navigation";
import { thinkers, categories, thinkerGroups } from "@/lib/catalog";
import { relationshipLabels } from "@/types/catalog";
import { EffectCard } from "@/components/effects/EffectCard";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return thinkers.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thinker = thinkers.find((t) => t.slug === slug);
  return thinker
    ? pageMetadata(thinker.name, thinker.description, `/thinkers/${slug}`)
    : {};
}
export default async function ThinkerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thinker = thinkers.find((t) => t.slug === slug);
  if (!thinker) notFound();
  return (
    <>
      <header className="directory-header">
        <Link href="/thinkers" className="back-link">
          ← All thinkers
        </Link>
        <span className="eyebrow">A THINKER IN THE COLLECTION</span>
        <h1>
          {thinker.name}
          <span className="accent">.</span>
        </h1>
        <p>{thinker.description}</p>
        <div className="area-links">
          {categories
            .filter((c) => thinker.areaIds.includes(c.id))
            .map((c) => (
              <Link href={`/categories/${c.slug}`} key={c.id}>
                {c.name} ↗
              </Link>
            ))}
        </div>
      </header>
      {thinkerGroups(thinker.id).map((group) => (
        <section className="thinker-group" key={group.relationship}>
          <h2>{relationshipLabels[group.relationship]}</h2>
          <div className="effect-grid">
            {group.effects.map((effect, index) => (
              <EffectCard effect={effect} key={effect.id} index={index} />
            ))}
          </div>
        </section>
      ))}
      <p className="editorial-note">
        These relationships are provisional editorial associations. They
        distinguish discussion, development, and popularization; they do not
        imply sole invention. Individual attribution records support source
        links as the collection is researched.
      </p>
    </>
  );
}
