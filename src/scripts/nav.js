document.addEventListener('DOMContentLoaded', function () {
  Array.from(document.querySelectorAll('.fixable')).forEach(function (el) {
    Stickyfill.add(el)
  })
})

document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('nav')
  Array.prototype.slice.call(nav.querySelectorAll('a')).forEach(function (el) {
    el.classList.add('better-hover')
    var pos = 0

    function animate (ev) {
      el.classList.remove('no-hover')
      pos += 100
      this.style.setProperty('background-position', '0 ' + pos + '%')
    }

    function mobile (ev) {
      el.classList.add('no-hover')
    }

    function prevent (ev) {
      ev.preventDefault()
    }

    el.addEventListener('mouseenter', animate)
    el.addEventListener('mouseleave', animate)
    el.addEventListener('focus', animate)
    el.addEventListener('blur', animate)

    el.addEventListener('touchstart', mobile)
    el.addEventListener('touchend', mobile)
    el.addEventListener('touchcancel', mobile)

    el.addEventListener('dragstart', prevent)
    el.addEventListener('mousedown', prevent)
  })
})
