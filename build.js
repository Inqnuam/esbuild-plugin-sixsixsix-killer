const esbuild = require("esbuild");

const esBuildConfig = {
  bundle: true,
  minify: true,
  platform: "node",
  sourcemap: true,
  target: "es6",
  platform: "node",
  external: ["typescript", "esbuild"],
  entryPoints: ["./src/index.ts"],
  outdir: "dist",
  watch:
    process.env.ENV == "dev"
      ? {
          onRebuild: (result) => {
            console.log("Compiler rebuild !");
          },
        }
      : false,
};

esbuild.build(esBuildConfig);
