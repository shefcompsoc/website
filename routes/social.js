'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/social.js')

module.exports.init = router => {
  router.get('/social', index)
}

const index = function* () {
  debug('rendering social page')
  yield this.render('social')
}
