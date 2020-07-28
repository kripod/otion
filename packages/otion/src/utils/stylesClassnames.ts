/* eslint-disable prefer-spread */
/* eslint-disable no-multi-assign */
/* eslint-disable simple-import-sort/sort */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { stylesCompose } from "./stylesCompose";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Compose class names from one or more style objects
 *
 * @todo
 * - Better description
 *
 * @example
 * ```javascript
 * const styles = css.create({
 *  blue: { color: "red", border: "1px solid" },
 *  hotpink: { color: "hotpink" },
 * );
 * const className = css.cls(styles.blue, styles.hotpink);
 * // output: "3sn2xs 147pvhj"
 * // result is: color hotpink & border 1px solid
 * ```
 */
export function stylesClassnames<T extends { [styleName: string]: unknown }[]>(
	...styleObjects: T
): string {
	/**
	 * Combine and dedupe style objects
	 */
	const styleObject = stylesCompose(...styleObjects);
	let classNames = "";

	for (const propName in styleObject) {
		// Ignore inherited props
		if (!hasOwnProperty.call(styleObject, propName)) continue;

		// Explicitly type as `Record | string` because value is `UnionToIntersection<T[number]>`
		const propValue = (styleObject[propName] as unknown) as
			| Record<string, unknown>
			| string;

		if (propValue != null) {
			if (typeof propValue === "string") {
				classNames += classNames ? ` ${propValue}` : propValue;
			} else if (typeof propValue === "object") {
				classNames += classNames
					? ` ${stylesClassnames(propValue)}`
					: stylesClassnames(propValue);
			}
		}
	}

	return classNames;
}
