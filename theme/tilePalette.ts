export const TILE_PALETTE = [
  { background: "#FF6B6B", border: "#E05555", text: "#FFFFFF" },
  { background: "#FFD93D", border: "#E6C235", text: "#5C4A00" },
  { background: "#6BCB77", border: "#4FAF5A", text: "#FFFFFF" },
  { background: "#4D96FF", border: "#3A7FE0", text: "#FFFFFF" },
  { background: "#FF922B", border: "#E07A1F", text: "#FFFFFF" },
  { background: "#C77DFF", border: "#A855F7", text: "#FFFFFF" },
  { background: "#4ECDC4", border: "#3AB5AD", text: "#FFFFFF" },
  { background: "#63E6BE", border: "#38D9A9", text: "#0B4D3A" },
] as const;

export const getTilePalette = (index: number) =>
  TILE_PALETTE[index % TILE_PALETTE.length];

export const kidTileStyles = {
  wrap: { margin: 7 },
  block: {
    width: 80,
    height: 80,
    borderRadius: 22,
    borderWidth: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
} as const;
