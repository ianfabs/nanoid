import random from "./random.ts";
import url from "./urlAlphabet.ts";

export const nanoid = (size: number | string = 21): string => {
  // This line converts the size arg into a number if possible.
  size = +size;
  let id: string = "";
  const bytes: Uint32Array = random(size);
  // Compact alternative for `for (var i = 0; i < size; i++)`
  // We can’t use bytes bigger than the alphabet. 63 is 00111111 bitmask.
  // This mask reduces random byte 0-255 to 0-63 values.
  // There is no need in `|| ''` and `* 1.6` hacks in here,
  // because bitmask trim bytes exact to alphabet size.
  while (size--) id += url[bytes[size] & 63];
  return id;
};

export default nanoid;

export * from "./random.ts";
export * from "./customAlphabet.ts";
export * from "./customRandom.ts";
export * from "./urlAlphabet.ts";
