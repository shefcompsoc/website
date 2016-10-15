'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/membership.js')

module.exports.init = router => {
  router.get('/signup', index)
  router.get('/register', register)
  router.get('/membership', membership)
}

const index = function* () {
  debug('rendering signup page')
  yield this.render('signup')
}

const register = function* () {
  debug('redirecting to signup google form')
  this.redirect('http://signup.shefcompsoc.co.uk')
}

const membership = function* () {
  debug('redirecting to SU membership')
  this.redirect('http://su.sheffield.ac.uk/groups/computer-science--2')
}
