const webpack = require('webpack');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const mode = isProduction ? 'production' : 'development';

const developmentPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

const productionPlugins = [
  new CompressionPlugin(),
];

const plugins = [
  new webpack.DefinePlugin({
    process: {
      env: {
        NODE_ENV: JSON.stringify(mode),
      },
    },
  }),
].concat(isProduction ?
  productionPlugins :
  developmentPlugins
);

const optimization = isProduction ? {
  minimizer: [
    new UglifyWebpackPlugin({
      sourceMap: false,
      extractComments: {
        banner: false
      },
    }),
  ],
} : {};

const config = {
  mode,
  entry: path.resolve(__dirname, isProduction ? 'src' : 'demo', 'index.jsx'),
  optimization,
  output: {
    filename: 'react-retina-renderer.js',
    path: path.resolve(__dirname, isProduction ? 'dist' : 'demo'),
    publicPath: '/',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    publicPath: '/',
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: 7777,
    historyApiFallback: true,
    compress: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
  plugins,
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      include: path.resolve('./src'),
      include: path.resolve(__dirname, 'src'),
      options: {
        failOnWarning: true,
        failOnError: true,
        emitWarning: true,
      },
    }, {
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules|bower_components/,
    }],
  },
  externals: {},
  devtool: isProduction ? false : 'eval-source-map',
};

module.exports = config;
