import { definitionSyntax } from "css-tree";
import { css as CSSData } from "mdn-data";

import {
	propertiesAcceptingUnitlessValues,
	PROPERTY_ACCEPTS_UNITLESS_VALUES,
} from "./propertyMatchers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function requiredTermCount(terms: any) {
	return terms.reduce(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(sum: number, term: any) =>
			sum + (term.type === "Multiplier" ? term.min : 1),
		0,
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nodeAcceptsValueType(node: any, acceptedTypes: Set<string>): boolean {
	if (node.type === "Type") {
		if (acceptedTypes.has(node.name)) {
			return true;
		}

		return (
			Object.prototype.hasOwnProperty.call(CSSData.syntaxes, node.name) &&
			nodeAcceptsValueType(
				definitionSyntax.parse(CSSData.syntaxes[node.name].syntax),
				acceptedTypes,
			)
		);
	}

	if (node.type === "Group") {
		if (
			node.combinator[0] === "|" ||
			node.terms.length === 1 ||
			requiredTermCount(node.terms) === 0
		) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return node.terms.some((term: any) =>
				nodeAcceptsValueType(term, acceptedTypes),
			);
		}

		const firstRequiredTerm = node.terms.find(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(term: any) => term.type !== "Multiplier" || term.min === 1,
		);
		if (firstRequiredTerm != null && requiredTermCount(node.terms) === 1) {
			return nodeAcceptsValueType(firstRequiredTerm, acceptedTypes);
		}

		return false;
	}

	if (node.type === "Property") {
		return nodeAcceptsValueType(
			definitionSyntax.parse(CSSData.properties[node.name].syntax),
			acceptedTypes,
		);
	}

	if (node.type === "Multiplier" && node.min <= 1) {
		return nodeAcceptsValueType(node.term, acceptedTypes);
	}

	return false;
}

function hasUnitlessSyntax(syntax: string): boolean {
	const rootNode = definitionSyntax.parse(syntax);
	return nodeAcceptsValueType(rootNode, new Set(["number", "integer"]));
}

function hasDimensionalSyntax(syntax: string): boolean {
	const rootNode = definitionSyntax.parse(syntax);
	return nodeAcceptsValueType(rootNode, new Set(["length"]));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cssProperties = Object.entries<any>(CSSData.properties).filter(
	([, { status }]) => status === "standard" || status === "experimental",
);

const unitlessCSSProperties = new Set(
	cssProperties
		.filter(([, { syntax }]) => hasUnitlessSyntax(syntax))
		.map(([property]) => property),
);

const nonUnitlessCSSProperties = cssProperties
	.filter(
		([property, { syntax }]) =>
			!unitlessCSSProperties.has(property) && hasDimensionalSyntax(syntax),
	)
	.map(([property]) => property);

test("known set of unitless-valued CSS properties matches MDN data", () => {
	expect(new Set(propertiesAcceptingUnitlessValues)).toEqual(
		unitlessCSSProperties,
	);
});

test.each(propertiesAcceptingUnitlessValues)(
	"regexp matches unitless-valued '%s' CSS property",
	(property) => {
		expect(PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property)).toBe(true);
	},
);

test.each(nonUnitlessCSSProperties)(
	"regexp does not match non-unitless-valued '%s' CSS property",
	(property) => {
		expect(PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property)).toBe(false);
	},
);
