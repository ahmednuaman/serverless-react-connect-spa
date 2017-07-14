const browserSync = require('browser-sync')
const fs = require('fs')
const path = require('path')
const url = require('url')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./webpack/config/client')
const bundler = webpack(webpackConfig)

const BUILD = path.resolve(__dirname, 'build/client')

browserSync({
  server: {
    baseDir: BUILD,
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true
        }
      }),
      webpackHotMiddleware(bundler),
      (req, res, next) => {
        const requestURL = url.parse(req.url)
        const pathname = requestURL.pathname
        const exists = fs.existsSync(path.join(BUILD, pathname))

        if (!exists) {
          req.url = '/index.html'
        }

        return next()
      }
    ]
  },
  files: [
    `${BUILD}/asset/**/*`
  ]
})
