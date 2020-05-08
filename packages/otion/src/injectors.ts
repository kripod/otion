import { getStyleElement } from './getStyleElement';

export interface Injector {
  sheet?: CSSStyleSheet;
  insert(rule: string, index: number): number;
  nullify(index: number): void;
}

export interface VirtualInjectorConfig {
  target: string[];
}

export interface BrowserInjectorConfig<T> {
  nonce?: string;
  target?: T;
}

export function VirtualInjector({ target }: VirtualInjectorConfig): Injector {
  return {
    insert(rule, index): number {
      target.splice(index, 0, rule);
      return index;
    },

    // No styles are revoked during server-side rendering
    nullify(): void {},
  };
}

export function CSSOMInjector({
  nonce,
  target = getStyleElement().sheet as CSSStyleSheet,
}: BrowserInjectorConfig<CSSStyleSheet>): Injector {
  // eslint-disable-next-line no-param-reassign
  (target.ownerNode as HTMLStyleElement).nonce = nonce;

  return {
    sheet: target,

    insert(rule, index): number {
      return target.insertRule(rule, index);
    },

    nullify(index): void {
      const dummyRule = '#_{}';
      target.deleteRule(index);
      target.insertRule(dummyRule, index);
    },
  };
}

export function DOMInjector({
  nonce,
  target = getStyleElement(),
}: BrowserInjectorConfig<HTMLStyleElement>): Injector {
  // eslint-disable-next-line no-param-reassign
  target.nonce = nonce;

  return {
    sheet: target.sheet as CSSStyleSheet,

    insert(rule, index): number {
      target.insertBefore(
        document.createTextNode(rule),
        target.childNodes[index],
      );
      return index;
    },

    nullify(index): void {
      const dummyRule = '';
      // eslint-disable-next-line no-param-reassign
      target.childNodes[index].textContent = dummyRule;
    },
  };
}

export function NoOpInjector(): Injector {
  return {
    insert(): number {
      return 0;
    },
    nullify(): void {},
  };
}
