'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/index.js')

module.exports.init = router => {
  router.get('/', index)
}

const index = function* () {
  debug('rendering homepage')
  yield this.render('index')
}
