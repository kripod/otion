import { getStyleElement } from './getStyleElement';

export interface InjectorConfig<T> {
  nonce?: string;
  target?: T;
}

type InjectorInstance = {
  sheet?: CSSStyleSheet;
  insert(rule: string, index: number): number;
  nullify(index: number): void;
};

type VirtualInjectorInstance = InjectorInstance & {
  nonce: string | undefined;
  ruleTexts: string[];
};

export function VirtualInjector({
  nonce,
  target: ruleTexts = [],
}: InjectorConfig<string[]> = {}): VirtualInjectorInstance {
  return {
    nonce,
    ruleTexts,

    insert(rule, index): number {
      ruleTexts.splice(index, 0, rule);
      return index;
    },

    // No styles are revoked during server-side rendering
    nullify(): void {},
  };
}

export function CSSOMInjector({
  nonce,
  target = getStyleElement().sheet as CSSStyleSheet,
}: InjectorConfig<CSSStyleSheet>): InjectorInstance {
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
}: InjectorConfig<HTMLStyleElement>): InjectorInstance {
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

export function NoOpInjector(): InjectorInstance {
  return {
    insert(): number {
      return 0;
    },
    nullify(): void {},
  };
}
