# Nano ID
A port of [nanoid] to Deno

A tiny, secure, URL-friendly, unique string ID generator for JavaScript.

```js
import nanoid from "https://deno.land/x/nanoid/mod.ts"
nanoid() //=> "lQLTBJKVRCuc"
```

## Table of Contents

1. [Comparison with UUID](#comparison-with-uuid)
4. [Tools](#tools)
3. [Security](#security)
6. Usage
   1. [JS](#js)
   2. [Other Programming Languages](#other-programming-languages)
5. CLI
   1. [Installation](#installation)
   2. [Usage](#usage-1)
7. API
   1. [Async](#async)
   3. [Custom Alphabet or Length](#custom-alphabet-or-length)
   4. [Custom Random Bytes Generator](#custom-random-bytes-generator)


## Comparison with UUID

Nano ID is quite comparable to UUID v4 (random-based).
It has a similar number of random bits in the ID
(126 in Nano ID and 122 in UUID), so it has a similar collision probability:

> For there to be a one in a billion chance of duplication,
> 103 trillion version 4 IDs must be generated.

There are three main differences between Nano ID and UUID v4:

1. Nano ID uses a bigger alphabet, so a similar number of random bits
   are packed in just 21 symbols instead of 36.
2. Nano ID code is 4 times less than `uuid/v4` package:
   127 bytes instead of 435.
3. Because of memory allocation tricks, Nano ID is 16% faster than UUID.

## Tools

* [ID size calculator] to choice smaller ID size depends on your case.
* [`nanoid-dictionary`] with popular alphabets to use with `nanoid/generate`.

[`nanoid-dictionary`]: https://github.com/CyberAP/nanoid-dictionary
[ID size calculator]:  https://zelark.github.io/nano-id-cc/


## Security

*See a good article about random generators theory:
[Secure random values (in Node.js)]*


### Unpredictability

Instead of using the unsafe `Math.random()`, Nano ID uses the Web Crypto API. These modules use unpredictable
hardware random generator.

## Usage

### JS

The main module uses URL-friendly symbols (`A-Za-z0-9_-`) and returns an ID
with 21 characters (to have a collision probability similar to UUID v4).

```js
import nanoid from "https://deno.land/x/nanoid/mod.ts"
nanoid() //=> "lQLTBJKVRCuc"
```

If you want to reduce ID length (and increase collisions probability),
you can pass the length as an argument.

```js
nanoid(10) //=> "IRFa-VaY2b"
```

Don’t forget to check the safety of your ID length
in our [ID collision probability] calculator.

[ID collision probability]: https://zelark.github.io/nano-id-cc/
[nanoid]: https://github.com/ai/nanoid


### Other Programming Languages

Nano ID was ported to many languages. You can use these ports to have the same
ID generators on client and server side.

* [Node.js](https://github.com/ai/nanoid)
* [C#](https://github.com/codeyu/nanoid-net)
* [Clojure and ClojureScript](https://github.com/zelark/nano-id)
* [Crystal](https://github.com/mamantoha/nanoid.cr)
* [Dart](https://github.com/pd4d10/nanoid-dart)
* [Go](https://github.com/matoous/go-nanoid)
* [Elixir](https://github.com/railsmechanic/nanoid)
* [Haskell](https://github.com/4e6/nanoid-hs)
* [Java](https://github.com/aventrix/jnanoid)
* [Nim](https://github.com/icyphox/nanoid.nim)
* [PHP](https://github.com/hidehalo/nanoid-php)
* [Python](https://github.com/puyuan/py-nanoid) with [dictionaries](https://pypi.org/project/nanoid-dictionary)
* [Ruby](https://github.com/radeno/nanoid.rb)
* [Rust](https://github.com/nikolay-govorov/nanoid)
* [Swift](https://github.com/antiflasher/NanoID)

Also, CLI tool is available to generate IDs from a command line.

```sh
$ deno run https://deno.land/x/nanoid/cli.ts
```

## CLI

### Installation

```sh
$ deno install nanoid https://deno.land/x/nanoid/cli.ts
```

### Usage

```
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
```

## API

### Async

To generate hardware random bytes, CPU will collect electromagnetic noise.
During the collection, CPU doesn’t work.

If we will use asynchronous API for random generator,
another code could be executed during the entropy collection.

```js
import nanoid from "https://deno.land/x/nanoid/async.ts";

async function createUser () {
  user.id = await nanoid();
}
```


### Custom Alphabet or Length

If you want to change the ID's alphabet or length
you can use the low-level `generate` module.

```js
import generate from "https://deno.land/x/nanoid/generate.ts";
model.id = generate('1234567890abcdef', 10) //=> "4f90d13a42"
```

Alphabet must contain 256 symbols or less.
Otherwise, the generator will not be secure.

Asynchronous API is also available:

```js
import {generate} from "https://deno.land/x/nanoid/async.ts";
async function createUser () {
  user.id = await generate('1234567890abcdef', 10)
}
```

### Custom Random Bytes Generator

You can replace the default safe random generator using the `format` module.
For instance, to use a seed-based generator.

```js
import format from "https://deno.land/x/nanoid/format.ts";

function random (size) {
  const result = []
  for (let i = 0; i < size; i++) {
    result.push(randomByte())
  }
  return result
}

format(random, "abcdef", 10) //=> "fbaefaadeb"
```

`random` callback must accept the array size and return an array
with random numbers.

If you want to use the same URL-friendly symbols with `format`,
you can get the default alphabet from the `url` file.

```js
import format from "https://deno.land/x/nanoid/format.ts";
import url from "https://deno.land/x/nanoid/url.ts";

format(random, chars, 10) //=> "93ce_Ltuub"
```

Asynchronous API is also available:

```js
import format from 'nanoid/async/format';
import url from 'nanoid/url';

function random (size) {
  return new Promise(…)
}

async function createUser () {
  user.id = await format(random, url, 10)
}
```
