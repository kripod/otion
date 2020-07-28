import { PROPERTY_PRECEDENCE_CORRECTION_GROUPS } from "./propertyMatchers";
import {
	PRECEDENCES_BY_PSEUDO_CLASS,
	PSEUDO_CLASS_PRECEDENCE_GROUP_COUNT,
} from "./pseudos";

export function rulePrecedence(
	property: string,
	pseudoClass: string,
	isConditionalRule: boolean,
): number {
	let precedence = 0;

	const isCustomProperty = property[1] === "-";
	if (!isCustomProperty) {
		// The property's baseline precedence is based on "-" counting
		const unprefixedProperty =
			property[0] === "-"
				? property.slice(property.indexOf("-", 1)) + 1
				: property;
		const matches = PROPERTY_PRECEDENCE_CORRECTION_GROUPS.exec(
			unprefixedProperty,
		);
		precedence =
			(matches ? +!!matches[1] /* +1 */ || -!!matches[2] /* -1 */ : 0) + 1;
		let position = 1; // First character of the property can't be `-`
		while (
			// eslint-disable-next-line no-cond-assign
			(position = unprefixedProperty.indexOf("-", position) + 1) /* > 0 */
		) {
			++precedence;
		}
	}

	// Pseudo-classes also have an impact on rule precedence
	const conditionalPrecedenceGroupExistenceMultiplier = 2;
	precedence *=
		conditionalPrecedenceGroupExistenceMultiplier *
		((pseudoClass &&
			PRECEDENCES_BY_PSEUDO_CLASS.get(
				pseudoClass.slice(3, 8), // Uniquely identifies a pseudo selector
			)) ||
			PSEUDO_CLASS_PRECEDENCE_GROUP_COUNT + 1);

	// Conditional rules should take precedence over non-conditionals
	precedence += +isConditionalRule;

	return precedence;
}
