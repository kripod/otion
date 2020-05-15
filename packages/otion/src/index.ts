import { createInstance } from './createInstance';

export { createInstance };
export const { css, hydrate, keyframes, setUp } = createInstance();
setUp({});

export { CSSOMInjector, DOMInjector, NoOpInjector } from './injectors';
