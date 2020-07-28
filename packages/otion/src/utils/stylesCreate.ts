/* eslint-disable no-multi-assign */
/* eslint-disable simple-import-sort/sort */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import hash from "@emotion/hash";
import type { GroupScopedCSSRules } from "../cssTypes";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Create style objects
 *
 * @todo
 * - Better description
 * - Maybe typings could be better 🤷‍♀️
 *
 * @example
 * ```javascript
 * const styles = css.create({
 *  box: { border: '1px solid blue' },
 *  foo: { color: 'hotpink' },
 * })
 * // output
 * // {
 * //   box: { border: '1bckp73' },
 * //   foo: { color: '3sn2xs' },
 * // }
 * ```
 */
export function stylesCreate<T extends GroupScopedCSSRules>(styleObject: T): T {
	const result: Record<string, unknown> = {};

	for (const styleName in styleObject) {
		// Ignore inherited props
		if (!hasOwnProperty.call(styleObject, styleName)) continue;

		const styleValue = styleObject[styleName];

		if (styleValue == null || typeof styleValue !== "object") continue; // Raise error?

		// This should be ⤵
		// result[styleName] = css(styleValue) // > { [cssProp: string]: className }

		// From here on is just a mock for `css` call that displays expected output
		// { [cssProp: string]: className }

		const currentResult = (result[styleName] = {} as Record<string, unknown>);

		for (const cssProp in styleValue) {
			if (!hasOwnProperty.call(styleValue, cssProp)) continue;
			const cssValue = styleValue[cssProp];

			if (typeof cssValue === "string") {
				currentResult[cssProp] = hash(`${cssProp}:${cssValue}`);
			} else if (typeof cssValue != null && typeof cssValue === "object") {
				currentResult[cssProp] = stylesCreate(
					(cssValue as unknown) as GroupScopedCSSRules, // Selectors, media
				);
			}
		}
	}

	return result as T;
}
