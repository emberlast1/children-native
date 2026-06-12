import type { ImageSourcePropType } from "react-native";

export type VocabularyItem = {
  imageUrl: ImageSourcePropType;
  name: string;
  /** Smaller than 1 shrinks the picture inside the tile (for oversized artwork). */
  imageScale?: number;
};

export type CountAnimalItem = VocabularyItem & {
  plural: string;
};
