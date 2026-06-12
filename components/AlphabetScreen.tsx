import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { alphabetData } from "@/data/alphabetData";
import { LetterItem } from "./LetterItem";
import { ScreenLayout } from "./ScreenLayout";
import { StaggeredEntrance } from "./StaggeredEntrance";
import { VOCABULARY_GRID_MAX_WIDTH } from "@/theme/responsive";

export const AlphabetScreen = () => {
  const [active, setActive] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  return (
    <ScreenLayout theme="alphabet">
      <View
        style={[styles.grid, { maxWidth: Math.min(width, VOCABULARY_GRID_MAX_WIDTH) }]}
      >
        {alphabetData.map((item, index) => (
          <StaggeredEntrance key={item.name} index={index}>
            <LetterItem
              item={item}
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
