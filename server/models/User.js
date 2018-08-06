const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// email - string required customValidation(validate{validator,message}) unique
// password - string required minlength hash(Bcrypt oneWay Algorithm)
// tokens - arrayOfObjects--access(auth(authentication type) --token)


var userSchema = mongoose.Schema({
  email:{
    required: true,
    minlength: 1,
    trim: true,
    type:String,
    unique: true,
    validate: {
      validator: (value) =>{
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid emailId'
    }
  },
  password: {
    required: true,
    type: String,
    minlength: 6,

  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});
userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user;
  return _.pick(userObject, ['_id', 'email']);
}
userSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(), access}, 'somesecert').toString();
  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
}


var User = mongoose.model('User',userSchema);

module.exports = {User};
