var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const db = require('./routes/db')

var app = express();

// DB connect
// db.queryDatabase();
// db.queryDatabaseRead();
db.client.connect(err => {
  try {
    if (err) throw err;
    else {
      db.queryDatabase();
      // db.queryDatabaseRead();
    }
  } catch (error) {
    console.log(error);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*
// DAta

// app.get('/Tap', (req, res) => {
//   res.render('Tap');
// })

// app.post('/Tap', function (req, res, next) {
//   console.log("Authenticate and Redirect");
//   // db.queryDatabaseRead();
//   // res.redirect('/');
//   res.redirect('/');
//   next();
// })*/

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

// app.use();



module.exports = app;