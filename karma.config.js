// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: [
      'mocha'
    ],
    files: [
      'test/**/*.test.es6'
    ],
    exclude: [
    ],
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-espower-preprocessor'
    ],
    preprocessors: {
      'test/**/*.test.es6': [
        'webpack',
        'espower'
      ]
    },
    webpack: {
      entry: [
        'babel-polyfill',
        'src/kolour.es6'
      ],
      module: {
        loaders: [
          {
            test: /.+\.es6$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              presets: [
                'es2015',
                'stage-0'
              ],
              plugins: [
                'babel-plugin-espower'
              ]
            }
          },
          {
            test: /.+\.json$/,
            loader: 'json'
          }
        ],
        exprContextCritical: false
      }
    },
    reporters: [
      'mocha'
    ],
    browsers: [
      'PhantomJS'
    ],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity
  })
};
