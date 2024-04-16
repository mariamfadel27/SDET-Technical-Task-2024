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
important variables used in the following describe blocks
*/
let userEmail;
let userPassword;
let authToken;
/*
fiest describe bock:to create users
*/ 
describe('create user-authenticate it', function() {
  /*
  test case-1:create new user
  */ 


  it('should create a new user and store email and password', (done) => {
    const newUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
console.log(newUser);
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
  /*
  testcase-2: to authenticate the user to use token in get,delete,patch
  */ 

  it('should authenticate the user and store the token', (done) => {
    if (!userEmail || !userPassword) {
      return done(new Error('User email or password missing'));
    }

    const credentials = {
      email: userEmail,
      password: userPassword
    };
console.log(credentials);
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
    /*
second describe block:(GET_USER_BY_TOKEM)
*/  
    describe('GET_BY_TOKEN(valid/invalid)Authorization',function() {
        /*
        test case-1() (valid authorization)-(positive testing)
        */ 

        it('should return user details with all fields & give error if one of the fields is missing with log message (valid authorization)', (done) => {
            request.get('/api/v1/users')
              .set('Authorization', authToken)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
        
                const responseBody = res.body;
        
                // Check each field of the response
                if (!responseBody.id) {
                  return done(new Error('ID is missing in response'));
                }
                if (!responseBody.name) {
                  return done(new Error('Name is missing in response'));
                }
                if (!responseBody.email) {
                  return done(new Error('Email is missing in response'));
                }
                if (!responseBody.password) {
                  return done(new Error('Password is missing in response'));
                }
                if (!responseBody.imageUrl) {
                  return done(new Error('Image URL is missing in response'));
                }
        
                console.log('User details:', responseBody); // Display the response body
                done();
            });
        });
        /*
        test_case-2:invalid authorization (negative testing)
        */ 
        it('should return "Unauthorized" with status 403 for invalid authorization token', (done) => {
            const invalidToken = 'invalid_token';
        
            request.get('/api/v1/users')
              .set('Authorization', invalidToken)
              .expect(403)
              .end((err, res) => {
                if (err) return done(err);
        
                const responseBody = res.body;
        
                if (responseBody.message !== 'Unauthorized') {
                  return done(new Error('Unexpected message in response'));
                }
        
                console.log('Response message:', responseBody.message); // Display the response message
                console.log('Status:', res.status); // Display the response status
                done();
              });
          });
    
          });
 /*
  /*
third describe block:(patch_USER_BY_TOKEM)
*/  
    describe('Update User API,valid,invalid,valid_wrong_token', () => {
      const requestBody = {
        "name": "newName",
        "email": "new_email@gmail.com",
        "password": "newpassword123"
      };
      /*
      test_case_1:with valid & correct token,(positive_happy scenario)
      */ 
      it('should update user details and return success message for valid token and correct data', (done) => {
        request.patch('/api/v1/users')
          .set('Authorization', authToken) //the only valid authorization
          .send(requestBody)
          .expect(200)
          .end((err, res) => {
        if (err) {
          console.error('Error:', err);
          console.error('Response body:', res.body);
          return done(err);
        }

        const responseBody = res.body;

        if (!responseBody.message) {
          console.error('Response body does not contain message:', responseBody);
          return done(new Error('Response body does not contain message'));
        }
        if (responseBody.message !== 'User updated with success!') {
          return done(new Error('Unexpected message in response'));
        }

        if (Object.keys(responseBody).length !== 1) {
          console.error('Response body contains additional fields,we only expect the response message:', responseBody);
          return done(new Error('Response body contains additional fields'));
        }

        console.log('Response message:', responseBody.message); // Display the response message
        done();
          });
      });
    /*
    testcase_2: invalid token (not exact in length)
    */ 
      it('should return status 403 and "invalid token" message for invalid token', (done) => {
        const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpb';
    
        request.patch('/api/v1/users')
          .set('Authorization', invalidToken)
          .send(requestBody)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            const responseBody = res.body;
            console.log('Status:', res.status); // Display the response status
            console.log('Response message:', responseBody.message); // Display the response message
            done();
          });
      });

    /*
    testcase_3:wrong token ,but valid
    */ 
      it('should return status 403 for wrong token, but valid token', (done) => {
        const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld19lbWFpbEBnbWFpbC5jb20iLCJpZCI6MzcwNDMsImlhdCI6MTcxMzEyNjcyOCwiZXhwIjoxNzEzMjEzMTI4fQ.y0j2VWhO5_Gwm3V2-_mrjETS_BenLyKwTMLteFV3puc';
        request.patch('/api/v1/users')
          .set('Authorization', wrongToken)
          .send(requestBody)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            console.log('Status:', res.status); // Display the response status
            done();
          });
        });
  
        });

    /*
    the final describe block to delete all users created by our test cases ,to make our tests robust & run independently
    */ 
   /*************************************************************************************************
 *                               another describe block to delete all users 
 ************************************************************************************************/

   after(async () => {
    await deleteAllUsers();
  });