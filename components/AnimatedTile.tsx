import React, { useRef, type ReactNode } from "react";
import {
  Platform,
  Pressable,
  type PressableProps,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const noHighlightStyle = Platform.select<ViewStyle>({
  web: {
    outlineStyle: "solid",
    outlineWidth: 0,
    // @ts-expect-error RN web supports WebkitTapHighlightColor
    WebkitTapHighlightColor: "transparent",
  },
  default: {},
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RESET_MS = 300;
const SQUASH_MS = 70;
const BOUNCE_MS = 110;
const SETTLE_MS = RESET_MS - SQUASH_MS - BOUNCE_MS;

type Props = {
  children: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
} & Pick<PressableProps, "accessibilityLabel" | "accessibilityRole" | "accessibilityState">;

export const AnimatedTile = ({
  children,
  onPress,
  style,
  contentStyle,
  ...accessibility
}: Props) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const translateY = useSharedValue(0);
  const didPress = useRef(false);

  const resetMotion = () => {
    cancelAnimation(scale);
    cancelAnimation(rotate);
    cancelAnimation(translateY);
    scale.value = 1;
    rotate.value = 0;
    translateY.value = 0;
  };

  const playHappyTap = () => {
    cancelAnimation(scale);
    cancelAnimation(rotate);
    cancelAnimation(translateY);

    scale.value = withSequence(
      withTiming(0.88, { duration: SQUASH_MS, easing: Easing.out(Easing.quad) }),
      withTiming(1.06, { duration: BOUNCE_MS, easing: Easing.out(Easing.back(1.35)) }),
      withTiming(1, { duration: SETTLE_MS, easing: Easing.inOut(Easing.quad) })
    );

    rotate.value = withSequence(
      withTiming(-8, { duration: 80 }),
      withTiming(8, { duration: 80 }),
      withTiming(0, { duration: RESET_MS - 160 })
    );

    translateY.value = withSequence(
      withTiming(4, { duration: SQUASH_MS }),
      withTiming(-10, { duration: BOUNCE_MS }),
      withTiming(0, { duration: SETTLE_MS })
    );
  };

  const handlePressIn = () => {
    didPress.current = false;
    cancelAnimation(scale);
    cancelAnimation(rotate);
    scale.value = withTiming(0.9, { duration: 60 });
    rotate.value = withTiming(-4, { duration: 60 });
  };

  const handlePressOut = () => {
    if (didPress.current) return;
    resetMotion();
  };

  const handlePress = () => {
    didPress.current = true;
    playHappyTap();
    onPress();
  };

  const tileStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.wrapper, style, tileStyle]}>
      <AnimatedPressable
        android_ripple={{ color: "transparent" }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[styles.pressable, noHighlightStyle, contentStyle]}
        {...accessibility}
      >
        {children}
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
  },
});
