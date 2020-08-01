/*
	The order of rules is influenced by CSS usage metrics:

	- https://www.cssstats.com/stats/?url=css-tricks.com
	- https://www.cssstats.com/stats/?url=joshwcomeau.com
	- https://www.cssstats.com/stats/?url=mastery.games
	- https://www.cssstats.com/stats/?url=nytimes.com
	- https://www.chromestatus.com/metrics/css/popularity
*/

// Includes support for CSS custom properties
export const PROPERTY_ACCEPTS_UNITLESS_VALUES = /^(-|f[lo].*?[^se]$|g.{6,}[^ps]$|z|o[pr]|(-w.{6})?li.*?(t|mp)$|an|(bo|s).{5}im|sca|m.{7}[ds]|ta|c.*?[st]$|wido|ini)/;

// TODO: Add tests to match everything below, without false positives
export const propertiesAcceptingUnitlessValues = [
	/* ^f[lo].*?[^se]$ */
	"flex",
	"flex-grow",
	"flex-shrink",
	"font-size-adjust",
	"font-weight",

	/* ^g.{6,}[^ps]$ */
	"grid-area",
	"grid-column",
	"grid-column-end",
	"grid-column-start",
	"grid-row",
	"grid-row-end",
	"grid-row-start",

	/* ^z */
	"z-index",

	/* ^o[pr] */
	"opacity",
	"order",
	"orphans",

	/* ^(-w.{6})?li.*?(t|mp)$ */
	"line-height",
	"line-clamp",
	"-webkit-line-clamp",

	/* ^an */
	"animation",
	"animation-iteration-count",

	/* ^(bo|s).{5}im */
	"border-image",
	"border-image-outset",
	"border-image-slice",
	"border-image-width",
	"shape-image-threshold",

	/* ^sca */
	"scale",

	/* ^m.{7}[ds] */
	"mask-border",
	"mask-border-outset",
	"mask-border-slice",
	"mask-border-width",
	"max-lines",

	/* ^ta */
	"tab-size",

	/* ^c.*?[st]$ */
	"columns",
	"column-count",

	/* ^wido */
	"widows",

	/* ^ini */
	"initial-letter",
];

export const PROPERTY_PRECEDENCE_CORRECTION_GROUPS = /^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7}$)|([fl].{5}l|g.{8}$|pl))/;

// TODO: Add tests to match everything below, with no conflicting longhands
export const propertiesByPrecedenceCorrectionGroup = {
	"+1": [
		/* ^border-(?!w|c|sty) */
		"border-!(width,color,style)",

		/* ^[tlbr].{2,4}m?$ */
		"top",
		"left",
		"bottom",
		"right",

		/* ^c.{7}$ */
		"continue",
	],

	"-1": [
		/* ^[fl].{5}l */
		"flex-flow",
		"line-clamp",

		/* ^g.{8}$ */
		"grid-area",

		/* ^pl */
		"place-content",
		"place-items",
		"place-self",
	],
};
