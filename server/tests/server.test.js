// Firstly install expect@1.20.2 mocha nodemon supertest
// require expect and supertest

const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/Todo');

var text = 'Testing todo text';

beforeEach((done) =>{
  Todo.remove({}).then(() => done() );
});

describe('POST /todos',()=>{
    it('should create todo in mongo',(done) =>{

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

              Todo.find().then((todos) =>{
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
        expect(todos.length).toBe(0);
        done();
      }).catch((e)=>{
        done(e);
      })
    });
  });


});
