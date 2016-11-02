'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/membership.js')

module.exports.init = router => {
  router.get('/signup', index)
  router.get('/register', register)
  router.get('/membership', membership)
}

const index = async ctx => {
  debug('rendering signup page')
  await ctx.render('signup')
}

const register = async ctx => {
  debug('redirecting to signup google form')
  ctx.redirect('http://signup.shefcompsoc.co.uk')
}

const membership = async ctx => {
  debug('redirecting to SU membership')
  ctx.redirect('http://su.sheffield.ac.uk/groups/computer-science--2')
}
