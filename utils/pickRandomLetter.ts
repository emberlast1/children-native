import { alphabetData } from "@/data/alphabetData";
import type { Letter } from "@/types/letter";
import { randomNumber } from "./randomNumber";

export const pickRandomLetter = (): Letter =>
  alphabetData[randomNumber({ min: 0, max: alphabetData.length - 1 })];

export const getTracingLetter = (letter: Letter) =>
  letter.text.charAt(0).toUpperCase();
