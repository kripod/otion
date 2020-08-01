import { STYLE_ELEMENT_ID } from "./getStyleElement";
import { VirtualInjector } from "./injectors";

export { VirtualInjector };

/**
 * Transforms an injector's data into `<style>` tag properties. Useful as a base to build custom server-side renderers upon.
 *
 * @param injector Server-side style rule injector.
 *
 * @returns Properties of a `<style>` tag as an object.
 */
export function getStyleProps(
	injector: ReturnType<typeof VirtualInjector>,
): { id: string; nonce: string | undefined; textContent: string } {
	return {
		id: STYLE_ELEMENT_ID,
		nonce: injector.nonce,
		textContent: injector.ruleTexts.join(""),
	};
}

/**
 * Transforms an injector's data into a `<style>` tag string.
 *
 * @param injector Server-side style rule injector.
 *
 * @returns A stringified `<style>` tag containing server-renderable CSS.
 */
export function getStyleTag(
	injector: ReturnType<typeof VirtualInjector>,
): string {
	const { id, nonce, textContent } = getStyleProps(injector);

	let props = `id="${id}"`;
	if (nonce) props += ` nonce="${nonce}"`;
	return `<style ${props}>${textContent}</style>`;
}

/**
 * Filters out style rules which are not statically referenced by the given HTML code.
 *
 * @param injector Server-side style rule injector.
 * @param html HTML code of the underlying page.
 *
 * @returns A copy of the given injector instance with the unused rules filtered out.
 */
export function filterOutUnusedRules(
	injector: ReturnType<typeof VirtualInjector>,
	html: string,
): ReturnType<typeof VirtualInjector> {
	const usedIdentNames = new Set<string>();

	const re = /<[^>]+\s+?class\s*?=\s*?(".+?"|'.+?'|[^>\s]+)/gi;
	let matches: string[] | null;

	// eslint-disable-next-line no-cond-assign
	while ((matches = re.exec(html)) != null) {
		const classAttributeValue = matches[1];
		const unquotedClassAttributeValue =
			classAttributeValue[0] === '"' || classAttributeValue[0] === "'"
				? classAttributeValue.slice(1, -1)
				: classAttributeValue;
		unquotedClassAttributeValue
			.trim()
			.split(/\s+/) // Ignore excess white space between class names
			.forEach((className) => usedIdentNames.add(className));
	}

	const ruleTextsByIdentName = injector.ruleTexts.map((ruleText) => [
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		/_[0-9a-z]+/.exec(ruleText)![0],
		ruleText,
	]);

	return {
		...injector,

		ruleTexts: ruleTextsByIdentName
			.filter(([identName, ruleText]) => {
				if (usedIdentNames.has(identName)) return true;

				// Only a `@keyframes` name can be referenced by other scoped rules
				const isReferencedByAnOtherUsedRule =
					ruleText[0] === "@" &&
					ruleText[1] === "k" &&
					ruleTextsByIdentName.some(
						([otherIdentName, otherRuleText]) =>
							usedIdentNames.has(otherIdentName) &&
							otherRuleText.includes(identName),
					);
				if (isReferencedByAnOtherUsedRule) return true;

				return false;
			})
			.map(([, ruleText]) => ruleText),
	};
}
