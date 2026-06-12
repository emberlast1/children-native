import { Image } from "expo-image";
import React from "react";
import type { ImageSourcePropType } from "react-native";

type Props = {
  source: ImageSourcePropType;
  size: number;
};

export const SortItItemImage = ({ source, size }: Props) => (
  <Image
    source={source}
    style={{ width: size, height: size }}
    contentFit="contain"
  />
);
