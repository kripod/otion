<p align="center">
	<img alt="otion" src="https://raw.githubusercontent.com/kripod/otion/main/assets/logo.svg?sanitize=true" width="307">
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

Design systems embrace a component-oriented mindset. Inspired by [Tailwind CSS][], utility classes provide reusable styles with no unwanted side-effects. However, they have to be generated upfront.

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

## Getting started

Install the library with a package manager of choice, e.g.:

```shell
npm install otion
```

Additionally, configure frameworks as shown below:

- Create React App ([example](./packages/example-cra), [sandbox](https://githubbox.com/kripod/otion/tree/main/packages/example-cra))
- Gatsby ([plugin](./packages/gatsby-plugin-otion), [example](./packages/example-gatsby), [sandbox](https://githubbox.com/kripod/otion/tree/main/packages/example-gatsby))
- Next.js ([example](./packages/example-nextjs), [sandbox](https://githubbox.com/kripod/otion/tree/main/packages/example-nextjs))

## Example

The following demo covers a wide range of use-cases.

As a core function, `css` returns a space-separated string of unique class names. Each property–value pair is only injected once to the library-managed style sheet.

Please refer to the [core package manual](./packages/otion/README.md) for further information.

```jsx
import { css, keyframes } from "otion";

// Animation keyframes are lazily initialized
const pulse = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
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
      <p
        className={css({
          color: "blue",
          "@media": {
            "(min-width: 768px)": {
              color: "orange"
            }
          }
        })}
      >
        I am orange if your viewport is wider than 768px
      </p>
    </>
  );
}
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/kripod"><img src="https://avatars3.githubusercontent.com/u/14854048?v=4" width="100px;" alt=""/><br /><sub><b>Kristóf Poduszló</b></sub></a><br /><a href="#maintenance-kripod" title="Maintenance">🚧</a> <a href="https://github.com/kripod/otion/commits?author=kripod" title="Code">💻</a> <a href="https://github.com/kripod/otion/commits?author=kripod" title="Documentation">📖</a> <a href="#example-kripod" title="Examples">💡</a> <a href="#ideas-kripod" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-kripod" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/efflam"><img src="https://avatars3.githubusercontent.com/u/149307?v=4" width="100px;" alt=""/><br /><sub><b>efflam</b></sub></a><br /><a href="https://github.com/kripod/otion/issues?q=author%3Aefflam" title="Bug reports">🐛</a> <a href="#ideas-efflam" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://nitropage.com"><img src="https://avatars0.githubusercontent.com/u/4012401?v=4" width="100px;" alt=""/><br /><sub><b>Katja Lutz</b></sub></a><br /><a href="https://github.com/kripod/otion/issues?q=author%3Akatywings" title="Bug reports">🐛</a> <a href="#ideas-katywings" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/biowaffeln"><img src="https://avatars3.githubusercontent.com/u/29342337?v=4" width="100px;" alt=""/><br /><sub><b>Mark Kvetny</b></sub></a><br /><a href="#ideas-biowaffeln" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://formik.com"><img src="https://avatars2.githubusercontent.com/u/4060187?v=4" width="100px;" alt=""/><br /><sub><b>Jared Palmer</b></sub></a><br /><a href="https://github.com/kripod/otion/commits?author=jaredpalmer" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/etc-tiago"><img src="https://avatars1.githubusercontent.com/u/33164463?v=4" width="100px;" alt=""/><br /><sub><b>Tiago Souza</b></sub></a><br /><a href="https://github.com/kripod/otion/commits?author=etc-tiago" title="Documentation">📖</a> <a href="#platform-etc-tiago" title="Packaging/porting to new platform">📦</a> <a href="#example-etc-tiago" title="Examples">💡</a> <a href="https://github.com/kripod/otion/commits?author=etc-tiago" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/eddyw"><img src="https://avatars0.githubusercontent.com/u/1407526?v=4" width="100px;" alt=""/><br /><sub><b>Eddy Wilson</b></sub></a><br /><a href="#ideas-eddyw" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/kripod/otion/issues?q=author%3Aeddyw" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/namjul"><img src="https://avatars2.githubusercontent.com/u/328836?v=4" width="100px;" alt=""/><br /><sub><b>Samuel Hobl</b></sub></a><br /><a href="https://github.com/kripod/otion/issues?q=author%3Anamjul" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Acknowledgements

The project's name is an ode to [Emotion](https://emotion.sh/), an extensive CSS-in-JS runtime. Similar libraries had great impact on the initial development process, including but not limited to:

- [Styled Components](https://styled-components.com/), with its thoroughly tested approaches
- [Styletron](https://www.styletron.org/), for openly discussing the caveats of atomic styling
- [glamor](https://github.com/threepointone/glamor), by its simplistic and comprehensible implementation

The logo's ocean emoji is courtesy of [Twemoji](https://twemoji.twitter.com/).
