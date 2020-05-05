import { createInstance } from './createInstance';

export { createInstance };
export const { css, setInjector } = createInstance();

export {
  CSSOMInjector,
  DOMInjector,
  NoOpInjector,
  VirtualInjector,
} from './injectors';
