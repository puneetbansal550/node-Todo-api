var env = process.env.NODE_ENV || 'develpoment';
var config = require('./config.json');
var envConfig = config[env];
if(env === 'test' || env === 'develpoment'){
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
else{
  process.env.MONGODB_URI = "mongodb://puneet:puneet123@ds253821.mlab.com:53821/todoapp_puneet";
}
