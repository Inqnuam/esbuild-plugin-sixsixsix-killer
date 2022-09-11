const esbuild = require("esbuild");

const { SixSixSixKiller } = require("../dist/index.js");

const esBuildConfig = {
  bundle: true,
  //  minify: true,
  platform: "node",
  target: "es6",
  platform: "node",
  plugins: [SixSixSixKiller({ killCode: 911 })],
  entryPoints: ["./test/testFile.ts"],
  outdir: "dist",
  watch: {
    onRebuild: (result) => {
      console.log("Rebuild !!");
    },
  },
};

esbuild.build(esBuildConfig);
