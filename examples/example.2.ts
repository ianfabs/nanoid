import { generate } from "../mod.ts";

const customAlphabet = '1234567890abcdef-';
const idLength = 21;

function User(name: string, email?: string) {
  this.id = generate(customAlphabet, idLength);
  this.name = name;
  this.email = email;
}

const me = new User("Jane Doe");
console.log(me.id);
