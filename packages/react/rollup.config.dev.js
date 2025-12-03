import pkg from './package.json'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: pkg.jsdelivr,
      format: 'umd',
      name: 'ReactLuckyScratch',
      sourcemap: true,
      globals: {
        'lucky-scratch': 'LuckyScratch',
      },
    },
  ],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs(),
    json(),
    livereload(),
    serve({
      open: true,
      port: 8000,
      contentBase: './',
      openPage: '/example/react16.8.html',
    }),
  ],
  external: ['react'],
}
