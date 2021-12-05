module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  env: {},
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),

      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],

        alias: {
          '@app': './app',
          '@components': './app/components/',
          '@screens': './app/screens/',
          '@store': './app/store/',
          '@navigation': './app/navigation/',
          '@models': './app/models/',
          '@constants': './app/constants/',
          '@config': './app/config/',
        },
      },
    ],
    'react-native-reanimated/plugin',
    'jest-hoist',
  ],
};
