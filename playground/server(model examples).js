var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });

var Todo = mongoose.model('Todo',{
text:{
 required: true,
 type: String,
 minlength: 1,
 trim: true
},
completed: {
 type: Boolean,
 default: false
},
completedAt: {
 type: Number,
 default: null
}
});

// var newTodo = new Todo({
//   text: 'Drive home',
//   completedAt: new Date().getTime()
// });

                       // Until now its haven't been saved, So
// newTodo.save().then((doc) => {
//   console.log('Doc saved: ', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save doc');
// });

var User = mongoose.model('User',{
email:{
 required: true,
 minlength: 1,
 trim: true,
 type:String
}
});

var newUser = new User({
email: ''
});


newUser.save().then((doc)=>{
console.log('User added: ',JSON.stringify(doc, undefined, 2));
}, (e) =>{
console.log('User Registeration Fail');
});
