'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/membership.js')

module.exports = router => {
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
  ctx.redirect('https://docs.google.com/forms/d/e/1FAIpQLSe6DQTcThzP3coMqYEfoEgKR3kzpFkja1MOItzdZTv-VU_nRg/viewform')
}

const membership = async ctx => {
  debug('redirecting to SU membership')
  ctx.redirect('https://su.sheffield.ac.uk/groups/computer-science-society-4dd7')
}
