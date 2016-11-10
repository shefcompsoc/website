'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/events.js')

module.exports.init = router => {
  // events list
  router.get('/events', index)
  router.get('/event', events)

  // event categories
  router.get('/event/gamejams', gamejams)
  router.get('/event/socials', socials)
  router.get('/event/codetoast', codetoast)
  router.get('/event/tutorials', tutorials)
  router.get('/event/mentoring', mentoring)
  router.get('/event/summerball', summerball)
  router.get('/event/ctf', ctf)
  router.get('/event/gms', gms)

  // event details
  router.get('/event/linux101', linux101)
  router.get('/event/shefjam3', shefjam3)
}

// events list
const index = async ctx => {
  debug('rendering events page')
  await ctx.render('events', {
    events: upcoming(db)
  })
}

const events = async ctx => {
  debug('redirecting to events page')
  ctx.redirect('/events')
}

// event categories

const gamejams = async ctx => {
  debug('rendering gamejams page')
  await ctx.render('event/gamejams', {
    events: filter(db, 'gamejam')
  })
}

const socials = async ctx => {
  debug('rendering socials page')
  await ctx.render('event/socials', {
    events: filter(db, 'social')
  })
}

const codetoast = async ctx => {
  debug('rendering codetoast page')
  await ctx.render('event/codetoast', {
    events: filter(db, 'codetoast')
  })
}

const tutorials = async ctx => {
  debug('rendering tutorials page')
  await ctx.render('event/tutorials', {
    events: filter(db, 'tutorial')
  })
}

const mentoring = async ctx => {
  debug('rendering mentoring page')
  await ctx.render('event/mentoring', {
    events: filter(db, 'mentoring')
  })
}

const summerball = async ctx => {
  debug('rendering summerball page')
  await ctx.render('event/summerball', {
    events: filter(db, 'ball')
  })
}

const ctf = async ctx => {
  debug('rendering ctf page')
  await ctx.render('event/ctf', {
    events: filter(db, 'ctf')
  })
}

const gms = async ctx => {
  debug('rendering gms page')
  await ctx.render('event/gms', {
    events: filter('gm')
  })
}

// event details

const shefjam3 = async ctx => {
  debug('rendering shefjam page')
  await ctx.render('event/shefjam3')
}

const linux101 = async ctx => {
  debug('rendering linux101 page')
  await ctx.render('event/linux101')
}

const {
  db,
  upcoming,
  filter
} = require('../eventdb.js')
