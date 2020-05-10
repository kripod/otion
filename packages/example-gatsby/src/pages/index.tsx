import { css, keyframes } from 'otion';
import * as React from 'react';

const pulse = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export default function IndexPage(): JSX.Element {
  return (
    <React.StrictMode>
      <h1>Hello, world!</h1>
      <p
        className={css({
          color: 'green',
          fontWeight: 'bold',
          fontSize: 30,
          textEmphasis: 'filled   red',
          animation: `${pulse} 3s infinite alternate`,

          '@media': {
            ' (min-width:  \n600px)   ': {
              ':hover': {
                color: 'palevioletred  ',
                background: 'papayawhip',
              },
            },

            '(min-width:1024px)': {
              '@supports': {
                '  (  display:  grid  )  ': {
                  display: ['float', 'flex', 'grid'],
                },
              },
            },
          },
        })}
      >
        This is some long dummy text to demonstrate the styling capabilities
        provided by the underlying library.
      </p>
    </React.StrictMode>
  );
}
