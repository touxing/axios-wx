import { RollupOptions } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
// import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const isProduction = process.env.BUILD === 'production'

const pkg = require('./package.json')

const libraryName = 'axios-wx'

/**
 * @desc 短杠线命名转驼峰命名
 * @param {String} name
 * @returns
 */
function toHump(name: string): string {
  if (!name) return name
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

const rollupConfig: RollupOptions = {
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: toHump(libraryName), // 挂载到 window上的属性名
      format: 'umd',
      sourcemap: true,
    },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    sourceMaps(),
    isProduction && terser(),
  ].filter(Boolean),
}

export default rollupConfig
