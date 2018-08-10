var {User} = require('./../models/User');

var authentication = (req, res, next) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) =>{
    if (!user) {
        throw new Error();
    }
    req.user = user[0];
    next();
  }).catch((e) => {
    res.status(401).send();
  });
}

module.exports = {authentication};
