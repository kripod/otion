/**
 * Sources:
 *
 * - https://developer.mozilla.org/docs/Web/CSS/:active#Active_links
 * - https://bitsofco.de/when-do-the-hover-focus-and-active-pseudo-classes-apply/#orderofstyleshoverthenfocusthenactive
 */

export const PRECEDENCES_BY_PSEUDO = new Map([
  ['link', 2],
  ['visited', 3],
  ['empty', 4],
  ['focus-within', 5],
  ['hover', 6],
  ['focus', 7],
  ['focus-visible', 8],
  ['active', 9],
  ['disabled', 10],
]);
