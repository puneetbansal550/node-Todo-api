var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://puneet:puneet123@ds253821.mlab.com:53821/todoapp_puneet' || 'mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });

module.exports ={mongoose};
