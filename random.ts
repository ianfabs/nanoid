/**
 * @param bytes The desired length of the Uint8Array to be created.
 */
export type RandomValueFunction = (bytes: number) => Uint8Array;

export const random: RandomValueFunction = bytes => crypto.getRandomValues(new Uint8Array(bytes));
