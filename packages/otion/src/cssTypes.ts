import * as CSS from 'csstype';

export type MarginAtRules = {
  [pageMargin in
    | '@top-left-corner'
    | '@top-left'
    | '@top-center'
    | '@top-right'
    | '@top-right-corner'
    | '@right-top'
    | '@right-middle'
    | '@right-bottom'
    | '@bottom-right-corner'
    | '@bottom-right'
    | '@bottom-center'
    | '@bottom-left'
    | '@bottom-left-corner'
    | '@left-bottom'
    | '@left-middle'
    | '@left-top']?: CSSProperties; // TODO: PageMarginCSSProperties
};

export type PageFallback =
  | CSSProperties // TODO: PageCSSProperties
  | MarginAtRules
  | {
      [pseudo in ' :left' | ' :right' | ' :first' | ' :blank']?: MarginAtRules;
    };

export type CSSProperties = CSS.PropertiesFallback<string | number>;

export type CSSRules = CSSProperties | { [key: string]: CSSRules };

export type CSSStyleRules = CSSRules &
  { [pseudo in CSS.SimplePseudos]?: CSSStyleRules };

export interface CSSGroupingRules {
  '@media'?: {
    [conditionText: string]: CSSStyleRules & CSSGroupingRules;
  };
  '@supports'?: {
    [conditionText: string]: CSSStyleRules & CSSGroupingRules;
  };
}

export type CSSKeyframeRules =
  | { [time in 'from' | 'to']?: CSSProperties }
  | { [time: string]: CSSProperties };

export type ScopedCSSRules = CSSStyleRules & CSSGroupingRules;

export type GlobalCSSRules = ScopedCSSRules & {
  '@font-face'?: CSS.FontFaceFallback | CSS.FontFaceFallback[];
  '@import'?: string | string[];
  '@namespace'?: string | string[];
  '@page'?: PageFallback;
};
