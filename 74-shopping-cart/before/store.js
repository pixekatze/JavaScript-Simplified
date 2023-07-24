import items from "./items.json";
import addGlobalEventListener from "./util/addGlobalEventListener.js";
import { updateCartItems, generateClone } from "./shoppingCart.js";

const storeItemTemplate = document.querySelector("#item-template");
const itemsContainer = document.querySelector("#items-container");

export function setUpStore() {
	if (itemsContainer == null) return;

	addGlobalEventListener("click", "[data-list-button]", (e) => {
		const id = e.target.dataset.listButton;
		updateCartItems(parseInt(id));
	});

	items.forEach(renderStoreItem);
}

function renderStoreItem(item) {
	const template = generateClone(item, storeItemTemplate, "list");
	itemsContainer.appendChild(template);
}
