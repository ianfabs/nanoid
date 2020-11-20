import { random } from "./random.ts";
import { customRandom } from "./customRandom.ts";
/**
 * Low-level function to change alphabet and ID size.
 *
 * Alphabet must contain 256 symbols or less. Otherwise, the generator
 * will not be secure.
 *
 * @param {string} alphabet The alphabet that will be used to generate IDs.
 * @param {number} size The size(length) of the IDs that will be genereated.
 *
 * @returns A unique ID based on the alphabet provided.
 *
 * @example
 * import { customAlphabet } from "https://deno.land/x/nanoid/customAlphabet.ts";
 * 
 * const alphabet = '0123456789абвгдеё';
 * const nanoid = customAlphabet(alphabet, 5);
 * 
 * console.log(nanoid()); // => "8ё56а"
 *
 */
export const customAlphabet = (alphabet: string, size: number) => customRandom(random, alphabet, size);
