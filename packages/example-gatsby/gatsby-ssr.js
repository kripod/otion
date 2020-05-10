import { setUp } from 'otion';
import { getStyleElement, VirtualInjector } from 'react-otion/server';

/** @type {Map<string, ReturnType<typeof VirtualInjector>>} */
const injectorsByPathname = new Map();

/** @type {import('gatsby').GatsbyBrowser["wrapRootElement"]} */
export const wrapRootElement = ({ element, pathname }) => {
  const injector = VirtualInjector();
  setUp({ injector });
  injectorsByPathname.set(pathname, injector);

  // TODO: Improve integration with React
  return element;
};

/**
 * @param {{
 *   setHeadComponents: (components: React.ReactNode) => void;
 *   pathname: string;
 * }} apiCallbackContext
 */
export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const injector = injectorsByPathname.get(pathname);
  if (injector) {
    setHeadComponents(getStyleElement(injector));
    injectorsByPathname.delete(pathname);
  }
};
