import { animalsData } from "@/data/animalsData";
import { fruitsData } from "@/data/fruitsData";
import type { MemoryCard } from "@/types/memory";
import type { VocabularyItem } from "@/types/vocabulary";
import { TILE_PALETTE } from "@/theme/tilePalette";
import { randomNumber } from "./randomNumber";

const POOL: VocabularyItem[] = [...animalsData, ...fruitsData];
const COLOR_COUNT = TILE_PALETTE.length;

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

const withRandomBackColor = (card: Omit<MemoryCard, "backColorIndex">): MemoryCard => ({
  ...card,
  backColorIndex: randomNumber({ min: 0, max: COLOR_COUNT - 1 }),
});

export const generateMemoryBoard = (pairCount = 4): MemoryCard[] => {
  const selected = shuffle(POOL).slice(0, pairCount);

  const cards = selected.flatMap((item, index) => {
    const pairId = `${item.name}-${index}`;

    return [
      withRandomBackColor({
        id: `${pairId}-a`,
        pairId,
        kind: "image",
        name: item.name,
        imageUrl: item.imageUrl,
      }),
      withRandomBackColor({
        id: `${pairId}-b`,
        pairId,
        kind: "image",
        name: item.name,
        imageUrl: item.imageUrl,
      }),
    ];
  });

  return shuffle(cards);
};
