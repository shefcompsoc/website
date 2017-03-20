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
const sqlite3 = require('co-sqlite3')

// instantiations
const debug = new Debug('app:app.js')
const app = new Koa()
const router = new Router()

debug('tell koa about nginx in production')
if (app.env === 'production') app.proxy = true

debug('set up error pages')
app.use(error({
  engine: 'pug',
  template: path.resolve('views') + '/error.pug'
}))

debug('set up apache style logging')
let format = app.env === 'development' ? 'tiny' : 'short'
app.use(logger(format))

debug('set session keys')
app.keys = ['CosPmoc4lyfe']

debug('init middleware')
app.use(convert(session(app)))
app.use(bodyparser())
app.use(json())
app.use(convert(serve({
  root: './dist',
  maxage: 60 * 60 * 1000,
  etag: {
    algorithm: 'md5'
  }
})))
app.use(views(path.resolve('views'), {
  extension: 'pug'
}))
app.use(async (ctx, next) => {
  ctx.db = await sqlite3('challenges.db')
  await next
})

debug('init routes')
require('./routes/index').init(router)
require('./routes/committee').init(router)
require('./routes/events').init(router)
require('./routes/signup').init(router)
require('./routes/social').init(router)
require('./routes/challenge').init(router)

app.use(router.routes(), router.allowedMethods())

debug('start listening')
const port = process.env.PORT || 3000
app.listen(port)
console.log(`app started on port ${port}`)
