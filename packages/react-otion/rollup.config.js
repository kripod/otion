import resolve from '@rollup/plugin-node-resolve';
import ts from '@wessberg/rollup-plugin-ts';
import * as path from 'path';
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
    externalLiveBindings: false,
  },
];

const unminifiedOutputs = minifiedOutputs.map(({ file, ...rest }) => ({
  ...rest,
  file: file.replace('.min.', '.'),
}));

const commonPlugins = [
  ts({
    transpiler: 'babel',
    cwd: path.join(__dirname, '../..'),
    tsconfig: path.join(__dirname, 'tsconfig.json'),
  }),
];

export default [
  {
    input: './src/index.ts',
    output: [...unminifiedOutputs, ...minifiedOutputs],
    plugins: [
      ...commonPlugins,
      resolve({ browser: true }),
      terser({ include: /\.min\.[^.]+$/ }),
    ],
    external: ['otion', /^@babel\/runtime\//],
  },
  {
    input: './src/server.tsx',
    output: {
      file: pkg.exports['./server'],
      format: 'cjs',
    },
    plugins: commonPlugins,
    external: ['otion/server', 'react'],
  },
];
