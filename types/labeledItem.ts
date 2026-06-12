import type { ImageSourcePropType } from "react-native";

export type LabeledColorItem = {
  colorHash: string;
  name: string;
  borderColor?: string;
};

export type DayItem = LabeledColorItem & {
  imageUrl: ImageSourcePropType;
  displayName?: string;
};

export type ColorSwatchItem = LabeledColorItem & {
  borderColor: string;
};
