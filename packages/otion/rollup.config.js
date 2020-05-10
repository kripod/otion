import { getMainEntry, getServerEntry } from '../../rollup.config.base';
import pkg from './package.json';

export default [
  getMainEntry(pkg),
  getServerEntry(pkg, { input: './src/server.ts' }),
];
