const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
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
  //   optimization: {
  //     minimize: true,
  //     runtimeChunk: true,
  //     splitChunks: {
  //         chunks: "async",
  //         minSize: 1000,
  //         minChunks: 2,
  //         maxAsyncRequests: 5,
  //         maxInitialRequests: 3,
  //         name: true,
  //         cacheGroups: {
  //             default: {
  //                 minChunks: 1,
  //                 priority: -20,
  //                 reuseExistingChunk: true,
  //             },
  //             vendors: {
  //                 test: /[\\/]node_modules[\\/]/,
  //                 priority: -10
  //             }
  //           }
  //       }
  //   },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 4,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   mangle: false
    // }), //minify everything
    // new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest'],
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'writenpost',
      template: 'webpack/template.html',
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: ['main', 'vendor'],
    }),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      excludes: ['.htaccess'],
      caches: {
        main: [':rest:'],
      },
      ServiceWorker: {
        minify: false,
      },
      safeToUseOptionalCaches: true,
      AppCache: false,
    }),
  ],
  optimization: {
    namedModules: false,
    namedChunks: false,
    nodeEnv: 'production',
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
      minSize: 30000,
      maxAsyncRequests: 5,
      maxAsyncRequests: 3,
    },
    noEmitOnErrors: true,
    minimize: true,
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
          ecma: 6,
          mangle: true,
        },
        sourceMap: false,
      }),
    ],
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    jquery: 'jQuery',
  },
}
