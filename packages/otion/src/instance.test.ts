import { css } from "./instance";

test("maps a simple CSS rule to a stable class name", () => {
	const c1 = css({ color: "red" });
	const c2 = css({ color: "red" });

	expect(c1).toBe(c2);
	expect(c1).toBe(c1.trim());
});

test("maps multiple simple CSS rules to a set of stable class names", () => {
	const c1 = css({ color: "red", background: "green" });
	const c2 = css({ background: "green", color: "red" });

	expect(new Set(c1.split(" "))).toEqual(new Set(c2.split(" ")));
});
