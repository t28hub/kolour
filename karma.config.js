// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: [
      'mocha'
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/**/*.test.es6'
    ],
    exclude: [
    ],
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ],
    preprocessors: {
      'test/**/*.test.es6': [
        'webpack'
      ]
    },
    webpack: {
      entry: [
        './src/kolour.es6'
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
