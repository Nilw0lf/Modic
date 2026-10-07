import { coreGuides } from "./core";
import { foundationGuides } from "./foundations";
import { strategyGuides } from "./strategy";
import { playGuides } from "./play";
import { atlasGuides } from "./atlas";
import { simpleGuides } from "./simple";
import { discoveryGuides } from "./discovery";
import { frontierGuides } from "./frontier";
import type { ReaderGuide } from "./types";

export const readerGuides: Record<string, ReaderGuide> = {
  ...coreGuides,
  ...foundationGuides,
  ...strategyGuides,
  ...playGuides,
  ...atlasGuides,
  ...simpleGuides,
  ...discoveryGuides,
  ...frontierGuides,
};
