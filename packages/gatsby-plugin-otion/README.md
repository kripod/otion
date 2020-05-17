# gatsby-plugin-otion

Gatsby plugin for otion, the atomic CSS-in-JS library.

## Usage

0. Install the package and its peer dependencies:

   ```sh
   npm install gatsby-plugin-otion otion react-otion
   ```

1. Add the newly installed plugin to `gatsby-config.js`, as shown through an [example project](https://github.com/kripod/otion/tree/master/packages/example-gatsby):

   ```js
   module.exports = {
   	plugins: ["gatsby-plugin-otion"],
   };
   ```

## Options

Additional configuration can be specified through [shadowing](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/):

```js
/* src/gatsby-plugin-otion/options.js */

import { prefix as stylisPrefix } from "stylis"; // v4

export default {
	// Use a custom auto-prefixer, despite being larger than the default
	prefix: (property, value) => {
		const declaration = `${property}:${value};`;
		return (
			// The trailing `;` is removed for cleaner results
			stylisPrefix(declaration, property.length).slice(0, -1)
		);
	},
};
```

_Unfortunately, [Gatsby plugin options](https://www.gatsbyjs.org/docs/configuring-usage-with-plugin-options/) cannot be used at this time, as function parameters are [not supported](https://github.com/gatsbyjs/gatsby/issues/14199)._
