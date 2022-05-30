let timeInterval;
let display = document.querySelector('.display__time-left');
let endTime = document.querySelector('.display__end-time');
let buttons = document.querySelectorAll('.timer__button');

function timer(sec){
	// clear any existing timer
	clearInterval(timeInterval);

	// get before and after time
	let now = Date.now();
	let then = now + sec*1000;

	displayTime(sec);
	displayEndTime(then);

	timeInterval = setInterval(() => {

		let count = Math.round((then - (Date.now()))/1000);
		if(count<0){
			return;
		}
		displayTime(count);
	}, 1000)
}

// show the bigger time countdown
function displayTime(sec){
	
	const minRem = Math.floor(sec/60);
	const secRem = sec % 60;

	display.textContent = `${minRem<10 ? '0'+minRem : minRem} : ${secRem<10 ? '0'+secRem : secRem}`;
}

// display when the countdown will stop
function displayEndTime(sec){

	let end = new Date(sec);
	let hour = end.getHours();
	let min = end.getMinutes();

	endTime.textContent = `Be back at ${hour} : ${min<10 ? '0'+min : min}`;
}


// getting the button and getting their data-time attribute to access the seconds
buttons.forEach(button => button.addEventListener('click', (e) => {

	// console.log(button.dataset.time);
	let buttonInterval = button.dataset.time;
	timer(buttonInterval);
}));


// taking the form value and using it to displey countdown
// new method of accessing the element by using the name attribute as document.customForm
document.customForm.addEventListener('submit', function(e){

	// a proper function is imp. => doesnt work for getting the `value` from the input
	e.preventDefault();
	// prevent page refresh
	let min = this.minutes.value*60;
	timer(min);
	this.reset();
	// empty the form after submission
})


