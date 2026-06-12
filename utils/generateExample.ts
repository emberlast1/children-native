import { randomNumber } from "./randomNumber";

type Example = {
  a: number;
  b: number;
  operator: "plus" | "minus";
  correct: number;
  options: number[];
};

export const generateExample = (): Example => {
  let a = randomNumber({ min: 1, max: 5 });
  let b = randomNumber({ min: 1, max: 5 });
  const operator: "plus" | "minus" = Math.random() > 0.5 ? "plus" : "minus";

  if (operator === "minus" && b > a) {
    [a, b] = [b, a];
  }

  const correct = operator === "plus" ? a + b : a - b;

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
