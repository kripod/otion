export { VirtualInjector } from './injectors';

export function getStyleTags(rules: string[]): string[] {
  return [`<style id="__otion">${rules.join('')}</style>`];
}
