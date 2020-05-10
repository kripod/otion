import { setUp } from 'otion';
import {
  filterOutUnusedRules,
  getStyleElement,
  VirtualInjector,
} from 'react-otion/server';

/** @type {Map<string, ReturnType<typeof VirtualInjector>>} */
const injectorsByPathname = new Map();

/** @type {import('gatsby').GatsbyBrowser["wrapRootElement"]} */
export const wrapRootElement = ({ pathname, element }) => {
  const injector = VirtualInjector();
  setUp({ injector });
  injectorsByPathname.set(pathname, injector);

  return element;
};

/**
 * @param {{
 *   pathname: string;
 *   bodyHtml: string;
 *   setHeadComponents: (components: React.ReactNode) => void;
 * }} apiCallbackContext
 */
export const onRenderBody = ({ pathname, bodyHtml, setHeadComponents }) => {
  const injector = injectorsByPathname.get(pathname);
  if (injector) {
    setHeadComponents(
      getStyleElement(filterOutUnusedRules(injector, bodyHtml)),
    );
  }
};
