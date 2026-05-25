import { howManyData } from "../data/howManyData";

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateCountTask = () => {
  const animal =
    howManyData[random(0, howManyData.length - 1)];

  const count = random(3, 20);

  const options = new Set<number>();
  options.add(count);

  while (options.size < 3) {
    options.add(random(1, 12));
  }

  return {
    animal,
    count,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
};
