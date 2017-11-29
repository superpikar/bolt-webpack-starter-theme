const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// your local website url, used by browser-sync as proxy
const PROXY_URL = 'http://bolt3-webpack.com/';  
// your template directory path, used by webpack as a root path when transform relative path to absolute path in css loader
const TEMPLATE_PATH = '/theme/bolt-webpack-starter-theme/'; 
const OUTPUT_DIR = {
  JS: 'js/',
  CSS: 'css/',
  IMAGE: 'images/',
};

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: OUTPUT_DIR.JS+'[name].js',
    path: path.resolve(__dirname, '../dist'),  // output directory name, relative to current webpack project directory
    publicPath: TEMPLATE_PATH+'dist/'  // public output directory used to generate the directory in bundler
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
    new BrowserSyncPlugin(
      {
        files: [
          '**/*.twig',  // watch .twig files also
          '**/*.yml',  // watch .twig files also
        ],
        // browse to http://localhost:3000/ during development 
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint 
        // (which should be serving on http://bolt3-webpack.com) 
        // through BrowserSync 
        proxy: PROXY_URL
      },
      // plugin options 
      {
        // BrowserSync reloading the page after compilation is finished
        reload: true
      }
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
  ]
};
