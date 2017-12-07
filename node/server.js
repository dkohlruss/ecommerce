const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const _ = require('lodash');
const passport = require('passport');

const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;

const { ObjectId } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { User } = require('./db/models/user');
const { Product } = require('./db/models/product');
const { makeCart, splitAndMakeArray } = require('./helpers');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
	session({
		secret: 'secretphrase',
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT STRATEGY & INIT
passport.serializeUser(function(user, done) {
	let cartArr = [];
	user.cart ? (cartArr = JSON.parse(JSON.stringify(user.cart))) : null;
	let cart = makeCart({ cart: cartArr });
	done(null, { username: user.username, level: user.level, cart });
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
	new LocalStrategy({ passReqToCallback: true, session: true }, function(
		req,
		username,
		password,
		done
	) {
		return User.findByCreds(username, password, (err, user) => {
			if (err) {
				return done(err);
			}

			return done(null, user);
		});
	})
);

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Credentials', true);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
	next();
});

app.get('/', (req, res) => {
	res.status(200).send('Main entrypoint (never used)');
});

app.get('/user/', (req, res) => {
	if (req.user) {
		res.send(req.user);
	} else {
		res.send(null);
	}
});

app.get('/user/cart', (req, res) => {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		let params = {
			username: req.user.username
		};

		User.findOne(params)
			.then(result => {
				let cart = makeCart(result);
				res.send(cart);
			})
			.catch(err => {
				res.status(400).send();
			});
	} else {
		// Deep clone req.session.cart into new array
		let cartArr = [];
		req.session.cart
			? (cartArr = JSON.parse(JSON.stringify(req.session.cart)))
			: null;
		let cart = makeCart({ cart: cartArr });
		res.send(cart);
	}
});

app.delete('/user/cart', (req, res) => {
	let product = _.pick(req.body, ['name', 'size']);
	if (req.isAuthenticated()) {
		User.findOne({ username: req.user.username }).then(result => {
			cartDelete(product, result.cart);
			result.save();
			let cartArr = JSON.parse(JSON.stringify(result.cart));
			let cart = makeCart({ cart: cartArr });

			res.send(cart);
		});
	} else {
		cartDelete(product, req.session.cart);
		let cartArr = JSON.parse(JSON.stringify(req.session.cart));
		let cart = makeCart({ cart: cartArr });

		res.send(cart);
	}
});

cartDelete = function(product, cart) {
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].name === product.name && cart[i].size === product.size) {
			return cart.splice(i, 1);
		}
	}
};

app.post('/user/cart', (req, res) => {
	let product = _.pick(req.body.product, ['name', 'price', 'size']);
	if (req.isAuthenticated()) {
		User.findOneAndUpdate(
			{ username: req.user.username },
			{
				$push: {
					cart: product
				}
			},
			{
				new: true
			}
		).then(result => {
			let cart = makeCart(result);
			res.send(cart);
		});
	} else {
		//Store cart information in session data if user not logged in.
		req.session.cart
			? req.session.cart.push(product)
			: (req.session.cart = [product]);

		// Deep clone req.session.cart into new array
		let cartArr = JSON.parse(JSON.stringify(req.session.cart));
		let cart = makeCart({ cart: cartArr });
		res.send(cart);
	}
});

// USER PATHS FOR LOGIN/REGISTRATION

app.post('/user/login/', (req, res, next) => {
	passport.authenticate('local', (err, user) => {
		if (err) {
			if (err.name === 'IncorrectCredentialsError') {
				return res.status(400).json({
					success: false,
					message: err.message
				});
			}

			return res.status(400).json({
				success: false,
				message: 'Could not process the form'
			});
		}

		user.password = 'hidden';

		req.login(user, err => {
			if (err) {
				return err;
			}

			return;
		});

		let cart = makeCart(user);
		user.cart = cart;
		console.log(user);

		return res.send({
			success: true,
			message: 'Login successful',
			user: user
		});
	})(req, res, next);
});

app.post('/user/logout', function(req, res) {
	req.logout();
	let cartArr = [];
	req.session.cart
		? (cartArr = JSON.parse(JSON.stringify(req.session.cart)))
		: null;
	let cart = makeCart({ cart: cartArr });
	res.send(cart);
});

app.post('/user/register/', (req, res) => {
	let body = _.pick(req.body, ['username', 'password']);
	body.cart = [];
	let user = new User(body);

	user
		.save()
		.then(() => {
			res.send({
				data: {
					success: true,
					user: user
				}
			});
		})
		.catch(err => {
			if (err.name === 'ValidationError') {
				return res.json({
					response: {
						data: {
							success: false,
							message: 'Passwords must be 6 characters or longer'
						}
					}
				});
			}

			return res.json({
				response: {
					data: {
						success: false,
						message: 'This username is taken'
					}
				}
			});
		});
});

// PATHS FOR QUERYING DB FROM END-USER (FOR BROWSING)
// AND ADMINS (ADDING/MODIFYING PRODUCTS)

app.get('/api/', (req, res) => {
	// Picks off items (grouped by name), and the price, for listing on mosaic
	Product.aggregate([
		{
			$group: {
				_id: '$name',
				price: { $first: '$price' },
				category: { $first: '$category' }
			}
		}
	]).then(result => {
		res.send(result);
	});
});

app.get('/api/random', (req, res) => {
	// Random products, good for large sites but bad for small demo site...
	// Product.aggregate([{ $sample: { size: 5 } }]).then(result => {
	// 	res.send(result);
	// });
	Product.find({
		name: {
			$in: ['Lives 105', 'Glittery Jeans']
		}
	}).then(result => {
		res.send(result);
	});
});

app.get('/api/product/:name', (req, res) => {
	// Picks off all info from specific item
	let params = { name: req.params.name };

	Product.aggregate([
		{
			$match: params
		}
	])
		.then(result => {
			let product = {
				name: result[0].name,
				designer: result[0].designer,
				category: result[0].category,
				price: result[0].price,
				description: result[0].description,
				size: result.map(product => {
					return product.size;
				}),
				color: result[0].color,
				stock: result.map(product => {
					return product.stock;
				})
			};
			console.log('Product result for fetch: ', product);

			return product;
		})
		.then(product => {
			res.send(product);
		});
});

app.post('/api/products/new', (req, res) => {
	// Adds a new item with parameters from form
	// Should require user auth and admin status (TODO)
	let body = _.pick(req.body, [
		'name',
		'designer',
		'category',
		'price',
		'description',
		'size',
		'stock'
	]);

	let product = new Product(body);
	product
		.save()
		.then(() => {
			res.send(product);
		})
		.catch(err => {
			res.status(400).send();
		});
});

app.post('/api/products/edit', (req, res) => {
	let products = splitAndMakeArray(req.body);

	Product.deleteMany({ name: req.body.name }).then(result => {
		// Timer set for .5s to avoid race conditions between queries
		setTimeout(() => {
			Product.insertMany(products)
				.then(result => {
					res.send(result);
				})
				.catch(err => {
					res.send(err);
				});
		}, 500);
	});
});

app.listen(3001, () => {
	console.log('Server started on port 3001');
});

// Exporting app for testing purposes
module.exports = {
	app
};
