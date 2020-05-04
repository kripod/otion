import { createInstance } from './createInstance';

export { createInstance };
export const { css, setInjector } = createInstance();

export { fromStyleObject } from './fromStyleObject';
export { CSSOMInjector, DOMInjector, VirtualInjector } from './injectors';
