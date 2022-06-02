var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Added codes
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');
const bodyParser = require('body-parser');
// const multer =require('multer');

//Import cors
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Create connection with mongodb
mongoose.connect(config.database, 
  {
    useNewUrlParser: true
  })
  .then(()=>console.log("Successfully connect to MongoDB"))
  .catch(err=>console.error("Connection error", err));

var app = express();
//Importing api routes
const api = require('./routes/api/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(multer().array());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Initializing Passport
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/api', api);

//Add cors middleware to the api route
// app.use(cors);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("Here");
  // next(createError(404));
  next(new Error('Not Found'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.json('error');
  res.json(404, {error: err.message});
});

module.exports = app;
