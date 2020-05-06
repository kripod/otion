import { commonPlugins, getMainEntry } from '../../rollup.config.base';
import pkg from './package.json';

const mainEntry = getMainEntry(pkg);

export default [
  mainEntry,
  {
    input: './src/server.ts',
    output: {
      file: pkg.exports['./server'],
      format: 'cjs',
    },
    plugins: commonPlugins,
  },
];
