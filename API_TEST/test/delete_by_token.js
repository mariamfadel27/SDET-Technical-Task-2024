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
important variables used in the following describe blocks
*/
let userEmail;
let userPassword;
let authToken;
/*
beforeEach:a before each hook,to make sure we created user & authenticate it for delete by token

*/  

beforeEach((done) => {
    // Create user
    const newUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
  //register a new user first then authenticate it to continue
    request.post('/api/v1/users')
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        // Authenticate user
        const credentials = {
          email: newUser.email,
          password: newUser.password
        };
  
        request.post('/api/v1/auth')
          .send(credentials)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            authToken = res.body.token; //to authenticate user to get token used to delete user by token
            done();
          });
      });
  });
  
    /******************************************************************************************************************
     *              describe block to delete User by token
     *****************************************************************************************************************/
 
describe('Delete User API', () => {
it('should delete user with valid authorization and return success message', (done) => {

request.delete('/api/v1/users')
  .set('Authorization', authToken)
  .expect(200)
  .end((err, res) => {
    if (err) {
      console.error('Error:', err);
      console.error('Response body:', res.body);
      return done(err);
    }

    const responseBody = res.body;

    if (responseBody.message !== 'User deleted with success!') {
      console.error('Unexpected message in response:', responseBody);
      return done(new Error('Unexpected message in response'));
    }

    console.log('Response message:', responseBody.message); // Display the response message
    done();
  });
});


it('should return "Unauthorized to delete" message for invalid authorization', (done) => {
const invalidToken = 'invalid_token';
request.delete('/api/v1/users')
  .set('Authorization', invalidToken)
  .expect(403)
  .end((err, res) => {
    if (err) {
      console.error('Error:', err);
      console.error('Response body:', res.body);
      return done(err);
    }
    const responseBody = res.body;
    if (responseBody.message !== 'Unauthorized to delete') {
      console.error('Unexpected message in response:', responseBody);
      return done(new Error('Unexpected message in response'));
    }
    console.log('Response message:', responseBody.message); // Display the response message
    done();
  });
});
});


    