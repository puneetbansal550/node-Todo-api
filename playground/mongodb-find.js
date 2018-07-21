// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

  // var user = {name: 'puneet', age:21};
  // var {name} = user;                                                //object destoration
  // console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{
  if (err) {
    return console.log('Unable to connect Mongodb Server');
  }
  console.log('Successfully connect to mongodb');

  // db.collection('Users').find().toArray().then((docs) =>{
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err) =>{
  //   console.log('nable to fetch docs array.');
  // });

  // db.collection('Todos').find({completed: false}).toArray().then((docs) =>{
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err) =>{
  //   console.log('nable to fetch docs array.');
  // });

  // db.collection('Users').find().count().then((count) =>{
  //   console.log(`Users count: ${count}`);
  // },(err) =>{
  //   console.log('nable to fetch docs array.');
  // });

  // db.collection('Todos').find({
  //   _id : new ObjectID('5b52683fa0c534290d3422c8')
  // }).toArray().then((docs) =>{
  //   console.log(`user with given obectID: `,JSON.stringify(docs, undefined, 2));
  // },(err) =>{
  //   console.log('nable to fetch docs array.');
  // });



  db.close();
});
