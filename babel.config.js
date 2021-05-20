const path = require('path');

// const errorCodesPath = path.resolve(__dirname, './docs/public/static/error-codes.json');
// const missingError = process.env.MUI_EXTRACT_ERROR_CODES === 'true' ? 'write' : 'annotate';

// function resolveAliasPath(relativeToBabelConf) {
//   const resolvedPath = path.relative(process.cwd(), path.resolve(__dirname, relativeToBabelConf));
//   return `./${resolvedPath.replace('\\', '/')}`;
// }

// const defaultAlias = {
//   '@material-ui/core': resolveAliasPath('./packages/material-ui/src'),
//   '@material-ui/docs': resolveAliasPath('./packages/material-ui-docs/src'),
//   '@material-ui/icons': resolveAliasPath('./packages/material-ui-icons/lib'),
//   '@material-ui/lab': resolveAliasPath('./packages/material-ui-lab/src'),
//   '@material-ui/styled-engine': resolveAliasPath('./packages/material-ui-styled-engine/src'),
//   '@material-ui/styled-engine-sc': resolveAliasPath('./packages/material-ui-styled-engine-sc/src'),
//   '@material-ui/styles': resolveAliasPath('./packages/material-ui-styles/src'),
//   '@material-ui/system': resolveAliasPath('./packages/material-ui-system/src'),
//   '@material-ui/private-theming': resolveAliasPath('./packages/material-ui-private-theming/src'),
//   '@material-ui/unstyled': resolveAliasPath('./packages/material-ui-unstyled/src'),
//   '@material-ui/utils': resolveAliasPath('./packages/material-ui-utils/src'),
// };

// const productionPlugins = [
//   ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
// ];

module.exports = function getBabelConfig(api) {
  const useESModules = api.env(['legacy', 'modern', 'stable', 'rollup']);

  const presets = [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
        debug: process.env.MUI_BUILD_VERBOSE === 'true',
        // modules: useESModules ? false : 'commonjs',
        modules: false,
        shippedProposals: api.env('modern'),
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ];

  const plugins = [
    // Need the following 3 proposals for all targets in .browserslistrc.
    // With our usage the transpiled loose mode is equivalent to spec mode.
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ];

  return {
    presets,
    plugins,
    ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  };
};