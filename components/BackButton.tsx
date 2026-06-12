import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { IconFrame } from "@/components/IconFrame";
import { tapFeedback } from "@/features/haptics";
import { useGoBackHome } from "@/features/goBackHome";
import { colors } from "@/theme/colors";
import {
  iconFrameStrongBorderColor,
  iconFrameStrongBorderWidth,
} from "@/theme/iconFrame";

const BUTTON_SIZE = 58;

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
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: "default" | "overlay";
};

export const BackButton = ({
  onPress,
  style,
  variant = "default",
}: Props) => {
  const goBackHome = useGoBackHome();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    tapFeedback();
    if (onPress) {
      onPress();
      return;
    }
    goBackHome();
  };

  return (
    <AnimatedPressable
      android_ripple={{ color: "transparent" }}
      style={[
        styles.button,
        variant === "default" && styles.default,
        noHighlightStyle,
        animatedStyle,
        style,
      ]}
      hitSlop={12}
      onPressIn={() => {
        scale.value = withSpring(0.88, { damping: 14, stiffness: 420 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 340 });
      }}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <IconFrame
        size={BUTTON_SIZE}
        borderWidth={iconFrameStrongBorderWidth}
        borderColor={iconFrameStrongBorderColor}
      >
        <Ionicons name="home" size={28} color={colors.primary} />
      </IconFrame>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },
  default: {
    marginTop: 8,
    marginBottom: 10,
  },
});
