import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { ScreenLayout } from "./ScreenLayout";
import { StaggeredEntrance } from "./StaggeredEntrance";
import { VocabularyItem } from "./VocabularyItem";
import type { ScreenThemeKey } from "@/theme/screenThemes";
import type { VocabularyItem as VocabularyItemType } from "@/types/vocabulary";
import { VOCABULARY_GRID_MAX_WIDTH } from "@/theme/responsive";

type Props = {
  items: VocabularyItemType[];
  theme: ScreenThemeKey;
  /** Default scale for all tiles on this screen (e.g. 0.9 for oversized artwork). */
  imageScale?: number;
};

export const VocabularyScreen = ({ items, theme, imageScale }: Props) => {
  const [active, setActive] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  return (
    <ScreenLayout theme={theme}>
      <View
        style={[styles.grid, { maxWidth: Math.min(width, VOCABULARY_GRID_MAX_WIDTH) }]}
      >
        {items.map((item, index) => (
          <StaggeredEntrance key={item.name} index={index}>
            <VocabularyItem
              item={item}
              active={active}
              setActive={setActive}
              imageScale={imageScale}
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
