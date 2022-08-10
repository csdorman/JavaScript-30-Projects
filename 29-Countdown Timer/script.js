let countdown; //global scope variable
const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const hourDisplay = document.querySelector(".display__hour-mode");

function timer(seconds) {
	clearInterval(seconds); //clear any existing timers

	const now = Date.now(); //get current time (in milliseconds)
	const then = now + seconds * 1000; //add seconds and multiply by 1,000 (for milliseconds)
	displayTimeLeft(seconds); //show (and start) countdown
	displayEndTime(then);
	setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000); //the countdown
		if (secondsLeft < 0) {
			//when countdown finished
			clearInterval(countdown); // clear timer
			return; //exit
		}
		displayTimeLeft(secondsLeft); //update displayed time
		displayEndTime(then);
	}, 1000);
}

// Display remaining time
function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60); // get whole minute
	const remainderSeconds = seconds % 60; // get remainder seconds
	console.log(minutes, remainderSeconds);
	const display = `${minutes}:${
		remainderSeconds < 10 ? "0" : ""
	}${remainderSeconds}`; //show leading 0 if seconds < 10
	timerDisplay.textContent = display; //change page title with active timer
	if (seconds === 0) {
		document.title = `${display} TIMER DONE!`;
		setTimeout(setPageTitle, 2000);
	} else {
		document.title = `${display} left in timer`;
	}
}

// Set page title back to default after timer completion
function setPageTitle() {
	document.title = "Countdown Timer";
}

let hourMode = true;

function displayTimeToggle() {
	console.log(hourMode);
	hourMode = !hourMode;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp); //create date object from end time
	const hour = end.getHours();
	const minute = end.getMinutes();
	if (hourMode === true) {
		endTimeDisplay.textContent = `Be back at ${hour}:${
			minute < 10 ? "0" : ""
		}${minute}`;
	} else {
		const adjustedHour = hour > 12 ? hour - 12 : hour;
		endTimeDisplay.textContent = `Be back at ${adjustedHour}:${
			minute < 10 ? "0" : ""
		}${minute}`;
	}
}

// Start time using buttons
function startTimer() {
	console.log(this.dataset.time);
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

hourDisplay.addEventListener("click", displayTimeToggle);
buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const mins = this.minutes.value;
	const seconds = mins * 60;
	timer(seconds);
	this.reset(); //reset form field
});
