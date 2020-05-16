# otion

Atomic CSS-in-JS with a featherweight runtime

## Backstory

Design systems embrace a component-oriented mindset. Popularized by [Tailwind CSS][], utility classes provide reusable styles with no unwanted side-effects. However, they have to be generated upfront.

Atomicity generalizes the former concept by instantiating style rules on demand. Serving as a solid foundation for constraint-based layouts, [atomic CSS-in-JS][] has come to fluorish at scale.

[tailwind css]: https://tailwindcss.com/
[atomic css-in-js]: https://sebastienlorber.com/atomic-css-in-js

## Key features

- 🎳 Support for shorthand properties
- 🍱 Reliable pseudo selector ordering
- 🔐 Type safety with autocompletion
- 🦖 Auto-prefixing and fallback values
- 📚 Embedded TSDoc reference
- 🐾 Negligible runtime footprint
- 💫 Works without a framework

## Example

The following demo covers a wide range of use-cases.

As a core function, `css(rules)` returns a space-separated list of stably generated class names. Each property–value pair is only injected once to the library-managed style sheet.

```jsx
import { css, keyframes } from 'otion';

// Animation keyframes are lazily initialized
const pulse = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
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
            animation: `${pulse} 1s infinite alternate`,
          },
        })}
      >
        I'm also blue, reusing the CSS class injected by my sibling
      </p>
    </>
  );
}
```

## Documentation

Please refer to the [`otion` package manual](./packages/otion/README.md) for an explorable reference. Additionally, each integration below has its own setup guide.

## Integrations

TODO

## Acknowledgements

The project's name is an ode to [Emotion](https://emotion.sh/), an extensive CSS-in-JS runtime. Similar libraries had great impact on the initial development process, including but not limited to:

- [Styled Components](https://styled-components.com/), with its thoroughly tested approaches
- [Styletron](https://www.styletron.org/), for openly discussing the caveats of atomic styling
- [glamor](https://github.com/threepointone/glamor), by its simplistic and comprehensible implementation
