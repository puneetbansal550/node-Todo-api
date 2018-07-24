var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();
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


app.get('/todos',(req, res) => {

  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });

});
app.listen(3000,() => {
  console.log('Server is up at 3000');
});

module.exports = {app};
