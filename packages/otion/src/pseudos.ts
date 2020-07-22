/*
	Sources:

	- https://bitsofco.de/when-do-the-hover-focus-and-active-pseudo-classes-apply/#orderofstyleshoverthenfocusthenactive
	- https://developer.mozilla.org/docs/Web/CSS/:active#Active_links
*/

export const PRECEDENCES_BY_PSEUDO_CLASS = new Map([
	[/* li */ "nk", 1],
	[/* vi */ "sited", 2],
	[/* em */ "pty", 3],
	[/* fo */ "cus-w" /* ithin */, 4],
	[/* ho */ "ver", 5],
	[/* fo */ "cus", 6],
	[/* fo */ "cus-v" /* isible */, 7],
	[/* ac */ "tive", 8],
	[/* di */ "sable" /* d */, 9],
]);

export const PSEUDO_CLASS_PRECEDENCE_GROUP_COUNT = 9;
