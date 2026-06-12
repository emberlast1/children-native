import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import type { SortCategory } from "@/types/sortIt";
import { SORT_BASKET_THEMES } from "@/theme/sortBasket";

type Props = {
  category: SortCategory;
  width: number;
  height: number;
};

export const SortBasketVisual = ({ category, width, height }: Props) => {
  const theme = SORT_BASKET_THEMES[category];

  return (
    <View
      style={[
        styles.shell,
        {
          width,
          height,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <Image
        source={theme.basketUrl}
        style={{ width, height }}
        contentFit="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});
