import { categorySchema } from "@/types/catalog";
export const categories = categorySchema.array().parse([
  {
    id: "risk",
    slug: "risk-and-uncertainty",
    name: "Risk & Uncertainty",
    description:
      "Thinking clearly about what we cannot know, and what we stand to lose.",
  },
  {
    id: "decisions",
    slug: "decision-making",
    name: "Decision Making",
    description:
      "Better choices in an uncertain world. Trade-offs, judgment, and the cost of being wrong.",
  },
  {
    id: "probability",
    slug: "probability",
    name: "Probability",
    description:
      "The surprising patterns behind chance, variation, and repeated experiments.",
  },
  {
    id: "markets",
    slug: "markets-and-economics",
    name: "Markets & Economics",
    description:
      "How value, incentives, and exchange shape the systems we live in.",
  },
  {
    id: "complexity",
    slug: "complex-systems",
    name: "Complex Systems",
    description:
      "When many simple interactions create something larger, stranger, and harder to predict.",
  },
  {
    id: "behavior",
    slug: "behavioral-psychology",
    name: "Behavioral Psychology",
    description:
      "The shortcuts and blind spots that shape how we see the world.",
  },
  {
    id: "games",
    slug: "game-theory",
    name: "Game Theory",
    description:
      "What happens when the best choice depends on what everyone else does.",
  },
]);
