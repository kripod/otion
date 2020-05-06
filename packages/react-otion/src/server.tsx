import * as React from 'react';

export * from 'otion/server';

export function getStyleElements(rules: string[]): JSX.Element[] {
  return [<style id="__otion">{rules.join('')}</style>];
}
