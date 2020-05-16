import { createInstance, OtionInstance } from './createInstance';

export { createInstance };

const defaultInstance = createInstance();
defaultInstance.setUp({});

// Make sure to keep documentation comments for aliases
/* eslint-disable prefer-destructuring */
export const setUp: OtionInstance['setUp'] = defaultInstance.setUp;
export const hydrate: OtionInstance['hydrate'] = defaultInstance.hydrate;
export const css: OtionInstance['css'] = defaultInstance.css;
export const keyframes: OtionInstance['keyframes'] = defaultInstance.keyframes;
/* eslint-enable prefer-destructuring */

export { CSSOMInjector, DOMInjector, NoOpInjector } from './injectors';
