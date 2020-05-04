import hash from '@emotion/hash';
import {
  compile,
  middleware,
  prefixer,
  RULESET,
  rulesheet,
  serialize,
  stringify,
} from 'stylis';

import { isDev } from './env';
import { CSSOMInjector, DOMInjector } from './injectors';

// TODO: Replace with types provided by Stylis
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StylisElement = any;

function deepCopy(element: StylisElement): StylisElement {
  const clonedElement = { ...element };

  if (typeof element.props === 'object') {
    clonedElement.props = [...element.props];
  }

  if (typeof element.children === 'object') {
    clonedElement.children = element.children.map((child: StylisElement) => {
      const clonedChild = deepCopy(child);
      clonedChild.root = clonedElement;
      return clonedChild;
    });
  }

  return clonedElement;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createInstance({
  injector = isDev ? DOMInjector() : CSSOMInjector(),
  stylisMiddleware = [prefixer],
} = {}) {
  let rootIndex: number;
  let rootChildren: StylisElement[];

  let traversalCallback: (element: StylisElement) => void;
  function traverseSubtree(element: StylisElement): void {
    traversalCallback(element);
    if (typeof element.children === 'object') {
      element.children.forEach(traverseSubtree);
    }
  }

  function traverseFromRoot(callback: typeof traversalCallback): void {
    traversalCallback = callback;
    for (rootIndex = 0; rootIndex < rootChildren.length; ++rootIndex) {
      traverseSubtree(rootChildren[rootIndex]);
    }
  }

  function decompose(key: 'props' | 'children') {
    return (element: StylisElement): void => {
      const originalValues = element[key];

      if (element.type === RULESET && originalValues.length > 1) {
        const rootChild = rootChildren[rootIndex];
        const restValues = originalValues.slice(1);

        rootChildren.splice(
          rootIndex + 1,
          0,
          ...restValues.map((prop: string) => {
            // eslint-disable-next-line no-param-reassign
            element[key] = [prop];
            return deepCopy(rootChild);
          }),
        );

        // eslint-disable-next-line no-param-reassign, prefer-destructuring
        element[key][0] = originalValues[0];
        rootIndex += restValues.length;
      }
    };
  }

  const idPlaceholder = '\x1b';
  const insertedClassNames = new Set();
  let ruleCount = 0;

  return {
    setInjector(value: typeof injector): void {
      // eslint-disable-next-line no-param-reassign
      injector = value;
    },

    css(scopedCSS: string): string {
      rootChildren = compile(`.${idPlaceholder}{${scopedCSS}}`);
      traverseFromRoot(decompose('props'));
      traverseFromRoot(decompose('children'));

      let classNames = '';

      serialize(
        rootChildren,
        middleware([
          ...stylisMiddleware,
          stringify,
          rulesheet((rule: string) => {
            const className = `_${hash(rule)}`;
            classNames += ` ${className}`;
            if (!insertedClassNames.has(className)) {
              injector.insert(
                rule.replace(idPlaceholder, className),
                ruleCount++,
              );
              insertedClassNames.add(className);
            }
          }),
        ]),
      );

      // Remove prepended whitespace
      return classNames.slice(1);
    },
  };
}
