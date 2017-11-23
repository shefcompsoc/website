'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/events.js')

const { db, upcoming, filter } = require('../eventdb.js')

module.exports = router => {
  // events list
  router.get('/events', index)
  router.get('/event', ctx => ctx.redirect('/events'))

  // event categories
  router.get('/event/gamejams', gamejams)
  router.get('/event/socials', socials)
  router.get('/event/codetoast', codetoast)
  router.get('/event/tutorials', tutorials)
  router.get('/event/mentoring', mentoring)
  router.get('/event/summerball', summerball)
  router.get('/event/ctf', ctf)
  router.get('/event/gms', gms)

  // shefjam event details
  router.get('/event/shefjam3', shefjams.shefjam3)
  router.get('/shefjam3', ctx => ctx.redirect('/event/shefjam3'))
  router.get('/event/shefjam4', shefjams.shefjam4)
  router.get('/shefjam4', ctx => ctx.redirect('/event/shefjam4'))
  router.get('/event/shefjamv', shefjams.shefjam5)
  router.get('/shefjamv', ctx => ctx.redirect('/event/shefjamv'))

  // 2017-18 event details
  router.get('/event/2017-18/linux-essentials', ev2017.linuxEssentials)

  // 2016-17 event details
  router.get('/event/2016-17/linux101', ev2016.linux101)
  router.get('/event/2016-17/workshops', ev2016.workshops)
}

// events list
const index = async ctx => {
  debug('rendering events page')
  await ctx.render('events', {
    events: upcoming(db)
  })
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
    events: filter(db, 'gm')
  })
}

// shefjam event details
const shefjams = {
  shefjam3: async ctx => {
    debug('rendering shefjam3 page')
    await ctx.render('event/shefjam3')
  },

  shefjam4: async ctx => {
    debug('rendering shefjam4 page')
    await ctx.render('event/shefjam4')
  },

  shefjam5: async ctx => {
    debug('redirecting shefjam5 page')
    await ctx.render('event/shefjamv')
  }
}

// 2017-18 event details
const ev2017 = {
  linuxEssentials: async ctx => {
    await ctx.render('event/2017-18/linux-essentials')
  }
}

// 2016-17 event details
const ev2016 = {
  linux101: async ctx => {
    debug('rendering linux101 page')
    await ctx.render('event/2016-17/linux101')
  },

  workshops: async ctx => {
    debug('rendering workshops page')
    await ctx.render('event/2016-17/workshops')
  }
}
