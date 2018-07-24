var mongoose = require('mongoose');

var User = mongoose.model('User',{
  email:{
    required: true,
    minlength: 1,
    trim: true,
    type:String
  }
});

module.exports = {User};
