//Selecting all elements needed
const form = document.querySelector("#quiz-form");
const answers = Array.from(document.querySelectorAll(".answer"));
const questions = document.querySelectorAll(".question-item");
const alert = document.querySelector("#alert");

//Submit event listener for the form
form.addEventListener("submit", (e) => {
	//Preventing the default behaviour
	e.preventDefault();

	//Making sure unanswered questions show up as incorrect
	questions.forEach((question) => {
		question.classList.add("incorrect");
		question.classList.remove("correct");
	});

	//Getting all selected answers
	const checkedAnswers = answers.filter((answer) => answer.checked);

	//Looping through the selected answer to see if they are correct or not
	checkedAnswers.forEach((answer) => {
		const isCorrect = answer.value === "true";
		const parent = answer.closest(".question-item");

		//For each correct answer, adding the class `correct` to the parent with the class `question-item` and remove the class `incorrect`
		if (isCorrect) {
			parent.classList.remove("incorrect");
			parent.classList.add("correct");
		} else {
			//For each incorrect answer, adding the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.
			parent.classList.add("incorrect");
			parent.classList.remove("correct");
		}

		//If all answers are correct, showing the element with the id `alert` and hide it after one second
		const allTrue = checkedAnswers.every((answer) => answer.value === "true");
		const allAnswered = checkedAnswers.length === questions.length;

		if (allTrue && allAnswered) {
			alert.classList.add("active");
			setTimeout(() => {
				alert.classList.remove("active");
			}, "1000");
		}
	});
});
