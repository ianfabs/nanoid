import { nanoid } from "./mod.ts";

console.time("nanoid (x100)");
for (let i = 0; i < 100; i++) {
  nanoid();
}
console.timeEnd("nanoid (x100)");
