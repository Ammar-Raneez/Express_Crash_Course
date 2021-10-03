// scaffold all user related routes to this users file - otherwise, server.js will grow too lrage
const express = require('express');
const userRouter = express.Router();
const users = [{ name: 'me', }, { name: 'you', },]

userRouter.get('/', (req, res) => {
  const foundUser = users.find((user) => user.name === req.query.name);
  if (foundUser) {
    res.status(200).send('User: ' + JSON.stringify(foundUser));
  } else {
    res.status(200).send('Users list: ' + JSON.stringify(users));
  }
});

userRouter.post('/', (req, res) => {
  // the name attribute in new.ejs will be stored in req.body
  const user = req.body.firstName;
  users.push({ name: user });
  console.log('users: ', users);
  res.send(`Created new user: ${user}`);
});

userRouter.get('/new', (req, res) => {
  res.render('users/new', { firstName: 'test' });
});

// keep dynamic routes at bottom, cuz routes are read from top to bottom
userRouter.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`single user, ${userId}`);
});

// chain same route of different methods
userRouter.route('/:id')
  .get((req, res) => {
    res.send(`Get user with id: ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Put user with id: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with id: ${req.params.id}`);
  });

// middleware are functions that are run before starting of the request,
// and ending of the request, basically in-between.
// Therefore, inorder for the app to continue execution and return the response
// the next() function should be called, which basically calls the next function to be run
userRouter.param('id', (req, res, next, id) => {
  // listen to param id, will run when there's an id param in the url 
  req.user = users[id];
  console.log(req.user);
  next();
});

module.exports = {
  userRouter,
}