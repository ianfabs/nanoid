import {nanoid} from "./mod.ts";

console.log(nanoid())

console.time("nanoid");
for (let i = 0; i < 20; i++) {
  nanoid(10);
}
console.timeEnd("nanoid");
