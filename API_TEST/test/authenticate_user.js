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
globals
*/ 
let userEmail;
let userPassword;
let authToken;

/********************************************************************************
 *                               important imports
 * ******************************************************************************/ 
import { deleteAllUsers } from '../helper/function';
import { ret_createUser } from '../helper/function';

/*before hook*/ 
beforeEach(async () => {
  const newUser = await ret_createUser();
  userEmail = newUser.email;
  userPassword = newUser.password;
});

/*
first describe block (negative testing)
response:should be
status:401
message:incorrect email or password
*/
describe('User Authentication API =>negative testing', () => {
   
  /*
  testcase-1 =>authenticate login for unregistered user
  */ 
  it('testcase 1:(autnenticate->login) unregistered user', (done) => {
    const credentials = {
      email: "not_registestered@gmail.com",
      password: "not_registered"
    };

    request.post('/api/v1/auth')
      .send(credentials)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);

        const responseBody = res.body;

        if (responseBody.message !== 'Incorrect email or password') {
          return done(new Error('Unexpected message in response'));
        }

        console.log('Status:', res.status); // Display the response status
        console.log('Response message:', responseBody.message); // Display the response message
        done();
      });
  });

/*
testcase 2:wrong email->login
*/ 
  it ('testcase 2:(autnenticate->login) wrong email', (done) => {
    const credentials = {
      email: "wrong@gmail.com",
      password: userPassword
    };

    console.log(credentials.password);
    request.post('/api/v1/auth')
      .send(credentials)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);

        const responseBody = res.body;

        if (responseBody.message !== 'Incorrect email or password') {
          return done(new Error('Unexpected message in response'));
        }

        console.log('Status:', res.status); // Display the response status
        console.log('Response message:', responseBody.message); // Display the response message
        done();
      });
  });

/*
testcase 3:wrong password->login
*/ 
it ('testcase 3:(autnenticate->login) wrong password', (done) => {
  const credentials = {
    email:userEmail ,
    password: "wrongpass"
  };
  request.post('/api/v1/auth')
    .send(credentials)
    .expect(401)
    .end((err, res) => {
      if (err) return done(err);

      const responseBody = res.body;

      if (responseBody.message !== 'Incorrect email or password') {
        return done(new Error('Unexpected message in response'));
      }

      console.log('Status:', res.status); // Display the response status
      console.log('Response message:', responseBody.message); // Display the response message
      done();
    });
});

/*
testcase 4:empty body sent ->login
*/ 
it ('testcase 3:(autnenticate->login) wrong password', (done) => {
 
  request.post('/api/v1/auth')
    .send({})
    .expect(401)
    .end((err, res) => {
      if (err) return done(err);

      const responseBody = res.body;

      if (responseBody.message !== 'Incorrect email or password') {
        return done(new Error('Unexpected message in response'));
      }

      console.log('Status:', res.status); // Display the response status
      console.log('Response message:', responseBody.message); // Display the response message
      done();
    });
});


});
/*
second describe block(positive) first require to create_user------>then authenticate it
*/ 
describe('User Authentication API for a registered user', () => {

    it('should authenticate the user and store the token', (done) => {
      if (!userEmail || !userPassword) {
        return done(new Error('User email or password missing'));
      }
  
      const credentials = {
        email: userEmail,
        password: userPassword
      };
  
      request.post('/api/v1/auth')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          const responseBody = res.body;
  
          if (!responseBody.token) {
            return done(new Error('Token missing in response'));
          }
  
          // Store token for further use
          authToken = responseBody.token;
  
          console.log('User authenticated with token:', authToken);
          console.log('status:', res.status);
  
          done();
        });
    });
  });

  /*************************************************************************************************
 *            delete all user(for independency of tests)
 ************************************************************************************************/

  
  after(async () => {
    await deleteAllUsers();
  });