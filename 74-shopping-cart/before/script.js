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
const cartItems = loadItems();
const cartPriceArray = [];
const cartItemsCountArray = [];
let cartTotalPrice = loadTotalPrice();
let cartNotificationValue = loadCount();

cart.classList.add("invisible");
cartIcon.classList.add("invisible");

console.log({ cartItems });

if (cartItems.length > 0) {
	cartItems.forEach((item) => {
		if (item) {
			updateCartItems(item.number, false, true);
		}

		//updateCartItems(parseInt(item.number));
	});
}

items.forEach((item) => {
	renderStoreItems(item);
});

document.addEventListener("click", (e) => {
	if (e.target.matches("[data-list-button]")) {
		const selectedItem = e.target.dataset.listButton;
		updateCartItems(selectedItem);
	} else if (e.target.matches("[data-cart-button]")) {
		const selectedCartItem = e.target.dataset.cartButton;

		updateCartItems(selectedCartItem, true);
		if (cartNotificationValue === 0) {
			cart.classList.add("invisible");
			cartIcon.classList.add("invisible");
		}
	}
});

function updateCartItems(itemId, remove, loaded) {
	remove = remove || false;
	loaded = loaded || false;

	console.log(typeof itemId);

	const selectedItem = items[itemId - 1];

	console.log({ cartItems });

	if (!remove && !loaded) {
		if (cartItems[itemId] == null) {
			cartItems[itemId] = {
				count: 1,
				number: itemId,
				price: items[itemId - 1].priceCents / 100,
			};
		} else {
			cartItems[itemId].count = cartItems[itemId].count + 1;
			cartItems[itemId].price = cartItems[itemId].price + items[itemId - 1].priceCents / 100;
		}
	} else if (remove && !loaded) {
		cartItems[itemId].count = 0;
		cartItems[itemId].price = 0;
		// saveCart();
	}

	cartPriceArray[itemId] = cartItems[itemId].price;

	cartTotalPrice = cartPriceArray.reduce((accumulator, currentValue) => {
		return accumulator + currentValue;
	}, 0);

	cartItemsCountArray[itemId] = cartItems[itemId].count;

	console.log({ cartItems });
	cartNotificationValue = cartItemsCountArray.reduce((accumulator, currentValue) => {
		return accumulator + currentValue;
	}, 0);

	if (!remove && !loaded) {
		if (cartItems[itemId].count < 2) {
			const template = generateClone(selectedItem, carItemTemplate, "cart");
			cartItemContainer.appendChild(template);
			cart.classList.remove("invisible");
			cartIcon.classList.remove("invisible");
		} else {
			updateCartPrice(itemId, cartItems[itemId].count, cartItems[itemId].price);
		}
		// saveCart();
	} else if (!loaded) {
		const productItem = document.querySelector(`[data-cart-item="${itemId}"]`);
		productItem.remove();
		cartTotal.innerText = `$${cartTotalPrice}.00`;
		cartNotification.innerText = cartNotificationValue;
		// saveCart();
	} else {
		if (cartItems[itemId].count > 0) {
			const template = generateClone(selectedItem, carItemTemplate, "cart");
			cartItemContainer.appendChild(template);
			cart.classList.remove("invisible");
			cartIcon.classList.remove("invisible");
			updateCartPrice(itemId, cartItems[itemId].count, cartItems[itemId].price);
		}
	}
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

	productQuantity.innerText = `x${quantity}`;
	productPrice.innerText = `$${price}.00`;
	cartTotal.innerText = `$${cartTotalPrice}.00`;
	cartNotification.innerText = cartNotificationValue;
	// saveCart();
}

function saveCart() {
	localStorage.setItem(ITEMS, JSON.stringify(cartItems));
	localStorage.setItem(COUNT, JSON.stringify(cartNotificationValue));
	localStorage.setItem(TOTAL_PRICE, JSON.stringify(cartTotalPrice));
}

function loadItems() {
	const itemsString = localStorage.getItem(ITEMS);
	const parsedItems = JSON.parse(itemsString);
	console.log({ parsedItems });

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
