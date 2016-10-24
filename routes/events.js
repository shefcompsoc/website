'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/events.js')

module.exports.init = router => {
  router.get('/events', index)
  router.get('/event', events)
  router.get('/event/gamejams', gamejams)
  router.get('/event/modjam', modjam)
  router.get('/event/shefjam3', shefjam3)
  router.get('/event/socials', socials)
  router.get('/event/codetoast', codetoast)
  router.get('/event/tutorials', tutorials)
  router.get('/event/linux101', linux101)
  router.get('/event/mentoring', mentoring)
  router.get('/event/summerball', summerball)
  router.get('/event/ctf', ctf)
}

const index = function* () {
  debug('rendering events page')
  yield this.render('events')
}

const events = function* () {
  debug('redirecting to events page')
  this.redirect('/events')
}

const gamejams = function* () {
  debug('rendering gamejams page')
  yield this.render('event/gamejams')
}

const modjam = function* () {
  debug('rendering modjam page')
  yield this.render('event/modjam')
}

const shefjam3 = function* () {
  debug('rendering shefjam page')
  yield this.render('event/shefjam3')
}

const socials = function* () {
  debug('rendering socials page')
  yield this.render('event/socials')
}

const codetoast = function* () {
  debug('rendering codetoast page')
  yield this.render('event/codetoast')
}

const tutorials = function* () {
  debug('rendering tutorials page')
  yield this.render('event/tutorials')
}

const linux101 = function* () {
  debug('rendering linux101 page')
  yield this.render('event/linux101')
}

const mentoring = function* () {
  debug('rendering mentoring page')
  yield this.render('event/mentoring')
}

const summerball = function* () {
  debug('rendering summerball page')
  yield this.render('event/summerball')
}

const ctf = function* () {
  debug('rendering ctf page')
  yield this.render('event/ctf')
}
