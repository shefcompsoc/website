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
    bio: ``
  }, {
    name: 'Bradley Sharp',
    role: 'Vice President',
    avatar: 'brad',
    bio: `Apparently I'm now second in command, but I guess that's why they call me vice-president. My work in the society started in the second semester and despite only being a first year I am prepared to go above and beyond for you. If that means I occasionally give the other members of the committee a hard time then so be it. The most important thing to me, is you.`
  }, {
    name: 'Jodi Swift',
    role: 'Secretary',
    avatar: 'tbd',
    bio: ``
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
    role: 'Technical Events <nobr>Co-ordinator</nobr>',
    avatar: 'tbd',
    bio: ``
  }, {
    name: 'Louis Thorpe-Monaghan',
    role: 'Media Team Member',
    avatar: 'louis',
    bio: `As a member of the Media Team, I am (at least partly) responsible for making sure everything looks suitably "bourgeois", "on point", "dank" and other popular words for describing the aesthetics of our society. Most importantly, if you feel uncomfortable by any of our font choices (say, oh I don't know, a rogue Comic Sans making an appearance), remember - IT'S NOT MY FAULT BLAME ROB OR JOSH.`
  }
]
