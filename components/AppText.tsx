import { Text, type TextProps } from "react-native";
import { fonts, type FontWeight } from "@/theme/typography";
import { outlinedTextStyle } from "@/theme/textStyles";

type Props = TextProps & {
  weight?: FontWeight;
  /** White text with brand-colored outline. Default on for app labels. */
  outlined?: boolean;
};

export const AppText = ({
  style,
  weight = "regular",
  outlined = true,
  ...props
}: Props) => (
  <Text
    style={[{ fontFamily: fonts[weight] }, style, outlined ? outlinedTextStyle : undefined]}
    {...props}
  />
);
