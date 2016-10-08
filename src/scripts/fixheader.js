document.addEventListener('DOMContentLoaded', function () {
  Array.from(document.querySelectorAll('.fixable')).forEach(function (el) {
    Stickyfill.add(el)
  })
})
