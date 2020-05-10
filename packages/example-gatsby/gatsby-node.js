/* This file is only required for library development */

/** @type {import('gatsby').GatsbyNode["onCreateWebpackConfig"]} */
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'develop') {
    // Speed up Hot Module Replacement
    actions.setWebpackConfig({
      resolve: {
        alias: {
          otion: 'otion/src',
        },
      },
    });
  }
};
