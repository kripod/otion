# react-otion

React bindings for otion, the atomic CSS-in-JS library (Server only). 

## Usage


### Server-side rendering

A special renderer is available for instantiating `<style>` JSX elements on the server, as seen in the [Next.js example](https://github.com/kripod/otion/tree/master/packages/example-nextjs):

```js
import { setup } from "otion";
import { getStyleElement, VirtualInjector } from "react-otion/server";

const injector = VirtualInjector();
setup({ ...sharedOptions, injector });

// The resulting HTML code could be used for critical CSS extraction
renderToString(rootElement);

const styleElement = getStyleElement(injector);
setHeadComponents(styleElement);
```

All [methods of `otion/server`](https://github.com/kripod/otion/tree/master/packages/otion#server-side-rendering) are re-exported for convenience, as seen in the previous snippet.

### Single Page Applications

This package is not necessary for single page React applications (e.g. those built with Create React App)
