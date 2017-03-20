'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/social.js')

module.exports = router => {
  router.get('/social', index)
}

const index = async ctx => {
  debug('rendering social page')
  await ctx.render('social')
}
