import { generateListenTapRound, isCorrectListenTapAnswer } from "@/utils/generateListenTapRound";

describe("generateListenTapRound", () => {
  it("creates four unique options with a matching target", () => {
    const round = generateListenTapRound();

    expect(round.targetName.length).toBeGreaterThan(0);
    expect(round.options).toHaveLength(4);

    const names = round.options.map((option) => option.name);
    expect(new Set(names).size).toBe(4);
    expect(names).toContain(round.targetName);

    round.options.forEach((option) => {
      if (option.kind === "color") {
        expect(option.colorHash).toMatch(/^#/);
        expect(option.borderColor).toMatch(/^#/);
      } else {
        expect(option.imageUrl).toBeTruthy();
        expect(option.colorIndex).toBeGreaterThanOrEqual(0);
        expect(option.colorIndex).toBeLessThanOrEqual(7);
      }
    });
  });

  it("checks answers by name", () => {
    const round = generateListenTapRound();
    const correct = round.options.find((option) => option.name === round.targetName)!;

    expect(isCorrectListenTapAnswer(round, correct)).toBe(true);
    expect(
      isCorrectListenTapAnswer(
        round,
        round.options.find((option) => option.name !== round.targetName)!
      )
    ).toBe(false);
  });
});
