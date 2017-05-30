/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var crypto = require('crypto');
var mysql = require('mysql');
// Get database access
var db = require('../db');
var jwt = require('express-jwt');
var router = express.Router();

router.post('/', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var user = {
        username: username,
        password: password
    };
    authorizeAccount(user, function (data) {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

function authorizeAccount(user, callback) {
    // Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
//    console.log(user);
    // # get user data
    var username = user.username;
    var password = user.password;
    //gets the hashed password and inserts it into the database
    var userQuery = "SELECT username, email, salt, password " +
            "FROM user WHERE (user.username = " + mysql.escape(username) + " OR user.email = " +
            mysql.escape(username) + ');';
    //hash password here
    db.get().query(userQuery, function (err, rows) {
        if (err) {
            console.log(err);
            callback({"success": false, "message": "something went wrong in the db."});
            return;
        }
        db.get().end();
        var currUser = {
            username: user.username
        };
        var hashedPass = sha512(password, rows[0].salt);
        console.log(hashedPass.passwordHash + " " + rows[0].password);
        if(hashedPass.passwordHash == rows[0].password){
            var token = jwt.sign(currUser, process.env.AWS_SECRET_KEY, {expiresInMinutes: 60 * 5});
            callback(token);
        } else {
            callback({"success": false});
        }
    });

//    var token = jwt.sign(profile, secret, {expiresInMinutes: 60 * 5});
    callback();

}

//express.post('/authenticate', function (req, res) {
//    //TODO validate req.body.username and req.body.password
//    //if is invalid, return 401
//    if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
//        res.send(401, 'Wrong user or password');
//        return;
//    }
//
//    var profile = {
//        first_name: 'John',
//        last_name: 'Doe',
//        email: 'john@doe.com',
//        id: 123
//    };
//
//    // We are sending the profile inside the token
//    var token = jwt.sign(profile, secret, {expiresInMinutes: 60 * 5});
//
//    res.json({token: token});
//});
var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length);   /** return required number of characters */
};

var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    return passwordData;
}
module.exports = router;
//
