import hash from '@emotion/hash';
import * as CSS from 'csstype';
import { prefixProperty, prefixValue } from 'tiny-css-prefixer';

import { isBrowser, isDev } from './env';
import { CSSOMInjector, DOMInjector, NoOpInjector } from './injectors';
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
  // eslint-disable-next-line no-nested-ternary
  injector = isBrowser
    ? isDev
      ? DOMInjector()
      : CSSOMInjector()
    : NoOpInjector(),
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

  const insertedClassNames = new Set();
  let ruleCount = 0;

  function getClassNames(
    rules: ScopedCSSRules,
    ruleTemplateHead: string,
    ruleTemplateTail: string,
    classSelectorStartIndex?: number,
  ): string {
    let classNames = '';

    // TODO: Replace `var` with `const` once it minifies equivalently
    // eslint-disable-next-line guard-for-in, no-restricted-syntax, no-var, vars-on-top
    for (var key in rules) {
      const value = rules[key as keyof typeof rules];

      if (value != null) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          let parentRule =
            key[0] === ':' || key[0] === '@' ? key : minifyCondition(key);

          if (!classSelectorStartIndex) {
            /* eslint-disable no-param-reassign */
            if (parentRule[0] === ':') {
              classSelectorStartIndex = ruleTemplateHead.length;
            } else if (parentRule[0] !== '@') {
              parentRule += '{';
              ruleTemplateTail += '}';
            }
            /* eslint-enable no-param-reassign */
          }

          classNames += getClassNames(
            value,
            ruleTemplateHead + parentRule,
            ruleTemplateTail,
            classSelectorStartIndex,
          );
        } else {
          const declarations =
            typeof value === 'object'
              ? (value as (string | number)[])
                  // eslint-disable-next-line no-loop-func
                  .map((fallbackValue) => styleDeclarations(key, fallbackValue))
                  .join(';')
              : styleDeclarations(key, value);

          const className = `_${hash(`${ruleTemplateHead}${declarations}`)}`;
          classNames += ` ${className}`;
          if (!insertedClassNames.has(className)) {
            const rule = `${
              ruleTemplateHead.slice(0, classSelectorStartIndex) +
              // TODO: Control specificity by repeating the `className`
              `.${className}`.repeat(1) +
              (classSelectorStartIndex
                ? ruleTemplateHead.slice(classSelectorStartIndex)
                : '')
            }{${declarations}}${ruleTemplateTail}`;
            injector.insert(rule, ruleCount++);
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
      return getClassNames(rules, '', '').slice(1);
    },
  };
}
