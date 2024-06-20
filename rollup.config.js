import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: "dist/index.js",
      format: 'cjs',
      sourcemap: true
    },
    {
      file: "dist/index.esm.js",
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react': ['useRef', 'useState', 'useEffect'],
        'react-dom': ['render'],
      },
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
    }),
    json(),
  ],
  external: ['react', 'react-dom', 'styled-components']
};