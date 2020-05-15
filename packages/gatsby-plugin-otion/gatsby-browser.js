import { hydrate, setUp } from 'otion';

import options from './src/options';

/** @type {import('gatsby').GatsbyBrowser["onClientEntry"]} */
export const onClientEntry = () => {
  setUp(options);
  hydrate();
};
