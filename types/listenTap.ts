import type { ImageSourcePropType } from "react-native";

export type ListenTapColorOption = {
  kind: "color";
  id: string;
  name: string;
  colorHash: string;
  borderColor: string;
};

export type ListenTapImageOption = {
  kind: "image";
  id: string;
  name: string;
  imageUrl: ImageSourcePropType;
  colorIndex: number;
};

export type ListenTapOption = ListenTapColorOption | ListenTapImageOption;

export type ListenTapRound = {
  targetName: string;
  options: ListenTapOption[];
};
