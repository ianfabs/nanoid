/*
@module nanoid_cli
@author Ian Fabs
*/
import nanoid from "./mod.ts";
import customAlphabet from "./customAlphabet.ts"
import { parse } from "https://deno.land/std/flags/mod.ts";
// import { red, bold } from "https://deno.land/std/fmt/colors.ts";

// Grab CLI arguments
const flags = parse(Deno.args);
// const error = (message: string) => log(bold("Error: ") + message, Deno.stderr);
console.log(`nanoid v3.0.0\n------------------`);
// Display help message, if requested
if (flags.h || flags.help) {
  console.log(`original by Andrey Sitnik
port for deno by Ian Fabs

  Usage
    $ nanoid
  Options
    --alphabet, -a  Use a different alphabet to generate the id
    --size, -s      Generate an id of a different size
    --help, -h      Display this help page
  Examples
    $ nanoid
    eJgswWA5uW8I
    $ nanoid --size 32
    xgX77wBFcY1lso9R12Y2lHrluUbLjAPV
    $ nanoid -s16
    YZ-MJ4oXIGUK2edY
    $ nanoid --alphabet "_~0123456789abcdefghijklmnopqrstuvwxyz"
    pejh~ujt2lln
  `);
} else {
  // Check if the alphabet supplied is the same as the default one
  const size = flags.s ?? flags.size;
  const alphabet = flags.a ?? flags.alphabet;

  let id;
  if (alphabet)
    id = customAlphabet(alphabet, size)();
  else
    id = nanoid(size);

  console.log(`\n${id}\n`);
}

Deno.stdin.close();
