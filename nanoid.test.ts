import {
  red,
  green,
  white,
  gray,
  bold,
} from "https://deno.land/std/fmt/colors.ts";
import { expect } from "https://deno.land/x/expect/mod.ts";
import { nanoid, urlAlphabet } from "./mod.ts";
const { test } = Deno;

test({
  name: "nanoid should generate URL friendly IDs",
  fn: () => {
    for (let i = 0; i < 100; i++) {
      let id = nanoid();
      expect(id).toHaveLength(21);
      expect(typeof id).toEqual("string");
      for (let char of id) {
        expect(urlAlphabet).toContain(char);
      }
    }
  },
});

test({
  name: "parameter should change length",
  fn: () => {
    expect(nanoid(10)).toHaveLength(10);
  },
});

test({
  name: "parameter accepts string",
  fn: () => {
    expect(nanoid("10")).toHaveLength(10);
  },
});

test({
  name: "no ID collisions",
  fn: () => {
    let used: Record<string, boolean> = {};
    for (let i = 0; i < 50 * 10000; i++) {
      let id = nanoid();
      expect(used[id]).toBeUndefined();
      used[id] = true;
    }
    expect(nanoid(10)).toHaveLength(10);
  },
});

test({
  name: "has flat distribution",
  fn: () => {
    let COUNT = 100 * 1000;
    let LENGTH = nanoid().length;

    let chars: Record<string, number> = {};
    for (let i = 0; i < COUNT; i++) {
      let id = nanoid();
      for (let char of id) {
        if (!chars[char]) chars[char] = 0;
        chars[char] += 1;
      }
    }

    expect(Object.keys(chars)).toHaveLength(urlAlphabet.length);

    let max = 0;
    let min = Number.MAX_SAFE_INTEGER;
    for (let k in chars) {
      let distribution = (chars[k] * urlAlphabet.length) / (COUNT * LENGTH);
      if (distribution > max) max = distribution;
      if (distribution < min) min = distribution;
    }
    expect(max - min).toBeLessThanOrEqual(0.05);
  },
});
