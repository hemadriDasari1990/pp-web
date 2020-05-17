const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  devtool: false,
  stats: 'normal',
  entry: {
    main: resolve(__dirname, '../src'),
    // vendor: [
    //   'react',
    //   'react-dom',
    //   'react-redux',
    //   'react-router-dom',
    //   'redux',
    //   'redux-thunk',
    //   'emotion',
    //   'moment',
    //   'bootstrap',
    //   'material-ui'
    // ],
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: resolve(__dirname, '../dist'),
    chunkFilename: '[name].[chunkhash].bundle.js',
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
        test: /\.(png|jpg|jpe?g|gif|woff|woff2)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true,
        },
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
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 4,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['home'],
      title: 'writenpost',
      template: 'webpack/template.html',
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: ['main', 'vendor'],
    }),
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
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
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    namedModules: false,
    namedChunks: false,
    nodeEnv: 'production',
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'commons',
          enforce: true,
          minChunks: 2,
          reuseExistingChunk: true,
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
