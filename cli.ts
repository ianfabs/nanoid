/*
@module nanoid_cli
@author Ian Fabs
*/
import nanoid from "./mod.ts";
import generate from "./generate.ts"
import url from "./url.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";
// import { red, bold } from "https://deno.land/std/fmt/colors.ts";

// Grab CLI arguments
const flags = parse(Deno.args);

// Logging functions
const log = async (message: string, type: Deno.File = Deno.stdin) => {
  const encoder = new TextEncoder();
  const buf = new Deno.Buffer(encoder.encode(message+"\n"));
  Deno.copy(Deno.stdout, buf);
};
// const error = (message: string) => log(bold("Error: ") + message, Deno.stderr);

// Display help message, if requested
if (flags.h || flags.help) {
  log(`
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
  const equivalent = (a: string, b: string): boolean => JSON.stringify(a.split('').sort()) === JSON.stringify(b.split('').sort());
  const size = flags.s ?? flags.size;
  const alphabet = flags.a ?? flags.alphabet;
  const id = alphabet && !equivalent(alphabet, url) ? generate(alphabet, size ?? 12) : nanoid(size);

  log(id);
}
Deno.stdin.close();
