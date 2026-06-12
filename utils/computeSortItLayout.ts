import { SORT_BASKET_THEMES } from "@/theme/sortBasket";
import type { SortItLayout } from "@/types/sortIt";
import {
  getGameBoardMaxWidth,
  getSortItItemMaxSize,
  isTabletWidth,
} from "@/theme/responsive";

const SLOT_COUNT = 6;
const SLOT_COLUMNS = 3;
const SORT_CATEGORY_ORDER = ["fruits", "vegetables", "animals"] as const;

export const computeSortItLayout = (screenWidth: number): SortItLayout => {
  const boardWidth = getGameBoardMaxWidth(screenWidth);
  const basketGap = isTabletWidth(screenWidth) ? 6 : 4;
  const basketHeight = isTabletWidth(screenWidth) ? 218 : 198;
  const basketWidth = Math.floor((boardWidth - basketGap * 2) / SORT_CATEGORY_ORDER.length);
  const rowWidth = basketWidth * SORT_CATEGORY_ORDER.length + basketGap * (SORT_CATEGORY_ORDER.length - 1);
  const rowOffset = Math.max(0, Math.floor((boardWidth - rowWidth) / 2));

  const itemSize = Math.min(
    getSortItItemMaxSize(screenWidth),
    Math.floor(basketWidth - 8)
  );
  const trayTop = basketHeight + 28;
  const cellHeight = itemSize + 14;

  const baskets = SORT_CATEGORY_ORDER.map((category, index) => ({
    id: category,
    label: SORT_BASKET_THEMES[category].label,
    x: rowOffset + index * (basketWidth + basketGap),
    y: 0,
    width: basketWidth,
    height: basketHeight,
  }));

  const getItemPosition = (slotIndex: number) => {
    const col = slotIndex % SLOT_COLUMNS;
    const row = Math.floor(slotIndex / SLOT_COLUMNS);

    return {
      x:
        rowOffset +
        col * (basketWidth + basketGap) +
        (basketWidth - itemSize) / 2,
      y: trayTop + row * cellHeight,
    };
  };

  return {
    boardWidth,
    itemSize,
    baskets,
    getItemPosition,
  };
};

export const SORT_IT_SLOT_COUNT = SLOT_COUNT;
