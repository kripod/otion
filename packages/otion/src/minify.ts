export function minifyValue(value: string): string {
	// Remove excess white space characters
	return value.trim().replace(/\s+/g, " ");
}

export function minifyCondition(condition: string): string {
	return minifyValue(condition).replace(/([([]) | ([)\]])| ?(:) ?/g, "$1$2$3");
}
