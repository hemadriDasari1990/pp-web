const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')

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
      // CleanWebpackPlugin will do some clean up/remove folder before build
      // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
      new CleanWebpackPlugin(),
      // PurgecssPlugin will remove unused CSS
      new PurgecssPlugin({
        paths: glob.sync(path.resolve(__dirname, '../src/**/*'), {
          nodir: true,
        }),
      }),
      // This plugin will extract all css to one file
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash:8].bundle.css',
        chunkFilename: '[name].[chunkhash:8].chunk.css',
      }),
      // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
      new HtmlWebpackPlugin({
        hash: true,
        filename: 'index.html',
        title: 'writenpost',
        template: 'webpack/template.html',
        inject: false,
      }),
      // ComppresionPlugin will Prepare compressed versions of assets to serve them with Content-Encoding.
      // In this case we use gzip
      // But, you can also use the newest algorithm like brotli, and it's supperior than gzip
      new CompressionPlugin({
        algorithm: 'gzip',
      }),
      new BrotliPlugin(),
      // new webpack.optimize.ModuleConcatenationPlugin(),
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     NODE_ENV: JSON.stringify('production'),
      //   },
      // }),
      // new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
      // new HtmlWebpackPlugin({
      //   hash: true,
      //   filename: 'index.html',
      //   title: 'writenpost',
      //   template: 'webpack/template.html',
      //   inject: false,
      // }),
      // new PreloadWebpackPlugin({
      //   rel: 'preload',
      //   as: 'script',
      //   include: 'all',
      // }),
      // new OfflinePlugin({
      //   ServiceWorker: {
      //     navigateFallbackURL: '/',
      //   },
      //   AppCache: false,
      // }),
    ],
    optimization: {
      minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
        chunks: 'all',
      },
      runtimeChunk: {
        name: 'runtime',
      },
    },
  }
}
