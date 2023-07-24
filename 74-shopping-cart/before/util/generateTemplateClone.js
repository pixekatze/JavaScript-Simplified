import formatCurrency from "./formatCurrency.js";

export default function generateClone(item, template, term) {
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
	productPrice.innerText = formatCurrency(itemPrice);

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
