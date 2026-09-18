import Link from "next/link";
import { EffectExplorer } from "@/components/effects/EffectExplorer";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Explore",
  "Follow connections between effects, thinkers, and categories.",
  "/explore",
);
export default function ExplorePage() {
  return (
    <>
      <header className="directory-header">
        <span className="eyebrow">CHOOSE A THREAD</span>
        <h1>
          Where will an idea take you<span className="accent">?</span>
        </h1>
        <p>Browse by curiosity, or start with the first live experiment.</p>
        <Link href="/effects/lindy-effect" className="text-link">
          Start with the Lindy Effect ↗
        </Link>
      </header>
      <EffectExplorer />
    </>
  );
}
