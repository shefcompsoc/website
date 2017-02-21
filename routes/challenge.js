'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/challenge.js')

const deadline = new Date(2017, 1, 22, 16, 19, 40)

function isActive() {
  var t = Date.parse(deadline) - Date.parse(new Date());
  return t <= 0
}

module.exports.init = router => {
  router.get('/challenges', index)
  router.get('/challenge', redir)
  router.get('/challenge/:id', details)
}

const index = async ctx => {
  debug('rendering challenges page')
  var page = {
    active: isActive(),
    challenges: challenges
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
  var challenge = challenges[ctx.params.id.toLowerCase()]
  if (challenge != null && isActive()) {
    await ctx.render('new/challenge/details', {
      challenge
    })
  } else {
    ctx.redirect('../challenges')
  }

}

const error = {
    name: 'Error',
    tasks: [
      'That seems to be an error',
      'Go back using the button above'
    ],
    difficulty: 0
}

const challenges = {
  mipiprime: {
    name: 'MiPi prime',
    tasks: [
      'Ever played Fizzbuzz? The rules to this are quite similar.',
      'According to Wikipedia, FizzBuzz is a group word game for children to teach them about division. This may or may not be true, but this question is generally used to torture screen young computer science graduates during programming interviews.',
      'Your task is to write a program that will play the game up to 1000, however there\'s a twist. For any number that is prime, you must instead display "Prime". For any number that is a factor of 3140 you must display "MiPi". If the number fits in both of these you must display "Piprime". All other numbers should be displayed as normal.'
    ],
    difficulty: 3
  }
}
