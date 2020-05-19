import {nanoid} from "./mod.ts";

console.log(nanoid())

console.time("nanoid (x20)");
for (let i = 0; i < 20; i++) {
  nanoid();
}
console.timeEnd("nanoid (x20)");
