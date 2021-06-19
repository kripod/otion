import { css as CSSData } from "mdn-data";

import { createInstance, PRECEDENCE_GROUP_COUNT } from "./createInstance";
import { PRECEDENCES_BY_PSEUDO_CLASS } from "./pseudos";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cssProperties = Object.entries<any>(CSSData.properties);

jest.mock("@emotion/hash", () => () => `1f0cb2`);

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

test.each([
	["single", { margin: "50%" }, "{margin:50%}"],
	["multiple", { margin: "50%", width: "50%" }, "{margin:50%;width:50%}"],
])("keyframes works correctly with %s properties", (_, rules, output) => {
	const defaultInstance = createInstance();
	const injector = { insert: jest.fn() };

	defaultInstance.setup({ injector });

	defaultInstance.keyframes({ "0%": rules }).toString();

	expect(injector.insert).toHaveBeenCalledWith(
		`@keyframes _1f0cb2{0%${output}}`,
		0,
	);
});
