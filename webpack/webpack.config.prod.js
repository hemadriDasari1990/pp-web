const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env, argv) => {
  return {
    entry: {
      main: resolve(__dirname, '../src'),
      vendor: [
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'redux',
        'redux-thunk',
        'emotion',
      ],
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [resolve(__dirname, '../src')],
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif|woff|woff2|svg)$/,
          loader: 'url-loader?limit=100000',
        },
        {
          test: /\.(eot|ttf)$/,
          loader: 'file-loader',
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: 'html-loader',
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
      new HtmlWebpackPlugin({
        hash: true,
        filename: 'index.html',
        title: 'writenpost',
        template: 'webpack/template.html',
        inject: false,
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'script',
        include: 'all',
      }),
      new OfflinePlugin({
        ServiceWorker: {
          navigateFallbackURL: '/',
        },
        AppCache: false,
      }),
    ],
    optimization: {
      minimize: true,
      // minimizer: [
      //   // we specify a custom UglifyJsPlugin here to get source maps in production
      //   new UglifyJsPlugin({
      //     cache: true,
      //     parallel: true,
      //     uglifyOptions: {
      //       compress: false,
      //       ecma: 6,
      //       mangle: true,
      //     },
      //     sourceMap: true,
      //   }),
      // ],
    },
  }
}
