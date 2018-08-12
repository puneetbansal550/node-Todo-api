var env = process.env.NODE_ENV || 'develpoment';
var config = require('./config.json');
var envConfig = config[env];
if(env === 'test' || env === 'develpoment'){
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
else{
  envConfig = 'production';
  Object.keys(envConfig).forEach((key) => {
  process.env.envConfig[key] = envConfig[key];
});
}
