import resolve from '@rollup/plugin-node-resolve';
import ts from '@wessberg/rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const minifiedOutputs = [
  {
    file: pkg.exports['.'].import,
    format: 'esm',
  },
  {
    file: pkg.exports['.'].require,
    format: 'cjs',
  },
];

const unminifiedOutputs = minifiedOutputs.map(({ file, ...rest }) => ({
  ...rest,
  file: file.replace('.min.', '.'),
}));

const commonPlugins = [
  ts({
    transpiler: 'babel',
    babelConfig: '../..', // TODO: Use `{ rootMode: 'upward' }` instead
  }),
];

export default [
  {
    input: './src/index.ts',
    output: [...unminifiedOutputs, ...minifiedOutputs],
    plugins: [
      ...commonPlugins,
      resolve(),
      terser({ include: /\.min\.[^.]+$/ }),
    ],
    external: [/^@babel\/runtime\//],
  },
  {
    input: './src/server.ts',
    output: {
      file: pkg.exports['./server'],
      format: 'cjs',
    },
    plugins: commonPlugins,
  },
];
