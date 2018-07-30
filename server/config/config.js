var env = process.env.NODE_ENV || 'develpoment';
if(env === 'develpoment'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp' ;
}
else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
else{
  process.env.MONGODB_URI = 'mongodb://puneet:puneet123@ds253821.mlab.com:53821/todoapp_puneet';
}
console.log(env);
