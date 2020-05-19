import nid from "./mod.ts";
import ca from "./customAlphabet.ts";
import { customRandom as cr, RandomGenerator } from "./customRandom.ts";

export const nanoid = async (size: number) => nid(size);
export const generated = async (alphabet: string, size: number) => ca(alphabet, size);
export const customRandom = async (random: RandomGenerator, alphabet: string, size: number) => cr(random, alphabet, size);

export default nanoid;
