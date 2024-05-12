
/************************************************************************
 *                   important imports
 ************************************************************************/ 
import supertest from 'supertest'; //for testing APIS
const request=supertest("http://localhost:8080");//the base url for local host
const faker=require('faker');

/*
function to delete all registerd user
*/ 

export async function deleteAllUsers() {
    const response = await request.delete('/api/v1/all-users').send({ key_admin: 'keyadmin123' });
    console.log(response.body);
}

/*
function to create new user
*/ 

export async function create_new_user() {
  // Create random user
  const newUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
    const response = await request.post('/api/v1/users').send(newUser);
    console.log( 'response.body');
}
/*
Function to create a new user
*/
export async function ret_createUser() {
  const newUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  
    const response = await request.post('/api/v1/users').send(newUser);
    console.log('User created with email:', newUser.email, 'and password:', newUser.password);
    return newUser;
  
}
