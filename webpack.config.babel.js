import path from 'path';

const DIRS = {
  SRC: path.resolve(__dirname, 'src'),
  DST: path.resolve(__dirname, 'build')
};

export default {
  context: DIRS.SRC,
  entry: [
    './kolour.es6'
  ],
  output: {
    path: DIRS.DST,
    filename: 'bundle.js',
    library: 'kolour',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: [
      '',
      'js',
      'es6'
    ]
  },
  target: 'web',
  debug: true,
  profile: true,
  progress: true,
  module: {
    loaders: [
      {
        test: /.+\.es6$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: [
            'es2015',
            'stage-0'
          ]
        }
      }
    ]
  }
};
