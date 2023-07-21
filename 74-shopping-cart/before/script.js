import items from "./items.json" assert { type: "json" };
console.log(items);

const storeItemTemplate = document.querySelector("#item-template");
const carItemTemplate = document.querySelector("#cart-item-template");
const itemsContainer = document.querySelector("#items-container");
const cartItemContainer = document.querySelector("#cart-item");
const cart = document.querySelector("#cart");
const cartIcon = document.querySelector("[data-cart-icon]");
const cartNotification = document.querySelector("[data-cart-notification]");
const cartItems = {};

cart.classList.add("invisible");
cartIcon.classList.add("invisible");

items.forEach((item) => {
	renderStoreItems(item);
});

document.addEventListener("click", (e) => {
	if (e.target.matches("[data-list-button]")) {
		const selectedItem = e.target.dataset.listButton;
		addCartItems(selectedItem);
	}
});

function addCartItems(itemId) {
	const selectedItem = items[itemId - 1];

	if (cartItems[itemId] == null) {
		cartItems[itemId] = {
			count: 1,
			price: items[itemId - 1].priceCents / 100,
		};
	} else {
		cartItems[itemId].count = cartItems[itemId].count + 1;
		cartItems[itemId].price = cartItems[itemId].price + items[itemId - 1].priceCents / 100;
	}

	console.log(cartItems);

	if (cartItems[itemId].count < 2) {
		const template = generateClone(selectedItem, carItemTemplate, "cart");
		cartItemContainer.appendChild(template);
		cart.classList.remove("invisible");
		cartIcon.classList.remove("invisible");
	} else {
		updateCart(itemId, cartItems[itemId].count, cartItems[itemId].price);
	}
}

function renderStoreItems(item) {
	const template = generateClone(item, storeItemTemplate, "list");
	itemsContainer.appendChild(template);
}

function generateClone(item, template, term) {
	const templateClone = template.content.cloneNode(true);
	const productImage = templateClone.querySelector(`[data-${term}-image]`);
	const productName = templateClone.querySelector(`[data-${term}-name]`);
	const productCategory = templateClone.querySelector(`[data-${term}-category]`);
	const productPrice = templateClone.querySelector(`[data-${term}-price]`);
	const productButton = templateClone.querySelector(`[data-${term}-button]`);

	const productItem = templateClone.querySelector(`[data-${term}-item]`);

	const itemImage = item.imageColor;
	const itemName = item.name;
	const itemPrice = item.priceCents / 100;
	const itemId = item.id;

	productImage.style.backgroundColor = `#${itemImage}`;
	productName.innerText = itemName;
	productPrice.innerText = `$${itemPrice}.00`;
	productButton.dataset.listButton = itemId;

	if (term === "list") {
		const itemCategory = item.category;
		productCategory.innerText = itemCategory;
	} else {
		productItem.dataset.cartItem = itemId;
	}

	return templateClone;
}

function updateCart(item, quantity, price) {
	const productItem = document.querySelector(`[data-cart-item="${item}"]`);
	console.log(item);
	const productQuantity = productItem.querySelector(`[data-cart-items-number]`);
	const productPrice = productItem.querySelector(`[data-cart-price]`);

	productQuantity.innerText = `x${quantity}`;
	productPrice.innerText = `$${price}.00`;
}
