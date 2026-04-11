var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// declare CORS module to allow cross-origin requests from the React frontend 
const cors = require('cors');

// Import Mongoose for MongoDB connection, session management, and DOTENV - NEW

require('dotenv').config();
const mongoose = require('mongoose');

const testAPIRouter = require("./routes/testAPI");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// MongoDB connection - NEW - this will allow us to connect to our MongoDB database and perform CRUD operations on our data (eg - storing user information, tasks, etc) - make sure to replace the connection string with your own MongoDB URI  
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// CORS so React on port 3000 can access Express on 9000 - NEW
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use("/testAPI", testAPIRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
