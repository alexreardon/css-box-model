// @flow
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

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
  // Universal module definition (UMD) build
  {
    input,
    output: {
      file: 'dist/css-box-model.js',
      format: 'umd',
      name: 'cssBoxModel',
    },
    plugins: [
      // Setting development env before running babel etc
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      babel(),
      commonjs({ include: 'node_modules/**' }),
    ],
  },
  // Universal module definition (UMD) build (production)
  {
    input,
    output: {
      file: 'dist/css-box-model.min.js',
      format: 'umd',
      name: 'cssBoxModel',
    },
    plugins: [
      // Setting production env before running babel etc
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      babel(),
      commonjs({ include: 'node_modules/**' }),
      uglify(),
    ],
  },
];
