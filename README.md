# otion

Atomic CSS-in-JS with a featherweight runtime

## Backstory

Design systems embrace a component-oriented mindset. Popularized by [Tailwind CSS][], utility classes provide reusable styles with no unwanted side-effects. However, they have to be generated upfront.

Atomicity generalizes the former concept by instantiating styling rules on demand. Serving as a solid foundation for constraint-based layouts, [atomic CSS-in-JS][] has come to fluorish at scale.

[tailwind css]: https://tailwindcss.com/
[atomic css-in-js]: https://sebastienlorber.com/atomic-css-in-js

## Key features

- 🎳 Support for shorthand properties
- 🍱 Reliable pseudo selector ordering
- 🔐 Type safety with autocompletion
- 🦖 Auto-prefixing and fallback values
- 🐾 Negligible runtime footprint
- 💫 Works without a framework

## Example

The following demo covers a wide range of use-cases.

As a core function, `css(rules)` returns a space-separated list of stably generated class names. Each property–value pair is only injected once to the library-managed style sheet.

```jsx
import { css, keyframes } from 'otion';

// Animation keyframes are lazily initialized
const pulse = keyframes({
  from: { opacity: 0.2 },
  to: { opacity: 0.8 },
});

// Use of JSX is optional, as the solution is framework-agnostic
function Component() {
  return (
    <>
      <p className={css({ color: 'blue' })}>I'm blue</p>
      <p
        className={css({
          color: 'blue',
          ':hover': {
            // Style attachment happens upon usage
            animation: `${pulse} 1s infinite`,
          },
        })}
      >
        I'm also blue, reusing the CSS class injected by my sibling
      </p>
    </>
  );
}
```

## Integrations

TODO

## Acknowledgements

The project's name is an ode to [Emotion](https://emotion.sh/), an extensive CSS-in-JS runtime. Similar libraries had great impact on the initial development process, including but not limited to:

- [Styled Components](https://styled-components.com/), with its thoroughly tested approaches
- [Styletron](https://www.styletron.org/), for openly discussing the caveats of atomic styling
- [glamor](https://github.com/threepointone/glamor), by its simplistic and comprehensible implementation
