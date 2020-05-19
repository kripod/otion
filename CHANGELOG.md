# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.5](https://github.com/kripod/otion/compare/v0.2.4...v0.2.5) (2020-05-19)

### Bug Fixes

- false min/max-width unitless property match ([72dcc40](https://github.com/kripod/otion/commit/72dcc401d1ab0b6aeda4af189abc87c48b9290f9))

## [0.2.4](https://github.com/kripod/otion/compare/v0.2.3...v0.2.4) (2020-05-19)

### Bug Fixes

- support for Pika CDN and Deno ([9fd66ea](https://github.com/kripod/otion/commit/9fd66eab74a371ce92c9cec6a900217edbf4f40f))

## [0.2.3](https://github.com/kripod/otion/compare/v0.2.2...v0.2.3) (2020-05-19)

**Note:** Version bump only for package otion

## [0.2.2](https://github.com/kripod/otion/compare/v0.2.1...v0.2.2) (2020-05-19)

### Bug Fixes

- **example-nextjs:** hover animation smoothness ([356f6dc](https://github.com/kripod/otion/commit/356f6dc7a083c1ed1f87991fbe7f3f5e9fc83a28))
- **ssr:** clear inserted idents between renders ([07679e1](https://github.com/kripod/otion/commit/07679e1ae784f26bca129f20fb4abc53a801192b)), closes [#8](https://github.com/kripod/otion/issues/8)

### Features

- add Deno type references ([43460d6](https://github.com/kripod/otion/commit/43460d6aa095467688d7816ca487b21e6ef0747b))

## [0.2.1](https://github.com/kripod/otion/compare/v0.2.0...v0.2.1) (2020-05-19)

**Note:** Version bump only for package otion

# [0.2.0](https://github.com/kripod/otion/compare/v0.1.3...v0.2.0) (2020-05-19)

### Bug Fixes

- make browser checks Deno-compatible ([96a05e9](https://github.com/kripod/otion/commit/96a05e993c1dc7849aefab0ceb428e8d0b815bb8))

### Features

- add Deno-compatible build output ([e54209a](https://github.com/kripod/otion/commit/e54209adea636733b1ecc2bc334f2f7c5206033f)), closes [#8](https://github.com/kripod/otion/issues/8)

### Reverts

- "build: experiment with dev/prod bundle separation" ([f71aa35](https://github.com/kripod/otion/commit/f71aa35a9b11965714fa21316155d185b8214447))

## [0.1.3](https://github.com/kripod/otion/compare/v0.1.2...v0.1.3) (2020-05-18)

### Bug Fixes

- peer dependency ranges ([faa6338](https://github.com/kripod/otion/commit/faa6338344d6ffec9983e02bdaba363233ff12a0))

## [0.1.2](https://github.com/kripod/otion/compare/v0.1.1...v0.1.2) (2020-05-18)

### Bug Fixes

- integration with Code Sandbox ([6745dec](https://github.com/kripod/otion/commit/6745dec0bf176fd549252e111ce1ea50b7f76e02))

## [0.1.1](https://github.com/kripod/otion/compare/v0.1.0...v0.1.1) (2020-05-18)

### Bug Fixes

- applying a pseudo selector directly ([eb45b63](https://github.com/kripod/otion/commit/eb45b637edfe7ce7152c308e2b8fbd98e27d8a5d)), closes [#5](https://github.com/kripod/otion/issues/5)

# 0.1.0 (2020-05-17)

### Bug Fixes

- **gatsby-plugin:** configurability ([119eaa1](https://github.com/kripod/otion/commit/119eaa11db54fa1cafda59e0c2e58fe7cc4e3215))
- disable auto-hydration to avoid double passes ([ab9a0b0](https://github.com/kripod/otion/commit/ab9a0b0c360c70ca37303993cb13ef58b401f880))
- hydration when keyframes are involved ([648217a](https://github.com/kripod/otion/commit/648217a54f66fc857fae78384e1a80088f29d96b))
- only allow simple, non-nested pseudos ([73c376c](https://github.com/kripod/otion/commit/73c376ce7692681ed97381e95fc4840a4fc03868))
- package metadata about module formats ([7fb475d](https://github.com/kripod/otion/commit/7fb475d55e916bf5c1765fa31bf8d5fe179987b6))
- package metadata for typings ([db76d5d](https://github.com/kripod/otion/commit/db76d5de32e3afc0d93456d53ee8432a6e51d5df))
- proposed `mask` precedence ([ca2727b](https://github.com/kripod/otion/commit/ca2727b7ee3c955a13874a222b810aed21585525))
- reduce chance of Dual Package Hazard ([ef24312](https://github.com/kripod/otion/commit/ef243124d7b19f93f6c613162b60890502565811))
- remove mistakenly included data from bundle ([070d483](https://github.com/kripod/otion/commit/070d483e9f0e71151c2d4fed4c3b24ee3633c841))
- **example-gatsby:** issues with HMR ([a2296a5](https://github.com/kripod/otion/commit/a2296a541588cfdd4c865a6ee628d25c65852180))
- revoke typings support for advanced pseudos ([aabaa13](https://github.com/kripod/otion/commit/aabaa13cdb4255e8c3c1e04a789df54e871b80de))
- **otion:** rule nesting ([345c301](https://github.com/kripod/otion/commit/345c3010e2736c0f0d2f559606ab1e00339a367d))
- **react-otion:** style element SSR ([01d8e22](https://github.com/kripod/otion/commit/01d8e220af3851151f0828bee1969e4d7cfe9c0b))

### Features

- **example-nextjs:** support SSR ([a533408](https://github.com/kripod/otion/commit/a533408818cb19ea94f00160b6119d570aaf624e))
- accept custom pseudos ([346ae13](https://github.com/kripod/otion/commit/346ae13886c14da348e6e056f7c1727938a512bb))
- add `CSSKeyframeRules` type ([e6bd877](https://github.com/kripod/otion/commit/e6bd877884d8d1e7c4b0c89e65e9c79c63155ae9))
- add `server` subpath export for basic SSR ([ca67bb4](https://github.com/kripod/otion/commit/ca67bb45cfe5762eded005c0ad47fb5f84b2d9a2))
- add draft for shorthand property matchers ([cb2513d](https://github.com/kripod/otion/commit/cb2513da67ff6a7b8ea5e8efa3d011a990247c41))
- add React bindings for better SSR ([81cb74d](https://github.com/kripod/otion/commit/81cb74d4b622302e509c514e91420bf305fbcde7))
- add support for fallback values ([94c24df](https://github.com/kripod/otion/commit/94c24df320a1c755bb0219e06da7d58dd74bf620))
- basic support for defining keyframes ([b22a312](https://github.com/kripod/otion/commit/b22a31230367daa9a7ba295a204a6603c641c0d4))
- detailed error for non-configured instances ([a848335](https://github.com/kripod/otion/commit/a848335a475ddcf238fd81857d757d1ced5ab476))
- make `prefix` function modifiable ([b7b8d8d](https://github.com/kripod/otion/commit/b7b8d8d5b9156d8b2228e41ab14eed3893bc677d))
- property precedence management ([69e7cfb](https://github.com/kripod/otion/commit/69e7cfb6d431c1b3bee66b433074f4152b22da48))
- **ssr:** filter out unreferenced rules from HTML ([8cf6c6b](https://github.com/kripod/otion/commit/8cf6c6b5e8cbb68899363b028841ec0f75e2f171))
- manage precedence of pseudoselectors ([3af15a9](https://github.com/kripod/otion/commit/3af15a97bdbd8a98b817b8bf26efd0978f55f177))
- provide ESM builds for servers ([3b4ae60](https://github.com/kripod/otion/commit/3b4ae6063d359f72a25aab556877503f0eba1177))
- style sheet hydration ([74bf4f9](https://github.com/kripod/otion/commit/74bf4f9a7ef155cacf179c489f208e100a3ba699))
- **example-gatsby:** add dummy 404 page ([fa5f7d8](https://github.com/kripod/otion/commit/fa5f7d89abea055abee9297e6b646cf601051e0d))

### Performance Improvements

- avoid array mutation ([01947d9](https://github.com/kripod/otion/commit/01947d9580462163914aaed31d17646dc4d076e2))
- eliminate array from `getClassNames` ([f3ce954](https://github.com/kripod/otion/commit/f3ce9547b5f7c59c7e8e365542b3ca324ad8f6ad))
- generate rule templates only once per parent ([8d032bc](https://github.com/kripod/otion/commit/8d032bc7c06ad58e76ce03e0889edb2a8501df21))
- optimize conditions of unitless prop RegExp ([8b87a34](https://github.com/kripod/otion/commit/8b87a3418653d236a974a40613332aeb808dbef4))
- optimize opening bracket insertion ([b13a970](https://github.com/kripod/otion/commit/b13a97078eaae8f7a4f05eb3c0fbc867d7c01578))
- optimize proposed precedence rules ([824fbd9](https://github.com/kripod/otion/commit/824fbd932ea8aad2bca696555d6b8eaf93724f30))
- optimize pseudoselector precedence lookup ([1279842](https://github.com/kripod/otion/commit/12798428b097ed7ffb58c18e63bbcb29294760a1))
- optimize RegExps in comments ([8bbaefd](https://github.com/kripod/otion/commit/8bbaefdd29f5ecd1d5e9dc4212c06aa648f28abd))
- save a few bytes ([3727ea2](https://github.com/kripod/otion/commit/3727ea2dd3cd296037e07400057af2b06d4b3f8f))

### Reverts

- **example-nextjs:** using `src` directory ([133b6ad](https://github.com/kripod/otion/commit/133b6ad33937a88c43bc5bd72bbcb65663c2f900))
- "chore(deps): update csstype" ([044b74c](https://github.com/kripod/otion/commit/044b74c7d2607efe6cfb79fde1fa0bc2a0aacb37))
- remove remains of global styling ([1a57217](https://github.com/kripod/otion/commit/1a572177904d0b22dd98b17838b147afc27950b0))
- remove rule nullification capability ([d413d54](https://github.com/kripod/otion/commit/d413d54be04e98094f974dc7beac1107c37e3be3))
- remove SVG attribute support ([c76b8f3](https://github.com/kripod/otion/commit/c76b8f3807e4d1419003b2aa02f4ce2d34df2f2f))
- **react-otion:** remove client-side part ([086ead0](https://github.com/kripod/otion/commit/086ead054488162e951802d592d4db4cb1a5a1aa))
