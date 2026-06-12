import { randomNumber } from "@/utils/randomNumber";

describe("randomNumber", () => {
  it("returns values within inclusive range", () => {
    for (let i = 0; i < 50; i += 1) {
      const value = randomNumber({ min: 3, max: 10 });
      expect(value).toBeGreaterThanOrEqual(3);
      expect(value).toBeLessThanOrEqual(10);
    }
  });
});
