import defaultHash from "@emotion/hash";
import { prefixProperty, prefixValue } from "tiny-css-prefixer";

import { ScopedCSSRules } from "./cssTypes";
import { isBrowser, isDev } from "./env";
import {
	CSSOMInjector,
	DOMInjector,
	InjectorInstance,
	NoOpInjector,
} from "./injectors";
import { minifyValue } from "./minify";
import { PROPERTY_ACCEPTS_UNITLESS_VALUES } from "./propertyMatchers";

const PRECEDENCE_GROUP_COUNT = 72;

let injector: InjectorInstance;
let hash: (cssText: string) => string;
let prefix: (property: string, value: string) => string;
let ruleIndexesByIdentName: Map<string, number>;
let nextRuleIndexesByPrecedenceGroup: Uint16Array;

export function setup(options: {
	/** Style insertion methodology to be used. */
	injector?: typeof injector;

	/** Algorithm for mapping an atomic CSS rule to a class name. */
	hash?: typeof hash;

	/** Auto-prefixer for mapping a CSS property–value pair to declarations separated by semicolons. */
	prefix?: (property: string, value: string) => string;
}): void {
	injector =
		options.injector ||
		// eslint-disable-next-line no-nested-ternary
		(isBrowser ? (isDev ? DOMInjector({}) : CSSOMInjector({})) : NoOpInjector);

	hash = options.hash || defaultHash;

	prefix =
		options.prefix ||
		((property: string, value: string): string => {
			const mainDeclaration = `${property}:${prefixValue(property, value)}`;
			let cssText = mainDeclaration;
			const flag = prefixProperty(property);
			if (flag & 0b001) cssText += `;-ms-${mainDeclaration}`;
			if (flag & 0b010) cssText += `;-moz-${mainDeclaration}`;
			if (flag & 0b100) cssText += `;-webkit-${mainDeclaration}`;
			return cssText;
		});

	ruleIndexesByIdentName = new Map();
	nextRuleIndexesByPrecedenceGroup = new Uint16Array(PRECEDENCE_GROUP_COUNT);
}

setup({});

export function normalizeDeclaration(
	property: string,
	value: string | number,
): string {
	// eslint-disable-next-line no-nested-ternary
	const formattedValue = value
		? typeof value === "number" &&
		  !PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property)
			? `${value}px` // Append missing unit
			: minifyValue(`${value}`)
		: `${value}`; // Keeps `0` unpostfixed
	return prefix(property, formattedValue);
}

export function serializeDeclarationList(
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
	return cssText.slice(1); // Leading separator gets removed
}

function mapToClassNames(
	rules: ScopedCSSRules,
	cssTextHead: string,
	cssTextTail: string,
) {
	const classNames: string[] = [];

	// eslint-disable-next-line guard-for-in, no-restricted-syntax
	for (const key in rules) {
		const value = rules[key as keyof typeof rules];

		const cssText = `${key}:${value}`;
		const className = hash(cssText);
		classNames.push(className);
	}

	return classNames;
}

export function css(rules: ScopedCSSRules): string {
	return mapToClassNames(rules, "", "").join(" ");
}
