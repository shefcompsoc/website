var deadline = new Date(2017, 2, 8, 16, 20)

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function countdown(deadline, stepCallback, callback) {
	var timer
	function step() {
		var t = getTimeRemaining(deadline);
		if (t.total <= 0) {
	      clearInterval(timer);
		  callback()
	    }
		else {
			stepCallback(t)
		}
	}
	timer = setInterval(step, 1000);
	step();
}

var container = document.getElementById('countdown');
var header = container.querySelector('h1')
var clock = container.querySelector('.clock')
var daysSpan = clock.querySelector('.days');
var hoursSpan = clock.querySelector('.hours');
var minutesSpan = clock.querySelector('.minutes');
var secondsSpan = clock.querySelector('.seconds');

var needsRefresh = false;

countdown(deadline, function (t) {

	if (t.days <= 0) {
		daysSpan.parentElement.style.display = "none";
	}
	else {
		daysSpan.innerHTML = ('0' + t.days).slice(-2);
	}
	hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

	needsRefresh = true;

}, function () {

	header.innerHTML = "Challenge Ends In"
	daysSpan.parentElement.style.display = "none";

	if (needsRefresh) {
		location.reload();
	}

	countdown(new Date(deadline.getTime() + 4.8e+6), function (t) {

		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

	}, function () {

		header.innerHTML = "Challenge Finished";
		clock.style.display = "none";
		var message = document.createElement("p");
        var text = document.createTextNode("Visit us on social media to find out when the next challenge will be");
		message.appendChild(text);
        container.appendChild(message);
		container.querySelector('.actions').style.display = "none";

	})

})
