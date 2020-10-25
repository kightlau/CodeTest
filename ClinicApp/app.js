var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var recordRouter = require('./routes/records');
var cors = require('cors')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://hang:<password>@cluster0.ecqdt.mongodb.net/<test>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("users");
//   app.locals.collection = collection;
//   console.log("collection", collection);
//   // perform actions on the collection object
//   // client.close();
// });


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hang:P@ssw0rd01@cluster0.ecqdt.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();
global.client = client;
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/record', recordRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app };
