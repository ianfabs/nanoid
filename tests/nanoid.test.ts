import {
  assert,
  assertEquals,
  assertMatch,
  assertThrows,
} from "https://deno.land/std@0.136.0/testing/asserts.ts";
import { nanoid } from "../nanoid.ts";
import { urlAlphabet } from "../urlAlphabet.ts";

Deno.test("nanoid / generates URL safe IDs", () => {
  const id = nanoid();
  assert(typeof (id) === "string");
  assertMatch(id, /^[a-zA-Z0-9_-]*$/);
});

Deno.test("nanoid / default length of 21", () => {
  const id = nanoid();
  assertEquals(id.length, 21);
});

Deno.test("nanoid / handles size of 0", () => {
  const id = nanoid(0);
  assertEquals(id.length, 0);
});

Deno.test("nanoid / throws when size is negative", () => {
  assertThrows(() => nanoid(-1), Error, "Invalid typed array length");
});

Deno.test("nanoid / throws when size too big", () => {
  assertThrows(
    () => nanoid(65537),
    Error,
    "The ArrayBufferView's byte length (65537) exceeds the number of bytes of entropy available via this API (65536)",
  );
});

Deno.test("nanoid / has no collisions", () => {
  const used = new Map();
  for (let i = 0; i < 50 * 1000; i++) {
    const id = nanoid();
    assertEquals(used.has(id), false);
    used.set(id, true);
  }
});

Deno.test("nanoid / has flat distribution", () => {
  const COUNT = 50 * 1000;
  const LENGTH = nanoid().length;

  const used = new Map<string, number>();
  for (let i = 0; i < COUNT; i++) {
    const id = nanoid();
    for (const char of id) {
      const timesUsed = used.get(char) ?? 0;
      used.set(char, timesUsed + 1);
    }
  }

  assertEquals(used.size, urlAlphabet.length);

  let max = 0;
  let min = Number.MAX_SAFE_INTEGER;
  for (const k in used.keys()) {
    const occurences = used.get(k) ?? 0;
    const distribution = (occurences * urlAlphabet.length) / (COUNT * LENGTH);
    if (distribution > max) max = distribution;
    if (distribution < min) min = distribution;
  }

  assert((max - min) <= 0.05, "Max and min difference too big");
});
