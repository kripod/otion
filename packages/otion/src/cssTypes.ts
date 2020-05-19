/* eslint-disable @typescript-eslint/no-explicit-any */

import * as CSS from "csstype";

export type CSSProperties = CSS.PropertiesFallback<string | number>;
export type ScopedCSSProperties = Omit<CSSProperties, "all">;

export type CSSRules<
	P extends Record<string, any> = CSSProperties
> = CSSStyleRules<P> & CSSGroupingRules<P>;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ScopedCSSRules extends CSSRules<ScopedCSSProperties> {}

export type CSSStyleRules<P extends Record<string, any> = CSSProperties> = P &
	{ [pseudo in CSS.SimplePseudos]?: P } & {
		selectors?: { [selector: string]: P };
	};

export interface CSSGroupingRules<
	P extends Record<string, any> = CSSProperties
> {
	"@media"?: {
		[conditionText: string]: CSSRules<P>;
	};
	"@supports"?: {
		[conditionText: string]: CSSRules<P>;
	};
}

export type CSSKeyframeRules =
	| { [time in "from" | "to"]?: CSSProperties }
	| { [time: string]: CSSProperties };
