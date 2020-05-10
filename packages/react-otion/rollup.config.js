import { getServerEntry } from '../../rollup.config.base';
import pkg from './package.json';

export default [
  getServerEntry(pkg, {
    input: './src/server.tsx',
    external: ['otion/server', 'react'],
  }),
];
