var createError = require('http-errors');
require("dotenv").config();
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors")
const passport = require("passport");
const userPassportStrategy = require("./routes/Utils/passport/userPassport")


var usersRouter = require('./routes/Users/userRouter');



mongoose
.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MONGO DB CONNECTED"))
.catch((e) => console.log(e))



var app= express();

app.use(passport.initialize());

passport.use("jwt-user", userPassportStrategy)

let originUrl=
process.env.NODE_ENV === "development"
? "http://localhost:3000"
: "DEPLOY URL";

app.use(cors({origin: originUrl, credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/users', usersRouter);

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
