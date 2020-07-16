import { createInstance, OtionInstance } from "./createInstance";

export { createInstance };

const defaultInstance = createInstance();
defaultInstance.setup({});

// Make sure to keep documentation comments for aliases
/* eslint-disable prefer-destructuring */
export const setup: OtionInstance["setup"] = defaultInstance.setup;
export const hydrate: OtionInstance["hydrate"] = defaultInstance.hydrate;
export const css: OtionInstance["css"] = defaultInstance.css;
export const keyframes: OtionInstance["keyframes"] = defaultInstance.keyframes;
/* eslint-enable prefer-destructuring */

export { CSSOMInjector, DOMInjector, NoOpInjector } from "./injectors";

export type { ScopedCSSRules } from "./cssTypes";
