import {
  getColorCardSize,
  getHubTileSize,
  getMenuGridMaxWidth,
  getTileSize,
  isTabletWidth,
} from "@/theme/responsive";

describe("responsive layout", () => {
  it("detects tablet width", () => {
    expect(isTabletWidth(599)).toBe(false);
    expect(isTabletWidth(600)).toBe(true);
    expect(isTabletWidth(834)).toBe(true);
  });

  it("uses wider menu grid on tablet", () => {
    expect(getMenuGridMaxWidth(390)).toBe(520);
    expect(getMenuGridMaxWidth(768)).toBe(680);
  });

  it("scales tiles for tablet", () => {
    const phone = getTileSize(390);
    const tablet = getTileSize(768);

    expect(tablet).toBeGreaterThan(phone);
    expect(tablet).toBeLessThanOrEqual(196);
  });

  it("places hub tiles side by side size on tablet", () => {
    const tabletHub = getHubTileSize(768);
    expect(tabletHub).toBeGreaterThan(200);
  });

  it("shows more color columns on tablet", () => {
    const phone = getColorCardSize(390);
    const tablet = getColorCardSize(768);

    expect(tablet.width).toBeGreaterThanOrEqual(phone.width);
  });
});
