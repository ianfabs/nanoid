import nanoid from "../mod.ts";

const array = [0, 1, 2, 3, 4, 5, 6];
const ids = array.map(element => nanoid());
console.log(ids);
