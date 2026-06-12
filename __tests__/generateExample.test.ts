import { generateExample } from "@/utils/generateExample";

describe("generateExample", () => {
  it("includes the correct answer in options", () => {
    const example = generateExample();
    expect(example.options).toContain(example.correct);
    expect(example.options).toHaveLength(3);
  });

  it("subtracts the smaller number from the larger one", () => {
    for (let i = 0; i < 50; i += 1) {
      const example = generateExample();
      if (example.operator !== "minus") continue;

      expect(example.a).toBeGreaterThanOrEqual(example.b);
      expect(example.correct).toBe(example.a - example.b);
    }
  });
});
