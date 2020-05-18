import { customAlphabet } from "../mod.ts";

const alphabet = '1234567890abcdef-';
const idLength = 18;

function User(name: string, email?: string) {
  this.id = customAlphabet(alphabet, idLength);
  this.name = name;
  this.email = email;
}

const me = new User("Jane Doe");
console.log(me.id);
