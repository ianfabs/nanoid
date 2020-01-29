import nid from "./mod.ts";
import gen from "./generate.ts";
import { format as fmt, RandomGenerator} from "./format.ts";

export const nanoid = async (size: number) => nid(size);
export const generated = async (alphabet: string, size: number) => gen(alphabet, size);
export const format = async (random: RandomGenerator, alphabet: string, size: number) => fmt(random, alphabet, size);

export default nanoid;
