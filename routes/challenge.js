'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/challenge.js')

module.exports = router => {
  router.get('/challenges', index)
  router.get('/challenge', redir)
  router.get('/challenge/:id', details)

  router.get('/challenges/admin', admin)
  router.get('/challenges/login', login)
  router.get('/challenges/logout', logout)
  router.get('/challenges/solution/:id', solution)

  router.post('/challenges/login', doLogin)
  router.post('/challenges/solution', getSolution)
  router.post('/challenges/mark', markCompleted)
}

const progVer = new Date().getUTCMilliseconds()
const deadline = new Date(2017, 2, 8, 16, 20)

const users = []

function isActive () {
  const t = Date.parse(deadline) - Date.parse(new Date())
  return (t <= 15000 && t >= -4.8e6)
}

function createTempUser () {
  const user = {
    id: users.length,
    completed: {},
    score: 0 // do not rely on this
  }

  users.push(user)
  return user
}

function getTempUser (ctx, id) {
  if (ctx.session.ver && ctx.session.ver !== progVer) {
    // Remove all users if they are out of date
    ctx.session.userId = null
  }

  let user

  if (id) {
    user = users[id]
  } else {
    user = users[ctx.session.userId]
  }

  if (!user) {
    user = createTempUser()
    ctx.session.ver = progVer
    ctx.session.userId = user.id
  }

  return user
}

const index = async ctx => {
  debug('rendering challenges page')

  const challenges = await ctx.db.all('SELECT id,name,description,difficulty FROM challenges ORDER BY difficulty')
  console.log(challenges)

  const page = {
    active: isActive(),
    challenges: challenges,
    user: getTempUser(ctx)
  }

  if (true) {
    await ctx.render('new/challenge/challenges', {
      page
    })
  }
}

const redir = async ctx => {
  debug('redirecting to challenges page')
  ctx.redirect('/challenges')
}

const details = async ctx => {
  debug('rendering challenge details page')

  const challenge = await ctx.db.get('SELECT id,name,description,difficulty FROM challenges WHERE id = ?', ctx.params.id.toLowerCase())
  const user = getTempUser(ctx)

  if (challenge != null && isActive()) {
    await ctx.render('new/challenge/details', {
      challenge,
      user
    })
  } else {
    ctx.redirect('../challenges')
  }
}

const solution = async ctx => {
  if (ctx.session.user) {
    const challenge = await ctx.db.get('SELECT * FROM challenges WHERE id = ?', ctx.params.id.toLowerCase())

    if (challenge) {
      await ctx.render('new/challenge/solution', {
        challenge
      })
    } else {
      ctx.redirect('../admin')
    }
  } else {
    ctx.redirect('../login')
  }
}

const getSolution = async ctx => {
  ctx.redirect('solution/' + ctx.request.body.id.toLowerCase())
}

const login = async ctx => {
  if (ctx.session.user) {
    ctx.redirect('admin')
  } else {
    await ctx.render('new/challenge/login')
  }
}

const logout = async ctx => {
  ctx.session.user = null
  ctx.redirect('login')
}

const doLogin = async ctx => {
  const uid = ctx.request.body.uid
  const code = ctx.request.body.code
  console.log(uid, code)

  const user = await ctx.db.get('SELECT * FROM admins WHERE username = ? AND password = ?', uid, code)

  if (user) {
    delete user.password

    ctx.session.user = user
    console.log(user)

    ctx.redirect('admin')
  } else {
    ctx.redirect('login')
  }
}

const markCompleted = async ctx => {
  if (ctx.session.user) {
    const uid = ctx.request.body.uid
    const qid = ctx.request.body.cid
    const user = users[uid]

    if (user) {
      const challenge = await ctx.db.get('SELECT * FROM challenges WHERE id = ?', qid)

      if (challenge) {
        if (!user.completed[qid]) {
          user.completed[qid] = true
          user.score = user.score + challenge.difficulty
        }
      }
      ctx.redirect('admin')
    } else {
      ctx.redirect('solution/' + qid)
    }
  } else {
    ctx.redirect('../login')
  }
}

const admin = async ctx => {
  if (ctx.session.user) {
    await ctx.render('new/challenge/admin', {
      users
    })
  } else {
    ctx.redirect('login')
  }
}
