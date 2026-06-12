import { generateSortItRound } from "@/utils/generateSortItRound";

describe("generateSortItRound", () => {
  it("creates six items with two per category", () => {
    const round = generateSortItRound();

    expect(round.items).toHaveLength(6);

    const categories = round.items.map((item) => item.category);
    expect(categories.filter((category) => category === "fruits")).toHaveLength(2);
    expect(categories.filter((category) => category === "vegetables")).toHaveLength(2);
    expect(categories.filter((category) => category === "animals")).toHaveLength(2);

    const slotIndexes = round.items.map((item) => item.slotIndex);
    expect(new Set(slotIndexes).size).toBe(6);
  });
});
