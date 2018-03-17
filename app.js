const express = require("express");
const bodyparser =require("body-parser");
const path = require("path");
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const index = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');
const mongoose = require('mongoose');
const moment = require('moment');


mongoose.connect('mongodb://localhost/sportsblog');
db = mongoose.connection;

//const ejs = require('ejs');
//init app
const app = express();

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.moment = require('moment');
//BodyParser Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));

//Static Folder Middleware
app.use(express.static(path.join(__dirname, 'public')));

//Express Flash messages
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: 'secret'
}));

//Express validator Middleware
// Express messages
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
//End


// Express validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      const namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);


//app listen
app.listen(3000, ()=> {
  console.log("Server Running and Connected SuccessFully");
});
