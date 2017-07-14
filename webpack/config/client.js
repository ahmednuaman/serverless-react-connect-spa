const path = require('path')
const webpack = require('webpack')
const WebpackCleanPlugin = require('clean-webpack-plugin')
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackHTMLPlugin = require('html-webpack-plugin')

const CWD = process.cwd()
const BUILD = path.resolve(CWD, 'build/client')
const SRC = path.resolve(CWD, 'src/client')
const PRODUCTION = process.env.NODE_ENV === 'production'

const devServerModules = PRODUCTION
  ? []
  : [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    'react-hot-loader/patch'
  ]

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    filename: 'asset/js/vendor.js',
    name: 'asset/js/vendor.js',
    minChunks: (module) => {
      if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
        return false
      }

      return module.context && module.context.indexOf('node_modules') !== -1
    }
  }),
  new webpack.EnvironmentPlugin(['IS_OFFLINE']),
  new webpack.DefinePlugin({
    'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:4000/api'),
    'process.env.STAGE': JSON.stringify(process.env.STAGE || 'staging')
  }),
  new WebpackHTMLPlugin({
    hash: true,
    inject: false,
    minify: PRODUCTION ? {
      html5: true,
      collapseWhitespace: true
    } : false,
    template: './html'
  }),
  new WebpackExtractTextPlugin({
    allChunks: true,
    filename: '[name]'
  })
]

if (PRODUCTION) {
  plugins.push(
    new WebpackCleanPlugin([BUILD]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

const scssModules =
  [
    [/src\/client\/js/, true],
    [/src\/client\/scss/, false],
    [/node_modules/, false]
  ].map(([include, modules]) => ({
    include,
    test: /\.scss$/,
    use: WebpackExtractTextPlugin.extract({
      use: [{
        loader: 'css-loader',
        options: {
          modules,
          minimize: PRODUCTION,
          sourceMap: !PRODUCTION
        }
      }, 'resolve-url-loader', {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    })
  }))

module.exports = {
  context: SRC,
  entry: {
    'asset/js/app.js': [
      ...devServerModules,
      'babel-polyfill',
      'whatwg-fetch',
      './js/app'
    ],
    'asset/css/app.css': './scss/app'
  },
  devtool: PRODUCTION ? false : 'eval-source-map',
  module: {
    rules: [{
      test: /\.(eot|woff2?|ttf|svg)/,
      include: /font/,
      use: [{
        loader: 'file-loader',
        query: {
          name: 'asset/font/[name].[ext]?[hash]'
        }
      }]
    }, {
      test: /\.(jpg|png|svg)/,
      include: /image/,
      use: [{
        loader: 'file-loader',
        query: {
          name: 'asset/image/[name].[ext]?[hash]'
        }
      }, 'img-loader']
    }, {
      test: /\.json$/,
      use: ['json-loader']
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.yml$/,
      use: ['json-loader', 'yaml-loader']
    }].concat(scssModules)
  },
  output: {
    filename: '[name]',
    path: BUILD,
    publicPath: '/'
  },
  resolve: {
    alias: {
      action: `${SRC}/js/action`,
      constant: `${SRC}/js/constant`,
      js: `${SRC}/js`,
      view: `${SRC}/js/view`
    },
    extensions: ['.html', '.js', '.jsx', '.json', '.scss']
  },
  plugins: plugins
}
