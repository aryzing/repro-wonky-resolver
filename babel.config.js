// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = api => {
  const isTest = api.env('test');

  const baseBabelPresetEnvOptions = {
    modules: false,
  };

  // This repo uses Jest for tests, which runs on node
  const environmentBabelPresetEnvOptions = isTest
    ? {
        targets: {
          node: 'current',
        },
      }
    : {
        targets: 'last 2 Firefox versions, last 2 Firefox versions',
      };

  const babelPresetEnvOptions = {
    ...baseBabelPresetEnvOptions,
    ...environmentBabelPresetEnvOptions,
  };

  return {
    presets: [
      ['@babel/preset-env', babelPresetEnvOptions],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      'babel-plugin-styled-components',
    ],
  };
};
