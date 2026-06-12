import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import { AppText } from "@/components/AppText";
import { IconFrame } from "@/components/IconFrame";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { getTilePalette } from "@/theme/tilePalette";

const noHighlightStyle = Platform.select({
  web: {
    outlineStyle: "solid" as const,
    outlineWidth: 0,
    // @ts-expect-error RN web supports WebkitTapHighlightColor
    WebkitTapHighlightColor: "transparent",
  },
  default: {},
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  value: number;
  colorIndex: number;
  size: number;
  onPress: () => void;
};

export const GameAnswerButton = ({ value, colorIndex, size, onPress }: Props) => {
  const scale = useSharedValue(1);
  const palette = getTilePalette(colorIndex);
  const fontSize = value >= 10 ? size * 0.28 : size * 0.34;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      android_ripple={{ color: "transparent" }}
      style={[styles.button, noHighlightStyle, animatedStyle]}
      onPressIn={() => {
        scale.value = withSpring(0.94, { damping: 14, stiffness: 420 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 340 });
      }}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Answer ${value}`}
    >
      <IconFrame
        size={size}
        backgroundColor={palette.background}
        borderWidth={3}
        borderColor={palette.border}
      >
        <AppText weight="bold" style={[styles.text, { color: palette.text, fontSize }]}>
          {value}
        </AppText>
      </IconFrame>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 4,
  },
  text: {
    textAlign: "center",
  },
});

export const gameAnswerOptionsStyle = StyleSheet.create({
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
}).options;
