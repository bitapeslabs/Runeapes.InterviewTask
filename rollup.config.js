import peerDepsExternal from "rollup-plugin-peer-deps-external"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import postcss from "rollup-plugin-postcss"
import url from '@rollup/plugin-url'

const packageJson = require("./package.json");

export default {
  input: "src/index.tsx",
  output: [
    {
      dir: 'dist/cjs',
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      entryFileNames: 'index.js',
    },
    {
      dir: 'dist/esm',
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      entryFileNames: 'index.mjs',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
    url({
      include: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.gif'],
      limit: 8192, // Inline files smaller than 8kB, copy larger files
    }),
  ],
};