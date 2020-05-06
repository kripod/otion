import * as React from 'react';

export * from 'otion/server';

export function getStyleElements(rules: string[]): JSX.Element[] {
  return [
    // eslint-disable-next-line react/no-danger
    <style id="__otion" dangerouslySetInnerHTML={{ __html: rules.join('') }} />,
  ];
}
