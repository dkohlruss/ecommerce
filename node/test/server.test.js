const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { User } = require('../db/models/user');

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
      console.log(err);
      done(err);
    }

    let userOne = new User(users[0]).save();

    done();
  });
});

beforeEach(populateUsers);

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

describe('POST /users/register', function() {
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

  it ('should return an error if password is too short', (done) => {
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
  })
});
