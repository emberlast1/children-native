import type { ImageSourcePropType } from "react-native";

export type MemoryCard = {
  id: string;
  pairId: string;
  kind: "image";
  name: string;
  imageUrl: ImageSourcePropType;
  backColorIndex: number;
};
