const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const TEMPLATE_URL = '/theme/bolt-webpack-starter-theme/';
const OUTPUT_DIR = {
  JS: 'js/',
  CSS: 'css/',
  IMAGE: 'images/',
};

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: OUTPUT_DIR.JS+'bundle.js',
    path: path.resolve(__dirname, '../dist'),  // output directory name, relative to current webpack project directory
    publicPath: TEMPLATE_URL+'dist/'  // public output directory used to generate the directory in bundler
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.s[a|c]ss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: OUTPUT_DIR.IMAGE+'[name].[ext]'
            }  
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: OUTPUT_DIR.CSS+'style-bundle.css'
    }),
    // compress extracted css
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
    // uglify javascript file
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false // produce or not the *.js.map file
    }),
  ]
};
