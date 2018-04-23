import babel from 'rollup-plugin-babel';

const input = 'src/index.js';

export default [
  // ESM build
  {
    input,
    output: {
      file: 'dist/css-box-model.esm.js',
      format: 'es',
    },
    plugins: [babel()],
  },
  // CommonJS build
  {
    input,
    output: {
      file: 'dist/css-box-model.cjs.js',
      format: 'cjs',
    },
    plugins: [babel()],
  },
];
