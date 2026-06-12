import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { colorData } from "@/data/colorData";
import { ColorSwatchItem } from "./ColorSwatchItem";
import { ScreenLayout } from "./ScreenLayout";
import { COLORS_GRID_MAX_WIDTH } from "@/theme/responsive";
import { StaggeredEntrance } from "./StaggeredEntrance";

export const ColorsScreen = () => {
  const [active, setActive] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  return (
    <ScreenLayout theme="colors">
      <View style={[styles.grid, { maxWidth: Math.min(width, COLORS_GRID_MAX_WIDTH) }]}>
        {colorData.map((item, index) => (
          <StaggeredEntrance key={item.name} index={index}>
            <ColorSwatchItem item={item} active={active} setActive={setActive} />
          </StaggeredEntrance>
        ))}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 4,
    width: "100%",
  },
});
