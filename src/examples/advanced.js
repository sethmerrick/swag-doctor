'use strict';
import Model from '../Model';

let user = new Model({
  'id': { description: '...', example: 'ae3432aeb35563245'},
  'name': { description: '...', example: 'Jane Doe'},
  'email':{
    description:'...',
    example: function() {
      // allows for use of generators
      return 'email@email.com';
    },
  },
  'username': { description: '...', example: 'janedoe'},
  'password': { description: '...', example: 'testtest'},
});

let unauthorizedError = {
  name: 'Unauthorized Error',
  status: 401,
  body: {
    errors: {
      unauthorized: 'You are not authorized',
    },
  },
};

let permissionsError = {
  name: 'Permissions Error',
  status: 403,
  body: {
    errors: {
      unauthorized: 'You do not have permissions to perform this action.',
    },
  },
};

let tokenHeader = {
  name: 'Authentication Token',
  header: 'Authorization',
  value: 'Bearer: 3838473948',
  description: 'This token is used to authenticate a user with a request. If it is not attached, there will be no user attached to the request. Note that the token must be prepended with "Bearer: "',
};

let createUser = {
  name: 'Create user',
  method: 'GET',
  group: 'User',
  description: 'Allows someone to create a user.',
  params: {
    body: user.select(['name', 'email', 'username', 'password']).one(),
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        user: user.select(['id','name', 'email', 'username']).one(),
      },
    },
    unauthorizedError,
    permissionsError,
  ],
};

let getUser = {
  name: 'Get user',
  method: 'GET',
  group: 'User',
  params: {
    url: user.select(['id']).one(),
    query: [],
  },
  headers: [ tokenHeader ],
};

let updateUser = {
  name: 'Update user',
  method: 'PUT',
  group: 'User',
};

module.exports = {
  paths: [
    { route: '/users', requests: [ createUser ] },
    { route: '/users/:id', requests: [ getUser, updateUser ] },
  ],
};