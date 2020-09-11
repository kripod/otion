# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.2](https://github.com/kripod/otion/compare/v0.6.1...v0.6.2) (2020-09-11)

**Note:** Version bump only for package otion

## [0.6.1](https://github.com/kripod/otion/compare/v0.6.0...v0.6.1) (2020-08-25)

### Bug Fixes

- type checking issue ([2210bc8](https://github.com/kripod/otion/commit/2210bc82bcdfc4ddadc5918ce43147cfac8b2134))

# [0.6.0](https://github.com/kripod/otion/compare/v0.5.5...v0.6.0) (2020-08-25)

**Note:** Version bump only for package otion

## [0.5.5](https://github.com/kripod/otion/compare/v0.5.4...v0.5.5) (2020-08-12)

### Bug Fixes

- don't minify ' :' to ':' in custom selectors ([99aa618](https://github.com/kripod/otion/commit/99aa618b628e42a36eb86b104b30e920300d9ed9))

## [0.5.4](https://github.com/kripod/otion/compare/v0.5.3...v0.5.4) (2020-08-11)

### Bug Fixes

- **hydrate:** ignore broken rule declarations ([bc1ed78](https://github.com/kripod/otion/commit/bc1ed78cab58099fa2beae1cbf52550957af9ec7))

## [0.5.3](https://github.com/kripod/otion/compare/v0.5.2...v0.5.3) (2020-08-02)

### Bug Fixes

- improve custom selector list splitting ([37b02a9](https://github.com/kripod/otion/commit/37b02a9f663cbf896bcb5c83d949de543336c3b7)), closes [#45](https://github.com/kripod/otion/issues/45)
- resolve self-references ([f0ba93f](https://github.com/kripod/otion/commit/f0ba93f3c90aedb735cebcee1466bdb163734e0f))

### Performance Improvements

- use reluctant RegExp matchers ([7e6e53d](https://github.com/kripod/otion/commit/7e6e53d26844db9947c32bfcc33f1f8764c7c6c6))

## [0.5.2](https://github.com/kripod/otion/compare/v0.5.1...v0.5.2) (2020-07-26)

### Bug Fixes

- **hydrate:** respect rule precedence groups ([dc08fa8](https://github.com/kripod/otion/commit/dc08fa81aeee8f51a8f09f554a5d7fd681cf050a)), closes [#42](https://github.com/kripod/otion/issues/42)
- **hydration:** ident name parsing ([d4a4e32](https://github.com/kripod/otion/commit/d4a4e32db98a0b807127cd8a528241c2cb6912b3))
- hydrating ident name of complex rules ([958d8a0](https://github.com/kripod/otion/commit/958d8a099f296c955ca6022c67cfdb370efd7e8a))

## [0.5.1](https://github.com/kripod/otion/compare/v0.5.0...v0.5.1) (2020-07-26)

### Bug Fixes

- custom property precedence management ([c38f132](https://github.com/kripod/otion/commit/c38f1323ef3f6fddb4dbf83259cc48d49024e8ac))

# [0.5.0](https://github.com/kripod/otion/compare/v0.4.0...v0.5.0) (2020-07-23)

### Features

- conditional rule precedence management ([7ecaaa2](https://github.com/kripod/otion/commit/7ecaaa2fe29834d1397f59566c7b422e3b454614))

# [0.4.0](https://github.com/kripod/otion/compare/v0.3.4...v0.4.0) (2020-07-22)

### Bug Fixes

- assign higher precedence to custom selectors ([002c790](https://github.com/kripod/otion/commit/002c790d6bfd77d84e88858cfd4f529d8a836573))
- class selector start index tracking ([f9f666e](https://github.com/kripod/otion/commit/f9f666e3cd87e4579eab71013d5ecffc0fd37d99))
- property and pseudo precedence management ([b36a50a](https://github.com/kripod/otion/commit/b36a50a3f94370d1ef153cea7d603f183c74f378))

### Features

- precedence management without class repeats ([16acfbc](https://github.com/kripod/otion/commit/16acfbce0a12c36eff0cb1ece392c4699955846a))

### Performance Improvements

- lazy rule precedence calculation ([a1eff01](https://github.com/kripod/otion/commit/a1eff01cbdf7cc9bf7784ae66c511580cf3496f8))

### Reverts

- "refactor: use a Map for tracking inserted rules" ([046145a](https://github.com/kripod/otion/commit/046145a9198c98d021cb3bd680b7da3b032e60b1))

## [0.3.4](https://github.com/kripod/otion/compare/v0.3.3...v0.3.4) (2020-07-19)

### Bug Fixes

- **codesandbox:** package entry point resolution ([4fd92b4](https://github.com/kripod/otion/commit/4fd92b4d6bf8eccb3be235cf779aa87338307ec3))
- **nextjs:** server-side module resolution ([d47911b](https://github.com/kripod/otion/commit/d47911b2a09ed48c02d6e867fce1d338dd5d029b))
- **package:** module resolution ([3f084f6](https://github.com/kripod/otion/commit/3f084f6542e2d6831f25add58e185e99032f262f))
- compatibility with older bundlers ([#29](https://github.com/kripod/otion/issues/29)) ([61d0763](https://github.com/kripod/otion/commit/61d0763d1ea57d6098c42bccd3f701d08e694b77))

### Reverts

- "chore(package): remove non-standard ESM entry" ([57fe06b](https://github.com/kripod/otion/commit/57fe06bbcec1881c0f0875580f79dd0c74806ec5))

## [0.3.3](https://github.com/kripod/otion/compare/v0.3.2...v0.3.3) (2020-07-13)

### Bug Fixes

- add missing unitless property matcher pattern ([b93465e](https://github.com/kripod/otion/commit/b93465ef54f4a09792e718559f016b818b70bf46))
- support manual vendor prefixing for '-ms-\*' ([6ae277f](https://github.com/kripod/otion/commit/6ae277fe4f2bc64d0343676bf9320ac6e5cb339d))

## [0.3.2](https://github.com/kripod/otion/compare/v0.3.1...v0.3.2) (2020-05-21)

### Bug Fixes

- avoid production render failure in Chrome ([0eb21f8](https://github.com/kripod/otion/commit/0eb21f8bb9d80ed9e52f1a343137efb0a758fcf4))

## [0.3.1](https://github.com/kripod/otion/compare/v0.3.0...v0.3.1) (2020-05-19)

### Bug Fixes

- advanced selector ordering ([df2d1ae](https://github.com/kripod/otion/commit/df2d1aed8ef2b43431edc280372521a0ff552179))

# [0.3.0](https://github.com/kripod/otion/compare/v0.2.5...v0.3.0) (2020-05-19)

### Features

- support advanced nesting selectors ([b5e97da](https://github.com/kripod/otion/commit/b5e97da7af193798c08910b48c488d6a5a18ea4f))
- support selector lists for grouping rules ([50c6ffa](https://github.com/kripod/otion/commit/50c6ffacde6c74d5235528a271ba676552bb9866)), closes [#7](https://github.com/kripod/otion/issues/7)

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

- **ssr:** clear inserted idents between renders ([07679e1](https://github.com/kripod/otion/commit/07679e1ae784f26bca129f20fb4abc53a801192b)), closes [#8](https://github.com/kripod/otion/issues/8)

# [0.2.0](https://github.com/kripod/otion/compare/v0.1.3...v0.2.0) (2020-05-19)

### Bug Fixes

- make browser checks Deno-compatible ([96a05e9](https://github.com/kripod/otion/commit/96a05e993c1dc7849aefab0ceb428e8d0b815bb8))

### Features

- add Deno-compatible build output ([e54209a](https://github.com/kripod/otion/commit/e54209adea636733b1ecc2bc334f2f7c5206033f)), closes [#8](https://github.com/kripod/otion/issues/8)

### Reverts

- "build: experiment with dev/prod bundle separation" ([f71aa35](https://github.com/kripod/otion/commit/f71aa35a9b11965714fa21316155d185b8214447))

## [0.1.2](https://github.com/kripod/otion/compare/v0.1.1...v0.1.2) (2020-05-18)

### Bug Fixes

- integration with Code Sandbox ([6745dec](https://github.com/kripod/otion/commit/6745dec0bf176fd549252e111ce1ea50b7f76e02))

## [0.1.1](https://github.com/kripod/otion/compare/v0.1.0...v0.1.1) (2020-05-18)

### Bug Fixes

- applying a pseudo selector directly ([eb45b63](https://github.com/kripod/otion/commit/eb45b637edfe7ce7152c308e2b8fbd98e27d8a5d)), closes [#5](https://github.com/kripod/otion/issues/5)

# 0.1.0 (2020-05-17)

### Bug Fixes

- disable auto-hydration to avoid double passes ([ab9a0b0](https://github.com/kripod/otion/commit/ab9a0b0c360c70ca37303993cb13ef58b401f880))
- hydration when keyframes are involved ([648217a](https://github.com/kripod/otion/commit/648217a54f66fc857fae78384e1a80088f29d96b))
- only allow simple, non-nested pseudos ([73c376c](https://github.com/kripod/otion/commit/73c376ce7692681ed97381e95fc4840a4fc03868))
- package metadata about module formats ([7fb475d](https://github.com/kripod/otion/commit/7fb475d55e916bf5c1765fa31bf8d5fe179987b6))
- package metadata for typings ([db76d5d](https://github.com/kripod/otion/commit/db76d5de32e3afc0d93456d53ee8432a6e51d5df))
- proposed `mask` precedence ([ca2727b](https://github.com/kripod/otion/commit/ca2727b7ee3c955a13874a222b810aed21585525))
- remove mistakenly included data from bundle ([070d483](https://github.com/kripod/otion/commit/070d483e9f0e71151c2d4fed4c3b24ee3633c841))
- revoke typings support for advanced pseudos ([aabaa13](https://github.com/kripod/otion/commit/aabaa13cdb4255e8c3c1e04a789df54e871b80de))
- **otion:** rule nesting ([345c301](https://github.com/kripod/otion/commit/345c3010e2736c0f0d2f559606ab1e00339a367d))

### Features

- accept custom pseudos ([346ae13](https://github.com/kripod/otion/commit/346ae13886c14da348e6e056f7c1727938a512bb))
- add `CSSKeyframeRules` type ([e6bd877](https://github.com/kripod/otion/commit/e6bd877884d8d1e7c4b0c89e65e9c79c63155ae9))
- add `server` subpath export for basic SSR ([ca67bb4](https://github.com/kripod/otion/commit/ca67bb45cfe5762eded005c0ad47fb5f84b2d9a2))
- add draft for shorthand property matchers ([cb2513d](https://github.com/kripod/otion/commit/cb2513da67ff6a7b8ea5e8efa3d011a990247c41))
- add React bindings for better SSR ([81cb74d](https://github.com/kripod/otion/commit/81cb74d4b622302e509c514e91420bf305fbcde7))
- add support for fallback values ([94c24df](https://github.com/kripod/otion/commit/94c24df320a1c755bb0219e06da7d58dd74bf620))
- basic support for defining keyframes ([b22a312](https://github.com/kripod/otion/commit/b22a31230367daa9a7ba295a204a6603c641c0d4))
- detailed error for non-configured instances ([a848335](https://github.com/kripod/otion/commit/a848335a475ddcf238fd81857d757d1ced5ab476))
- make `prefix` function modifiable ([b7b8d8d](https://github.com/kripod/otion/commit/b7b8d8d5b9156d8b2228e41ab14eed3893bc677d))
- manage precedence of pseudoselectors ([3af15a9](https://github.com/kripod/otion/commit/3af15a97bdbd8a98b817b8bf26efd0978f55f177))
- property precedence management ([69e7cfb](https://github.com/kripod/otion/commit/69e7cfb6d431c1b3bee66b433074f4152b22da48))
- **ssr:** filter out unreferenced rules from HTML ([8cf6c6b](https://github.com/kripod/otion/commit/8cf6c6b5e8cbb68899363b028841ec0f75e2f171))
- provide ESM builds for servers ([3b4ae60](https://github.com/kripod/otion/commit/3b4ae6063d359f72a25aab556877503f0eba1177))
- style sheet hydration ([74bf4f9](https://github.com/kripod/otion/commit/74bf4f9a7ef155cacf179c489f208e100a3ba699))

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

- "chore(deps): update csstype" ([044b74c](https://github.com/kripod/otion/commit/044b74c7d2607efe6cfb79fde1fa0bc2a0aacb37))
- remove remains of global styling ([1a57217](https://github.com/kripod/otion/commit/1a572177904d0b22dd98b17838b147afc27950b0))
- remove rule nullification capability ([d413d54](https://github.com/kripod/otion/commit/d413d54be04e98094f974dc7beac1107c37e3be3))
- remove SVG attribute support ([c76b8f3](https://github.com/kripod/otion/commit/c76b8f3807e4d1419003b2aa02f4ce2d34df2f2f))
