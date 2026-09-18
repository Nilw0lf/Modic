import { thinkerSchema } from "@/types/catalog";
export const thinkers = thinkerSchema.array().parse([
  {
    id: "taleb",
    slug: "nassim-nicholas-taleb",
    name: "Nassim Nicholas Taleb",
    description:
      "Essayist and researcher whose work examines uncertainty, rare events, and the fragility of systems. His writing brings questions of survival and risk into everyday decision making.",
    areaIds: ["risk", "complexity"],
  },
  {
    id: "kahneman",
    slug: "daniel-kahneman",
    name: "Daniel Kahneman",
    description:
      "Psychologist whose work with Amos Tversky explored judgment under uncertainty and the ways human choices depart from simple rational models.",
    areaIds: ["behavior", "decisions"],
  },
  {
    id: "tversky",
    slug: "amos-tversky",
    name: "Amos Tversky",
    description:
      "Cognitive psychologist and mathematical psychologist whose research explored similarity, judgment, and decision making under uncertainty.",
    areaIds: ["behavior", "probability"],
  },
  {
    id: "kelly",
    slug: "john-l-kelly-jr",
    name: "John L. Kelly Jr.",
    description:
      "Researcher at Bell Labs associated with information theory and a mathematical approach to capital allocation under repeated risk.",
    areaIds: ["risk", "markets"],
  },
  {
    id: "goodhart",
    slug: "charles-goodhart",
    name: "Charles Goodhart",
    description:
      "Economist whose work on monetary policy is associated with the limits of using statistical regularities as policy targets.",
    areaIds: ["markets", "decisions"],
  },
  {
    id: "mandelbrot",
    slug: "benoit-mandelbrot",
    name: "Benoît Mandelbrot",
    description:
      "Mathematician known for fractal geometry and research on scaling, irregularity, and the behavior of financial prices.",
    areaIds: ["complexity", "markets"],
  },
]);
