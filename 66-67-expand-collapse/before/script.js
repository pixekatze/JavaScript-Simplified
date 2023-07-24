const button = document.querySelector(".expand-button");
const cardBodies = Array.from(document.querySelectorAll(".card-body"));
const LOCAL_STORAGE_PREFIX = "EXPAND";
const CARDS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-cards`;
let cards = loadCards();
console.log(cards);
setCards(cards);

cardBodies.forEach((card) => {
	card.dataset.cardNumber = cardBodies.indexOf(card);
});

document.addEventListener("click", (e) => {
	if (e.target.matches("button")) {
		const card = e.target.closest(".card");
		const cardBody = card.querySelector(".card-body");
		const thisCardNumber = cardBody.dataset.cardNumber;
		const isExpanded = cardBody.dataset.expanded;

		cards[thisCardNumber] = isExpanded;

		// console.log(cards);

		// cards.push(cardStatus);
		setCards(cards);
		saveCards();
	}
});

function setCards(cards) {
	cards.forEach((card, index) => {
		const thisCardExpanded = cardBodies[index];
		thisCardExpanded.dataset.expanded = card;
		const parent = thisCardExpanded.closest(".card");
		const button = parent.querySelector("button");

		if (thisCardExpanded.dataset.expanded === "true") {
			thisCardExpanded.classList.remove("show");
			thisCardExpanded.dataset.expanded = false;
			button.innerText = "Expand";
		} else {
			thisCardExpanded.classList.add("show");
			thisCardExpanded.dataset.expanded = true;
			button.innerText = "Collapse";
		}
	});
	console.log(cards);
}

function saveCards() {
	localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
}

function loadCards() {
	const cardsString = localStorage.getItem(CARDS_STORAGE_KEY);
	return JSON.parse(cardsString) || [];
}
