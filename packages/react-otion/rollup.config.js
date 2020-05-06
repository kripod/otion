import { commonPlugins, getMainEntry } from '../../rollup.config.base';
import pkg from './package.json';

const mainEntry = getMainEntry(pkg);

export default [
  {
    ...mainEntry,
    external: [...mainEntry.external, 'otion'],
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
