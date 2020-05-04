import hash from '@emotion/hash';
import * as CSS from 'csstype';
import { prefixProperty, prefixValue } from 'tiny-css-prefixer';

import { isDev } from './env';
import { CSSOMInjector, DOMInjector } from './injectors';
import { minifyCondition, minifyValue } from './minify';
import { PROPERTY_ACCEPTS_UNITLESS_VALUES } from './propertyMatchers';

// TODO: Use `PropertiesFallback` instead of just `Properties`
export type CSSStyleRules = CSS.Properties<string | number> &
  { [pseudo in CSS.Pseudos]?: CSSStyleRules };

export type CSSConditionRules = {
  '@media'?: {
    [conditionText: string]: CSSStyleRules & CSSConditionRules;
  };
  '@supports'?: {
    [conditionText: string]: CSSStyleRules & CSSConditionRules;
  };
};

export type ScopedCSSRules = CSSStyleRules & CSSConditionRules;

function upperToHyphenLower(match: string): string {
  return `-${match.toLowerCase()}`;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createInstance({
  injector = isDev ? DOMInjector() : CSSOMInjector(),
  prefix = (property: string, value: string): string => {
    const declaration = `${property}:${prefixValue(property, value)}`;
    let css = declaration;
    const flag = prefixProperty(property);
    if (flag & 0b001) css += `;-ms-${declaration}`;
    if (flag & 0b010) css += `;-moz-${declaration}`;
    if (flag & 0b100) css += `;-webkit-${declaration}`;
    return css;
  },
} = {}) {
  function styleDeclarations(property: string, value: string | number): string {
    const kebabCasedProperty = property.replace(/[A-Z]/g, upperToHyphenLower);
    const formattedValue =
      typeof value === 'number' &&
      !PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property)
        ? `${value}px` // Append missing unit
        : minifyValue(`${value}`);
    return prefix(kebabCasedProperty, formattedValue);
  }

  const idPlaceholder = '\x1b';
  const insertedClassNames = new Set();
  let ruleCount = 0;

  function getClassNames(rules: ScopedCSSRules, parentRules: string[]): string {
    let classNames = '';

    // TODO: Replace `var` with `const` once it minifies equivalently
    // eslint-disable-next-line guard-for-in, no-restricted-syntax, no-var, vars-on-top
    for (var key in rules) {
      const value = rules[key as keyof typeof rules];

      if (value != null) {
        if (typeof value !== 'object') {
          let blockCount = 1;
          let blockStartCountdown = 0;
          let unappliedClassSelector = `.${idPlaceholder}`;

          const rule = `${
            parentRules.reduce((cssText, parentRule) => {
              if (unappliedClassSelector) {
                if (parentRule[0] === ':') {
                  // eslint-disable-next-line no-param-reassign
                  cssText += unappliedClassSelector;
                  unappliedClassSelector = '';
                } else if (parentRule[0] === '@') {
                  blockStartCountdown = 2;
                }
              }

              // eslint-disable-next-line no-param-reassign
              cssText += parentRule;

              if (!--blockStartCountdown) {
                // eslint-disable-next-line no-param-reassign
                cssText += '{';
                ++blockCount;
              }

              return cssText;
            }, '') + unappliedClassSelector
          }{${styleDeclarations(key, value)}${'}'.repeat(blockCount)}`;

          const className = `_${hash(rule)}`;
          classNames += ` ${className}`;
          if (!insertedClassNames.has(className)) {
            injector.insert(
              rule.replace(idPlaceholder, className),
              ruleCount++,
            );
            insertedClassNames.add(className);
          }
        } /* else if (Array.isArray(value)) {
          const specificityIncrementedParentRules = [];
          // eslint-disable-next-line no-loop-func
          value.forEach((fallbackValue) => {
            classNames += getClassNames(key, fallbackValue);
          });
        } */ else {
          classNames += getClassNames(value, [
            ...parentRules,
            key[0] === ':' || key[0] === '@' ? key : minifyCondition(key),
          ]);
        }
      }
    }

    return classNames;
  }

  return {
    setInjector(value: typeof injector): void {
      // eslint-disable-next-line no-param-reassign
      injector = value;
    },

    css(rules: ScopedCSSRules): string {
      // Remove leading white space character
      return getClassNames(rules, []).slice(1);
    },
  };
}
