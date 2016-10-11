'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/committee.js')

module.exports.init = router => {
  router.get('/committee', index)
}

const index = function* () {
  debug('rendering committee page')
  yield this.render('committee', {
    committee
  })
}

const committee = [
  {
    name: 'Andy Tyler',
    role: 'President',
    avatar: 'andy',
    bio: 'I’m the President which basically means I keep the society on track...'
  }, {
    name: 'Ben Clegg',
    role: 'Vice President',
    avatar: 'ben',
    bio: 'My role is basically helping everyone do anything, and keeping things organised. Don\'t worry, I\'m not planning on becoming a Frank Underwood. On a side note, do you have time to talk about our Lord and Saviour, Haxe?'
  }, {
    name: 'Abby Smith',
    role: 'Secretary',
    avatar: 'abby',
    bio: 'I’m secretary meaning I keep these nerds in check. Don’t mean to brag but I got an A-level in IT so I know my way around a spreadsheet or two. I get pretty mental on the Comp Sci socials - one time at uBuffet I <i>almost</i> managed to eat 30 slices of cake as a bet… I ate 7.'
  }, {
    name: 'James Webb',
    role: 'Social Secretary',
    avatar: 'james',
    bio: 'Social Secretary is just a fancy way of saying that my job is to help you have fun. Whether that be on a mental night out, cosy night in, or any other event organised by the society, I’ll be on hand to make sure we all have a great time. Let me know about any events you want to see organised or tickets you want sorting out.'
  }, {
    name: 'Billy Dawson',
    role: 'Inclusions Officer',
    avatar: 'billy',
    bio: 'You got a problem? Somebody getting you down? Don’t feel like you can come to an event? Come on down to your friendly neighbourhood Inclusions Officer and let’s talk it out. Savings, savings and more savings as I solve your problems and make events cater to your specific needs! Come see Billy today!'
  }, {
    name: 'Tom Borcherds',
    role: 'Treasurer',
    avatar: 'tom',
    bio: 'hi im the treasurer, which is a p similar role to billys except the only problems i can help you with are ones related to neko atsume. ty for ur time'
  }, {
    name: 'Rob Ede',
    role: 'Technical Events <nobr>Co-ordinator</nobr>, Media Team Member',
    avatar: 'rob',
    bio: '<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style="text-decoration: none; color: inherit;">The Technical Events Co-ordinatior co-ordinates technical events. Let\'s say there\'s an event and it\'s somewhat technical, chances are I was the guy who co-ordinated it. This includes but is not limited to Gamejams, Linux Tutorials and L33T H4CX0R1NG. Don\'t worry though, only good hacking. Promise.</a>',
  }, {
    name: 'Joshua Case',
    role: 'Media Team Member',
    avatar: 'josh',
    bio: 'I\'m on the publicity team. This means that a third of the things you see on social media is from me. You know how you can talk to Billy about anything? Yeah, don\'t come to me. I\'m known for being short and brown, and therefore I have a short temper. Have a nice day!'
  }, {
    name: 'Louis Thorpe-Monaghan',
    role: 'Media Team Member',
    avatar: 'louis',
    bio: 'As a member of the Media Team, I am (at least partly) responsible for making sure everything looks suitably "bourgeois", "on point", "dank" and other popular words for describing the aesthetics of our society. Most importantly, if you feel uncomfortable by any of our font choices (say, oh I don\'t know, a rogue Comic Sans making an appearance), remember - IT\'S NOT MY FAULT BLAME ROB OR JOSH.'
  }, {
    name: 'Martin Cnobel',
    role: 'Company Interactions Officer',
    avatar: 'martin',
    bio: 'As Company Interaction Officer, my job is to make us <i>seem</i> important so that companies will think we’re a big deal and give us money to.. Do stuff.. But they do offer job opportunities and internships, so it’s all good. I’m also pretty fun.'
  }
]
