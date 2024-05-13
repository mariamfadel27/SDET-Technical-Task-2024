/***********************************************************************************
 *                        important imports
 * *********************************************************************************/ 
const { describe, it } = require('mocha');
const chai = import('chai');
const expect  = import('chai');
import supertest from 'supertest'; //for testing APIS
import { deleteAllUsers } from '../helper/function';
const request=supertest("http://localhost:8080");//the base url for local host
const faker=require('faker');

/*
function to delete all users ,after being created
*/ 


describe('poitive testing block:Create_user->POST /api/v1/users', function() {
  /*
  test case-1:sends a valid body but it throws error(as bug found here, token message is missing this)
  */ 
    it('create user with a valid body', function(done) {
      /*
      construct random user
      */ 
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
  });
    
    /*
 describe_2:negative testing invalid blank input
  */ 
  describe('negative testing block:Create_user->POST /api/v1/users', function() {
    /*1- body sent is black*/ 
  it('create user with empty invalid body', (done) => {
 // Send a POST request to '/api/v1/users' with an empty body
 request.post("/api/v1/users")
 .send({})
 .end((err, res) => {
   // Access the response status
   const statusCode = res.status;
   // Display the response status
   console.log('status:', statusCode);

   // Access the response body
   const responseBody = res.body;
   // Display the response message
   console.log('Response message:', responseBody.message);

   // Check if the response message is 'User registered with success' and status code is not 200
   if (responseBody.message === 'User registered with success' && statusCode === 200) {
     return done(new Error('Message in response should not be "User registered with success" and status code should not be 200'));
   }

   // Verify the response status code is not 200
   if (statusCode === 200) {
     return done(new Error('Unexpected status code 200 in response'));
   }
   done();
      });
  });

  /*2- body sent email is missing*/ 
  it('create user with email is missing', (done) => {
    const user = {
      name: faker.name.firstName(),
      password: faker.internet.password()
    };
    // Send a POST request to '/api/v1/users' with an empty body
    request.post("/api/v1/users")
    .send(user)
    .end((err, res) => {
      // Access the response status
      const statusCode = res.status;
      // Display the response status
      console.log('status:', statusCode);
   
      // Access the response body
      const responseBody = res.body;
      // Display the response message
      console.log('Response message:', responseBody.message);
   
      // Check if the response message is 'User registered with success' and status code is not 200
      if (responseBody.message === 'User registered with success' && statusCode === 200) {
        return done(new Error('Message in response should not be "User registered with success" and status code should not be 200'));
      }
   
      // Verify the response status code is not 200
      if (statusCode === 200) {
        return done(new Error('Unexpected status code 200 in response'));
      }
      done();
         });
     });

     /*2- body sent name is missing*/ 
  it('create user with name is missing', (done) => {
    const user = {
      email:faker.internet.email(),
      password: faker.internet.password()
    };
    // Send a POST request to '/api/v1/users' with an empty body
    request.post("/api/v1/users")
    .send(user)
    .end((err, res) => {
      // Access the response status
      const statusCode = res.status;
      // Display the response status
      console.log('status:', statusCode);
   
      // Access the response body
      const responseBody = res.body;
      // Display the response message
      console.log('Response message:', responseBody.message);
   
      // Check if the response message is 'User registered with success' and status code is not 200
      if (responseBody.message === 'User registered with success' && statusCode === 200) {
        return done(new Error('Message in response should not be "User registered with success" and status code should not be 200'));
      }
   
      // Verify the response status code is not 200
      if (statusCode === 200) {
        return done(new Error('Unexpected status code 200 in response'));
      }
      done();
         });
     });

     
     /*4- body sent password is missing*/ 
  it('create user with password is missing', (done) => {
    const user = {
      name: faker.name.firstName(),
     email:faker.internet.email()
    };
    // Send a POST request to '/api/v1/users' with an empty body
    request.post("/api/v1/users")
    .send(user)
    .end((err, res) => {
      // Access the response status
      const statusCode = res.status;
      // Display the response status
      console.log('status:', statusCode);
   
      // Access the response body
      const responseBody = res.body;
      // Display the response message
      console.log('Response message:', responseBody.message);
   
      // Check if the response message is 'User registered with success' and status code is not 200
      if (responseBody.message === 'User registered with success' && statusCode === 200) {
        return done(new Error('Message in response should not be "User registered with success" and status code should not be 200'));
      }
   
      // Verify the response status code is not 200
      if (statusCode === 200) {
        return done(new Error('Unexpected status code 200 in response'));
      }
      done();
         });
     });
  });
 
/*************************************************************************************************
 *                               another describe block to delete all users 
 ************************************************************************************************/

afterEach(() => {
 deleteAllUsers();
});