import { prismEntries } from "@/data/prism-expansion";
import { guide, type ReaderGuide } from "./types";
import { prismPhysicalNotes } from "./prism-physical";
import { prismMindNotes } from "./prism-mind";
import { prismSystemsNotes } from "./prism-systems";
export type PrismNote = [
  string,
  string,
  [string, string, string, string],
  [string, string],
  [string, string],
  string,
];
export const prismGuides: Record<string, ReaderGuide> = Object.fromEntries(
  [...prismPhysicalNotes, ...prismMindNotes, ...prismSystemsNotes].map(
    ([id, read, scenario, misconception, qa, reflection]) => {
      const entry = prismEntries.find((e) => e.id === id)!;
      return [
        id,
        guide(
          entry.idea,
          entry.mechanism,
          read,
          scenario,
          misconception,
          qa,
          reflection,
        ),
      ];
    },
  ),
);
