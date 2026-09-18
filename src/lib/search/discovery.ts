import type { Effect } from "@/types/catalog";
export function collectionSummary(effects: Effect[]) {
  const live = effects.filter((effect) => effect.status === "live").length;
  return `${effects.length} ideas · ${live} interactive · ${effects.length - live} in development`;
}
export function chooseLiveEffect(
  effects: Effect[],
  random = Math.random,
): Effect | undefined {
  const live = effects.filter((effect) => effect.status === "live");
  return live.length
    ? live[
        Math.min(
          live.length - 1,
          Math.max(0, Math.floor(random() * live.length)),
        )
      ]
    : undefined;
}
