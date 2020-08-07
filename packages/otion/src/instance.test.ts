import {
	css,
	stringifyDeclaration,
	stringifyDeclarationList,
} from "./instance";

test("auto-prefixes a CSS property–value pair", () => {
	expect(stringifyDeclaration("user-select", "none")).toMatchInlineSnapshot(
		`"user-select:none;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none"`,
	);
});

test("postfixes numeric CSS values with a unit if necessary", () => {
	expect(stringifyDeclaration("padding", 16)).toBe("padding:16px");
	expect(stringifyDeclaration("padding", 0)).toBe("padding:0");
});

test("doesn't postfix string CSS values with a unit", () => {
	expect(stringifyDeclaration("line-height", "1.5")).toBe("line-height:1.5");
	expect(stringifyDeclaration("padding", "16px")).toBe("padding:16px");
});

test("doesn't postfix a unitless numeric CSS value with a unit", () => {
	expect(stringifyDeclaration("line-height", 1.5)).toBe("line-height:1.5");
});

test("stringifies fallback values in order", () => {
	expect(
		stringifyDeclarationList("justify-content", [
			"space-around",
			"space-evenly",
		]),
	).toBe("justify-content:space-around;justify-content:space-evenly");
});

test("maps a simple CSS rule to a stable class name", () => {
	const c1 = css({ color: "red" });
	const c2 = css({ color: "red" });
	expect(c1).toBe(c2);
});

test("has no excess white space in the returned class names", () => {
	const c1 = css({ color: "red", background: "green" });
	expect(c1).toBe(c1.trim());
});

test("maps multiple simple CSS rules to a set of stable class names", () => {
	const c1 = css({ color: "red", background: "green" });
	const c2 = css({ background: "green", color: "red" });
	expect(new Set(c1.split(" "))).toEqual(new Set(c2.split(" ")));
});
