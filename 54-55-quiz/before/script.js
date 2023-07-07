//Select all elements needed

const form = document.querySelector("#quiz-form");
const answers = document.querySelectorAll(".answer");
const questions = document.querySelectorAll(".question-item");
const alert = document.querySelector("#alert");

//Create a submit event listener for the form that does the following.
//Prevent the default behaviour
//Get all selected answers (use the `checked` property on the input to determine if it is selected or not)
//Loop through the selected answer to see if they are correct or not (Check the value of the answer to see if it is the string "true")
//For each correct answer add the class `correct` to the parent with the class `question-item` and remove the class `incorrect`.
//For each incorrect answer add the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.
//Make sure unanswered questions show up as incorrect. The easiest way to do this is to add the incorrect class and removing the correct class from all question items before checking the correct answers
//If all answers are correct show the element with the id `alert` and hide it after one second (look into setTimeout) (use the class active to show the alert and remove the class to hide it)

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let i = 0;
	questions.forEach((question) => {
		question.classList.add("incorrect");
		question.classList.remove("correct");
	});

	answers.forEach((answer) => {
		const parent = answer.closest(".question-item");

		if (answer.checked) {
			if (answer.value === "true") {
				i++;
				parent.classList.remove("incorrect");
				parent.classList.add("correct");
				if (i === 3) {
					alert.classList.add("active");
					setTimeout(() => {
						alert.classList.remove("active");
					}, "1000");
				}
			} else {
				parent.classList.add("incorrect");
				parent.classList.remove("correct");
			}
		}
	});
});
