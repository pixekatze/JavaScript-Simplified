//Selecting all elements needed
const form = document.querySelector("#quiz-form");
const answers = document.querySelectorAll(".answer");
const questions = document.querySelectorAll(".question-item");
const alert = document.querySelector("#alert");

//Submit event listener for the form
form.addEventListener("submit", (e) => {
	//Preventing the default behaviour
	e.preventDefault();

	//Making sure unanswered questions show up as incorrect
	let i = 0;
	questions.forEach((question) => {
		question.classList.add("incorrect");
		question.classList.remove("correct");
	});

	//Getting all selected answers
	answers.forEach((answer) => {
		const parent = answer.closest(".question-item");

		if (answer.checked) {
			//Looping through the selected answer to see if they are correct or not
			if (answer.value === "true") {
				i++;
				//For each correct answer, adding the class `correct` to the parent with the class `question-item` and remove the class `incorrect`
				parent.classList.remove("incorrect");
				parent.classList.add("correct");

				//If all answers are correct, showing the element with the id `alert` and hide it after one second
				if (i === 3) {
					alert.classList.add("active");
					setTimeout(() => {
						alert.classList.remove("active");
					}, "1000");
				}
			} else {
				//For each incorrect answer, adding the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.
				parent.classList.add("incorrect");
				parent.classList.remove("correct");
			}
		}
	});
});
