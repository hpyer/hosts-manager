var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')

var webpackConfig = {
  entry: {
    app: ['./build/client', './src/client/main.js']
  },
  externals: {
  },
  output: {
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'client': path.resolve(__dirname, '../src/client'),
      'server': path.resolve(__dirname, '../src/server')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}

// add hot-reload related code to entry chunks
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['./build/client'].concat(webpackConfig.entry[name])
})

webpackConfig = merge(webpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: false })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({}),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})

module.exports = webpackConfig
