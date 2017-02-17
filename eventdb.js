'use strict'

// event processing

module.exports.filter = (db, type) => {
  return db
    // filter category if given
    .filter(item => !type ? true : item.type === type)

    // group events into years
    .reduce((years, item) => {
      if (years[item.acyear]) {
        years[item.acyear].push(item)
      } else {
        years[item.acyear] = [item]
      }

      return years
    }, [])

    // days in reverse order
    .map(item => {
      return item.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
    })

    // years in reverse order
    .sort((a, b) => a[0].acyear > b[0].acyear ? -1 : 1)
}

module.exports.upcoming = db => {
  const now = new Date()

  return db
    // only future events
    .filter(item => item.timestamp > now)

    // group events into months
    .reduce((months, item) => {
      if (months[item.nmoy]) {
        months[item.nmoy].push(item)
      } else {
        months[item.nmoy] = [item]
      }

      return months
    }, [])

    // days in order
    .map(item => {
      return item.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)
    })

    // months in order
    .sort((a, b) => a[0].nmoy < b[0].nmoy ? -1 : 1)
}

const process = db => {
  return db
    // add timestamp for ordering
    .map(item => {
      item.timestamp = new Date(item.year, item.moy - 1, item.dom, 23, 59, 59, 0)
      return item
    })

    // add academic year
    .map(item => {
      item.acyear = item.moy >= 9 ? item.year : item.year - 1
      return item
    })

    // convert numeric month to short month
    .map(item => {
      const short = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
        7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
      }

      const full = {
        1: 'January', 2: 'Febrary', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
        7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
      }

      item.nmoy = item.moy
      item.moy = short[item.nmoy]
      item.fullmoy = full[item.nmoy]
      return item
    })
}

// schema
// title: string
// url: null | string
// dom: number
// moy: number
// type: number
// year: number
// link: null | {
//   text: string
//   url: string
// }

