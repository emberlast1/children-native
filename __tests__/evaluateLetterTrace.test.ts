import {
  evaluateLetterTrace,
  getLetterGuideBounds,
} from "@/utils/evaluateLetterTrace";

describe("getLetterGuideBounds", () => {
  it("returns proportional bounds inside the canvas", () => {
    const bounds = getLetterGuideBounds(300, 400);
    expect(bounds.x).toBeCloseTo(30);
    expect(bounds.width).toBeCloseTo(240);
    expect(bounds.height).toBeCloseTo(320);
  });
});

describe("evaluateLetterTrace", () => {
  const bounds = getLetterGuideBounds(300, 400);

  it("accepts a trace that follows the letter A", () => {
    const leftLeg = Array.from({ length: 24 }, (_, index) => ({
      x: bounds.x + bounds.width * (0.38 + index * 0.005),
      y: bounds.y + bounds.height * (0.9 - index * 0.033),
    }));
    const rightLeg = Array.from({ length: 24 }, (_, index) => ({
      x: bounds.x + bounds.width * (0.62 - index * 0.005),
      y: bounds.y + bounds.height * (0.9 - index * 0.033),
    }));
    const crossbar = Array.from({ length: 18 }, (_, index) => ({
      x: bounds.x + bounds.width * (0.42 + index * 0.009),
      y: bounds.y + bounds.height * 0.52,
    }));

    expect(evaluateLetterTrace([...leftLeg, ...rightLeg, ...crossbar], bounds, "A")).toBe(
      true
    );
  });

  it("rejects a random scribble inside the guide box", () => {
    const points = Array.from({ length: 50 }, (_, index) => ({
      x: bounds.x + 20 + (index % 7) * 8,
      y: bounds.y + bounds.height * 0.75,
    }));

    expect(evaluateLetterTrace(points, bounds, "A")).toBe(false);
  });

  it("rejects a stroke that stays outside the guide", () => {
    const points = Array.from({ length: 40 }, (_, index) => ({
      x: 10 + index,
      y: 10,
    }));

    expect(evaluateLetterTrace(points, bounds, "A")).toBe(false);
  });
});
