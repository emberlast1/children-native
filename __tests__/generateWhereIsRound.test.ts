import {
  computeWhereIsLayout,
  generateWhereIsRound,
  getWhereIsPrompt,
} from "@/utils/generateWhereIsRound";

describe("computeWhereIsLayout", () => {
  it("places icons without overlap", () => {
    const { itemSize, positions } = computeWhereIsLayout(800, 400, 6);
    const gap = 4;

    for (let i = 0; i < positions.length; i += 1) {
      for (let j = i + 1; j < positions.length; j += 1) {
        const a = positions[i];
        const b = positions[j];
        const separated =
          a.x + itemSize + gap <= b.x ||
          b.x + itemSize + gap <= a.x ||
          a.y + itemSize + gap <= b.y ||
          b.y + itemSize + gap <= a.y;
        expect(separated).toBe(true);
      }
    }
  });
});

describe("generateWhereIsRound", () => {
  it("creates items with a valid target on screen", () => {
    const round = generateWhereIsRound(800, 400, 6);
    expect(round.items).toHaveLength(6);
    expect(round.itemSize).toBeGreaterThan(0);
    expect(round.targetId).toBeTruthy();
    expect(round.items.some((item) => item.id === round.targetId)).toBe(true);
    round.items.forEach((item) => {
      expect(item.x).toBeGreaterThan(0);
      expect(item.y).toBeGreaterThan(0);
      expect(item.y + round.itemSize).toBeLessThanOrEqual(400);
    });
  });
});

describe("getWhereIsPrompt", () => {
  it("builds a spoken question", () => {
    expect(getWhereIsPrompt("Apple")).toBe("Where is apple?");
  });
});
