import { STYLE_ELEMENT_ID } from './getStyleElement';
import { VirtualInjector } from './injectors';

export { VirtualInjector };

export function getStyleProps(
  injector: ReturnType<typeof VirtualInjector>,
): { id: string; nonce: string | undefined; textContent: string } {
  return {
    id: STYLE_ELEMENT_ID,
    nonce: injector.nonce,
    textContent: injector.ruleTexts.join(''),
  };
}

export function getStyleTag(
  injector: ReturnType<typeof VirtualInjector>,
): string {
  const { id, nonce, textContent } = getStyleProps(injector);

  let props = `id="${id}"`;
  if (nonce) props += ` nonce="${nonce}"`;
  return `<style ${props}>${textContent}</style>`;
}
