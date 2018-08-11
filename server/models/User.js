const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
// email - string required customValidation(validate{validator,message}) unique
// password - string required minlength hash(Bcrypt oneWay Algorithm)
// tokens - arrayOfObjects--access(auth(authentication type) --token)

// mongoose middleware - pre
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
};
userSchema.statics.findByToken = function(token) {
  var user = this;
  var tokenResult;

  try {
    tokenResult = jwt.verify(token, 'somesecert');
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    _id : tokenResult._id,
    'tokens.access' : tokenResult.access,
    'tokens.token': token.toString()
  });
};
userSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password,user.password,(err, res) => {
        if(res){
          resolve(user);
        }
        else{
          reject();
        }
    });
  });
});
}
userSchema.pre('save',function (next) {
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hashPassword) => {
        user.password = hashPassword;
        next();
      });
    });
  }
  else {
    next();
  }
});


var User = mongoose.model('User',userSchema);

module.exports = {User};
