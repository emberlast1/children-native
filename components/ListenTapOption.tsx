import { Image } from "expo-image";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { AnimatedTile } from "@/components/AnimatedTile";
import { IconFrame } from "@/components/IconFrame";
import { getTilePalette } from "@/theme/tilePalette";
import type { ListenTapOption as ListenTapOptionType } from "@/types/listenTap";

type Props = {
  option: ListenTapOptionType;
  size: number;
  shakeKey: number;
  disabled: boolean;
  onPress: () => void;
};

export const ListenTapOption = ({
  option,
  size,
  shakeKey,
  disabled,
  onPress,
}: Props) => {
  const shakeX = useSharedValue(0);
  const borderRadius = Math.round(size * 0.22);

  useEffect(() => {
    if (shakeKey === 0) return;

    shakeX.value = withSequence(
      withTiming(-8, { duration: 45 }),
      withTiming(8, { duration: 45 }),
      withTiming(-6, { duration: 45 }),
      withTiming(6, { duration: 45 }),
      withTiming(0, { duration: 45 })
    );
  }, [shakeKey, shakeX]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const handlePress = () => {
    if (disabled) return;
    onPress();
  };

  let tile: React.ReactNode;

  if (option.kind === "color") {
    tile = (
      <IconFrame
        size={size}
        borderRadius={borderRadius}
        backgroundColor={option.colorHash}
        borderColor={option.borderColor}
        borderWidth={3}
      >
        <View style={styles.gloss} pointerEvents="none" />
      </IconFrame>
    );
  } else {
    const palette = getTilePalette(option.colorIndex);

    tile = (
      <IconFrame
        size={size}
        borderRadius={borderRadius}
        backgroundColor={palette.background}
        borderColor={palette.border}
        borderWidth={3}
      >
        <Image
          source={option.imageUrl}
          style={{ width: size * 0.72, height: size * 0.72 }}
          contentFit="contain"
        />
      </IconFrame>
    );
  }

  return (
    <Animated.View style={[shakeStyle, { width: size, height: size }]}>
      <AnimatedTile
        style={{ width: size, height: size }}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={
          option.kind === "color"
            ? `Color option ${option.name}`
            : `Picture option ${option.name}`
        }
      >
        {tile}
      </AnimatedTile>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
});
