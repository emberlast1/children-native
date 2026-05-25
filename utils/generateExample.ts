import { randomNumber } from "./randomNumber";

type Example = {
  a: number;
  b: number;
  operator: "plus" | "minus";
  correct: number;
  options: number[];
};

export const generateExample = (): Example => {
  const a = randomNumber({ min: 1, max: 5 });
  const b = randomNumber({ min: 1, max: 5 });
  const operator: "plus" | "minus" = Math.random() > 0.5 ? "plus" : "minus";

  const correct =
    operator === "plus" ? a + b : Math.abs(a - b);

  const options = new Set<number>();
  options.add(correct);

  while (options.size < 3) {
    options.add(randomNumber({ min: 0, max: 10 }));
  }

  return {
    a,
    b,
    operator,
    correct,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
};
