const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { User } = require('../db/models/user');
const { Product } = require('../db/models/product');

const users = [
	{
		_id: new ObjectID(),
		username: 'dave123',
		password: 'password1',
		level: 0
	},
	{
		_id: new ObjectID(),
		username: 'steven',
		password: '821viin21v',
		level: 1
	}
];

const products = [
	{
		name: 'Shiny Boots',
		designer: 'Fancy Pants',
		category: 'Boots',
		price: '155.99',
		description: "It's unlike anything else you've ever experienced.",
		size: '9',
		stock: 3
	},
	{
		name: 'Shiny Boots',
		designer: 'Fancy Pants',
		category: 'Boots',
		price: '155.99',
		description: "It's unlike anything else you've ever experienced.",
		size: '9',
		stock: 1
	},
	{
		name: 'Shiny Boots',
		designer: 'Fancy Pants',
		category: 'Boots',
		price: '155.99',
		description: "It's unlike anything else you've ever experienced.",
		size: '9.5',
		stock: 0
	},
	{
		name: 'Shiny Boots',
		designer: 'Fancy Pants',
		category: 'Boots',
		price: '155.99',
		description: "It's unlike anything else you've ever experienced.",
		size: '10',
		stock: 5
	},
	{
		name: 'Glittery Jeans',
		designer: 'Afflection',
		category: 'Bottoms',
		price: '89.99',
		description:
			"They're endorsed by everybody who does MMA and could totally, definitely beat you up if they weren't so drunk.",
		size: '32',
		color: 'Shiny',
		stock: 20
	},
	{
		name: 'Glittery Jeans',
		designer: 'Afflection',
		category: 'Bottoms',
		price: '89.99',
		description:
			"They're endorsed by everybody who does MMA and could totally, definitely beat you up if they weren't so drunk.",
		size: '34',
		color: 'Shiny',
		stock: 20
	},
	{
		name: 'Lives 105',
		designer: 'Lives Jeans',
		category: 'Bottoms',
		price: '49.99',
		description: "A cool classic fit that you can't wait to wear",
		size: '32',
		color: 'Blue',
		stock: 3
	},
	{
		name: 'Extra Glittery Jeans',
		designer: 'Afflection',
		category: 'Bottoms',
		price: '189.99',
		description: "Don't look directly into them, you might go blind",
		size: '34',
		color: 'Shiny',
		stock: 20
	}
];

const populateUsers = done => {
	User.remove({}, err => {
		if (err) {
			done(err);
		}

		let userOne = new User(users[0]).save();

		done();
	});
};

const populateProducts = done => {
	Product.remove({}, err => {
		if (err) {
			done(err);
		}

		products.forEach(product => {
			let thing = new Product(product).save();
		});

		let productOne = new Product(products[0]).save();
		let productTwo = new Product(products[1]).save();

		done();
	});
};

beforeEach(populateUsers);
beforeEach(populateProducts);

describe('GET', function() {
	describe('/', function() {
		it('should return a valid document', function(done) {
			request(app)
				.get('/')
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					done();
				});
		});
	});

	describe('/api', function() {
		it('should return product names and prices', function(done) {
			request(app)
				.get('/api')
				.expect(200)
				.expect(res => {
					expect(res.body.length).toBeGreaterThan(0);
					expect(res.body[0]._id).toContain(products[0].name);
					expect(res.body[0].price).toContain(products[0].price);
					expect(res.body[0]._id).toBeTruthy();
					expect(res.body[0].price).toBeTruthy();
				})
				.end(done);
		});
	});

	describe('/api/product/:name', function() {
		it('should return the product information', function(done) {
			request(app)
				.get(`/api/product/${products[0].name}`)
				.expect(200)
				.expect(res => {
					expect(res.body.length).toBeGreaterThan(0);
					expect(res.body[0].name).toEqual(products[0].name);
					expect(res.body[0].designer).toEqual(products[0].designer);
					expect(res.body[0].category).toEqual(products[0].category);
					expect(res.body[0].price).toEqual(products[0].price);
					expect(res.body[0].description).toEqual(products[0].description);
					expect(res.body[0].stock).toEqual(0);
				})
				.end(done);
		});

		it('should include optional product information', function(done) {
			request(app)
				.get(`/api/product/${products[1].name}`)
				.expect(200)
				.expect(res => {
					expect(res.body[0].color).toEqual(products[1].color);
					expect(res.body[0].size).toEqual(products[1].size);
				})
				.end(done);
		});

		it('should not return a non-existant product', function(done) {
			let name = 'Nonexistant Product';
			request(app)
				.get(`/api/${name}`)
				.expect(404)
				.end(done);
		});
	});
});

describe('POST', function() {
	describe('/user/register', function() {
		it('should create a new user', function(done) {
			const username = 'username';
			const password = 'password';

			request(app)
				.post('/user/register')
				.send({ username, password })
				.expect(200)
				.expect(res => {
					expect(res.body._id).toBeTruthy();
					expect(res.body.username).toBe(username);
				})
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					User.findOne({ username })
						.then(user => {
							expect(user).toBeTruthy();
							expect(user.password).not.toEqual(password);
							done();
						})
						.catch(e => {
							done(e);
						});
				});
		});

		it('should return a conflict error if password is too short', done => {
			request(app)
				.post('/user/register')
				.send({ username: 'andrew555', password: '123' })
				.expect(409)
				.end(done);
		});

		it('should not create a user if username already exists', done => {
			request(app)
				.post('/user/register')
				.send({ username: users[0].username, password: 'dogs1111' })
				.expect(400)
				.end(done);
		});
	});

	describe('/api/new', function() {
		const params = {
			name: 'New Product',
			designer: 'Designer',
			category: 'Category',
			price: '5.99',
			description: 'Product Description'
		};

		it('should create a new product', function(done) {
			request(app)
				.post('/api/new')
				.send(params)
				.expect(200)
				.expect(res => {
					expect(res.body._id).toBeTruthy();
				})
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					let _id = res.body._id;
					Product.findOne({ _id })
						.then(product => {
							expect(product).toBeTruthy();
							expect(product.stock).toEqual(0);
							done();
						})
						.catch(e => {
							done(err);
						});
				});
		});

		it('should create a product with stock if specified', function(done) {
			params.stock = 5;
			request(app)
				.post('/api/new')
				.send(params)
				.expect(200)
				.expect(res => {
					expect(res.body._id).toBeTruthy();
				})
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					let _id = res.body._id;
					Product.findOne({ _id })
						.then(product => {
							expect(product).toBeTruthy();
							expect(product.stock).toEqual(5);
							done();
						})
						.catch(e => {
							done(err);
						});
				});
		});

		it('should not create a product without essential details', function(done) {
			let params = {
				designer: 'Designer',
				category: 'Category',
				price: '5.99',
				description: 'Product Description'
			};

			request(app)
				.post('/api/new')
				.send(params)
				.expect(400)
				.end(done);
		});
	});
});
