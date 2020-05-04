// The order of rules is heavily influenced by CSS usage metrics:
// https://www.chromestatus.com/metrics/css/popularity
export const PROPERTY_ACCEPTS_UNITLESS_VALUES = /^(-|f(ont.*[^e]|[li].*[^s])$|li.*(t|mp)$|o[pr]|z|g(rid.*[^ps]$|l)|an|bo.+im|ta|s((h.*d$|ca)|t(o|.*(y|it)$))|co.+[sc]|wido|ma(sk-b|x-l)|ini)/;

// TODO: Add tests to match everything below, without false positives
export const propertiesAcceptingUnitlessValues = [
  /* ^an */
  'animation',
  'animation-iteration-count',

  /* ^bo.+im */
  'border-image',
  'border-image-outset',
  'border-image-slice',
  'border-image-width',

  /* ^co.+[sc] */
  'column-count',
  'columns',

  /* ^f(ont.*[^e]|[li].*[^s])$ */
  'fill-opacity', // SVG
  'flex',
  'flex-grow',
  'flex-shrink',
  'flood-opacity', // SVG
  'font-size-adjust',
  'font-weight',

  /* ^g(rid.*[^ps]$|l) */
  'glyph-orientation-vertical', // SVG
  'grid-area',
  'grid-column',
  'grid-column-end',
  'grid-column-start',
  'grid-row',
  'grid-row-end',
  'grid-row-start',

  /* ^ini */
  'initial-letter',

  /* ^li.*(t|mp)$ */
  'line-clamp',
  'line-height',

  /* ^ma(sk-b|x-l) */
  'mask-border',
  'mask-border-outset',
  'mask-border-slice',
  'mask-border-width',
  'max-lines',

  /* ^o[pr] */
  'opacity',
  'order',
  'orphans',

  /* ^s((h.*d$|ca)|t(o|.*(y|it)$)) */
  'scale',
  'shape-image-threshold',
  'stop-opacity', // SVG
  'stroke-dasharray', // SVG
  'stroke-miterlimit', // SVG
  'stroke-opacity', // SVG

  /* ^ta */
  'tab-size',

  /* ^wido */
  'widows',

  /* ^z */
  'z-index',
  'zoom',
];
