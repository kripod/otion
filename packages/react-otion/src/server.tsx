import { getStyleProps, VirtualInjector } from 'otion/server';
import * as React from 'react';

export * from 'otion/server';

/**
 * Transforms an injector's data into a `<style>` JSX element.
 *
 * @param injector Server-side style rule injector.
 *
 * @returns A `<style>` JSX element containing server-renderable CSS.
 */
export function getStyleElement(
  injector: ReturnType<typeof VirtualInjector>,
): JSX.Element {
  const { id, nonce, textContent } = getStyleProps(injector);

  return (
    <style
      id={id}
      nonce={nonce}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  );
}
