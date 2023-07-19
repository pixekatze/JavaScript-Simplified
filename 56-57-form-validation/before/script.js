// TODO: Create an event listener for when the form is submitted and do the following inside of it.

const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
	// TODO: Select all elements needed
	//    Use the HTML to figure out what classes/ids will work best for selecting each element
	const errorsList = document.querySelector(".errors-list");
	const username = document.querySelector("#username").value;
	console.log({ username });
	const password = document.querySelector("#password").value;
	const passwordConfirmation = document.querySelector("#password-confirmation").value;
	const terms = document.querySelector("#terms");
	const errors = document.querySelector(".errors");

	//    TODO: Create an array to store all error messages and clear any old error messages
	const errorArray = [];

	//    TODO: Define the following validation checks with appropriate error messages
	//      1. Ensure the username is at least 6 characters long
	const validUsername = username.length > 5;
	console.log(validUsername);
	//      2. Ensure the password is at least 10 characters long
	const validPassword = password?.length > 9;
	console.log(validPassword);
	//      3. Ensure the password and confirmation password match
	const validPasswordConfirmation = password === passwordConfirmation;
	console.log(validPasswordConfirmation);
	//      4. Ensure the terms checkbox is checked
	const checkedTerms = terms.checked;
	console.log(checkedTerms);

	// TODO: Define this function
	function showErrors(errorMessages) {
		// Add each error to the error-list element
		// Make sure to use an li as the element for each error
		// Also, make sure you add the show class to the errors container

		errorMessages.forEach((errorMessage) => {
			const listElement = document.createElement("li");
			errorsList.appendChild(listElement);
			listElement.innerHTML = errorMessage;
		});

		errors.classList.add("show");
	}

	// TODO: Define this function
	function clearErrors() {
		// Loop through all the children of the error-list element and remove them
		// IMPORTANT: This cannot be done with a forEach loop or a normal for loop since as you remove children it will modify the list you are looping over which will not work
		// I recommend using a while loop to accomplish this task
		// This is the trickiest part of this exercise so if you get stuck and are unable to progress you can also set the innerHTML property of the error-list to an empty string and that will also clear the children. I recommend trying to accomplish this with a while loop, though, for practice.
		// Also, make sure you remove the show class to the errors container

		while (errorArray.length) {
			errorArray.pop();
		}

		while (errorsList.firstChild) {
			errorsList.removeChild(errorsList.firstChild);
		}

		errors.classList.remove("show");
	}

	//    TODO: If there are any errors then prevent the form from submitting and show the error messages
	if (!(validUsername && validPassword && validPasswordConfirmation && checkedTerms)) {
		e.preventDefault();
		clearErrors();

		if (!validUsername) {
			errorArray.push("Username must be at least 6 characters");
		}
		if (!validPassword) {
			errorArray.push("Password must be at least 10 characters");
		}
		if (!validPasswordConfirmation) {
			errorArray.push("Passwords must match");
		}
		if (!checkedTerms) {
			errorArray.push("You must accept the terms");
		}

		showErrors(errorArray);
	} else {
		clearErrors();
	}
});
