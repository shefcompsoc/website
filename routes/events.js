'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/events.js')

module.exports.init = router => {
  router.get('/events', index)
  router.get('/event', events)
  router.get('/event/shefjam', shefjam)
}

const events = function* () {
  debug('redirecting to events page')
  this.redirect('/events')
}

const index = function* () {
  debug('rendering events page')
  yield this.render('events')
}

const shefjam = function* () {
  debug('rendering shefjam page')
  yield this.render('pages/shefjam')
}
