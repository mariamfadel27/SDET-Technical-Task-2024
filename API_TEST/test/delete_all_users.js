
/***********************************************************************************
 *                        important imports
 * *********************************************************************************/ 
const { describe, it } = require('mocha');
const chai = import('chai');
const expect  = import('chai');
import supertest from 'supertest'; //for testing APIS
const request=supertest("http://localhost:8080");//the base url for local host

/*imported functions*/ 
import { deleteAllUsers } from '../helper/function';
import { create_new_user } from '../helper/function';
/*
correct admin body
*/ 
const correct_requestBody = {
  key_admin: 'keyadmin123'
};
/*
create users before each test case
*/ 
beforeEach(async() => {
  /*create random 5 users*/ 
  for (let i = 0; i < 5; i++) {
 await create_new_user();
  }
      });
  
  /******************************************************************************************************************
     *              describe block to delete all Users->(valid/invalid)
     *****************************************************************************************************************/
  describe('Delete All Users API', () => {
    it('positive:test 1: with correct key_admin and return success message', (done) => {
     
  
      request.delete('/api/v1/all-users')
        .send(correct_requestBody)
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
  
    it('negative:test 2: "Unauthorized access" message for wrong key_admin', (done) => {
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
    it('negative: test 3:should return "Unauthorized access" empty sent body', (done) => {
     
      request.delete('/api/v1/all-users')
        .send({})
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
    it('negative: test 4:should return "Unauthorized access" wrong key_admin->spelling field', (done) => {
      const requestBody = {
        key_n: 'keyadmin123'
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

  /*
cleanup condition
*/ 
 after(async () => {
  await deleteAllUsers();
});