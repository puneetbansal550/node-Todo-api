const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{
  if (err) {
    return console.log('Unable to connect Mongodb Server');
  }
  console.log('Successfully connect to mongodb');

  db.collection('Todos').insertOne({
    text:'Walk a dog',
    completed: true
  },(err, result) =>{
    if (err) {
      return console.log('Failed to perform insert in Todos.');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

db.collection('Users').insertOne({
  name: 'Puneet',
  age: 21,
  location: 'Delhi, India'
},(err,result) =>{
  if (err) {
    return console.log('Unable to add Users collection');
  }
  console.log(JSON.stringify(result.ops, undefined, 2));
});

  db.close();
});
