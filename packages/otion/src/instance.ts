import defaultHash from "@emotion/hash";

import { ScopedCSSRules } from "./cssTypes";
import { InjectorInstance } from "./injectors";

let injector: InjectorInstance;
const hash: (cssText: string) => string = defaultHash;
let prefix: (property: string, value: string) => string;
let ruleIndexesByIdentName: Map<string, number>;
let nextRuleIndexesByPrecedenceGroup: Uint16Array;

function associateToClassNames(
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
	return associateToClassNames(rules, "", "").slice(1); // Removes leading space
}
