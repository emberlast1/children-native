import { Dimensions } from "react-native";
import { getTileSize as getTileSizeForWidth } from "./responsive";

const fallbackWidth = Dimensions.get("window").width;

/** Prefer `getTileSize(width)` from `theme/responsive` with `useWindowDimensions`. */
export const getTileSize = (width: number = fallbackWidth) => getTileSizeForWidth(width);

export const GRADIENT_COLORS = ["#FFFFFF", "#E8F6F8", "#FFFFFF", "#E8F6F8"] as const;
