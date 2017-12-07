function makeCart(user) {
	let cart = [];
	while (user.cart.length > 0) {
		let item = user.cart.pop();
		let isNew = true;

		for (let i = 0; i < cart.length; i++) {
			if (item.name === cart[i].name && item.size === cart[i].size) {
				isNew = false;
				cart[i].quantity++;
			}
		}

		if (isNew) {
			item.quantity = 1;
			cart.push(item);
		}
	}
	return cart;
}

function splitAndMakeArray(productObj) {
	let products = [];
	let sizes = productObj.size.split(',').filter(entry => {
		return entry.trim();
	});
	let stock = productObj.stock.split(',').filter(entry => {
		return entry.trim();
	});

	for (let i = 0; i < stock.length; i++) {
		products[i] = {};
		products[i].name = productObj.name;
		products[i].designer = productObj.designer;
		products[i].category = productObj.category;
		products[i].price = productObj.price;
		products[i].description = productObj.description;
		products[i].size = sizes[i];
		products[i].color = productObj.color;
		products[i].stock = stock[i];
	}

	return products;
}

module.exports = { makeCart, splitAndMakeArray };
