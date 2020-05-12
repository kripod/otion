/*
  The order of rules is influenced by CSS usage metrics:

  - https://www.cssstats.com/stats/?url=css-tricks.com
  - https://www.cssstats.com/stats/?url=joshwcomeau.com
  - https://www.cssstats.com/stats/?url=mastery.games
  - https://www.chromestatus.com/metrics/css/popularity
*/

// Includes support for CSS custom properties
export const PROPERTY_ACCEPTS_UNITLESS_VALUES = /^(-|f[lo].*[^se]$|g.{6,}[^ps]$|z|o[pr]|li.*(t|mp)$|an|(bo|s).{5}im|sca|m.{4}[bi]|ta|c.*[st]$|wido|ini)/;

// TODO: Add tests to match everything below, without false positives
export const propertiesAcceptingUnitlessValues = [
  /* ^f[lo].*[^se]$ */
  'flex',
  'flex-grow',
  'flex-shrink',
  'font-size-adjust',
  'font-weight',

  /* ^g.{6,}[^ps]$ */
  'grid-area',
  'grid-column',
  'grid-column-end',
  'grid-column-start',
  'grid-row',
  'grid-row-end',
  'grid-row-start',

  /* ^z */
  'z-index',
  'zoom',

  /* ^o[pr] */
  'opacity',
  'order',
  'orphans',

  /* ^li.*(t|mp)$ */
  'line-height',
  'line-clamp',

  /* ^an */
  'animation',
  'animation-iteration-count',

  /* ^(bo|s).{5}im */
  'border-image',
  'border-image-outset',
  'border-image-slice',
  'border-image-width',
  'shape-image-threshold',

  /* ^sca */
  'scale',

  /* ^m.{4}[bi] */
  'mask-border',
  'mask-border-outset',
  'mask-border-slice',
  'mask-border-width',
  'max-lines',

  /* ^ta */
  'tab-size',

  /* ^c.*[st]$ */
  'columns',
  'column-count',

  /* ^wido */
  'widows',

  /* ^ini */
  'initial-letter',
];

// TODO: precedences.length - precedences.indexOf(...) == 4 - [-1..3]
// TODO: Add tests to match everything below, with no conflicting longhands
export const shorthandPropertiesByReversePrecedence = [
  [
    /* ^(mar|pa|bo).*[ptmd]$ */
    'margin-top',
    'margin-left',
    'margin-bottom',
    'margin-right',
    'margin-block-end',
    'margin-block-start',
    'margin-inline-end',
    'margin-inline-start',
    'padding-top',
    'padding-left',
    'padding-bottom',
    'padding-right',
    'padding-block-end',
    'padding-block-start',
    'padding-inline-end',
    'padding-inline-start',
    'border-top',
    'border-left',
    'border-bottom',
    'border-right',
    'border-block-end',
    'border-block-start',
    'border-inline-end',
    'border-inline-start',
  ],

  [
    /* ^[mpb].{8,}(k|ne|er)$ */
    'margin-block',
    'margin-inline',
    'padding-block',
    'padding-inline',
    'border-block',
    'border-inline',
    'mask-border',
  ],

  [
    /* ^bo.{10}.?$ */
    'border-width',
    'border-color',
    'border-style',
    'border-image',
    'border-radius',

    /* ^gr.*[ae]$ */
    'grid-area',
    'grid-template',

    /* ^i.{10}.?$ */
    'inset-block',
    'inset-inline',
  ],

  [
    /* ^g..(d(.{4}(umn)?)?)?$ */
    'grid-column',
    'grid-gap', // Obsolete
    'grid-row',
    'grid',
    'gap',

    /* ^p(l.{2,5})?.{6}$ */
    'place-self',
    'place-items',
    'place-content',
    'padding',

    /* ^f.{3}(-fl..)?$ */
    'flex-flow',
    'flex',
    'font',

    /* ^m.{3,5}$ */
    'mask',
    'margin',
    'motion', // Obsolete

    /* ^b.*(er|d)$ */
    'border',
    'background',

    /* ^o.{5,7}$ */
    'offset',
    'outline',
    'overflow',

    /* ^t.{9,14}$ */
    'transition',
    'text-emphasis',
    'text-decoration',

    /* ^(a|li).{8}$ */
    'animation',
    'line-clamp',
    'list-style',

    /* ^i.{4}$ */
    'inset',

    /* ^c.{6}(.{4})?$ */
    'column-rule',
    'columns',
  ],
];
