/***********************************************************************************
 *                        important imports
 * *********************************************************************************/ 
const { describe, it } = require('mocha');
const chai = import('chai');
const expect  = import('chai');
import supertest from 'supertest'; //for testing APIS
const request=supertest("http://localhost:8080");//the base url for local host
const faker=require('faker');
/*
function to delete all users ,after being created
*/ 

async function deleteAllUsers() {
  try {
    const response = await request.delete('/api/v1/all-users').send({ key_admin: 'keyadmin123' });
    console.log('All users deleted successfully');
  } catch (error) {
    console.error('Error deleting users:', error);
  }
}
describe('Create_user->POST /api/v1/users', function() {
  /*
  test case-1:sends a valid body but it throws error(as bug found here, token message is missing this)
  */ 
    it('testcase-1(sends valid body,check for message & token,throws error as bug found no token in response)', function(done) {
      const user = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      };
      console.log(user);
  
      request.post("/api/v1/users")
      .send(user)
      .expect(200)
      .end((err, res) => {
        
        const responseBody = res.body;
        console.log('Response message:', responseBody.message); // Display the response message
        if (responseBody.message !== 'User registered with success') {
          return done(new Error('Unexpected message in response'));
        }

        if (!responseBody.token) {    
          return done(new Error('Token missing in response')); /* this error finds a bug where token not found */
        }

        done();
        });
    });
    
    /*
  test case-2:sends invalid body check response(negative testing)------>it fails)
  */ 
  it('should return an error for empty request body', (done) => {
    request.post('/api/v1/users')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
          return done(new Error('Error should fail creating an empty user'));

        console.log('Response message:', responseBody.message); // Display the response message
        done();
      });
  });
  });
 
/*************************************************************************************************
 *                               another describe block to delete all users 
 ************************************************************************************************/

  
after(async () => {
  await deleteAllUsers();
});