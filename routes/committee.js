'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/committee.js')

module.exports = router => {
  router.get('/committee', index)
}

const index = async ctx => {
  debug('rendering committee page')
  await ctx.render('committee', {
    committee
  })
}

const committee = [
  {
    name: 'Rob Ede',
    role: 'President',
    avatar: 'rob',
    bio: `Hey. Rob. Masters student and avid web developer. When I became President of this growing society, I promised to keep the good work of the previous years' committees going; putting on engaging regular meet ups and exciting large events for members. This year, I'll be endeavouring to grow the society and make it easier for you to find placements and career opportunities, too.`
  }, {
    name: 'Jodi Swift',
    role: 'Secretary',
    avatar: 'jodi',
    bio: `Hi, I'm Jodi! Hobbies include writing minutes, booking stuff and sending lots of emails :P`
  }, {
    name: 'Tom Thomas-Litman',
    role: 'Treasurer',
    avatar: 'tbd',
    bio: ``
  }, {
    name: 'James Webb',
    role: 'Inclusions Officer',
    avatar: 'james',
    bio: ``
  }, {
    name: 'Blayze Milward',
    role: 'Events <nobr>Co-ordinator</nobr>',
    avatar: 'blayze',
    bio: `I am Blayze: maker of things, wearer of blazers, rider of skateboards. I've been around for a while, having a lot to do with the first gamejams, but have spent the last year working at a defence company. I'm here to organize events, particularly those that involve tech. So, if you have any ideas or things you want to see done, I'm the man to talk to!`
  }, {
    name: 'Louis Thorpe-Monaghan',
    role: 'Media Team',
    avatar: 'louis',
    bio: `As a member of the Media Team, I am (at least partly) responsible for making sure everything looks suitably "bourgeois", "on point", "dank" and other popular words for describing the aesthetics of our society. Most importantly, if you feel uncomfortable by any of our font choices (say, oh I don't know, a rogue Comic Sans making an appearance), remember - IT'S NOT MY FAULT BLAME ROB.`
  }
]
