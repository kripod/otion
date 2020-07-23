import hash from "@emotion/hash";
import { prefixProperty, prefixValue } from "tiny-css-prefixer";

import { CSSKeyframeRules, ScopedCSSRules } from "./cssTypes";
import { isBrowser, isDev } from "./env";
import {
	CSSOMInjector,
	DOMInjector,
	InjectorInstance,
	NoOpInjector,
} from "./injectors";
import { minifyCondition, minifyValue } from "./minify";
import {
	PROPERTY_ACCEPTS_UNITLESS_VALUES,
	PROPERTY_PRECEDENCE_CORRECTION_GROUPS,
} from "./propertyMatchers";
import {
	PRECEDENCES_BY_PSEUDO_CLASS,
	PSEUDO_CLASS_PRECEDENCE_GROUP_COUNT,
} from "./pseudos";

const MAX_CLASS_NAME_LENGTH = 9;
export const PRECEDENCE_GROUP_COUNT = 72;

function toHyphenLower(match: string): string {
	return `-${match.toLowerCase()}`;
}

export interface OtionConfig {
	/** Style insertion methodology to be used. */
	injector?: InjectorInstance;

	/** Auto-prefixer method for CSS property–value pairs. */
	prefix?: (property: string, value: string) => string;
}

export interface OtionInstance {
	/**
	 * Customizes the otion instance. May only be called once, before using the instance for anything else.
	 */
	setup(options: OtionConfig): void;

	/**
	 * Marks server-rendered CSS identity names as available to avoid re-injecting them to the style sheet during runtime.
	 */
	hydrate(): void;

	/**
	 * Decomposes CSS into atomic styles. Rules are injected to the style sheet if not already available.
	 *
	 * @param rules Scoped CSS as [object styles](https://gist.github.com/threepointone/9f87907a91ec6cbcd376dded7811eb31), with value fallbacks represented as arrays.
	 *
	 * - Numbers assigned to non-unitless properties are postfixed with "px".
	 * - Excess white space characters are truncated.
	 *
	 * @returns A space-separated list of stably generated unique class names.
	 *
	 * @example
	 * const classNames = css({
	 *   display: "flex",
	 *   justifyContent: ["space-around", "space-evenly"], // Last takes precedence
	 *   padding: 8, // "8px"
	 *   lineHeight: 1.5, // "1.5" without a unit
	 *   selectors: {
	 *     // Advanced selectors must start with "&"
	 *     "& > * + *": {
	 *       paddingLeft: 16
	 *     }
	 *   }
	 * });
	 */
	css(rules: ScopedCSSRules): string;

	// used to specify the values for the animating properties at various points during the animation
	/**
	 * Creates keyframes for animating values of given properties over time.
	 *
	 * @param rules CSS keyframe rules as [object styles](https://gist.github.com/threepointone/9f87907a91ec6cbcd376dded7811eb31), with value fallbacks represented as arrays.
	 *
	 * - Numbers assigned to non-unitless properties are postfixed with "px".
	 * - Excess white space characters are truncated.
	 *
	 * @returns Lazy method for stably generating a unique animation name upon usage.
	 *
	 * @example
	 * const pulse = keyframes({
	 *   from: { opacity: 0 },
	 *   to: { opacity: 1 }
	 * });
	 *
	 * // Referencing
	 * const className = css({
	 *   animation: `${pulse} 3s infinite alternate`
	 * });
	 */
	keyframes(rules: CSSKeyframeRules): { /** @private */ toString(): string };
}

/**
 * Creates a new otion instance. Usable for managing styles of multiple browsing contexts (e.g. an `<iframe>` besides the main document).
 */
