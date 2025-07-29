import babel from 'rollup-plugin-babel';
import dotenv from 'rollup-plugin-dotenv';
import ts from 'rollup-plugin-typescript2';

import replace from '@rollup/plugin-replace';

import pkg from './package.json';

const PLUGINS = [
  ts({
    tsconfigOverride: {exclude: ['**/*.test.ts']},
  }),
  babel({
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    runtimeHelpers: true,
  }),
  replace({
    preventAssignment: true,
    _VERSION: JSON.stringify(pkg.version),
  }),
  dotenv({
    exclude: 'node_modules/**',
  }),
];

export default [
  {
    input: 'src/index.ts',
    output: [
      {file: 'dist/index.js', format: 'cjs'},
      {file: 'dist/index.mjs', format: 'es'},
    ],
    plugins: PLUGINS,
    external: [/@babel\/runtime/],
  },
];
