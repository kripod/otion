import { definitionSyntax } from "css-tree";
import { css as CSSData } from "mdn-data";

import {
	propertiesAcceptingUnitlessValues,
	PROPERTY_ACCEPTS_UNITLESS_VALUES,
} from "./propertyMatchers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nodeAcceptsNumericValue(node: any): boolean {
	if (node.type === "Type") {
		if (node.name === "number" || node.name === "integer") return true;

		return (
			Object.prototype.hasOwnProperty.call(CSSData.syntaxes, node.name) &&
			nodeAcceptsNumericValue(
				definitionSyntax.parse(CSSData.syntaxes[node.name].syntax),
			)
		);
	}

	if (node.type === "Group") {
		if (
			node.combinator[0] === "|" ||
			(node.combinator === " " && node.terms.length === 1)
		) {
			return node.terms.some(nodeAcceptsNumericValue);
		}

		if (
			node.terms.slice(1).every(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(subNode: any) => subNode.type === "Multiplier" && subNode.min === 0,
			)
		) {
			return nodeAcceptsNumericValue(node.terms[0]);
		}

		return false;
	}

	if (node.type === "Property") {
		return nodeAcceptsNumericValue(
			definitionSyntax.parse(CSSData.properties[node.name].syntax),
		);
	}

	if (node.type === "Multiplier" && node.min <= 1) {
		return nodeAcceptsNumericValue(node.term);
	}

	return false;
}

function hasUnitlessSyntax(syntax: string): boolean {
	const rootNode = definitionSyntax.parse(syntax);
	return nodeAcceptsNumericValue(rootNode);
}

test("known set of unitless-valued CSS properties matches MDN data", () => {
	expect(new Set(propertiesAcceptingUnitlessValues)).toEqual(
		new Set(
			Object.entries<{ syntax: string; status: string }>(CSSData.properties)
				.filter(
					([, { syntax, status }]) =>
						(status === "standard" || status === "experimental") &&
						hasUnitlessSyntax(syntax),
				)
				.map(([property]) => property),
		),
	);
});

test.each(propertiesAcceptingUnitlessValues)(
	"regexp matches unitless-valued '%s' CSS property",
	(property) => {
		expect(PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property)).toBe(true);
	},
);
