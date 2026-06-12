import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { AppText } from "@/components/AppText";
import { AnimatedTile } from "@/components/AnimatedTile";
import { IconFrame } from "@/components/IconFrame";
import { speak } from "@/features/speak";
import { tapFeedback } from "@/features/haptics";
import { getTileSize } from "@/theme/layout";
import { getTilePalette } from "@/theme/tilePalette";
import {
  iconFrameStrongBorderColor,
  iconFrameStrongBorderWidth,
} from "@/theme/iconFrame";

const NUMBER_WORDS: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
  "11": "eleven",
  "12": "twelve",
  "13": "thirteen",
  "14": "fourteen",
  "15": "fifteen",
  "16": "sixteen",
  "17": "seventeen",
  "18": "eighteen",
  "19": "nineteen",
  "20": "twenty",
};

type Props = {
  value: string;
  active: string | null;
  setActive: (value: string | null) => void;
  colorIndex: number;
};

export const NumberTileItem = ({ value, active, setActive, colorIndex }: Props) => {
  const { width } = useWindowDimensions();
  const size = getTileSize(width);
  const palette = getTilePalette(colorIndex);
  const spoken = NUMBER_WORDS[value] ?? value;
  const isActive = active === value;
  const fontSize = value.length > 1 ? size * 0.28 : size * 0.34;

  const handlePress = () => {
    tapFeedback();
    speak(spoken, () => setActive(value), () => setActive(null));
  };

  return (
    <AnimatedTile
      style={styles.container}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={spoken}
      accessibilityState={{ selected: isActive }}
    >
      <IconFrame
        size={size}
        backgroundColor={palette.background}
        borderWidth={isActive ? iconFrameStrongBorderWidth : 3}
        borderColor={isActive ? iconFrameStrongBorderColor : palette.border}
      >
        <AppText weight="bold" style={[styles.value, { color: palette.text, fontSize }]}>
          {value}
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
  value: {
    textAlign: "center",
  },
});