export function createInstance(): OtionInstance {
	let injector: InjectorInstance;
	let prefix: (property: string, value: string) => string;
	let ruleIndexesByIdentName: Map<string, number>;

	const nextRuleIndexesByPrecedenceGroup = new Uint16Array(
		PRECEDENCE_GROUP_COUNT,
	);

	function checkSetup(): void {
		if (!injector || !prefix || !ruleIndexesByIdentName) {
			throw new Error(
				"On a custom otion instance, `setup()` must be called before usage.",
			);
		}
	}

	function hydrateScopedSubtree(cssRule: CSSRule): void {
		if (cssRule.type === 1 /* CSSRule.STYLE_RULE */) {
			const { selectorText } = cssRule as CSSStyleRule;
			const index = selectorText.indexOf(".", 2);
			ruleIndexesByIdentName.set(
				// Remove leading `.` from class selector
				selectorText.slice(1, index < 0 ? MAX_CLASS_NAME_LENGTH : index),
				ruleIndexesByIdentName.size,
			);
		} else {
			hydrateScopedSubtree((cssRule as CSSGroupingRule).cssRules[0]);
		}
	}

	function normalizeDeclaration(
		property: string,
		value: string | number,
	): string {
		const formattedValue =
			typeof value === "number" &&
			!PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property)
				? `${value}px` // Append missing unit
				: minifyValue(`${value}`);
		return prefix(property, formattedValue);
	}

	function serializeDeclarationList(
		property: string,
		value: string | number | Array<string | number>,
	): string {
		if (typeof value !== "object") {
			return normalizeDeclaration(property, value);
		}

		let cssText = "";
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
		maxPrecedingConditionalRuleIndexesByPrecedenceGroup: Uint16Array,
		classSelectorStartIndex?: number,
	): string {
		let classNames = "";

		// TODO: Replace `var` with `const` once it minifies equivalently
		// eslint-disable-next-line guard-for-in, no-restricted-syntax, no-var, vars-on-top
		for (var key in rules) {
			const value = rules[key as keyof typeof rules];

			if (value != null) {
				if (typeof value !== "object" || Array.isArray(value)) {
					// Class specificities are controlled with repetition, see:
					// https://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/

					// TODO: Consider removing IE vendor prefix support
					const property = key.replace(/^ms|[A-Z]/g, toHyphenLower);
					const declarations = serializeDeclarationList(property, value);
					const className = `_${hash(cssTextHead + declarations)}`;
					const isConditionalRule = cssTextTail;

					let ruleIndex = ruleIndexesByIdentName.get(className);

					if (ruleIndex == null || isConditionalRule) {
						// The property's baseline precedence is based on dash (`-`) counting
						const unprefixedProperty =
							property[0] !== "-"
								? property
								: property.slice(property.indexOf("-", 1)) + 1;
						const correctiveMatches = PROPERTY_PRECEDENCE_CORRECTION_GROUPS.exec(
							unprefixedProperty,
						);
						let precedence =
							(correctiveMatches
								? +!!correctiveMatches[1] /* +1 */ ||
								  -!!correctiveMatches[2] /* -1 */
								: 0) + 1;
						let position = 1; // First character of the property can't be `-`
						while (
							// eslint-disable-next-line no-cond-assign
							(position = unprefixedProperty.indexOf("-", position) + 1) > 0
						) {
							++precedence;
						}

						// Pseudo-classes also have an impact on rule precedence
						const conditionalPrecedenceGroupExistenceMultiplier = 2;
						precedence *=
							conditionalPrecedenceGroupExistenceMultiplier *
							((classSelectorStartIndex != null &&
								PRECEDENCES_BY_PSEUDO_CLASS.get(
									cssTextHead.slice(
										// This part uniquely identifies a pseudo selector
										classSelectorStartIndex + 3,
										classSelectorStartIndex + 8,
									),
								)) ||
								PSEUDO_CLASS_PRECEDENCE_GROUP_COUNT + 1);

						// Conditional rules should take precedence over non-conditionals
						precedence += +!!isConditionalRule;

						if (
							ruleIndex == null ||
							// Re-insert conditional rule if necessary to fix CSS source order
							maxPrecedingConditionalRuleIndexesByPrecedenceGroup[precedence] >
								ruleIndex
						) {
							const scopeSelector = `.${className}`;
							injector.insert(
								`${
									cssTextHead.slice(0, classSelectorStartIndex) +
									scopeSelector +
									(classSelectorStartIndex != null
										? `${cssTextHead.slice(classSelectorStartIndex)}{`
										: "{")
								}${declarations}}${cssTextTail}`,
								nextRuleIndexesByPrecedenceGroup[precedence],
							);

							for (let i = precedence; i <= PRECEDENCE_GROUP_COUNT; ++i) {
								++nextRuleIndexesByPrecedenceGroup[i];
							}

							ruleIndex = ruleIndexesByIdentName.size;
							ruleIndexesByIdentName.set(className, ruleIndex);

							if (isConditionalRule) {
								// eslint-disable-next-line no-param-reassign
								maxPrecedingConditionalRuleIndexesByPrecedenceGroup[
									precedence
								] = Math.max(
									maxPrecedingConditionalRuleIndexesByPrecedenceGroup[
										precedence
									],
									ruleIndex,
								);
							}
						}
					}

					classNames += ` ${className}`;
				} else {
					let parentRuleHeads: string[] | undefined;
					let firstParentRuleHead =
						key[0] === ":" || key[0] === "@" ? key : minifyCondition(key);
					let parentRuleTail = "";
					let scopeClassSelectorStartIndex = classSelectorStartIndex;

					if (scopeClassSelectorStartIndex == null) {
						if (
							firstParentRuleHead[0] === ":" ||
							firstParentRuleHead[0] === "&"
						) {
							scopeClassSelectorStartIndex = cssTextHead.length;
							parentRuleHeads = firstParentRuleHead.split(",").map(
								(singleSelector) =>
									minifyCondition(singleSelector).replace("&", ""), // lgtm [js/incomplete-sanitization]
							);
						} else if (firstParentRuleHead === "selectors") {
							firstParentRuleHead = "";
						} else if (firstParentRuleHead[0] !== "@") {
							firstParentRuleHead += "{";
							parentRuleTail = "}";
						}
					}

					(parentRuleHeads || [firstParentRuleHead]).forEach(
						// eslint-disable-next-line no-loop-func
						(parentRuleHead) => {
							classNames += decomposeToClassNames(
								value as ScopedCSSRules,
								cssTextHead + parentRuleHead,
								parentRuleTail + cssTextTail,
								maxPrecedingConditionalRuleIndexesByPrecedenceGroup,
								scopeClassSelectorStartIndex,
							);
						},
					);
				}
			}
		}

		return classNames;
	}

	return {
		setup(options): void {
			injector =
				options.injector ||
				// eslint-disable-next-line no-nested-ternary
				(isBrowser
					? isDev
						? DOMInjector({})
						: CSSOMInjector({})
					: NoOpInjector);

			prefix =
				options.prefix ||
				((property: string, value: string): string => {
					const declaration = `${property}:${prefixValue(property, value)}`;
					let cssText = declaration;
					const flag = prefixProperty(property);
					if (flag & 0b001) cssText += `;-ms-${declaration}`;
					if (flag & 0b010) cssText += `;-moz-${declaration}`;
					if (flag & 0b100) cssText += `;-webkit-${declaration}`;
					return cssText;
				});

			ruleIndexesByIdentName = new Map();
		},

		hydrate(): void {
			if (isDev) checkSetup();

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { cssRules } = injector.sheet!;
			for (let i = 0, { length } = cssRules; i < length; ++i) {
				const cssRule = cssRules[i];
				if (cssRule.type === 7 /* CSSRule.KEYFRAMES_RULE */) {
					// Keyframes needn't be checked recursively, as they are never nested
					ruleIndexesByIdentName.set(
						(cssRule as CSSKeyframesRule).name,
						ruleIndexesByIdentName.size,
					);
				} else {
					hydrateScopedSubtree(cssRule);
				}
			}
		},

		css(rules): string {
			if (isDev) checkSetup();

			// The leading white space character gets removed
			return decomposeToClassNames(
				rules,
				"",
				"",
				new Uint16Array(PRECEDENCE_GROUP_COUNT),
			).slice(1);
		},

		keyframes(rules): { toString(): string } {
			if (isDev) checkSetup();

			let identName: string | undefined;

			return {
				toString(): string {
					if (!identName) {
						let cssText = "";

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

							cssText += "}";
						}

						identName = `_${hash(cssText)}`;
						if (!ruleIndexesByIdentName.has(identName)) {
							injector.insert(
								`@keyframes ${identName}{${cssText}}`,
								ruleIndexesByIdentName.size,
							);
							ruleIndexesByIdentName.set(
								identName,
								ruleIndexesByIdentName.size,
							);
						}
					}

					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					return identName!;
				},
			};
		},
	};
}
