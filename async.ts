import {
  customAlphabet as __customAlphabet,
  customRandom as __customRandom,
  CustomRandomGenerator,
  nanoid as __nanoid,
} from "./mod.ts";

export const nanoid = async (size: number) => __nanoid(size);
export const customAlphabet = async (alphabet: string, size: number) => __customAlphabet(alphabet, size);
export const customRandom = async (
  random: CustomRandomGenerator,
  alphabet: string,
  size: number,
) => __customRandom(random, alphabet, size);
