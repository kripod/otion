import { setUp } from 'otion';

/** @type {import('gatsby').GatsbyBrowser["onClientEntry"]} */
export const onClientEntry = (_, { plugins, ...pluginOptions }) => {
  setUp(pluginOptions);
};
