<p align="center">
	<img alt="otion" src="https://raw.githubusercontent.com/kripod/otion/master/assets/logo.svg?sanitize=true" width="307">
</p>

<p align="center">
	Atomic CSS-in-JS with a featherweight runtime
</p>

<p align="center">
	<a href="https://www.npmjs.com/package/otion"><img alt="npm" src="https://img.shields.io/npm/v/otion"></a>
	<a href="https://lgtm.com/projects/g/kripod/otion/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/kripod/otion.svg?logo=lgtm&logoWidth=18"/></a>
	<a href="https://travis-ci.com/github/kripod/otion"><img alt="Travis (.com)" src="https://img.shields.io/travis/com/kripod/otion"></a>
</p>

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
- 📚 Embedded JSDoc reference
- 🐾 Negligible runtime footprint
- 💫 Works without a framework

## Example

The following demo covers a wide range of use-cases.

As a core function, `css` returns a space-separated list of stably generated unique class names. Each property–value pair is only injected once to the library-managed style sheet.

```jsx
import { css, keyframes } from "otion";

// Animation keyframes are lazily initialized
const pulse = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

// Use of JSX is optional, as the solution is framework-agnostic
function Component() {
  return (
    <>
      <p className={css({ color: "blue" })}>I am blue</p>
      <p
        className={css({
          color: "blue",
          ":hover": {
            animation: `${pulse} 3s infinite alternate`
          }
        })}
      >
        I am also blue, reusing the CSS class injected by my sibling
      </p>
    </>
  );
}
```

## Documentation

Please refer to the [`otion` package manual](./packages/otion/README.md) for an explorable reference. Additionally, each integration below has its own setup guide.

## Integrations

- Gatsby ([plugin](./packages/gatsby-plugin-otion), [example](./packages/example-gatsby))
- Next.js ([example](./packages/example-nextjs))

## Acknowledgements

The project's name is an ode to [Emotion](https://emotion.sh/), an extensive CSS-in-JS runtime. Similar libraries had great impact on the initial development process, including but not limited to:

- [Styled Components](https://styled-components.com/), with its thoroughly tested approaches
- [Styletron](https://www.styletron.org/), for openly discussing the caveats of atomic styling
- [glamor](https://github.com/threepointone/glamor), by its simplistic and comprehensible implementation

The logo's ocean emoji is courtesy of [Twemoji](https://twemoji.twitter.com/).
