const config = require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');
var {authentication} = require('./middleware/authentication');
var app = express();
var port = process.env.PORT;
 app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var newTodo = new Todo({
    text: req.body.text
  });
  newTodo.save().then((doc) =>{
    res.send(doc);
  },(e)=> {
    res.status(400).send('Unable to add todo');
  });
});
app.get('/todos',(req, res) => {

  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });

});
app.get('/todos/:id',(req, res) =>{
  var id =req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID');
  }
  Todo.findById(id).then((todo) =>{
    if(!todo){
      return res.status(404).send('Todo do not exist');
    }
    res.status(200).send({todo});

  }).catch((e) =>{
    return res.status(400).send('Not found');
  })
});
app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid id');
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) =>{
    return res.status(400).send();
  });
});
app.patch('/todos/:id',(req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID');
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) =>{
    return res.status(400).send();
  })

});

app.post('/users',(req, res) => {
    var body = _.pick(req.body,['email','password']);
    var newUser = new User(body);

    newUser.save().then(() => {
      return newUser.generateAuthToken();
    }).then((token) =>{
      res.header('x-auth', token).send(newUser);
    }).catch((e) => {
      return res.status(404).send(`${e}`);
    });
});
app.get('/users/me',authentication, (req, res) => {
  var user = req.user;
  res.send(user);

});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email','password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});
app.delete('/users/me/token',authentication, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.send();
  },(e) => {
    res.status(400).send(e);
  });
});

app.listen(port,() => {
  console.log(`Server is up at port ${port}`);
});

module.exports = {app};
