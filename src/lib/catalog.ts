import { categories } from "@/data/categories";
import { effects } from "@/data/effects";
import { thinkers } from "@/data/thinkers";
import { relationshipTypes } from "@/types/catalog";
export { categories, effects, thinkers };
export const getEffect = (slug: string) =>
  effects.find((effect) => effect.slug === slug);
export const categoryEffects = (id: string) =>
  effects.filter((effect) => effect.categoryIds.includes(id));
export function thinkerGroups(id: string) {
  return relationshipTypes
    .map((relationship) => ({
      relationship,
      effects: effects.filter((effect) =>
        effect.thinkerRelationships.some(
          (link) => link.thinkerId === id && link.relationship === relationship,
        ),
      ),
    }))
    .filter((group) => group.effects.length);
}
export function validateCatalog() {
  const assertUnique = (values: string[]) => {
    if (new Set(values).size !== values.length)
      throw new Error("Duplicate catalog identifier");
  };
  for (const collection of [effects, categories, thinkers]) {
    assertUnique(collection.map((item) => item.id));
    assertUnique(collection.map((item) => item.slug));
  }
  assertUnique(
    effects.flatMap((effect) =>
      effect.thinkerRelationships.map((link) => link.id),
    ),
  );
  for (const effect of effects) {
    if (
      effect.categoryIds.some(
        (id) => !categories.some((category) => category.id === id),
      )
    )
      throw new Error(`Unknown category: ${effect.id}`);
    if (
      effect.relatedEffectIds.some(
        (id) =>
          id === effect.id || !effects.some((related) => related.id === id),
      )
    )
      throw new Error(`Invalid related effect: ${effect.id}`);
    if (
      effect.thinkerRelationships.some(
        (link) => !thinkers.some((thinker) => thinker.id === link.thinkerId),
      )
    )
      throw new Error(`Unknown thinker: ${effect.id}`);
    if (effect.status === "live" && !effect.simulationType)
      throw new Error(`Missing simulation: ${effect.id}`);
  }
  for (const thinker of thinkers)
    if (
      thinker.areaIds.some(
        (id) => !categories.some((category) => category.id === id),
      )
    )
      throw new Error(`Unknown thinker area: ${thinker.id}`);
  return true;
}
validateCatalog();
