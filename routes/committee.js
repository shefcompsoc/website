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
    name: 'Russell Penn',
    role: 'President',
    avatar: 'russell',
    social: {
      facebook: 'profile.php?id=100009496727269'
    },
    bio: `
      
    `
  },
  {
    name: 'Alex Yates',
    role: 'Secretary',
    avatar: 'alex',
    social: {
      facebook: 'alex.yates.35'
    },
    bio: `<p></p>`
  },
  {
    name: 'Barnabas Hermesz',
    role: 'Events <nobr>Co-ordinator</nobr>',
    avatar: 'barnabas',
    social: {
      facebook: 'barnabas.hermesz'
    },
    bio: `
      <p></p>
    `
  },
  {
    name: 'Rafael Cavagnoli',
    role: 'Treasurer',
    avatar: 'rafael',
    social: {
      facebook: 'rafael.cavagnoli'
    },
    bio: `<p></p>`
  },
  {
    name: 'Tiggy Carr',
    role: 'Inclusions Officer',
    avatar: 'tiggy',
    social: {
      facebook: 'norelevances'
    },
    bio: `<p></p>`
  },
  {
    name: 'Bhavesh Prajapat',
    role: 'Publicity Officer',
    avatar: 'bhav',
    social: {
      facebook: 'bhaveshprajapat99'
    },
    bio: `
      <p></p>
    `
  },
]
