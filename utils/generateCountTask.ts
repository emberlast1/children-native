import { howManyData } from "../data/howManyData";
import { randomNumber } from "./randomNumber";

export const generateCountTask = () => {
  const animal = howManyData[randomNumber({ min: 0, max: howManyData.length - 1 })];
  const count = randomNumber({ min: 3, max: 10 });

  const options = new Set<number>();
  options.add(count);

  while (options.size < 3) {
    const delta = randomNumber({ min: -2, max: 2 });
    const candidate = Math.max(1, Math.min(12, count + delta));
    options.add(candidate);
  }

  return {
    animal,
    count,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
};
