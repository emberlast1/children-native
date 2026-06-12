import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { AppText } from "@/components/AppText";
import { AnimatedTile } from "@/components/AnimatedTile";
import { IconFrame } from "@/components/IconFrame";
import { speak } from "@/features/speak";
import { tapFeedback } from "@/features/haptics";
import type { Letter } from "@/types/letter";
import { getTileSize } from "@/theme/layout";
import { getTilePalette } from "@/theme/tilePalette";
import {
  iconFrameStrongBorderColor,
  iconFrameStrongBorderWidth,
} from "@/theme/iconFrame";

type Props = {
  item: Letter;
  active: string | null;
  setActive: (value: string | null) => void;
  colorIndex: number;
};

export const LetterItem = ({ item, active, setActive, colorIndex }: Props) => {
  const { width } = useWindowDimensions();
  const size = getTileSize(width);
  const palette = getTilePalette(colorIndex);
  const isActive = active === item.name;

  const handlePress = () => {
    tapFeedback();
    speak(item.name, () => setActive(item.name), () => setActive(null));
  };

  return (
    <AnimatedTile
      style={styles.container}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Letter ${item.text}`}
      accessibilityState={{ selected: isActive }}
    >
      <IconFrame
        size={size}
        backgroundColor={palette.background}
        borderWidth={isActive ? iconFrameStrongBorderWidth : 3}
        borderColor={isActive ? iconFrameStrongBorderColor : palette.border}
      >
        <AppText
          weight="bold"
          style={[styles.letterText, { color: palette.text, fontSize: size * 0.34 }]}
        >
          {item.text}
        </AppText>
      </IconFrame>
    </AnimatedTile>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    alignItems: "center",
  },
  letterText: {
    textAlign: "center",
  },
});
