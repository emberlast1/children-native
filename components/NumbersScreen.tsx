import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { numbersData } from "@/data/numbersData";
import { NumberTileItem } from "./NumberTileItem";
import { ScreenLayout } from "./ScreenLayout";
import { StaggeredEntrance } from "./StaggeredEntrance";
import { VOCABULARY_GRID_MAX_WIDTH } from "@/theme/responsive";

export const NumbersScreen = () => {
  const [active, setActive] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  return (
    <ScreenLayout theme="numbers">
      <View
        style={[styles.grid, { maxWidth: Math.min(width, VOCABULARY_GRID_MAX_WIDTH) }]}
      >
        {numbersData.map((item, index) => (
          <StaggeredEntrance key={item.name} index={index}>
            <NumberTileItem
              value={item.name}
              active={active}
              setActive={setActive}
              colorIndex={index}
            />
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
    overflow: "visible",
  },
});
