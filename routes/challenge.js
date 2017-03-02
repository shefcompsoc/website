'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/challenge.js')

const deadline = new Date(2017, 1, 22, 16, 20)

var active = false

function isActive () {
  if (active) {
    return true
  } else {
    var t = Date.parse(deadline) - Date.parse(new Date())
    return t <= 15
  }
}

module.exports.init = router => {
  router.get('/challenges', index)
  router.get('/setChallengeActive/:id', setActive)
  router.get('/challenge', redir)
  router.get('/challenge/:id', details)

  router.get('/challenges/admin', admin)
  router.get('/challenges/login', login)
  router.get('/challenges/logout', logout)
  router.post('/challenges/login', doLogin)
}

const setActive = async ctx => {
  active = ctx.params.id == 'true'
  ctx.redirect('/challenges')
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
    if (users.indexOf(uid) && parseInt(code, 36) == uid) {
        ctx.session.user = uid
        ctx.redirect('admin')
    }
    else {
        ctx.redirect('login')
    }
}

const admin = async ctx => {
    if (ctx.session.user) {
        await ctx.render('new/challenge/admin', {
            
        })
    }
    else {
        ctx.redirect('login')
    }
}

const users = [
    160151945
]

const challenges = {

  palindromebases: {
    name: 'Palindrome Bases',
    tasks: [
      'A palindrome is a string that when reveresed gives the same result.',
      'Your task is to find the largest number less than 100,000 that is a palindrome in base10 and in base2'
    ],
    difficulty: 0
  },

  mipiprime: {
    name: 'MiPi Primes',
    tasks: [
      'This one is a little bit like that game FizzBuzz.',
      'A prime number is any number that is divisible by one and itself, while a MiPi number is any number that is a factor of 3,141,592. A MiPi prime is any number that is both a factor of 3,141,592 and a prime number.',
      'Your task is to find the largest MiPi prime less than 1,000,000'
    ],
    difficulty: 0
  },

  integerabundance: {
    name: 'An Abundance of Integers',
    tasks: [
      'When a numbers proper divisors sum to be larger than itself it is said to be abundant.',
      'The proper divisors of 12 are 1, 2, 3, 4 & 6 which sum to 16. 12 is therefore abundant.',
      'Your task is to find the sum of all abundant numbers in the range 1 <= n <= 200'
    ],
    difficulty: 0
  },

  obfuscatedcompsoc: {
    name: 'Hello CompSoc!',
    tasks: [
      'Write a program that displays the string "Hello CompSoc!" Easy right?',
      'Wrong. You\'re not allowed to have any of the following characters in your code; h, e, l, c, o, m, p, 0 & 1 (with the exception of keywords). To make matters worse, naturally obfuscated languages are also banned. No brainfuck or malbolge.'
    ],
    difficulty: 0
  },

  asterisktriangle: {
    name: 'Asterisk Triangle',
    tasks: [
      'Take input of the number N and output a right angled triangle made of asterisks of height N.'
    ],
    difficulty: 0
  },

  pythagtriplets: {
    name: 'Pythagorean Triplets',
    tasks: [
      'A pythagorean triplet is a set of any 3 numbers which satisfy a^2 + b^2 = c^2 and a < b < c',
      'Your task is to find the sum of all values of c that satisfy this where 3 <= c <= 100.'
    ],
    difficulty: 0
  },

  panagram: {
    name: 'Panagram',
    tasks: [
      'A pangram is a phrase that includes at least one occurrence of each of the 26 letters, a…z.',
      'Your task is to take input and check whether it\'s a valid panagram, case should not matter.'
    ],
    difficulty: 0
  },

  fridayluck: {
    name: 'Unlucky Years',
    tasks: [
      'Some consider Friday the 13th to be unlucky.',
      'Allow the user to enter a year and then tell them how many times Friday the 13th will occur on that year.'
    ],
    difficulty: 0
  },

  quine: {
    name: 'Quine',
    tasks: [
      'A quine is a non-empty computer program which takes no input and produces a copy of its own source code as its only output.',
      'Write your own quine.'
    ],
    difficulty: 0
  },

  numerals: {
    name: 'Roman Numerals',
    tasks: [
      'Write a program that reads a string of roman numberals and converts it to its numerical value.'
    ],
    difficulty: 0
  },

  nextpalindrome: {
    name: 'Next Palindrome',
    tasks: [
      'A palindrome is a string that when reveresed gives the same result.',
      'Given a numerical input, find the first palindrome that is greater than the input.'
    ],
    difficulty: 0
  },

  continuousfraction: {
    name: 'The Golden Ratio',
    tasks: [
      'A sequence is given by G(N+1) = 1 + 1/G(N) where G(0) = 1.',
      'Calculate the product of G(100) and G(200)'
    ],
    difficulty: 0
  },

  meanmedian: {
    name: 'Mean Median',
    tasks: [
      'Given an input of 20 integers, find their mean and divide them into two sets. Any numbers less than the mean should be placed in the first set while all others should be placed in the second set.',
      'What is the product of the medians of these two sets?'
    ],
    difficulty: 0
  },

  cakeheist: {
    name: 'The Cake Heist',
    tasks: [
      'You are a thief that\'s decided to rob the local bakery. This bakery stocks 5 different sorts of cakes, each cake takes up a certain amount of space and is worth a certain value.',
      'You\'ve stolen from this bakery before and you know about 4 of the cakes already, however one of the cakes is new and you don\'t know anything about it yet.',
      'You want to make sure you leave with the largest value possible. You have 20 spaces in your bag.',
      'Given input for the size and value of the 5th cake, calculate the maximum amount of money you could make off of this heist.',
      '<table><thead><tr><th>Size</th><th>Value</th></tr></thead><tbody> <tr><td>7</td><td>160</td></tr> <tr><td>3</td><td>90</td></tr> <tr><td>2</td><td>15</td></tr> <tr><td>6</td><td>120</td></tr> </tbody></table>'
    ],
    difficulty: 0
  },

  permutation: {
    name: 'Recursive Permutation',
    tasks: [
      'Write a recursive function for generating all permutations of an input string. Return them as a set.'
    ],
    difficulty: 0
  },

  brackets: {
    name: 'Brackets',
    tasks: [
      'Given a string of brackets',
      '(()(((()))()))',
      'Check that all brackets are closed, and if so tell the user the maximum depth the brackets reach. Otherwise, tell them to close their brackets.'
    ],
    difficulty: 0
  },

  clockangles: {
    name: 'Clock Angles',
    tasks: [
      'Hopefully you\'ve still got plenty of time left.',
      'Write a program that takes a time in hours and minutes and returns the angle between the hands on a clock in degrees.'
    ],
    difficulty: 0
  },

  inabox: {
    name: 'In a Box',
    tasks: [
      'Write a function that takes a set of words as input. Each word will be seperated by a space.',
      'Your task is to take the input, and output each word in a box on a new line',
      '<pre><code>*******\n*Hello*\n*World*\n*******</pre></code>'
    ],
    difficulty: 0
  },

  graph: {
    name: 'Graphing',
    tasks: [
      'You\'ll need to do this in a console.',
      'Given some function g, plot g between 0 <= x <= 20 and 0 <= y <= 20. As accurately as possible'
    ],
    difficulty: 0
  },

  seconds: {
    name: 'Seconds',
    tasks: [
      'Given N amount of seconds, calculate the amount of years, months, days, hours, minutes and seconds that have passed.',
      'Be wary of leap years.',
      '(You can\'t use any built in libraries/classes)'
    ],
    difficulty: 0
  },

  sevenoneone: {
    name: '£7.11',
    tasks: [
      'A mathematician purchased four items in a grocery store. He noticed that when he added the prices of the four items, the sum came to £7.11, and when he multiplied the prices of the four items, the product came to £7.11.',
      'Your task is to determine the prices of the four items.'
    ],
    difficulty: 0
  },

  nextprime: {
    name: 'The First Prime',
    tasks: [
      'Given a number N, find the first prime number that occurs after it and before it.'
    ],
    difficulty: 0
  },

  fibonacciprimes: {
    name: 'Fibonacci Prime',
    tasks: [
      'Starting with 0 and 1, the sequence goes 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, and so forth. Written as a rule, the expression is xn = xn-1 + xn-2',
      'A fibonacci prime is a number that exists in this sequence and is also prime. Your task is to find the first fibonacci prime that is greater than 500'
    ],
    difficulty: 0
  },

  fibonacci: {
    name: 'Fibonacci',
    tasks: [
      'Starting with 0 and 1, the sequence goes 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, and so forth. Written as a rule, the expression is xn = xn-1 + xn-2',
      'What is the sum of the first 50 terms of the sequence?',
      '(Use an iterative approach)'
    ],
    difficulty: 0
  },

  paint: {
    name: 'Paint me a Picture',
    tasks: [
      'Given a number between 0 and 9, display that number in the console using a 20x20 grid'
    ],
    difficulty: 0
  }

}
