// Firstly install expect@1.20.2 mocha nodemon supertest
// require expect and supertest

const expect = require('expect');
const request = require('supertest');
var {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/Todo');

var todoArray = [
  {
    _id: new ObjectID(),
    text: 'First todo text',
  },
  {
    _id: new ObjectID(),
    text: 'Secondtodo text',
    completed : true,
    completedAt : 222
  }
];

beforeEach((done) =>{
  Todo.remove({}).then(() => {
    Todo.insertMany(todoArray);
  }).then(() => done());
});

describe('POST /todos',()=>{
    it('should create todo in mongo',(done) =>{
      var text = 'Testing todo text';

      request(app)
          .post('/todos')
          .expect(200)
          .send({text})
          .expect((res) => {
            expect(res.body.text).toBe(text);
          })
          .end((err, res)=>{
              if(err){
                return done(err);
              }

              Todo.find({text}).then((todos) =>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
              }).catch((e) =>{
                done(e);
              });
          });
    });

  it('should not create todo with invalid body data',(done) =>{

    request(app)
    .post('/todos')
    .expect(400)
    .send({})
    .end((err, res) =>{
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) =>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>{
        done(e);
      })
    });
  });


});

describe('GET /todos', () =>{
  it('should get all todo',(done) =>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) =>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todo/:id',()=> {
  it('should find todo from params id',(done) =>{
    request(app)
      .get(`/todos/${todoArray[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todoArray[0].text);
      })
      .end(done);
  });

  it('should send a 404 if id is invalid',(done) =>{
    var hexID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  })

  it('should send a 404 if id not exist',(done) =>{
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  })
});

describe('DELETE /todo/:id',() =>{

  it('should delete a todo',(done) =>{
    var id = todoArray[1]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) =>{
        if (err) {
          return done(err);
        }

        Todo.findById(id).then((todo) =>{
          expect(todo).toNotExist();
          done();
        }).catch((e) =>{
          return done(e);
        });
      });
  });

  it('should return 404 if todo not found',(done) =>{
        request(app)
          .get(`/todos/123`)
          .expect(404)
          .end(done);
  });

  it('should return 404 if id is invalid', (done) =>{
    var hexID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {

  it('should update text property and add completedAt',(done) =>{
    var id = todoArray[0]._id.toHexString();
    var body = {
      text : "Testing update todo",
      completed : true
    };

    request(app)
      .patch(`/todos/${id}`)
      .send(body)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(body.text);
        expect(res.body.todo.completedAt).toExist();
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed',(done) => {
    var id = todoArray[1]._id.toHexString();
    var completed = false;

    request(app)
      .patch(`/todos/${id}`)
      .expect(200)
      .send({completed})
      .expect((res) => {
        expect(res.body.todo.completedAt).toNotExist();
        console.log(res.body.todo.completed);
      })
      .end(done);
  });



});
