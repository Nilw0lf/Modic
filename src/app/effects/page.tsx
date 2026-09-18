import { EffectExplorer } from "@/components/effects/EffectExplorer";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "The collection",
  "Explore interactive experiments and field notes on probability, risk, decisions, and complex systems.",
  "/effects",
);
export default function EffectsPage() {
  return (
    <>
      <header className="directory-header">
        <span className="eyebrow">THE FIELD GUIDE</span>
        <h1>
          A world of ideas<span className="accent">.</span>
        </h1>
        <p>Useful lenses for a complicated world. Start anywhere.</p>
      </header>
      <EffectExplorer />
    </>
  );
}
