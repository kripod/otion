import { setUp } from 'otion';
import { getStyleElements, VirtualInjector } from 'react-otion/server';

/** @type {Map<string, string[]>} */
const ruleListsByPathname = new Map();

/** @type {import('gatsby').GatsbyBrowser["wrapRootElement"]} */
export const wrapRootElement = ({ element, pathname }) => {
  /** @type string[] */
  const ruleList = [];
  setUp({ injector: VirtualInjector({ target: ruleList }) });
  ruleListsByPathname.set(pathname, ruleList);

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
  const ruleList = ruleListsByPathname.get(pathname);
  if (ruleList) {
    setHeadComponents(getStyleElements(ruleList));
    ruleListsByPathname.delete(pathname);
  }
};
