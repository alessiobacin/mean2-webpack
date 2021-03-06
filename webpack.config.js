var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Config
var webpackConfig = {
  entry: {
    'polyfills': './src/polyfills.browser.ts',
    'vendor':    './src/vendor.browser.ts',
    'main':       './src/main.browser.ts',
  },

  output: {
    path: './dist',
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new CopyWebpackPlugin([{from:'./src/app', to: './views'}],{
      ignore: ['*.ts', '*.js', '*.css', '*.ico']
    }),
    new CopyWebpackPlugin([{from:'./src/index.html', to: './'}],{
      ignore: ['*.ts', '*.js', '*.css', '*.ico']
    }),
    new CopyWebpackPlugin([{from:'./src/app', to: './css'}],{
      ignore: ['*.ts', '*.js', '*.html', '*.ico']
    }),
    new CopyWebpackPlugin([{from:'./src', to: './img'}],{
      ignore: ['*.ts', '*.js', '*.html', '*.css']
    })
  ],

  module: {
    // preloaders: [
    //    { test: /\.ts$/, exclude: 'node_modules', loader: 'tslint'}
    // ],
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, exclude:/node_modules/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  }

};


// Our Webpack Defaults
var defaultConfig = {
  devtool: 'cheap-module-source-map',
  cache: true,
  debug: true,
  output: {
    filename: 'js/[name].bundle.js',
    sourceMapFilename: 'js/[name].map',
    chunkFilename: 'js/[id].chunk.js'
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  },
  // tslint: {
  //   emitErrors: true,
  //   failOnHint: false,
  //   resourcePath: 'src',
  // }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);