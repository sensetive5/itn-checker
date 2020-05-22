import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',
  output: {
    name: 'ItnChecker',
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true
  },
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
};
