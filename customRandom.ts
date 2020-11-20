export type CustomRandomGenerator = (size: number) => Uint8Array | Uint16Array | Uint32Array;

export const customRandom = (random: CustomRandomGenerator, alphabet: string, size: number) => {
  const mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1;
  const step = -~(1.6 * mask * size / alphabet.length);

  return (): string => {
    let id = "";
    while (true) {
      const bytes = random(step);
      let i = step;
      while (i--) {
        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
        id += alphabet[bytes[i] & mask] || '';
        if (id.length === +size) return id;
      }
    }
  };
}
