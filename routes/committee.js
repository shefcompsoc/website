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
    social: {
      twitter: 'robjtede',
      instagram: 'robjte.de',
      github: 'robjtede',
      facebook: 'robjtede'
    },
    bio: `
      <p>Hey. Rob. Masters student and avid web developer.</p>
      <p>When I became President of this growing society, I promised to keep the good work of the previous years' committees going; putting on engaging regular meet ups and exciting large events for members.</p>
      <p>This year, I'll be endeavouring to grow the society and make it easier for you to find placements and career opportunities, too.</p>
    `
  }, {
    name: 'Jodi Swift',
    role: 'Secretary',
    avatar: 'jodi',
    bio: `<p>Hi, I'm Jodi! Hobbies include writing minutes, booking stuff and sending lots of emails :P</p>`
  }, {
    name: 'Blayze Milward',
    role: 'Events <nobr>Co-ordinator</nobr>',
    avatar: 'blayze',
    social: {
      twitter: 'blayzeing',
      github: 'blayzeing',
      facebook: 'blayze.millward'
    },
    bio: `
      <p>I am Blayze: maker of things, wearer of blazers, rider of skateboards.</p>
      <p>I've been around for a while, having a lot to do with the first gamejams, but have spent the last year working at a defence company. I'm here to organize events, particularly those that involve tech. So, if you have any ideas or things you want to see done, I'm the man to talk to!</p>
    `
  }, {
    name: 'Tom Thomas-Litman',
    role: 'Treasurer',
    avatar: 'tom',
    bio: `
      <p>I am the money money man.</p>
      <p>“If a man does not have the sauce, then he is lost. But the same man can be lost in the sauce.” - Gucci Mane</p>
    `
  }, {
    name: 'James Webb',
    role: 'Inclusions Officer',
    avatar: 'james',
    bio: `<p>As inclusions officer I will be ensuring everything we do is accessible to everyone. Not feeling included? Hmu and we can fix it.</p>`
  }, {
    name: 'Louis Thorpe-Monaghan',
    role: 'Media Team',
    avatar: 'louis',
    bio: `
      <p>As a member of the Media Team, I am (at least partly) responsible for making sure everything looks suitably “bourgeois”, “on point”, “dank” and other popular words for describing the aesthetics of our society.</p>
      <p>Most importantly, if you feel uncomfortable by any of our font choices (say, oh I don't know, a rogue Comic Sans making an appearance), remember - IT'S NOT MY FAULT BLAME ROB.</p>
    `
  }
]
