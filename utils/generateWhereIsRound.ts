import type { ImageSourcePropType } from "react-native";
import { fruitsData } from "@/data/fruitsData";
import { vegeData } from "@/data/vegeData";
import { randomNumber } from "./randomNumber";

export type WhereIsRoundItem = {
  id: string;
  name: string;
  imageUrl: ImageSourcePropType;
  x: number;
  y: number;
};

export type WhereIsRound = {
  items: WhereIsRoundItem[];
  targetId: string;
  targetName: string;
  itemSize: number;
};

const POOL = [...fruitsData, ...vegeData];

const shuffle = <T,>(array: T[]) => [...array].sort(() => Math.random() - 0.5);

type Point = { x: number; y: number };

/** Grid in the right playfield — boy stays on the left, question at the top. */
export const computeWhereIsLayout = (
  screenWidth: number,
  screenHeight: number,
  itemCount: number
): { itemSize: number; positions: Point[] } => {
  const cols = 3;
  const rows = Math.ceil(itemCount / cols);
  const margin = 8;

  const areaX = screenWidth * 0.36;
  const areaY = screenHeight * 0.24;
  const areaW = screenWidth - areaX - margin;
  const areaH = screenHeight - areaY - margin;

  const cellW = areaW / cols;
  const cellH = areaH / rows;
  const itemSize = Math.floor(Math.min(cellW, cellH) * 0.86);

  const positions: Point[] = [];
  for (let index = 0; index < itemCount; index += 1) {
    const col = index % cols;
    const row = Math.floor(index / cols);
    positions.push({
      x: Math.round(areaX + col * cellW + (cellW - itemSize) / 2),
      y: Math.round(areaY + row * cellH + (cellH - itemSize) / 2),
    });
  }

  return { itemSize, positions };
};

export const generateWhereIsRound = (
  screenWidth: number,
  screenHeight: number,
  itemCount = 6
): WhereIsRound => {
  const selected = shuffle(POOL).slice(0, itemCount);
  const { itemSize, positions } = computeWhereIsLayout(
    screenWidth,
    screenHeight,
    itemCount
  );
  const slotOrder = shuffle(positions.map((_, index) => index));

  const items: WhereIsRoundItem[] = selected.map((item, index) => {
    const slot = positions[slotOrder[index]];

    return {
      id: `${item.name}-${index}-${Date.now()}`,
      name: item.name,
      imageUrl: item.imageUrl,
      x: slot.x,
      y: slot.y,
    };
  });

  const target = items[randomNumber({ min: 0, max: items.length - 1 })];

  return {
    items,
    targetId: target.id,
    targetName: target.name,
    itemSize,
  };
};

export const getWhereIsPrompt = (name: string) => `Where is ${name.toLowerCase()}?`;
