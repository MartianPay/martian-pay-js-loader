import dotenv from 'rollup-plugin-dotenv';
import ts from 'rollup-plugin-typescript2';

import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

import pkg from './package.json' with {type: 'json'};

const PLUGINS = [
  ts({
    tsconfigOverride: {exclude: ['**/*.test.ts']},
    declaration: true,
    declarationDir: './dist',
  }),
  babel({
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
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
  {
    input: 'src/pure.ts',
    output: [
      {file: 'dist/pure.js', format: 'cjs'},
      {file: 'dist/pure.mjs', format: 'es'},
    ],
    plugins: PLUGINS,
    external: [/@babel\/runtime/],
  },
];
