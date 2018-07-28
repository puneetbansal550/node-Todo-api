const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const Todo = require('./../server/models/Todo').Todo;
const {User} = require('./../server/models/User');

//Todo.remove()
  // Todo.remove({}).then((results) =>{
  //   console.log(results);
  // });

//Todo.findOneAndRemove();
  // Todo.findOneAndRemove({_id: new ObjectID('5b5c66bc861103c0950a9ad7')}).then((doc) =>{
  //   console.log(doc);
  // });


//Todo.findByIdRemove();
  Todo.findByIdAndRemove('5b5c6700861103c0950a9af9').then((doc) => {
    console.log(doc);
  })
