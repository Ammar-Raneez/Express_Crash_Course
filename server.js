const express = require('express');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();

// public folder taken as our static folder, you can access
// the html files by specifying the path they are in relative to public dir
// ex: for test.html --> localhost/test/test.html
app.use(express.static('public'));

// allow usage of information coming from forms
app.use(express.urlencoded({ extended: true }));

// allow usage of information coming from json
app.use(express.json());

// use ejs as our templating language - by default there's none
app.set('view engine', 'ejs');

// use our custom middleware only for this
app.get('/check', middleware.logger, (req, res) => {
  // render this file at this route, passing data
  res.render('index', { msg1: 'hello', });
});

const userRouter = routes.userRouter;

// initial path as /users, so everything in userRouter will be after /users
app.use('/users', userRouter);

app.listen(3000);