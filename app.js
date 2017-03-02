'use strict'

// builtin
const Debug = require('debug')
const fs = require('fs')
const path = require('path')

// middleware
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const session = require('koa-session')
const convert = require('koa-convert')
const serve = require('koa-file-server')
const logger = require('./lib/koa-morgan')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const error = require('koa-error')

// instantiations
const debug = new Debug('app:app.js')
const app = new Koa()
const router = new Router()

// tell koa about nginx
if (app.env === 'production') app.proxy = true

// error handling
app.use(error({
  engine: 'pug',
  template: path.resolve('views') + '/error.pug'
}))

// apache style loggins
let format = app.env === 'development' ? 'tiny' : 'short'
app.use(logger(format))

//session keys
app.keys = ['CosPmoc4lyfe'];

// middleware
app.use(convert(session(app)))
app.use(bodyparser())
app.use(json())
app.use(serve({
  root: './dist',
  maxage: 60 * 60 * 1000,
  etag: {
    algorithm: 'md5'
  }
}))
app.use(views(path.resolve('views'), {
  extension: 'pug'
}))

// initialize routes
fs.readdirSync('routes').forEach(file => {
  debug(`loading route file: routes/${file}`)
  const routes = require(`./routes/${file}`)
  routes.init(router)
})

app.use(router.routes(), router.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port)
console.log(`app started on port ${port}`)
