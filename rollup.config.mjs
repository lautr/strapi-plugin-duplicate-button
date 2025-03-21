import babel from "@rollup/plugin-babel";
import dynamicImportVariables from "@rollup/plugin-dynamic-import-vars";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import path from "path";

export default {
  input: "admin/src/index.js",
  output: [
    {
      file: "admin/dist/index.mjs",
      format: "es",
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: "admin/dist/index.js",
      format: "cjs",
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx"],
    }),
    json(),
    babel({
      presets: ["@babel/preset-react"],
      babelHelpers: "bundled",
    }),
    dynamicImportVariables({}),
  ],
  external: (id) => {
    return id.startsWith(path.resolve("node_modules"));
  },
};