const socialsdb = [
  {moy: 2, dom: 3, year: 2017, type: 'social', title: 'Winter Party', link: {text: 'Facebook Event', url: 'https://www.facebook.com/events/227906127669634/'}},
  {moy: 11, dom: 23, year: 2016, type: 'social', title: 'Wednesday Corp', link: {text: 'Facebook Event', url: 'https://www.facebook.com/events/1154334107986361/'}},
  {moy: 10, dom: 31, year: 2016, type: 'social', title: 'Halloween Social', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/190109711432601/'}},
  {moy: 9, dom: 30, year: 2016, type: 'social', title: 'Freshers Bar Crawl', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/301175760255487/'}},
  {moy: 9, dom: 28, year: 2016, type: 'social', title: 'Midweek Pint', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/301175760255487/'}},
  {moy: 3, dom: 16, year: 2016, type: 'social', title: 'Bar Crawl + Corp', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/203773056644735/'}},
  {moy: 3, dom: 11, year: 2016, type: 'social', title: 'CompSoc Pub Quiz', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/822871811155905/'}},
  {moy: 12, dom: 10, year: 2015, type: 'social', title: 'Christmas Meal', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/101139880258300/'}},
  {moy: 10, dom: 29, year: 2015, type: 'social', title: 'Red Deer Social', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1624293311166278/'}},
  {moy: 10, dom: 28, year: 2015, type: 'social', title: 'Halloween Bar Crawl', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/319026651605658/'}},
  {moy: 10, dom: 8, year: 2015, type: 'social', title: 'Red Deer Social', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1687925271441597/'}},
  {moy: 9, dom: 28, year: 2015, type: 'social', title: 'Freshers Bar Crawl', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/395485227288543/'}},
  {moy: 5, dom: 27, year: 2014, type: 'social', title: 'End of Year Meal', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/665526086818085/'}},
  {moy: 4, dom: 3, year: 2014, type: 'social', title: 'Laser Quest + Night Out', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/291316887692206/'}},
  {moy: 3, dom: 20, year: 2014, type: 'social', title: 'Curry Night', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/512947188825206/'}},
  {moy: 2, dom: 24, year: 2014, type: 'social', title: 'Laser Quest', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/274492706060050/'}},
  {moy: 12, dom: 17, year: 2013, type: 'social', title: 'Chrismas Clubbing', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/788281361197945/'}},
  {moy: 12, dom: 17, year: 2013, type: 'social', title: 'Chrismas Meal', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/319023014905630/'}},
  {moy: 11, dom: 17, year: 2013, type: 'social', title: 'CompSoc Does Geek Chic', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/539186716168452/'}},
  {moy: 10, dom: 23, year: 2013, type: 'social', title: 'CompSoc Does Bowling', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/651302744903861/'}},
  {moy: 10, dom: 1, year: 2013, type: 'social', title: 'Freshers Bar Crawl', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/644859448865800/'}},
  {moy: 6, dom: 4, year: 2013, type: 'social', title: 'CompSoc Invades Plug', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/142518505933973/'}},
  {moy: 6, dom: 4, year: 2013, type: 'social', title: 'End of Year Meal', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/540336206007715/'}},
  {moy: 3, dom: 14, year: 2013, type: 'social', title: 'Curry Meal Out', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/161434280678117/'}},
  {moy: 12, dom: 12, year: 2012, type: 'social', title: 'Christmas Meal', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/268113106644512/'}},
  {moy: 11, dom: 28, year: 2012, type: 'social', title: 'Wednesday Corp', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/166285523516619/'}},
  {moy: 11, dom: 8, year: 2012, type: 'social', title: 'CompSoc Pub Quiz', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/436049119788397/'}},
  {moy: 10, dom: 14, year: 2012, type: 'social', title: 'Comedy Club', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/287393331371324/'}},
  {moy: 9, dom: 30, year: 2012, type: 'social', title: 'Comedy Club', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/542962545720576/'}},
  {moy: 9, dom: 27, year: 2012, type: 'social', title: 'Freshers Bar Crawl', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/286570671444771/'}},
  {moy: 5, dom: 31, year: 2012, type: 'social', title: 'End of Year Meal', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/363751807021087/'}},
  {moy: 3, dom: 30, year: 2012, type: 'social', title: 'Easter Night Out', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/817167031704014/'}},
  {moy: 3, dom: 6, year: 2012, type: 'social', title: 'Boudica Launch Night', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1077093222305477/'}},
  {moy: 3, dom: 4, year: 2012, type: 'social', title: 'Comedy Club', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/810206315736046/'}},
  {moy: 12, dom: 13, year: 2011, type: 'social', title: 'Chrismas Meal', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/909483585757005/'}},
  {moy: 12, dom: 11, year: 2011, type: 'social', title: 'Return of the Last Laugh', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/705071939602228/'}},
  {moy: 12, dom: 9, year: 2011, type: 'social', title: 'Corp Night Out', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/675758145862041/'}},
  {moy: 12, dom: 9, year: 2011, type: 'social', title: 'Christmas Night Out', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/951740268192242/'}},
  {moy: 11, dom: 15, year: 2011, type: 'social', title: 'Tuesday Club', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/701286659982811/'}},
  {moy: 11, dom: 13, year: 2011, type: 'social', title: 'Comedy Club', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/819013021525301/'}},
  {moy: 10, dom: 15, year: 2011, type: 'social', title: 'Pop Tarts', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/883426665055194/'}}
]

const gamejamdb = [
  {moy: 11, dom: 19, year: 2016, url: '/event/shefjam3', type: 'gamejam', title: 'ShefJam 3', link: {text: 'Reserve Ticket', url: 'https://www.eventbrite.co.uk/e/shefjam-3-tickets-28818430702'}},
  {moy: 4, dom: 30, year: 2016, url: '/event/shefjam2', type: 'gamejam', title: 'ShefJam 2', link: {text: 'Facebook Event', url: 'https://www.facebook.com/events/111821595886013/'}},
  {moy: 11, dom: 14, year: 2015, url: '/event/shefjam1', type: 'gamejam', title: 'ShefJam', link: {text: 'Facebook Event', url: 'https://www.facebook.com/events/1217277844954075/'}}
]

const codetoastdb = [
  {moy: 2, dom: 22, year: 2017, type: 'codetoast', title: 'Programming Challenge: Episode[0]', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/263678810721242/'}},
  {moy: 12, dom: 12, year: 2012, type: 'codetoast', title: 'Coding Competition', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/256100537849969/'}}
]

const tutorialsdb = [
  {moy: 2, dom: 20, year: 2017, url: '/event/workshops', type: 'tutorial', title: 'Workshop: Learn Git the Easy Way', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/803701049817669/'}},
  {moy: 2, dom: 13, year: 2017, url: '/event/workshops', type: 'tutorial', title: 'Workshop: Modern Web Development', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/167960933694143/'}},
  {moy: 2, dom: 6, year: 2017, url: '/event/workshops', type: 'tutorial', title: 'Workshop: PC Building', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/167960933694143/'}},
  {moy: 11, dom: 21, year: 2016, url: '/event/linux101', type: 'tutorial', title: 'Linux 101: Week 5', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/571998606341858/'}},
  {moy: 11, dom: 14, year: 2016, url: '/event/linux101', type: 'tutorial', title: 'Linux 101: Week 4 (Git Gud)', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/670224403146078/'}},
  {moy: 11, dom: 9, year: 2016, type: 'tutorial', title: 'ShefJam Primer', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1175583659187576/'}},
  {moy: 11, dom: 7, year: 2016, url: '/event/linux101', type: 'tutorial', title: 'Linux 101: Week 3', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/545752938957835/'}},
  {moy: 10, dom: 31, year: 2016, url: '/event/linux101', type: 'tutorial', title: 'Linux 101: Week 2', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/545752938957835/'}},
  {moy: 10, dom: 24, year: 2016, url: '/event/linux101', type: 'tutorial', title: 'Linux 101: Week 1', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1822714788015241/'}},
  {moy: 3, dom: 9, year: 2016, type: 'tutorial', title: 'Playing Solitaire Smart', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/753203341447755/'}},
  {moy: 11, dom: 19, year: 2013, type: 'tutorial', title: 'Tech Talk - Aardvark Swift, Microsoft and Marmalade!', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/545752938957835/'}},
  {moy: 11, dom: 15, year: 2012, type: 'tutorial', title: 'Tech Talk - The Limits of Computation', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/113737545453707/'}}
]

const mentoringdb = [
  {moy: 11, dom: 5, year: 2016, type: 'mentoring', title: 'Open Mentoring Session', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1812637265644016/'}},
  {moy: 10, dom: 28, year: 2013, type: 'mentoring', title: 'Mentoring Meeting', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1409970799232637/'}}
]

const balldb = [
  {moy: 5, dom: 20, year: 2016, type: 'ball', title: 'Masquerade Summer Ball', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/139368646462411/'}}
]

const ctfdb = []

const gmdb = [
  {moy: 2, dom: 8, year: 2017, type: 'gm', title: 'CompSoc EGM', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1050199091792495/'}},
  {moy: 10, dom: 25, year: 2016, type: 'gm', title: 'CompSoc EGM', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1326701184016442/'}},
  {moy: 4, dom: 20, year: 2016, type: 'gm', title: 'CompSoc AGM', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/454115051465347/'}},
  {moy: 4, dom: 2, year: 2014, type: 'gm', title: 'CompSoc AGM', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/1384481291828301/'}},
  {moy: 5, dom: 15, year: 2013, type: 'gm', title: 'CompSoc EGM', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/576999388999019/'}},
  {moy: 4, dom: 11, year: 2013, type: 'gm', title: 'CompSoc AGM', link: { text: 'Facebook Event', url: 'https://www.facebook.com/events/542225675798492/'}}
]

module.exports.db = process([
  ...gamejamdb,
  ...socialsdb,
  ...codetoastdb,
  ...tutorialsdb,
  ...mentoringdb,
  ...balldb,
  ...ctfdb,
  ...gmdb
])
