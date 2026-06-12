import { animalsData } from "@/data/animalsData";
import { fruitsData } from "@/data/fruitsData";
import { vegeData } from "@/data/vegeData";
import type { SortBasketLayout, SortCategory, SortItItem, SortItRound } from "@/types/sortIt";
import type { VocabularyItem } from "@/types/vocabulary";
import { SORT_IT_SLOT_COUNT } from "./computeSortItLayout";

const ITEMS_PER_CATEGORY = SORT_IT_SLOT_COUNT / 3;

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

const pickItems = (pool: VocabularyItem[], category: SortCategory, count: number) => {
  const selected = shuffle(pool).slice(0, count);

  return selected.map((item, index) => ({
    id: `${category}-${item.name}-${index}`,
    name: item.name,
    imageUrl: item.imageUrl,
    category,
    slotIndex: -1,
  }));
};

export const generateSortItRound = (): SortItRound => {
  const fruits = pickItems(fruitsData, "fruits", ITEMS_PER_CATEGORY);
  const vegetables = pickItems(vegeData, "vegetables", ITEMS_PER_CATEGORY);
  const animals = pickItems(animalsData, "animals", ITEMS_PER_CATEGORY);

  const items = shuffle([...fruits, ...vegetables, ...animals]).map((item, index) => ({
    ...item,
    slotIndex: index,
  }));

  return { items };
};

export const getSortItPrompt = () => "Sort the pictures";

export const findBasketAtPoint = (
  dropX: number,
  dropY: number,
  itemSize: number,
  baskets: SortBasketLayout[]
) => {
  for (const basket of baskets) {
    const centerX = dropX + itemSize / 2;
    const centerY = dropY + itemSize / 2;

    if (
      centerX >= basket.x &&
      centerX <= basket.x + basket.width &&
      centerY >= basket.y &&
      centerY <= basket.y + basket.height
    ) {
      return basket.id;
    }
  }

  return null;
};
