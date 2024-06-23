import * as esbuild from "npm:esbuild@0.20.2";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.10.3";

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ["./src/app.ts"],
  outfile: "./dist/bundle.js",
  bundle: true,
  format: "esm",
});

esbuild.stop();
