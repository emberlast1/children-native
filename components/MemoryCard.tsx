import { Image } from "expo-image";
import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AppText } from "@/components/AppText";
import { IconFrame } from "@/components/IconFrame";
import type { MemoryCard as MemoryCardType } from "@/types/memory";
import { getTilePalette } from "@/theme/tilePalette";
import { iconFrameStrongBorderWidth } from "@/theme/iconFrame";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MATCH_BORDER_COLOR = "#6BCB77";

type Props = {
  card: MemoryCardType;
  size: number;
  isFaceUp: boolean;
  isMatched: boolean;
  disabled: boolean;
  onPress: () => void;
};

export const MemoryCard = ({
  card,
  size,
  isFaceUp,
  isMatched,
  disabled,
  onPress,
}: Props) => {
  const scale = useSharedValue(1);
  const flipScale = useSharedValue(1);
  const palette = getTilePalette(card.backColorIndex);

  useEffect(() => {
    flipScale.value = withSequence(
      withTiming(0.92, { duration: 90 }),
      withTiming(1, { duration: 140 })
    );
  }, [flipScale, isFaceUp]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * flipScale.value }],
  }));

  const showFront = isFaceUp || isMatched;
  const borderRadius = Math.round(size * 0.22);
  const borderWidth = isMatched ? iconFrameStrongBorderWidth : 3;
  const borderColor = isMatched ? MATCH_BORDER_COLOR : palette.border;

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled || isMatched || isFaceUp}
      style={[styles.card, animatedStyle]}
      onPressIn={() => {
        scale.value = withSpring(0.94, { damping: 14, stiffness: 420 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 340 });
      }}
      accessibilityRole="button"
      accessibilityLabel={
        showFront ? `${card.name} card` : "Hidden memory card"
      }
      accessibilityState={{ selected: showFront }}
    >
      <IconFrame
        size={size}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        borderColor={borderColor}
        backgroundColor={palette.background}
      >
        {showFront ? (
          <Image
            source={card.imageUrl}
            style={{ width: size * 0.72, height: size * 0.72 }}
            contentFit="contain"
          />
        ) : (
          <AppText
            weight="bold"
            style={[
              styles.backMark,
              { color: palette.text, fontSize: Math.max(28, size * 0.34) },
            ]}
          >
            ?
          </AppText>
        )}
      </IconFrame>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  backMark: {
    textAlign: "center",
  },
});
