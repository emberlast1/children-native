import { Platform, StyleSheet, type ViewStyle } from "react-native";

/** Semi-transparent brand border for icon tiles. */
export const iconFrameBorderColor = "rgba(46, 133, 148, 0.45)";

/** Solid border for navigation controls. */
export const iconFrameStrongBorderColor = "#2E8594";
export const iconFrameStrongBorderWidth = 3;

export const iconFrameSize = (size: number) => ({
  width: size,
  height: size,
});

export const iconFrameRadius = (size: number) => size / 2;

/** Content area inside the 2px border frame. */
export const iconInnerSize = (size: number) => Math.max(0, size - 4);

export const iconFrameShadowStyle = (size: number): ViewStyle => ({
  shadowColor: "#123840",
  shadowOffset: {
    width: 0,
    height: Math.max(5, Math.round(size * 0.07)),
  },
  shadowOpacity: 0.34,
  shadowRadius: Math.max(8, Math.round(size * 0.1)),
  elevation: 12,
});

export const iconFrameStyles = StyleSheet.create({
  shell: {
    overflow: "visible",
  },
  frame: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: iconFrameBorderColor,
    backgroundColor: Platform.select({
      web: "rgba(255, 255, 255, 0.38)",
      default: "rgba(255, 255, 255, 0.12)",
    }),
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  gloss: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "42%",
    zIndex: 1,
  },
  depth: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "28%",
    zIndex: 1,
  },
});
