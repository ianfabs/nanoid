import {
  assert,
  assertEquals,
  assertMatch,
  assertThrows,
} from "https://deno.land/std@0.136.0/testing/asserts.ts";
import { customRandom } from "../customRandom.ts";
import { random } from "../random.ts";
import { urlAlphabet } from "../urlAlphabet.ts";

Deno.test("customRandom / generates URL safe IDs", () => {
  const id = customRandom(random, urlAlphabet, 21)();
  assert(typeof (id) === "string");

  // https://www.ietf.org/rfc/rfc3986.html#section-2.3
  assertMatch(id, /^[a-zA-Z0-9-._~]*$/);
});

Deno.test("customRandom / throws when alphabet length is greater than 255", () => {
  const US_ALPHABET =
    "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  const JAPANESE_ALPHABET =
    "ーぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ゛゜";
  const alphabet = US_ALPHABET + JAPANESE_ALPHABET;
  assert(alphabet.length > 255);
  assertThrows(() => customRandom(random, alphabet, 21)(), Error);
});

Deno.test("customRandom / handles size of 0", () => {
  const id = customRandom(random, urlAlphabet, 0)();
  assertEquals(id.length, 0);
});

Deno.test("customRandom / throws when size is negative", () => {
  assertThrows(
    () => customRandom(random, urlAlphabet, -1)(),
    Error,
  );
});

Deno.test("customRandom / throws when size too big", () => {
  assertThrows(
    () => customRandom(random, urlAlphabet, 65537)(),
    Error,
    "The ArrayBufferView's byte length (103221) exceeds the number of bytes of entropy available via this API (65536)",
  );
});

Deno.test("customRandom / has no collisions", () => {
  const used = new Map();
  for (let i = 0; i < 50 * 1000; i++) {
    const id = customRandom(random, urlAlphabet, 21)();
    assertEquals(used.has(id), false);
    used.set(id, true);
  }
});

Deno.test("customRandom / has flat distribution", () => {
  const COUNT = 50 * 1000;
  const LENGTH = customRandom(random, urlAlphabet, 21)().length;

  const used = new Map<string, number>();
  for (let i = 0; i < COUNT; i++) {
    const id = customRandom(random, urlAlphabet, 21)();
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
