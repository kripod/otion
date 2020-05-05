import hash from '@emotion/hash';
import * as CSS from 'csstype';
import { prefixProperty, prefixValue } from 'tiny-css-prefixer';

import { isDev } from './env';
import { CSSOMInjector, DOMInjector } from './injectors';
import { minifyCondition, minifyValue } from './minify';
import { PROPERTY_ACCEPTS_UNITLESS_VALUES } from './propertyMatchers';

export type CSSStyleRules = CSS.PropertiesFallback<string | number> &
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

  const selectorPlaceholder = '\x1b';
  const insertedClassNames = new Set();
  let ruleCount = 0;

  function getClassNames(rules: ScopedCSSRules, parentRules: string[]): string {
    let classNames = '';

    // TODO: Replace `var` with `const` once it minifies equivalently
    // eslint-disable-next-line guard-for-in, no-restricted-syntax, no-var, vars-on-top
    for (var key in rules) {
      const value = rules[key as keyof typeof rules];

      if (value != null) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          // Avoid array mutation for better performance
          parentRules.push(
            key[0] === ':' || key[0] === '@' ? key : minifyCondition(key),
          );
          classNames += getClassNames(value, parentRules);
          parentRules.pop();
        } else {
          const declarations =
            typeof value === 'object'
              ? (value as (string | number)[])
                  // eslint-disable-next-line no-loop-func
                  .map((fallbackValue) => styleDeclarations(key, fallbackValue))
                  .join(';')
              : styleDeclarations(key, value);

          let blockCount = 1;
          let isScopeSelectorMissing: 0 | 1 = 1;

          let rule = '';

          // eslint-disable-next-line no-loop-func
          parentRules.forEach((parentRule) => {
            if (isScopeSelectorMissing) {
              if (parentRule[0] === ':') {
                isScopeSelectorMissing = 0;
                rule += selectorPlaceholder;
              } else if (parentRule[0] !== '@') {
                ++blockCount;
                // eslint-disable-next-line no-param-reassign
                parentRule += '{';
              }
            }
            rule += parentRule;
          });

          rule += `${
            isScopeSelectorMissing ? `${selectorPlaceholder}{` : '{'
          }${declarations}${'}'.repeat(blockCount)}`;

          const className = `_${hash(rule)}`;
          classNames += ` ${className}`;
          if (!insertedClassNames.has(className)) {
            injector.insert(
              // TODO: Control specificity by repeating the `className`
              rule.replace(selectorPlaceholder, `.${className}`),
              ruleCount++,
            );
            insertedClassNames.add(className);
          }
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
