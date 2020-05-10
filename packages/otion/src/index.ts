import { createInstance } from './createInstance';

export { createInstance };
export const { css, keyframes, setUp } = createInstance({});

export { CSSOMInjector, DOMInjector, NoOpInjector } from './injectors';
