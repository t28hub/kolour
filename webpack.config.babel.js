import path from 'path';
import webpack from 'webpack';
import metadata from './package.json';

const DIRS = {
  SRC: path.resolve(__dirname, 'src'),
  DST: path.resolve(__dirname, 'lib')
};

export default {
  context: DIRS.SRC,
  entry: [
    './kolour.es6'
  ],
  output: {
    path: DIRS.DST,
    filename: 'kolour.js',
    library: 'kolour',
    libraryTarget: 'umd',
    sourceMapFilename: 'kolour.js.map',
  },
  resolve: {
    extensions: [
      '',
      'js',
      'es6'
    ],
  },
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
        },
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(metadata.version)
    })
  ],
  node: {
    process: false,
  },
  debug: true,
  profile: true,
  progress: true,
};

