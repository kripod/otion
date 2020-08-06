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

function mapToClassNames(
	rules: ScopedCSSRules,
	cssTextHead: string,
	cssTextTail: string,
) {
	let classNames = "";

	// eslint-disable-next-line guard-for-in, no-restricted-syntax
	for (const key in rules) {
		const value = rules[key as keyof typeof rules];

		const cssText = `${key}:${value}`;
		const className = hash(cssText);
		classNames += ` ${className}`;
	}

	return classNames;
}

export function css(rules: ScopedCSSRules): string {
	return mapToClassNames(rules, "", "").slice(1); // Removes leading space
}
