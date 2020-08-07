export function minifyValue(value: string): string {
	// Remove excess white space and replace blank sequences with a single space
	return value.trim().replace(/\s+/g, " ");
}

export function minifyCondition(condition: string): string {
	return (
		minifyValue(condition)
			// Remove excess space next to parentheses and colons
			.replace(/([([]) | ([)\]])| ?(:) ?/g, "$1$2$3")
	);
}
