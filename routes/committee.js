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
    name: 'Alex Yates',
    role: 'President',
    avatar: 'alex',
    social: {
      facebook: 'alex.yates.35',
      instagram: 'faxittoalex',
      github: 'adyates1'
    },
    bio: `
      
    `
  },
  {
    name: 'Bhav Prajapat',
    role: 'Vice President and Secretary',
    avatar: 'bhav',
    social: {
      facebook: 'bhaveshprajapat99',
      instagram: 'bhaveshp99'
    },
    bio: `<p></p>`
  },
  {
    name: 'Chloe Jambor',
    role: 'Events Co-ordinator and Inclusions Officer',
    avatar: 'chloe',
    social: {
      facebook: 'chloe.jambor'
    },
    bio: `
      <p></p>
    `
  },
  {
    name: 'Simon Bone',
    role: 'Treasurer',
    avatar: 'simon',
    social: {
      facebook: 'simon.bone.9',
      github: 'SimonCBone'
    },
    bio: `<p></p>`
  },
  {
    name: 'Sam West',
    role: 'Events Co-ordinator',
    avatar: 'sam',
    social: {
      facebook: 'sam.west.7503314'
    },
    bio: `<p></p>`
  },
]
