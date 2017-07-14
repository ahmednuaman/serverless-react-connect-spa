const path = require('path')
const webpack = require('webpack')
const WebpackNodeExternalsPlugin = require('webpack-node-externals')

const CWD = process.cwd()
const BUILD = path.resolve(CWD, 'build/server')
const SRC = path.resolve(CWD, 'src/server')
const PRODUCTION = process.env.NODE_ENV === 'production'

const plugins = [
  new webpack.NoEmitOnErrorsPlugin()
]

if (!PRODUCTION) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.STAGE': JSON.stringify('staging')
    })
  )
}

module.exports = {
  context: SRC,
  entry: {
    api: './api',
    query: './query'
  },
  devtool: PRODUCTION ? false : 'eval-source-map',
  externals: [WebpackNodeExternalsPlugin()],
  module: {
    rules: [{
      test: /\.json$/,
      use: ['json-loader']
    }, {
      exclude: /node_modules/,
      test: /\.js$/,
      use: ['babel-loader']
    }, {
      test: /\.yml$/,
      use: ['json-loader', 'yaml-loader']
    }]
  },
  output: {
    filename: '[name].js',
    path: BUILD,
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      base: process.cwd(),
      config: `${SRC}/config`,
      constant: `${SRC}/constant`,
      helper: `${SRC}/helper`,
      middleware: `${SRC}/middleware`,
      path: `${SRC}/path`,
      service: `${SRC}/service`
    }
  },
  plugins: plugins,
  target: 'node'
}
