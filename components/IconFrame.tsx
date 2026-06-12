import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { type ReactNode } from "react";
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  iconFrameRadius,
  iconFrameShadowStyle,
  iconFrameStyles,
} from "@/theme/iconFrame";

type Props = {
  size: number;
  height?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
};

export const IconFrame = ({
  size,
  height,
  children,
  style,
  borderRadius,
  borderWidth,
  borderColor,
  backgroundColor,
}: Props) => {
  const frameHeight = height ?? size;
  const radius = borderRadius ?? iconFrameRadius(size);
  const hasCustomBackground = backgroundColor != null;
  const frameDimensions = { width: size, height: frameHeight };

  return (
    <View
      style={[
        iconFrameStyles.shell,
        iconFrameShadowStyle(size),
        frameDimensions,
        { borderRadius: radius },
        style,
      ]}
    >
      <View
        style={[
          iconFrameStyles.frame,
          frameDimensions,
          {
            borderRadius: radius,
            ...(borderWidth != null ? { borderWidth } : null),
            ...(borderColor != null ? { borderColor } : null),
            ...(hasCustomBackground ? { backgroundColor } : null),
          },
        ]}
      >
        {Platform.OS === "web" || hasCustomBackground ? null : (
          <BlurView
            intensity={55}
            tint="light"
            style={StyleSheet.absoluteFillObject}
          />
        )}

        <LinearGradient
          colors={["rgba(255, 255, 255, 0.42)", "rgba(255, 255, 255, 0)"]}
          style={[iconFrameStyles.gloss, { borderTopLeftRadius: radius, borderTopRightRadius: radius }]}
          pointerEvents="none"
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.1)"]}
          style={[
            iconFrameStyles.depth,
            { borderBottomLeftRadius: radius, borderBottomRightRadius: radius },
          ]}
          pointerEvents="none"
        />

        <View style={iconFrameStyles.content}>{children}</View>
      </View>
    </View>
  );
};
