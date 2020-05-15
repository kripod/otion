# gatsby-plugin-otion

Integrates otion, the atomic CSS-in-JS library, with Gatsby sites.

## Usage

0. Install the package and its peer dependencies:

   ```sh
   npm install gatsby-plugin-otion otion react-otion
   ```

1. Add the newly installed plugin to `gatsby-config.js`, as shown through an [example project](https://github.com/kripod/otion/tree/master/packages/example-gatsby):

   ```js
   module.exports = {
     plugins: ['gatsby-plugin-otion'],
   };
   ```

## Options

Additional configuration can be specified using [Gatsby plugin options](https://www.gatsbyjs.org/docs/configuring-usage-with-plugin-options/):

```js
const { prefix: stylisPrefix } = require('stylis' /* v4 */);

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-otion',
      options: {
        // Use a custom auto-prefixer, growing bundle sizes as a side-effect
        prefix: (property, value) => {
          const declaration = `${property}:${value};`;
          return stylisPrefix(declaration, property.length);
        },
      },
    },
  ],
};
```
