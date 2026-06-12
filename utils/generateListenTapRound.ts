import { animalsData } from "@/data/animalsData";
import { colorData } from "@/data/colorData";
import { fruitsData } from "@/data/fruitsData";
import { vegeData } from "@/data/vegeData";
import { TILE_PALETTE } from "@/theme/tilePalette";
import type {
  ListenTapColorOption,
  ListenTapImageOption,
  ListenTapOption,
  ListenTapRound,
} from "@/types/listenTap";
import type { VocabularyItem } from "@/types/vocabulary";
import { randomNumber } from "./randomNumber";

const IMAGE_POOL: VocabularyItem[] = [...animalsData, ...fruitsData, ...vegeData];
const OPTION_COUNT = 4;
const COLOR_COUNT = TILE_PALETTE.length;

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

const pickUnique = <T,>(
  pool: T[],
  count: number,
  isSame: (a: T, b: T) => boolean
): T[] => {
  const shuffled = shuffle(pool);
  const picked: T[] = [];

  for (const item of shuffled) {
    if (picked.some((existing) => isSame(existing, item))) continue;
    picked.push(item);
    if (picked.length === count) break;
  }

  return picked;
};

const buildColorRound = (): ListenTapRound => {
  const selected = pickUnique(colorData, OPTION_COUNT, (a, b) => a.name === b.name);
  const target = selected[randomNumber({ min: 0, max: selected.length - 1 })];

  const options: ListenTapColorOption[] = selected.map((item, index) => ({
    kind: "color",
    id: `color-${item.name}-${index}`,
    name: item.name,
    colorHash: item.colorHash,
    borderColor: item.borderColor,
  }));

  return {
    targetName: target.name,
    options: shuffle(options),
  };
};

const buildImageRound = (): ListenTapRound => {
  const selected = pickUnique(IMAGE_POOL, OPTION_COUNT, (a, b) => a.name === b.name);
  const target = selected[randomNumber({ min: 0, max: selected.length - 1 })];

  const options: ListenTapImageOption[] = selected.map((item, index) => ({
    kind: "image",
    id: `image-${item.name}-${index}`,
    name: item.name,
    imageUrl: item.imageUrl,
    colorIndex: randomNumber({ min: 0, max: COLOR_COUNT - 1 }),
  }));

  return {
    targetName: target.name,
    options: shuffle(options),
  };
};

export const generateListenTapRound = (): ListenTapRound =>
  randomNumber({ min: 0, max: 1 }) === 0 ? buildColorRound() : buildImageRound();

export const isCorrectListenTapAnswer = (
  round: ListenTapRound,
  option: ListenTapOption
) => option.name === round.targetName;
