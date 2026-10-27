import { coreGuides } from "./core";
import { foundationGuides } from "./foundations";
import { strategyGuides } from "./strategy";
import { playGuides } from "./play";
import { atlasGuides } from "./atlas";
import { simpleGuides } from "./simple";
import { discoveryGuides } from "./discovery";
import { frontierGuides } from "./frontier";
import { financeGuides } from "./finance";
import { philosophyGuides } from "./philosophy";
import type { ReaderGuide } from "./types";
import { depthGuides } from "./depth";
import { horizonGuides } from "./horizons";
import { mosaicGuides } from "./mosaic";

export const readerGuides: Record<string, ReaderGuide> = {
  ...mosaicGuides,
  ...horizonGuides,
  ...depthGuides,
  ...coreGuides,
  ...foundationGuides,
  ...strategyGuides,
  ...playGuides,
  ...atlasGuides,
  ...simpleGuides,
  ...discoveryGuides,
  ...frontierGuides,
  ...financeGuides,
  ...philosophyGuides,
};
