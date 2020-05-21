import { getStyleElement } from "./getStyleElement";

export interface InjectorConfig<T> {
	/** Sets a cryptographic nonce (number used once) on the enclosing `<style>` tag when generating a page on demand. Useful for enforcing a [Content Security Policy (CSP)](https://developer.mozilla.org/docs/Web/HTTP/CSP). */
	nonce?: string;

	/** Target to insert rules into. */
	target?: T;
}

export type InjectorInstance = {
	sheet?: CSSStyleSheet;
	insert(rule: string, index: number): number;
};

type VirtualInjectorInstance = InjectorInstance & {
	nonce: string | undefined;
	ruleTexts: string[];
};

/**
 * Creates an injector which collects style rules during server-side rendering.
 */
export function VirtualInjector({
	nonce,
	target: ruleTexts = [],
}: InjectorConfig<string[]> = {}): VirtualInjectorInstance {
	return {
		nonce,
		ruleTexts,

		insert(rule, index): number {
			ruleTexts.splice(index, 0, rule);
			return index;
		},
	};
}

/**
 * Creates an injector which inserts style rules through the CSS Object Model.
 */
export function CSSOMInjector({
	nonce,
	target = getStyleElement().sheet as CSSStyleSheet,
}: InjectorConfig<CSSStyleSheet>): InjectorInstance {
	// eslint-disable-next-line no-param-reassign
	(target.ownerNode as HTMLStyleElement).nonce = nonce;

	return {
		sheet: target,

		insert(rule, index): number {
			// Avoid render failure during production if a rule cannot be parsed
			try {
				return target.insertRule(rule, index);
			} catch {
				return -1;
			}
		},
	};
}

/**
 * Creates an injector which inserts style rules through the Document Object Model.
 */
export function DOMInjector({
	nonce,
	target = getStyleElement(),
}: InjectorConfig<HTMLStyleElement>): InjectorInstance {
	// eslint-disable-next-line no-param-reassign
	target.nonce = nonce;

	return {
		sheet: target.sheet as CSSStyleSheet,

		insert(rule, index): number {
			target.insertBefore(
				document.createTextNode(rule),
				target.childNodes[index],
			);
			return index;
		},
	};
}

/**
 * An injector placeholder which performs no operations. Useful for avoiding errors in a non-browser environment.
 */
export const NoOpInjector: InjectorInstance = {
	insert(): number {
		return 0;
	},
};
