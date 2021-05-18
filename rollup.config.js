import typescript from '@rollup/plugin-typescript';

// const globals = {
//   react: 'React',
//   'react-dom': 'ReactDOM',
// };

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [typescript()],
};