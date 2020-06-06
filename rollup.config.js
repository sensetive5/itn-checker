import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'esm'
    },
    {
      file: pkg.browser,
      format: 'iife',
      name: 'ItnChecker'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
  plugins: [
    typescript({
      clean: true,
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          baseUrl: './src'
        },
        files: ['./src/index.ts']
      }
    }),
    terser()
  ]
}
