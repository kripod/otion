/* eslint-disable prefer-object-spread */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import type { UnionToIntersection } from "../cssTypes";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @description
 * Composes two or more style objects into a single style object,
 * de-duplicating styles. Last argument overrides, first or previous arguments
 *
 * @todo
 * - Better description
 * - Maybe typings could be better 🤷‍♀️
 *
 * @example
 * ```javascript
 * const styles = css.create({
 *  blue: { color: "red", border: "1px solid" },
 *  green: { color: "green" },
 *  hotpink: { color: "hotpink" },
 * );
 * const composedStyles = css.compose(styles.blue, styles.green, styles.hotpink)
 * // Output
 * // {
 * //   color: '3sn2xs', // << 'hotpink',
 * //   border: '147pvhj',
 * // }
 */
export function stylesCompose<T extends { [styleName: string]: unknown }[]>(
	...styleObjects: T
): UnionToIntersection<T[number]> {
	if (styleObjects.length === 0) return {} as UnionToIntersection<T[number]>;
	if (styleObjects.length === 1)
		return styleObjects[0] as UnionToIntersection<T[number]>;

	/**
	 * Reverse because ..
	 * - `pop` from end of array is faster than `shift` from top (at least in V8)
	 * - Last in reversed array (`pop`ed) should be assigned first, so next can override
	 */
	styleObjects.reverse();

	const stylesComposed = {} as Record<string, unknown>;

	while (styleObjects.length) {
		const styleCurrent = styleObjects.pop();

		if (styleCurrent != null && typeof styleCurrent === "object") {
			for (const propName in styleCurrent) {
				// Ignore inherited props
				if (!hasOwnProperty.call(styleCurrent, propName)) continue;

				const propValue = styleCurrent[propName];

				if (typeof propValue === "string") {
					stylesComposed[propName] = propValue;
				} else if (propValue != null && typeof propValue === "object") {
					let propValueObject = stylesComposed[propName];

					/**
					 * For safety, prevent assigning to string | number | null | undefined
					 * - if null | undefined -> it's first time this property appears
					 * - if string | number | any -> e.g: [{ selectors: '' }, { selectors: {...} }] (should error instead of falling to {} ?)
					 */
					if (propValueObject == null || typeof propValueObject !== "object") {
						propValueObject = {} as typeof propValueObject;
					}

					stylesComposed[propName] = stylesCompose(
						propValueObject as Record<string, unknown>,
						(styleCurrent[propName] as unknown) as Record<string, unknown>,
					);
				}
			}
		}
	}

	return stylesComposed as UnionToIntersection<T[number]>;
}
