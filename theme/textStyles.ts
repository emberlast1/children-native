import { Platform, type TextStyle } from "react-native";
import { colors } from "./colors";

/** White label text with a brand-colored outline for readable titles on colorful backgrounds. */
export const outlinedTextStyle: TextStyle = Platform.select({
  web: {
    color: "#FFFFFF",
    WebkitTextStrokeWidth: 2,
    WebkitTextStrokeColor: colors.primary,
  } as TextStyle,
  default: {
    color: "#FFFFFF",
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
})!;
