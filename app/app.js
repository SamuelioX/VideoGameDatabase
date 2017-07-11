var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon('./public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')('./public'));
app.use(express.static('./public'));
app.use('/profile', express.static('./public/profile.html'));
app.use('/gamelist', express.static('./public/gamelist.html'));
app.use('/login', express.static('./public/login.html'));
app.use('/register', express.static('./public/register.html'));
app.use('/game', express.static('./public/detailedPage.html'));
app.use('/images', express.static('./public/images'));
app.use('/css', express.static('./public/css'));
app.use('/usergamelist', express.static('./public/userGameList.html'));
app.use('/systemlist', express.static('./public/systemlist.html'));

console.log('Node is installed');
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

//setting jwt token
//app.set('jwtTokenSecret', 'token');
app.set('jwtTokenSecret', process.env.AWS_TOKEN_SECRET);
module.exports = app;
