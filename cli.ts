// deno-lint-ignore-file
/**
 * @module nanoid_cli
 * @author Ian Fabs <ian@fabs.dev>
 */

import { nanoid } from "./nanoid.ts";
import { customAlphabet } from "./customAlphabet.ts"
import { Command, CompletionsCommand  } from "https://deno.land/x/cliffy@v0.15.0/command/mod.ts";

`original by Andrey Sitnik
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
  `

interface Options {
  size?: number;
  alphabet?: string;
  number: number;
  format?: string;
}

function* iterator(n: number, fn: (...args: any[]) => any, ...args: any[]): Iterable<string> {
  if(n==1) yield fn(...args);
  else for(let i=0;i<n;i+=1) yield fn(...args); 
  return n;
}

const cmd = await new Command<Options, any>()
  .name("nanoid")
  .version("2.0.0")
  .description("A CLI for generating cryptographically-secure random IDs.")
  .option("-s, --size <size:number>", "The desired length of IDs to be generated.")
  .option("-a, --alphabet <alphabet:string>", "The alphabet that IDs should be generated with.")
  .option("-n, --number <n:number>", "The number of IDs to generate, if you would like more than one", {default: 1})
  .option("-f, --format <format:string>", "An output format can be specified if more than one ID is generated with -n", {
    depends: ["number"],
    hidden: true,
    action: () => {
      console.warn("The --format functionality is unimplemented, and cannot be used :-(");
      Deno.exit(1);
    }
  });

cmd.command("completions", new CompletionsCommand());

const {options: {alphabet, number, size}} = await cmd.parse(Deno.args);

const fn = alphabet ? customAlphabet(alphabet, size ?? 21) : nanoid;

console.log( [...iterator(number,fn,...[size])].join("\n") );
