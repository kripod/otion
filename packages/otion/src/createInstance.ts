import hash from '@emotion/hash';
import * as CSS from 'csstype';
import { prefixProperty, prefixValue } from 'tiny-css-prefixer';

import { isBrowser, isDev } from './env';
import { CSSOMInjector, DOMInjector, NoOpInjector } from './injectors';
import { minifyCondition, minifyValue } from './minify';
import { PROPERTY_ACCEPTS_UNITLESS_VALUES } from './propertyMatchers';

const MAX_CLASS_NAME_LENGTH = 9;

export type CSSProperties = CSS.PropertiesFallback<string | number>;

export type CSSStyleRules = CSSProperties &
  (
    | { [pseudo in CSS.SimplePseudos]?: CSSStyleRules }
    | { [pseudo in string]?: CSSStyleRules }
  );

export interface CSSGroupingRules {
  '@media'?: {
    [conditionText: string]: CSSStyleRules & CSSGroupingRules;
  };
  '@supports'?: {
    [conditionText: string]: CSSStyleRules & CSSGroupingRules;
  };
}

export type ScopedCSSRules = CSSStyleRules & CSSGroupingRules;

export type CSSKeyframeRules =
  | { [time in 'from' | 'to']?: CSSProperties }
  | { [time in string]?: CSSProperties };

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
  const insertedClassNames = new Set();
  let ruleCount = 0;

  function hydrate(cssRule: CSSRule): void {
    if (cssRule.type === 1 /* CSSRule.STYLE_RULE */) {
      // Remove leading '.' from class selector
      const { selectorText } = cssRule as CSSStyleRule;
      const index = selectorText.indexOf('.', 2);
      insertedClassNames.add(
        selectorText.slice(1, index < 0 ? MAX_CLASS_NAME_LENGTH : index),
      );
      ++ruleCount;
    } else {
      hydrate((cssRule as CSSGroupingRule).cssRules[0]);
    }
  }

  // Rehydrate sheet if available
  if (injector.sheet) {
    // TODO: Support global styles by skipping the first N rules
    const { cssRules } = injector.sheet;
    for (let i = 0, { length } = cssRules; i < length; ++i) {
      const cssRule = cssRules[i];
      if (cssRule.type !== 7 /* CSSRule.KEYFRAMES_RULE */) {
        hydrate(cssRule);
      }
    }
  }

  function styleDeclarations(property: string, value: string | number): string {
    const kebabCasedProperty = property.replace(/[A-Z]/g, upperToHyphenLower);
    const formattedValue =
      typeof value === 'number' &&
      !PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property)
        ? `${value}px` // Append missing unit
        : minifyValue(`${value}`);
    return prefix(kebabCasedProperty, formattedValue);
  }

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
          let parentRuleHead =
            key[0] === ':' || key[0] === '@' ? key : minifyCondition(key);
          let parentRuleTail = '';

          if (!classSelectorStartIndex) {
            if (parentRuleHead[0] === ':') {
              // eslint-disable-next-line no-param-reassign
              classSelectorStartIndex = ruleTemplateHead.length;
            } else if (parentRuleHead[0] !== '@') {
              parentRuleHead += '{';
              parentRuleTail += '}';
            }
          }

          classNames += getClassNames(
            value,
            ruleTemplateHead + parentRuleHead,
            parentRuleTail + ruleTemplateTail,
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
              `.${className}`.repeat(2) +
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

    keyframes(rules: CSSKeyframeRules): string {
      // TODO
      return '';
    },
  };
}
