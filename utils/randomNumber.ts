type RandomOptions = {
  min: number;
  max: number;
};

export const randomNumber = ({ min, max }: RandomOptions): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
