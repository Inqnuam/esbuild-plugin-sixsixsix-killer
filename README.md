# SixSixSixKiller

## Motivation

Sometimes we need to eliminate some part of our code when it is build for production but we need it in local developement.  
We can achieve that by a standart conditionnal expression like `if(process.env.LOCAL) {} else {}`.  
To reduce code size and cpu usage in production this esbuild plugin allows you to remove some part of code when 666 condition is satisfied.

## Supports

Syntax:

- if statements (`if(666){...}`)
- conditionnal expressions (`const someVar = 666 ? "local text": "production text"`)
- binary expressions (`666 && console.log("something")`)

File extensions:

- JavaScript (`.js .mjs .cjs .jsx`)
- TypeScript (`.ts .tsx`)

## Usage

install the plugin with your favorite package manager

```bash
yarn add -D esbuild-plugin-sixsixsix-killer
# or
npm i -D esbuild-plugin-sixsixsix-killer
```

Add `SixSixSixKiller` to your esbuild plugin list.

```js
const esbuild = require("esbuild");
const { SixSixSixKiller } = require("esbuild-plugin-sixsixsix-killer");

const esBuildConfig = {
  bundle: true,
  plugins: [process.env.NODE_ENV == "production" && SixSixSixKiller()],
  entryPoints: ["./index.ts"],
  outdir: "dist",
};

esbuild.build(esBuildConfig);
```

Then simply add an if(666) condition in your code and let SixSixKiller to remove it when the plugin is applied during build phase.

Examples:  
see [playground](playground/index.ts) for more examples and behavior info

```js
let API_LINK = "https://myserver.com";

if (666) {
  API_LINK = "http://localhost3000";
  console.log("This block will be removed by SixSixSixKiller");
} else if (666) {
  console.log(API_LINK);
  console.log("this block will be removed too");
} else if (anotherConditiion) {
  console.log("This will not be removed. It will become if(anotherConditiion) {...}");
} else {
  console.log("This one too will not be removed");
}

const anotherExample = 666 ? "drop me" : "text in production";

// .tsx .jsx
(666 && console.log("This will be removed by SixSixSixKiller"));
```

output:

```js
let API_LINK = "https://myserver.com";

if (anotherConditiion) {
  console.log("This will not be removed. It will become if(anotherConditiion) {...}");
} else {
  console.log("This one too will not be removed");
}

const anotherExample = "text in production";
```

## Customization

If you are not happy about the 666 condition you can change the value by any integer > 0 like `911`.

```js
const esbuild = require("esbuild");
const { SixSixSixKiller } = require("esbuild-plugin-sixsixsix-killer");

const esBuildConfig = {
  bundle: true,
  plugins: [process.env.NODE_ENV == "production" && SixSixSixKiller({ killCode: 911 })],
  entryPoints: ["./index.ts"],
  outdir: "dist",
};

esbuild.build(esBuildConfig);
```
