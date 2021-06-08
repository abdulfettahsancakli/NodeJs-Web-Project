var port =4000;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
const Handlebars = require('handlebars');
var mongoose =require('mongoose');
var session = require('express-session');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require("express-validator");
var MongoStore =require('connect-mongo')(session);

var routes = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();

//we are connecting the mongodb part called shopping and using the given informations there.
mongoose.connect('mongodb://localhost:27017/shopping',{
 useUnifiedTopology:true,
 useNewUrlParser:true  
  
});
require('./config/passport');


// When connecting Handlebars to the Express app...
// differently from earlier homeworks, we used the handlebars in this part.It's easier to handle the website.
app.engine('hbs', expressHbs({
  defaultLayout: 'Layout', extname:'.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set('view engine', 'hbs');//we could use hbs shortly.


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
//sessions are more comfortable for creating the informations and use them.
app.use(session({
  secret:'mysupersecret',
  resave:false,
  saveUninitialized:false,
  store: new MongoStore({mongooseConnection:mongoose.connection}),
  cookie:{maxAge:180*60*1000}
}));
//in our project; for validation of our login and register form, we did the passport and flash features and required them.
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.login= req.isAuthenticated();
  res.locals.session=req.session;
  next();
})//this part is important for authentication in the system.



app.use('/user',userRoutes);
app.use('/', routes);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});