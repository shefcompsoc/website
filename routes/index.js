'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/index.js')

module.exports = router => {
  router.get('/', index)
}

const index = async ctx => {
  debug('rendering homepage')
  await ctx.render('index')
}
