import { commonPlugins } from '../../rollup.config.base';
import pkg from './package.json';

export default [
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
