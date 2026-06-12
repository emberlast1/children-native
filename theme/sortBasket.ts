import type { ImageSourcePropType } from "react-native";
import type { SortCategory } from "@/types/sortIt";

export type SortBasketTheme = {
  label: string;
  basketUrl: ImageSourcePropType;
  shadow: string;
};

export const SORT_BASKET_THEMES: Record<SortCategory, SortBasketTheme> = {
  fruits: {
    label: "Fruits",
    basketUrl: require("../assets/images/sort-it/basket-fruits.png"),
    shadow: "#C73E3E",
  },
  vegetables: {
    label: "Vegetables",
    basketUrl: require("../assets/images/sort-it/basket-vegetables.png"),
    shadow: "#2E9E4F",
  },
  animals: {
    label: "Animals",
    basketUrl: require("../assets/images/sort-it/basket-animals.png"),
    shadow: "#2E7FD4",
  },
};
