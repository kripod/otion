import { createInstance } from './createInstance';

export { createInstance };
export const { css, keyframes, setUp } = createInstance();
setUp({});

export { CSSOMInjector, DOMInjector, NoOpInjector } from './injectors';
