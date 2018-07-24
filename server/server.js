var express = require('express');
var bodyParser = require('body-parser');

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

app.listen(3000,() => {
  console.log('Server is up at 3000');
});

module.exports = {app};
