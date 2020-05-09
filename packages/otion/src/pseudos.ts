/**
 * Sources:
 *
 * - https://bitsofco.de/when-do-the-hover-focus-and-active-pseudo-classes-apply/#orderofstyleshoverthenfocusthenactive
 * - https://developer.mozilla.org/docs/Web/CSS/:active#Active_links
 */

export const PRECEDENCES_BY_PSEUDO = new Map([
  [/* li */ 'nk', 2],
  [/* vi */ 'sited', 3],
  [/* em */ 'pty', 4],
  [/* fo */ 'cus-w' /* ithin */, 5],
  [/* ho */ 'ver', 6],
  [/* fo */ 'cus', 7],
  [/* fo */ 'cus-v' /* isible */, 8],
  [/* ac */ 'tive', 9],
  [/* di */ 'sable' /* d */, 10],
]);
