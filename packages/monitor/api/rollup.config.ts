import { defineConfig } from "rollup";
import typescript from "rollup-plugin-ts";

const typescriptPlugin = typescript({
  hook: {
    // Always rename declaration files to index.d.ts to avoid emitting two declaration files with identical contents
    outputPath: (path, kind) =>
      kind === "declaration" ? "./types/index.d.ts" : path,
  },
});

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "esm",
    },
    plugins: [typescriptPlugin],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.umd.js",
      name: "JuejinApi",
      format: "umd",
    },
    plugins: [typescriptPlugin],
  },
]);
