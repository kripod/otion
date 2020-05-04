module.exports = {
  babelrcRoots: ['./packages/*/'],
  presets: [
    '@babel/typescript',
    '@babel/react',
    ['@babel/env', { bugfixes: true }],
  ],
  plugins: ['@babel/transform-runtime'],
};
