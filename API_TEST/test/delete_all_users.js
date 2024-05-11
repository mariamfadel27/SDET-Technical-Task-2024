
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
create users before each test case
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
            done();
          });
      });
  
  /******************************************************************************************************************
     *              describe block to delete all Users->(valid/invalid)
     *****************************************************************************************************************/
  describe('Delete All Users API', () => {
    it('should delete all users with correct key_admin and return success message', (done) => {
      const requestBody = {
        key_admin: 'keyadmin123'
      };
  
      request.delete('/api/v1/all-users')
        .send(requestBody)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          const responseBody = res.body;
  
          if (responseBody.message !== 'Users deleted with success') {
            return done(new Error('Unexpected message in response'));
          }
  
          console.log('Response message:', responseBody.message); // Display the response message
          done();
        });
    });
  
    it('should return "Unauthorized access" message for wrong key_admin', (done) => {
      const requestBody = {
        key_admin: 'wrong_key'
      };
      request.delete('/api/v1/all-users')
        .send(requestBody)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          const responseBody = res.body;
          if (responseBody.message !== 'Unauthorized access') {
            return done(new Error('Unexpected message in response'));
          }
          console.log('Response message:', responseBody.message); // Display the response message
          done();
        });
    });
  });