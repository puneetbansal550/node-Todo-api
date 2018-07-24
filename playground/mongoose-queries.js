const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const Todo = require('./../server/models/Todo').Todo;
const {User} = require('./../server/models/User');

var id = '5b579c5718adfb20c42688c3';

if(!ObjectID.isValid(id)){
    return console.log('Invalid id');
}

// Todo.find({
//     _id: id
//   }).then((todos) =>{
//     console.log('Find Todo',todos);
//   });
//
// Todo.findOne({
//     _id: id
//   }).then((todo) =>{
//     console.log('FindOne Todo',todo);
//   });

Todo.findById(id).then((todos) =>{
  if(!todos){
    return console.log('Todo not Exist');
  }
    console.log('FindById Todo',todos);
  }).catch((e) => {
    console.log('id do not exist');
  });


User.findById('5b566357f01af51b2ecd6c3a').then((user) =>{
  if(!user){
    return console.log('User do not exsist');
  }
  console.log('User Collection findByid:', user);
}).catch((e) =>{
  console.log(e);
});
