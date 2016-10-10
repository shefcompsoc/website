'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/events.js')

module.exports.init = router => {
  router.get('/events', index)
}

const index = function* () {
  debug('rendering homepage')
  yield this.render('events')
}