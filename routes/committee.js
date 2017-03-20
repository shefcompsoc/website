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
    name: 'Andy Tyler',
    role: 'President',
    avatar: 'andy',
    bio: `My role basically involves keeping the society on track, so while all the committee are organising awesome events I have to make sure we are running smoothly and all the boring stuff gets done. I occasionally get to make executive decisions which is fun. I'm your first port of call for any queries or suggestions. If you have any ideas or something exciting that you want to be involved in then hit me up!`
  }, {
    name: 'Bradley Sharp',
    role: 'Vice President',
    avatar: 'brad',
    bio: `Apparently I'm now second in command, but I guess that's why they call me vice-president. My work in the society started in the second semester and despite only being a first year I am prepared to go above and beyond for you. If that means I occasionally give the other members of the committee a hard time then so be it. The most important thing to me, is you.`
  }, {
    name: 'S&acirc;nziana Chiorescu',
    role: 'Secretary',
    avatar: 'sanzi',
    bio: `<span title="I'm Batman!">I'm Sanzi.</span>`
  }, {
    name: 'James Webb',
    role: 'Social Secretary',
    avatar: 'james',
    bio: `Social Secretary is just a fancy way of saying that my job is to help you have fun. Whether that be on a mental night out, cosy night in, or any other event organised by the society, I'll be on hand to make sure we all have a great time. Let me know about any events you want to see organised or tickets you want sorting out.`
  }, {
    name: 'Tom Borcherds',
    role: 'Treasurer',
    avatar: 'tom',
    bio: `hi im the treasurer, which is a p similar role to billys except the only problems i can help you with are ones related to neko atsume. ty for ur time`
  }, {
    name: 'Billy Dawson',
    role: 'Inclusions Officer, Media Team Member',
    avatar: 'billy',
    bio: `You got a problem? Somebody getting you down? Don't feel like you can come to an event? Come on down to your friendly neighbourhood Inclusions Officer and let's talk it out. Savings, savings and more savings as I solve your problems and make events cater to your specific needs! Come see Billy today!`
  }, {
    name: 'Rob Ede',
    role: 'Technical Events <nobr>Co-ordinator</nobr>, Media Team Member',
    avatar: 'rob',
    bio: `<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style="text-decoration: none; color: inherit;">The Technical Events Co-ordinatior co-ordinates technical events. Let's say there's an event and it's somewhat technical, chances are I was the guy who co-ordinated it. This includes but is not limited to Gamejams, Linux Tutorials and 1773 <nobr>|-|</nobr>4XX0R1|\\|G. Don't worry though, only good hacking. Promise.</a>`
  }, {
    name: 'Louis Thorpe-Monaghan',
    role: 'Media Team Member',
    avatar: 'louis',
    bio: `As a member of the Media Team, I am (at least partly) responsible for making sure everything looks suitably "bourgeois", "on point", "dank" and other popular words for describing the aesthetics of our society. Most importantly, if you feel uncomfortable by any of our font choices (say, oh I don't know, a rogue Comic Sans making an appearance), remember - IT'S NOT MY FAULT BLAME ROB OR JOSH.`
  }
]
