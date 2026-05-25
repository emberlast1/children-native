type RandomOptions = {
  min: number;
  max: number;
};

export const randomNumber = ({
  min,
  max,
}: RandomOptions): number => {
  const value = Math.random() * (max - min) + min;
  return Math.floor(value);
};

