import type { Category, Effect, Thinker } from "@/types/catalog";
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "");
export function filterEffects(
  effects: Effect[],
  categories: Category[],
  thinkers: Thinker[],
  query: string,
  categoryId = "all",
  experimentType = "all",
) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return effects.filter((effect) => {
    if (experimentType !== "all" && effect.experimentType !== experimentType)
      return false;
    if (categoryId !== "all" && !effect.categoryIds.includes(categoryId))
      return false;
    const haystack = normalize(
      [
        effect.name,
        effect.shortDescription,
        ...categories
          .filter((category) => effect.categoryIds.includes(category.id))
          .map((category) => category.name),
        ...thinkers
          .filter((thinker) =>
            effect.thinkerRelationships.some(
              (link) => link.thinkerId === thinker.id,
            ),
          )
          .map((thinker) => thinker.name),
      ].join(" "),
    );
    return terms.every((term) => haystack.includes(term));
  });
}
