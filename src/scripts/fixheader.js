document.addEventListener('DOMContentLoaded', function () {
  Array.from(document.querySelectorAll('.fixable')).forEach(function (el) {
    Stickyfill.add(el)
  })
})

document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('nav')
  Array.prototype.slice.call(nav.querySelectorAll('a')).forEach(function (el) {
    var pos = 0

    function animate (ev) {
      pos += 100
      this.style.setProperty('background-position', '0 ' + pos + '%')
    }

    el.addEventListener('mouseenter', animate)
    el.addEventListener('mouseleave', animate)
    el.addEventListener('focus', animate)
    el.addEventListener('blur', animate)
  })
})
