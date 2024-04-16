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
/*
first describe block (negative testing)
response:should be
status:401
message:incorrect email or password
*/
describe('User Authentication API for not registered user', () => {
  it('should return status 401 and "Incorrect email or password" for unregistered email', (done) => {
    const credentials = {
      email: "not_registestered@gmail.com",
      password: "not_registestered_password"
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
});
/*
second describe block(positive) first require to create_user------>then authenticate it
*/ 
describe('User Authentication API for a registered user', () => {
    let userEmail;
    let userPassword;
    let authToken;
  
    it('should create a new user and store email and password', (done) => {
      const newUser = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      };
  
      request.post('/api/v1/users')
        .send(newUser)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          const responseBody = res.body;
  
          if (responseBody.message !== 'User registered with success') {
            return done(new Error('Unexpected message in response'));
          }
  
          // Store email and password for further use
          userEmail = newUser.email;
          userPassword = newUser.password;
  
          console.log('User created with email:', userEmail, 'and password:', userPassword);
  
          
  
          done();
        });
    });
  
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
  
          done();
        });
    });
  });

  /*************************************************************************************************
 *            another describe block to delete all users (for independency of tests)
 ************************************************************************************************/

  
  after(async () => {
    await deleteAllUsers();
  });