const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { User } = require('../db/models/user');
const { Product } = require('../db/models/product');

const users = [{
  _id: new ObjectID(),
  username: 'sildsajfl',
  password: 'password1',
  level: 0
},{
  _id: new ObjectID(),
  username: '8dsvbni1n1',
  password: '821viin21v',
  level: 1
}];

const populateUsers = ((done) => {
  User.remove({}, (err) => {
    if (err) {
      done(err);
    }

    let userOne = new User(users[0]).save();

    done();
  });
});

const populateProducts = ((done) => {
  const product = {
    name: 'Seeded Product',
    designer: 'Seed Designer',
    category: 'Seed Category',
    price: '55.99',
    description: 'Seed Description'
  }
  Product.remove({}, (err) => {
    if (err) {
      done(err);
    }

    let productOne = new Product(product).save();

    done();
  });
});

beforeEach(populateUsers);
beforeEach(populateProducts);

describe('GET /', function() {
  it('should return a valid document', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      })
  });
});

describe('POST', function() {
  describe('/user/register', function() {
    it ('should create a new user', function(done) {
      const username = 'username';
      const password = 'password';

      request(app)
        .post('/user/register')
        .send({username, password})
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBeTruthy();
          expect(res.body.username).toBe(username);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          User.findOne({username}).then((user) => {
              expect(user).toBeTruthy();
              expect(user.password).not.toEqual(password);
              done();
            }).catch((e) => {
              done(e)
          });
        });
    });

    it ('should return a conflict error if password is too short', (done) => {
      request(app)
        .post('/user/register')
        .send({username: 'andrew555', password: '123'})
        .expect(409)
        .end(done);
    });

    it ('should not create a user if username already exists', (done) => {
      request(app)
        .post('/user/register')
        .send({username: users[0].username, password: 'dogs1111'})
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
    }

    it ('should create a new product', function(done) {
      request(app)
        .post('/api/new')
        .send(params)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBeTruthy();
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          let _id = res.body._id;
          Product.findOne({_id}).then((product) => {
            expect(product).toBeTruthy();
            expect(product.stock).toEqual(0);
            done();
          }).catch((e) => {
            done(err);
          });
        });
    });

    it ('should create a product with stock if specified', function(done) {
      params.stock = 5;
      request(app)
        .post('/api/new')
        .send(params)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBeTruthy();
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          let _id = res.body._id;
          Product.findOne({_id}).then((product) => {
            expect(product).toBeTruthy();
            expect(product.stock).toEqual(5);
            done();
          }).catch((e) => {
            done(err);
          });
        });
    });

    it ('should not create a product without essential details', function(done) {
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
