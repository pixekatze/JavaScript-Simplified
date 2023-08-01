function removeDups(array) {
	return [...new Set(array)];
}

console.log(removeDups([1, 2, 3, 4, 4, 2, 5]));

const person = {
	age: 25,
	get birthYear() {
		const date = new Date();
		let year = date.getFullYear();
		return year - this.age;
	},
};

function sum(...numbers) {
	return numbers.reduce((count, n) => count + n);
}

const numbersToAdd = [1, 2, 3, 4, 5, 6];

class User {
	constructor(email, password, language) {
		this.email = email;
		this.password = password;
		this.language = language;
	}

	get name() {
		return this.email.split("@")[0];
	}

	printPassword() {
		console.log(this.password);
	}
}

const user = new User("test@test.com", "password", "English");
console.log(user);

class Animal {
	constructor(name) {
		this.name = name;
	}

	speak() {
		console.log(`I am ${this.name}`);
	}
}

class Dog extends Animal {
	constructor(name, owner) {
		super(name);
		this.owner = owner;
	}

	speak() {
		console.log(`Bark`);
	}
}

class Cat extends Animal {
	speak() {
		console.log(`Meow`);
	}
}

const cat = new Cat("Anis");

console.log(cat.speak());
