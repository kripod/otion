import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import ts from '@wessberg/rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const minifiedOutputs = [
  {
    file: pkg.exports.import,
    format: 'esm',
  },
  {
    file: pkg.exports.require,
    format: 'cjs',
  },
];

const unminifiedOutputs = minifiedOutputs.map(({ file, ...rest }) => ({
  ...rest,
  file: file.replace('.min.', '.'),
}));

export default {
  input: './src/index.ts',
  output: [...unminifiedOutputs, ...minifiedOutputs],
  plugins: [
    resolve(),
    commonjs(),
    ts({
      transpiler: 'babel',
      babelConfig: '../..', // TODO: Use `{ rootMode: 'upward' }` instead
    }),
    terser({ include: /\.min\.[^.]+$/ }),
  ],
  external: [/^@babel\/runtime\//],
};
