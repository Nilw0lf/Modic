import { notFound } from "next/navigation";
import { effects, getEffect } from "@/lib/catalog";
import { getArticle } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { EffectLayout } from "@/components/effects/EffectLayout";
export function generateStaticParams() {
  return effects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const effect = getEffect((await params).slug);
  return effect
    ? pageMetadata(
        effect.name,
        effect.shortDescription,
        `/effects/${effect.slug}`,
      )
    : {};
}
export default async function EffectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const effect = getEffect((await params).slug);
  if (!effect) notFound();
  return <EffectLayout effect={effect} article={getArticle(effect.slug)} />;
}
