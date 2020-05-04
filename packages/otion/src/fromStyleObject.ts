import * as CSS from 'csstype';

import { PROPERTY_ACCEPTS_UNITLESS_VALUES } from './propertyMatchers';

export type CSSProperties = CSS.PropertiesFallback<string | number>;

function upperToHyphenLower(match: string): string {
  return `-${match.toLowerCase()}`;
}

function styleDeclarationText(
  property: string,
  value: string | number,
): string {
  const kebabCasedProperty = property.replace(/[A-Z]/g, upperToHyphenLower);
  const appendedUnit =
    typeof value === 'number' &&
    !PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property)
      ? 'px'
      : '';
  return `${kebabCasedProperty}:${value}${appendedUnit};`;
}

export function fromStyleObject(rules: CSSProperties): string {
  let css = '';

  // TODO: Replace `var` with `const` once it minifies equivalently
  // eslint-disable-next-line guard-for-in, no-restricted-syntax, no-var, vars-on-top
  for (var key in rules) {
    const value = rules[key as keyof typeof rules];

    if (value != null) {
      if (typeof value !== 'object') {
        css += styleDeclarationText(key, value);
      } else if (Array.isArray(value)) {
        // eslint-disable-next-line no-loop-func
        value.forEach((fallbackValue) => {
          css += styleDeclarationText(key, fallbackValue);
        });
      } else {
        css += `${key}{${fromStyleObject(value)}}`;
      }
    }
  }

  return css;
}
