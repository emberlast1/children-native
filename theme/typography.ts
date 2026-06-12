export const fonts = {
  regular: "Fredoka_400Regular",
  medium: "Fredoka_500Medium",
  semiBold: "Fredoka_600SemiBold",
  bold: "Fredoka_700Bold",
} as const;

export type FontWeight = keyof typeof fonts;

/** @deprecated Use fonts.semiBold or AppText weight prop */
export const childFontFamily = fonts.semiBold;
