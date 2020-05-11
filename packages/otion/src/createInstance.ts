import hash from '@emotion/hash';
import { prefixProperty, prefixValue } from 'tiny-css-prefixer';

import { CSSKeyframeRules, ScopedCSSRules } from './cssTypes';
import { isBrowser, isDev } from './env';
import { CSSOMInjector, DOMInjector, NoOpInjector } from './injectors';
import { minifyCondition, minifyValue } from './minify';
import { PROPERTY_ACCEPTS_UNITLESS_VALUES } from './propertyMatchers';
import { PRECEDENCES_BY_PSEUDO_CLASS } from './pseudos';

const MAX_CLASS_NAME_LENGTH = 9;

function upperToHyphenLower(match: string): string {
  return `-${match.toLowerCase()}`;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createInstance({
  // eslint-disable-next-line no-nested-ternary
  injector = isBrowser
    ? isDev
      ? DOMInjector({})
      : CSSOMInjector({})
    : NoOpInjector(),
  prefix = (property: string, value: string): string => {
    const declaration = `${property}:${prefixValue(property, value)}`;
    let cssText = declaration;
    const flag = prefixProperty(property);
    if (flag & 0b001) cssText += `;-ms-${declaration}`;
    if (flag & 0b010) cssText += `;-moz-${declaration}`;
    if (flag & 0b100) cssText += `;-webkit-${declaration}`;
    return cssText;
  },
}) {
  const insertedIdentNames = new Set();

  function hydrateTree(cssRule: CSSRule): void {
    if (cssRule.type === 1 /* CSSRule.STYLE_RULE */) {
      const { selectorText } = cssRule as CSSStyleRule;
      const index = selectorText.indexOf('.', 2);
      insertedIdentNames.add(
        // Remove leading '.' from class selector
        selectorText.slice(1, index < 0 ? MAX_CLASS_NAME_LENGTH : index),
      );
    } else {
      hydrateTree((cssRule as CSSGroupingRule).cssRules[0]);
    }
  }

  // Rehydrate sheet if available
  if (injector.sheet) {
    const { cssRules } = injector.sheet;
    for (let i = 0, { length } = cssRules; i < length; ++i) {
      const cssRule = cssRules[i];
      if (cssRule.type !== 7 /* CSSRule.KEYFRAMES_RULE */) {
        // Keyframes needn't be checked recursively, as they are never nested
        insertedIdentNames.add((cssRule as CSSKeyframesRule).name);
      } else {
        hydrateTree(cssRule);
      }
    }
  }

  function normalizeDeclaration(
    property: string,
    value: string | number,
  ): string {
    const kebabCasedProperty = property.replace(/[A-Z]/g, upperToHyphenLower);
    const formattedValue =
      typeof value === 'number' &&
      !PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property)
        ? `${value}px` // Append missing unit
        : minifyValue(`${value}`);
    return prefix(kebabCasedProperty, formattedValue);
  }

  function serializeDeclarationList(
    property: string,
    value: string | number | Array<string | number>,
  ): string {
    if (typeof value !== 'object') {
      return normalizeDeclaration(property, value);
    }

    let cssText = '';
    value.forEach((fallbackValue) => {
      cssText += `;${normalizeDeclaration(property, fallbackValue)}`;
    });

    // The leading declaration separator character gets removed
    return cssText.slice(1);
  }

  function decomposeToClassNames(
    rules: ScopedCSSRules,
    cssTextHead: string,
    cssTextTail: string,
    classSelectorStartIndex?: number,
  ): string {
    let classNames = '';

    // TODO: Replace `var` with `const` once it minifies equivalently
    // eslint-disable-next-line guard-for-in, no-restricted-syntax, no-var, vars-on-top
    for (var key in rules) {
      const value = rules[key as keyof typeof rules];

      if (value != null) {
        if (typeof value !== 'object' || Array.isArray(value)) {
          const declarations = serializeDeclarationList(key, value);
          const className = `_${hash(cssTextHead + declarations)}`;

          if (!insertedIdentNames.has(className)) {
            injector.insert(
              `${cssTextHead.slice(0, classSelectorStartIndex)}.${
                // TODO: Control specificity by repeating the `className`
                className
              }${
                classSelectorStartIndex
                  ? `${`.${className}`.repeat(
                      PRECEDENCES_BY_PSEUDO_CLASS.get(
                        cssTextHead.slice(
                          // This part uniquely identifies a pseudoselector
                          classSelectorStartIndex + 3,
                          classSelectorStartIndex + 8,
                        ),
                      ) || 1,
                    )}${cssTextHead.slice(classSelectorStartIndex)}{`
                  : '{'
              }${declarations}}${cssTextTail}`,
              insertedIdentNames.size,
            );
            insertedIdentNames.add(className);
          }

          classNames += ` ${className}`;
        } else {
          let parentRuleHead =
            key[0] === ':' || key[0] === '@' ? key : minifyCondition(key);
          let parentRuleTail = '';

          if (!classSelectorStartIndex) {
            if (parentRuleHead[0] === ':') {
              // eslint-disable-next-line no-param-reassign
              classSelectorStartIndex = cssTextHead.length;
            } else if (parentRuleHead[0] !== '@') {
              parentRuleHead += '{';
              parentRuleTail += '}';
            }
          }

          classNames += decomposeToClassNames(
            value as ScopedCSSRules,
            cssTextHead + parentRuleHead,
            parentRuleTail + cssTextTail,
            classSelectorStartIndex,
          );
        }
      }
    }

    return classNames;
  }

  return {
    setUp(options: {
      injector?: typeof injector;
      prefix?: typeof prefix;
    }): void {
      /* eslint-disable no-param-reassign */
      injector = options.injector || injector;
      prefix = options.prefix || prefix;
      /* eslint-enable no-param-reassign */
    },

    css(rules: ScopedCSSRules): string {
      // The leading white space character gets removed
      return decomposeToClassNames(rules, '', '').slice(1);
    },

    keyframes(rules: CSSKeyframeRules): { toString(): string } {
      let identName: string | undefined;

      return {
        toString(): string {
          if (!identName) {
            let cssText = '';

            // TODO: Replace var with const once it minifies equivalently
            // eslint-disable-next-line guard-for-in, no-restricted-syntax, no-var, vars-on-top
            for (var time in rules) {
              cssText += `${time}{`;

              const declarations = rules[time as keyof typeof rules];

              // TODO: Replace var with const once it minifies equivalently
              // eslint-disable-next-line guard-for-in, no-restricted-syntax, no-var, vars-on-top
              for (var property in declarations) {
                const value =
                  declarations[property as keyof typeof declarations];

                if (value != null) {
                  cssText += serializeDeclarationList(property, value);
                }
              }

              cssText += '}';
            }

            identName = `_${hash(cssText)}`;
            if (!insertedIdentNames.has(identName)) {
              injector.insert(
                `@keyframes ${identName}{${cssText}}`,
                insertedIdentNames.size,
              );
              insertedIdentNames.add(identName);
            }
          }

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return identName!;
        },
      };
    },
  };
}
