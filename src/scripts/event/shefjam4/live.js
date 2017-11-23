document.addEventListener('DOMContentLoaded', function () {
  const tr = document.querySelector('.time-remaining')

  const targetTime = new Date(2017, 2, 26, 13, 0, 0)

  function update () {
    const delta = new Date(targetTime - new Date())

    tr.innerHTML = `
      ${delta.getHours()} Hours<br>
      ${delta.getMinutes()} Minutes<br>
      ${delta.getSeconds()} Seconds<br>`
  };

  update()
  setInterval(update, 1000)
})
