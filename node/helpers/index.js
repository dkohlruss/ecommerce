function makeCart(user) {
	let cart = [];
	while (user.cart.length > 0) {
		let item = user.cart.pop();
		let isNew = true;

		for (let i = 0; i < cart.length; i++) {
			console.log(item.name);
			console.log(item.size);
			console.log(cart[i].name);
			console.log(cart[i].size);
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

module.exports = { makeCart };
