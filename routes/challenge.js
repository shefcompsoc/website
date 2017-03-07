'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/challenge.js')
const progVer = new Date().getUTCMilliseconds();

const deadline = new Date(2017, 2, 7, 14, 20)

var active = false

function isActive () {
  if (active) {
    return true
  } else {
    var t = Date.parse(deadline) - Date.parse(new Date())
    return t <= 15
  }
}

var users = []

function createTempUser() {
    var user = {
        id: users.length,
        completed: {},
        score: 0 // do not rely on this
    }
    users.push(user)
    return user
}

function getTempUser(ctx, id) {
    if (ctx.session.ver && ctx.session.ver != progVer) {
        // Remove all users if they are out of date
        ctx.session.userId = null
    }
    var user 
    if (id) {
        user = users[id]
    }
    else {
        user = users[ctx.session.userId]
    }
    if (!user) {
        user = createTempUser()
        ctx.session.ver = progVer
        ctx.session.userId = user.id
    }
    return user
}

module.exports.init = router => {
  router.get('/challenges', index)
  router.get('/setChallengeActive/:id', setActive)
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

const setActive = async ctx => {
  active = ctx.params.id == 'true'
  ctx.redirect('/challenges')
}

const index = async ctx => {
  debug('rendering challenges page')
  var challenges = await ctx.db.all("SELECT id,name,description,difficulty FROM challenges ORDER BY id")
  console.log(challenges);
  var page = {
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
  var challenge = await ctx.db.get("SELECT id,name,description,difficulty FROM challenges WHERE id = ?", ctx.params.id.toLowerCase())
  var user = getTempUser(ctx)
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
        var challenge = await ctx.db.get("SELECT * FROM challenges WHERE id = ?", ctx.params.id.toLowerCase())

        if (challenge) {
            await ctx.render('new/challenge/solution', {
                challenge
            })
        }
        else {
            ctx.redirect('../admin')
        }
    }
    else {
        ctx.redirect('../login')
    }

}

const getSolution = async ctx => {
    ctx.redirect("solution/" + ctx.request.body.id.toLowerCase())
}

const login = async ctx => {
    if (ctx.session.user) {
        ctx.redirect('admin')
    }
    else {
        await ctx.render('new/challenge/login', {
            
        })
    }
}

const logout = async ctx => {
    ctx.session.user = null
    ctx.redirect('login')
}

const doLogin = async ctx => {
    var uid = ctx.request.body.uid
    var code = ctx.request.body.code
    console.log(uid, code)
    var user = await ctx.db.get("SELECT * FROM admins WHERE username = ? AND password = ?", uid, code)
    if (user) {
        delete user.password
        ctx.session.user = user
        console.log(user)
        ctx.redirect("admin")
    }
    else {
        ctx.redirect("login")
    }
}

const markCompleted = async ctx => {
    if (ctx.session.user) {
        var uid = ctx.request.body.uid
        var qid = ctx.request.body.cid
        if (users[uid]) {
            users[uid].completed[qid] = true
            ctx.redirect("admin")
        }
        else {
            ctx.redirect("solution/" + qid)
        }
    }
    else {
        ctx.redirect("../login")
    }
}

const admin = async ctx => {
    if (ctx.session.user) {
        var challenges = await ctx.db.all("SELECT * FROM challenges")
        users.forEach(function (user) {
            for (var key in user.completed) {
                var completed = user.completed[key]
                
            }
        })
        await ctx.render('new/challenge/admin', {
            
        })
    }
    else {
        ctx.redirect('login')
    }
}
