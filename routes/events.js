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

const index = async ctx => {
  debug('rendering events page')
  await ctx.render('events')
}

const events = async ctx => {
  debug('redirecting to events page')
  ctx.redirect('/events')
}

const gamejams = async ctx => {
  debug('rendering gamejams page')
  await ctx.render('event/gamejams')
}

const modjam = async ctx => {
  debug('rendering modjam page')
  await ctx.render('event/modjam')
}

const shefjam3 = async ctx => {
  debug('rendering shefjam page')
  await ctx.render('event/shefjam3')
}

const socials = async ctx => {
  debug('rendering socials page')
  await ctx.render('event/socials')
}

const codetoast = async ctx => {
  debug('rendering codetoast page')
  await ctx.render('event/codetoast')
}

const tutorials = async ctx => {
  debug('rendering tutorials page')
  await ctx.render('event/tutorials')
}

const linux101 = async ctx => {
  debug('rendering linux101 page')
  await ctx.render('event/linux101')
}

const mentoring = async ctx => {
  debug('rendering mentoring page')
  await ctx.render('event/mentoring')
}

const summerball = async ctx => {
  debug('rendering summerball page')
  await ctx.render('event/summerball')
}

const ctf = async ctx => {
  debug('rendering ctf page')
  await ctx.render('event/ctf')
}
