import { BlurView } from "expo-blur";
import React, { type ReactNode } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { iconFrameBorderColor, iconFrameStyles } from "@/theme/iconFrame";

type Props = {
  onPress: () => void;
  children: ReactNode;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

export const GamePillButton = ({
  onPress,
  children,
  accessibilityLabel,
  style,
}: Props) => (
  <Pressable
    onPress={onPress}
    style={[styles.hit, style]}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
  >
    <View style={[iconFrameStyles.frame, styles.frame]}>
      {Platform.OS === "web" ? null : (
        <BlurView intensity={55} tint="light" style={StyleSheet.absoluteFillObject} />
      )}
      <View style={styles.content}>{children}</View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  hit: {
    alignSelf: "center",
  },
  frame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderColor: iconFrameBorderColor,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    zIndex: 2,
  },
});
