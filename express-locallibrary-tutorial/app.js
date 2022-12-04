var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//handing particular sets of related routes(URL path)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site


var app = express();

var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://ArcherUz:Archeruz72@cluster0.igckjay.mongodb.net/local_library?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));


// view engine setup
app.set('views', path.join(__dirname, 'views')); //specify the folder where the templates will be stored
app.set('view engine', 'pug'); //specify the template library(pug)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //Express severs all the static files in /public directory

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

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
