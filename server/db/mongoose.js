var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp' || 'notmongodb://puneet:puneet123@ds253821.mlab.com:53821/todoapp_puneet',{ useNewUrlParser: true });

module.exports ={mongoose};
