import { createInstance } from './createInstance';

export { createInstance };
export const { css, keyframes, setInjector } = createInstance();

export { CSSOMInjector, DOMInjector, NoOpInjector } from './injectors';
