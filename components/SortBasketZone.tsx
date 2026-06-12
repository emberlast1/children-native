import React from "react";
import { StyleSheet, View } from "react-native";
import { SortItItemImage } from "@/components/SortItItemImage";
import { SortBasketVisual } from "@/components/SortBasketVisual";
import type { SortBasketLayout, SortItItem } from "@/types/sortIt";

type Props = {
  basket: SortBasketLayout;
  sortedItems: SortItItem[];
  itemSize: number;
};

export const SortBasketZone = ({
  basket,
  sortedItems,
  itemSize,
}: Props) => {
  const thumbSize = Math.max(28, itemSize * 0.42);
  const sortedTop = Math.max(8, Math.round(basket.height * 0.18));

  return (
    <View
      style={[
        styles.zone,
        {
          left: basket.x,
          top: basket.y,
          width: basket.width,
          height: basket.height,
        },
      ]}
    >
      <SortBasketVisual
        category={basket.id}
        width={basket.width}
        height={basket.height}
      />

      <View
        pointerEvents="none"
        style={[
          styles.sortedOverlay,
          {
            width: basket.width,
            height: basket.height,
            paddingTop: sortedTop,
            paddingHorizontal: Math.max(8, basket.width * 0.12),
          },
        ]}
      >
        {sortedItems.map((sorted) => (
          <SortItItemImage
            key={sorted.id}
            source={sorted.imageUrl}
            size={thumbSize}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  zone: {
    position: "absolute",
    zIndex: 10,
  },
  sortedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    gap: 4,
  },
});
