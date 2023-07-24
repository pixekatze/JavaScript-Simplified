import items from "./items.json" assert { type: "json" };

const storeItemTemplate = document.querySelector("#item-template");
const carItemTemplate = document.querySelector("#cart-item-template");
const itemsContainer = document.querySelector("#items-container");
const cartItemContainer = document.querySelector("#cart-item");
const cart = document.querySelector("#cart");
const cartIcon = document.querySelector("[data-cart-icon]");
const cartNotification = document.querySelector("[data-cart-notification]");
const cartTotal = document.querySelector("[data-cart-total]");
const LOCAL_STORAGE_PREFIX = "CART";
const ITEMS = `${LOCAL_STORAGE_PREFIX}-items`;
const COUNT = `${LOCAL_STORAGE_PREFIX}-count`;
const TOTAL_PRICE = `${LOCAL_STORAGE_PREFIX}-price`;
let cartItems = loadItems();
let cartTotalPrice = loadTotalPrice();
let cartNotificationValue = loadCount();

cart.classList.add("invisible");
cartIcon.classList.add("invisible");

if (storeItemTemplate) {
	items.forEach((item) => {
		renderStoreItems(item);
	});
}

if (cartItems.length) {
	cartItems.forEach((item) => {
		if (item.count > 0) {
			populateSavedCart(item);
		}
	});
}

document.addEventListener("click", (e) => {
	const target = e.target;
	if (target.matches("[data-list-button]")) {
		const selectedItem = target.dataset.listButton;
		updateCartItems(parseInt(selectedItem));
		return;
	}
	if (target.matches("[data-cart-button]")) {
		const selectedCartItem = target.dataset.cartButton;

		removeCartItems(parseInt(selectedCartItem));
		if (cartNotificationValue === 0) {
			cart.classList.add("invisible");
			cartIcon.classList.add("invisible");
		}
		return;
	}
});

function populateSavedCart(itemId) {
	const template = generateClone(itemId, carItemTemplate, "cart");
	cartItemContainer.appendChild(template);
	cart.classList.remove("invisible");
	cartIcon.classList.remove("invisible");
	updateCartPrice(itemId.id, itemId.count, itemId.price);
}

function removeCartItems(itemId) {
	const productItem = document.querySelector(`[data-cart-item="${itemId}"]`);

	const selectedCartProduct = cartItems.find((item) => {
		return item.id === itemId;
	});

	if (selectedCartProduct.count >= 1) {
		selectedCartProduct.count = selectedCartProduct.count - 1;
		selectedCartProduct.price = selectedCartProduct.price - selectedCartProduct.priceCents / 100;
		updateCartPrice(itemId, selectedCartProduct.count, selectedCartProduct.price);
		updateCartTotalPrice();
	}
	if (selectedCartProduct.count == 0) {
		productItem.remove();
	}
	saveCart();
}

function updateCartTotalPrice() {
	cartNotificationValue = 0;
	cartTotalPrice = 0;

	cartItems.forEach((item) => {
		cartNotificationValue = cartNotificationValue + item.count;
		cartTotalPrice = cartTotalPrice + item.price;
	});
	cartTotal.innerText = `$${cartTotalPrice}.00`;
	cartNotification.innerText = cartNotificationValue;
	saveCart();
}

function addFirstCartItem(itemId) {
	const selectedStoreItem = items.find((item) => {
		return item.id === itemId;
	});

	cartItems.push({
		id: itemId,
		name: selectedStoreItem.name,
		category: selectedStoreItem.category,
		priceCents: selectedStoreItem.priceCents,
		imageColor: selectedStoreItem.imageColor,
		count: 1,
		price: selectedStoreItem.priceCents / 100,
	});

	updateCartTotalPrice();

	const template = generateClone(selectedStoreItem, carItemTemplate, "cart");
	cartItemContainer.appendChild(template);
	cart.classList.remove("invisible");
	cartIcon.classList.remove("invisible");

	saveCart();
}

function updateCartItems(itemId) {
	const selectedCartProduct = cartItems.find((item) => {
		return item.id === itemId;
	});

	if (!selectedCartProduct) {
		return addFirstCartItem(itemId);
	}

	selectedCartProduct.count = selectedCartProduct.count + 1;
	selectedCartProduct.price = selectedCartProduct.price + selectedCartProduct.priceCents / 100;

	if (selectedCartProduct.count < 2) {
		const template = generateClone(selectedCartProduct, carItemTemplate, "cart");
		cartItemContainer.appendChild(template);
		cart.classList.remove("invisible");
		cartIcon.classList.remove("invisible");
	} else {
		updateCartPrice(itemId, selectedCartProduct.count, selectedCartProduct.price);
	}
	updateCartTotalPrice();
	saveCart();
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

	if (term === "list") {
		const itemCategory = item.category;
		productCategory.innerText = itemCategory;
		productButton.dataset.listButton = itemId;
	} else {
		productItem.dataset.cartItem = itemId;
		cartTotal.innerText = `$${cartTotalPrice}.00`;
		cartNotification.innerText = cartNotificationValue;
		productButton.dataset.cartButton = itemId;
	}

	return templateClone;
}

function updateCartPrice(item, quantity, price) {
	const productItem = document.querySelector(`[data-cart-item="${item}"]`);
	const productQuantity = productItem.querySelector(`[data-cart-items-number]`);
	const productPrice = productItem.querySelector(`[data-cart-price]`);

	if (quantity < 2) {
		productQuantity.innerText = ``;
	} else {
		productQuantity.innerText = `x${quantity}`;
	}

	productPrice.innerText = `$${price}.00`;
	cartTotal.innerText = `$${cartTotalPrice}.00`;
	cartNotification.innerText = cartNotificationValue;
}

function saveCart() {
	const filteredCartItems = cartItems.filter((cartItem) => cartItem);
	localStorage.setItem(ITEMS, JSON.stringify(filteredCartItems));
	localStorage.setItem(COUNT, JSON.stringify(cartNotificationValue));
	localStorage.setItem(TOTAL_PRICE, JSON.stringify(cartTotalPrice));
}

function loadItems() {
	const itemsString = localStorage.getItem(ITEMS);
	const parsedItems = JSON.parse(itemsString);
	return parsedItems || [];
}
function loadCount() {
	const countString = localStorage.getItem(COUNT);
	return JSON.parse(countString) || 0;
}
function loadTotalPrice() {
	const priceString = localStorage.getItem(TOTAL_PRICE);
	return JSON.parse(priceString) || 0;
}
