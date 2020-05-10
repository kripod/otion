export { VirtualInjector } from './injectors';

export function getStyleTag(rules: string[]): string {
  return `<style id="__otion">${rules.join('')}</style>`;
}
