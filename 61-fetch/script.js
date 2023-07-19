/*
fetch("https://jsonplaceholder.typicode.com/users")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data.map((user) => user.name));
	});

    async function doStuff() {
	try {
		const response = await fetch(URL);
		if (response.ok) {
			const users = await response.json();
			console.log(users.map((user) => user.name));
		} else {
			console.log("Failure");
		}
	} catch (e) {
		console.error(e);
	}
}
*/

const URL_1 = "https://jsonplaceholder.typicode.com/users";

async function fetchUsers() {
	const response = await fetch(URL_1);
	const users = await response.json();
	console.log(users.map((user) => user.name));
}

const URL_2 = "https://jsonplaceholder.typicode.com/posts";

async function sendPost() {
	const response = await fetch(URL_2, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: "New Post",
		}),
	});
	const post = await response.json();
	console.log(post);
}

const URL_3 = "https://jsonplaceholder.typicode.com/comments?postId=1";

async function getComments() {
	const response = await fetch(URL_3);
	const comments = await response.json();
	console.log(comments);
}

getComments();
fetchUsers();
sendPost();

document.addEventListener("click", (e) => {
	if (e.target.matches("button")) {
		console.log("clicked");
	}
});
