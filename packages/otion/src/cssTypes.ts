import * as CSS from 'csstype';

export type CSSProperties = CSS.PropertiesFallback<string | number>;

export type CSSStyleRules = CSSProperties &
  { [pseudo in CSS.SimplePseudos]?: CSSProperties };

export interface CSSGroupingRules {
  '@media'?: {
    [conditionText: string]: CSSStyleRules & CSSGroupingRules;
  };
  '@supports'?: {
    [conditionText: string]: CSSStyleRules & CSSGroupingRules;
  };
}

export type ScopedCSSRules = CSSStyleRules & CSSGroupingRules;

export type CSSKeyframeRules =
  | { [time in 'from' | 'to']?: CSSProperties }
  | { [time: string]: CSSProperties };
