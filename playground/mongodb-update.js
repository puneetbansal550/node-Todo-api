const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{
  if (err) {
    return console.log('Unable to connect Mongodb Server');
  }
  console.log('Successfully connect to mongodb');

  // example: db.collection('Todos').findOneAndUpdate({filter},{update},{options}).then((results)=>);
//   db.collection('Todos').findOneAndUpdate({
//     text: 'Eat Launch'
//   },{
//     $set: {
//       completed: true
//     }
//   },{
//     returnOriginal: false
//   }).then((results) =>{
//     console.log(results);
//   });
//
// db.collection('Users').findOneAndUpdate(
//   {
//     _id: new ObjectID('5b5394f6c8263e1177432726')
//   },{
//   $set: {
//     name: 'PuneetBansal'
//   }
//   },{
//     returnOriginal: false
//   }).then((results) =>{
//     console.log(results);
//   });

db.collection('Users').findOneAndUpdate(
  {
    _id: new ObjectID('5b5394f6c8263e1177432726')
  },{
    $set: {
      name: 'Puneet'
    },
  $inc: {
    age: -99
  }
  },{
    returnOriginal: false
  }).then((results) =>{
    console.log(results);
  });

db.close();
});
