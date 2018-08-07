// we are going to use SHA256 algorithm here.
// For that we use a new module crpyt-js which contains many hashing algorithms - MD5,A.., SHA256
// it gives a crypt value and that value will be used to check authentication of users
// we use hashing when like - password, sending file with a hash value so to be check at other end

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var data = {
  id: 10
}
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('12345', salt, (err, hashedPassword) =>{
    console.log(`salt: ${salt}`);
    console.log(`hashedPassword: ${hashedPassword}`);
    bcrypt.compare('12345', hashedPassword, (err, res) =>{
      console.log(res);
    });

  });
});




// jwt two methods required - sign , verify
// var token = jwt.sign(data, 'somesecret');
// var decoder = jwt.verify(token, 'somesecret');
//
// console.log(`token: ${token}`);
// console.log(`decoder:`, decoder);


// var user = 'I am user number 3';
// var hashUser = SHA256(user).toString();
// console.log(`user: ${user}, \nhashUser: ${hashUser}`);
// var data ={
//   id: 10
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
// middleware someone change data like
        // token.data = 11;
        // token.hash = SHA256(JSON.stringify(data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(token.hash === resultHash){
//   console.log('Data is not changed');
// }
// else{
//   console.log('Data is changed. Do not Trust!');
// }
