const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{
  if (err) {
    return console.log('Unable to connect Mongodb Server');
  }
  console.log('Successfully connect to mongodb');

  //deleteMany
    // db.collection('Users').deleteMany({name: 'Puneet'}).then((results) =>{
    //   console.log(results);
    // });
  //deleteOne
    // db.collection('Todos').deleteOne({text:'Call project Manager'}).then((results) =>{
    //   console.log(results);
    // });
  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({text:'Walk a dog'}).then((results) =>{
  //   console.log(results);
  // });

  // db.collection('Todos').deleteOne({text:'Hello Puneet'});
  db.collection('Todos').findOneAndDelete({_id: new ObjectID('5b5392ac504182ae7a400c1c')}).then((results) =>{
    console.log(results);
  });

  db.close();
});
