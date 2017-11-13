const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Poll', {
  useMongoClient: true
});

module.exports = {
  mongoose
};
