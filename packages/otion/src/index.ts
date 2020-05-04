import { createInstance } from './createInstance';

export { createInstance };
export const { css, setInjector } = createInstance();

export { CSSOMInjector, DOMInjector, VirtualInjector } from './injectors';
