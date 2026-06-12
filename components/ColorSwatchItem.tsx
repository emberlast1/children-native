import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { AppText } from "@/components/AppText";
import { AnimatedTile } from "@/components/AnimatedTile";
import { IconFrame } from "@/components/IconFrame";
import { speak } from "@/features/speak";
import { tapFeedback } from "@/features/haptics";
import type { ColorSwatchItem as ColorItem } from "@/types/labeledItem";
import { getColorCardSize } from "@/theme/responsive";
import {
  iconFrameStrongBorderColor,
  iconFrameStrongBorderWidth,
} from "@/theme/iconFrame";

type Props = {
  item: ColorItem;
  active: string | null;
  setActive: (value: string | null) => void;
};

const isLightColor = (hex: string) => {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
};

export const ColorSwatchItem = ({ item, active, setActive }: Props) => {
  const { width: screenWidth } = useWindowDimensions();
  const { width: cardWidth, height: cardHeight } = getColorCardSize(screenWidth);
  const isActive = active === item.name;
  const light = isLightColor(item.colorHash);
  const borderRadius = Math.round(cardWidth * 0.22);

  const handlePress = () => {
    tapFeedback();
    speak(item.name, () => setActive(item.name), () => setActive(null));
  };

  return (
    <AnimatedTile
      style={[styles.wrap, { width: cardWidth, height: cardHeight }]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={item.name}
      accessibilityState={{ selected: isActive }}
    >
      <IconFrame
        size={cardWidth}
        height={cardHeight}
        borderRadius={borderRadius}
        backgroundColor={item.colorHash}
        borderWidth={isActive ? iconFrameStrongBorderWidth : 3}
        borderColor={isActive ? iconFrameStrongBorderColor : item.borderColor}
      >
        <View style={styles.gloss} pointerEvents="none" />
        <View
          style={[
            styles.nameBadge,
            light ? styles.nameBadgeLight : styles.nameBadgeDark,
          ]}
        >
          <AppText
            weight="bold"
            outlined={false}
            style={[styles.nameText, light ? styles.nameTextDark : styles.nameTextLight]}
          >
            {item.name}
          </AppText>
        </View>
      </IconFrame>
    </AnimatedTile>
  );
};

const styles = StyleSheet.create({
  wrap: {
    margin: 6,
  },
  gloss: {
    position: "absolute",
    top: "8%",
    left: "12%",
    right: "12%",
    height: "34%",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    backgroundColor: "rgba(255,255,255,0.28)",
  },
  nameBadge: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 2,
  },
  nameBadgeLight: {
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  nameBadgeDark: {
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  nameText: {
    fontSize: 15,
    textAlign: "center",
  },
  nameTextLight: {
    color: "#FFFFFF",
  },
  nameTextDark: {
    color: "#333333",
  },
});
