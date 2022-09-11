import { Killer } from "./killer";
import { extname } from "path";
import { PluginBuild, OnLoadArgs, OnLoadResult } from "esbuild";
import { getCompilerOptions } from "./getCompilerOptions";
import { getLoader } from "./getLoader";
import { stat } from "fs/promises";

interface SixSixSixKillerConfig {
  killCode: number;
}

export const SixSixSixKiller = function (config: SixSixSixKillerConfig = { killCode: 666 }) {
  const filter = /.((m|c)?js(x)?|ts(x)?)$/;
  return {
    name: "SixSixSixKiller",
    setup(build: PluginBuild) {
      const cachedFiles: Map<string, { loader: string; contents: string; mtimeMs: number }> = new Map();

      // @ts-ignore
      build.onLoad({ filter }, async (args: OnLoadArgs) => {
        const { path: filePath } = args;

        let cached = cachedFiles.get(filePath);

        const lastModifiedTime = (await stat(filePath)).mtimeMs;

        if (lastModifiedTime > cached?.mtimeMs) {
          cachedFiles.delete(filePath);
          cached = null;
        }

        if (!cached) {
          const ext = extname(filePath);
          const loader = getLoader[ext];
          const compilerOptions = getCompilerOptions[loader];

          const contents = new Killer(filePath, config.killCode, compilerOptions, loader).output;
          cached = {
            contents,
            loader,
            mtimeMs: Date.now(),
          };

          cachedFiles.set(filePath, cached);
        }

        return { contents: cached.contents, loader: cached.loader };
      });
    },
  };
};
