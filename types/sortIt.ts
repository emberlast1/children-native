import type { ImageSourcePropType } from "react-native";

export type SortCategory = "fruits" | "vegetables" | "animals";

export type SortItItem = {
  id: string;
  name: string;
  imageUrl: ImageSourcePropType;
  category: SortCategory;
  slotIndex: number;
};

export type SortBasketLayout = {
  id: SortCategory;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SortItLayout = {
  boardWidth: number;
  itemSize: number;
  baskets: SortBasketLayout[];
  getItemPosition: (slotIndex: number) => { x: number; y: number };
};

export type SortItRound = {
  items: SortItItem[];
};
