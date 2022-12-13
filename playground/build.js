const esbuild = require("esbuild");

const { SixSixSixKiller } = require("../dist/index.js");

const esBuildConfig = {
  bundle: true,
  platform: "node",
  target: "es6",
  platform: "node",
  plugins: [SixSixSixKiller({ killCode: 666 })],
  entryPoints: ["./playground/index.ts"],
  external: ["react"],
  outdir: "./playground/output/",
  watch: {
    onRebuild: (result) => {
      console.log("Rebuild !!", new Date());
    },
  },
};

esbuild.build(esBuildConfig);
