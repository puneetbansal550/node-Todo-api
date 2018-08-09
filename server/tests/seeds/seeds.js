const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
var {Todo} = require('./../../models/Todo');
var {User} = require('./../../models/User');

var todoArray = [
  {
    _id: new ObjectID(),
    text: 'First todo text',
  },
  {
    _id: new ObjectID(),
    text: 'Secondtodo text',
    completed : true,
    completedAt : 222
  }
];
var userOneId = new ObjectID();
var userTwoId = new ObjectID();
var userArray = [{
  _id : userOneId,
  email : 'user1@example.com',
  password : '123456',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'somesecert').toString()
  }]
},{
  _id : userTwoId,
  email: 'user2@example.com',
  password: 'abc123'
}]

var populateUser = (done) =>{
  User.remove({}).then(() => {
    // XXXXXXXX      wrong   User.insertMany(userArray);
    var userOne = new User(userArray[0]).save();
    var userTwo = new User(userArray[1]).save();
      return Promise.all([userOne,userTwo]);
  }).then(() => {
    done();
  });
};

var populateTodo = (done) =>{
  Todo.remove({}).then(() => {
    Todo.insertMany(todoArray);
  }).then(() => done());
};


module.exports = {todoArray, populateTodo, userArray, populateUser};
