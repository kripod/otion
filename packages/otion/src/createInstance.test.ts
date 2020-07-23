import { css as CSSData } from "mdn-data";

import { PRECEDENCE_GROUP_COUNT } from "./createInstance";
import { PRECEDENCES_BY_PSEUDO_CLASS } from "./pseudos";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cssProperties = Object.entries<any>(CSSData.properties);

test("number of precedence groups is correct", () => {
	const pseudoClassPrecedenceGroupCount = new Set(
		PRECEDENCES_BY_PSEUDO_CLASS.values(),
	).size;

	const propertyPrecedenceGroupCount =
		Math.max(
			...cssProperties.map(([property]) => {
				const unprefixedProperty =
					property[0] !== "-"
						? property
						: property.slice(property.indexOf("-", 1)) + 1;
				return (
					unprefixedProperty
						.slice(1) // First character of the property can't be `-`
						.match(/-/g) || []
				).length;
			}),
		) + 1;

	const conditionalPrecedenceGroupExistenceMultiplier = 2;

	expect(PRECEDENCE_GROUP_COUNT).toEqual(
		pseudoClassPrecedenceGroupCount *
			propertyPrecedenceGroupCount *
			conditionalPrecedenceGroupExistenceMultiplier,
	);
});
