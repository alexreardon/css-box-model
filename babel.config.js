module.exports = {
  presets: ['@babel/flow', ['@babel/env', { loose: true }]],
  plugins: [
    // used for stripping out the `invariant` messages in production builds
    'dev-expression',
  ],
  comments: false,
};
