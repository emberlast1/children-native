import { generateMemoryBoard } from "@/utils/generateMemoryBoard";

describe("generateMemoryBoard", () => {
  it("creates shuffled image pairs", () => {
    const board = generateMemoryBoard(4);

    expect(board).toHaveLength(8);

    const pairIds = new Set(board.map((card) => card.pairId));
    expect(pairIds.size).toBe(4);

    pairIds.forEach((pairId) => {
      const pair = board.filter((card) => card.pairId === pairId);
      expect(pair).toHaveLength(2);
      expect(pair.every((card) => card.kind === "image")).toBe(true);
      expect(pair[0].name).toBe(pair[1].name);
      expect(pair[0].imageUrl).toBe(pair[1].imageUrl);
    });

    board.forEach((card) => {
      expect(card.backColorIndex).toBeGreaterThanOrEqual(0);
      expect(card.backColorIndex).toBeLessThanOrEqual(7);
    });
  });
});
