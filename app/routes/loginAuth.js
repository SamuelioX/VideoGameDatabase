/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

// Get database access
var db = require('../db');

var router = express.Router();

router.get('/', function (req, res) {
    getUserList(function (data) {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

function getUserList(callback) {
    // Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
    // # get user data

    //table concats system type by '
    var userQuery = "SELECT username, password FROM user;";

    db.get().query(userQuery, function (err, rows) {
        if (err) {
            console.log(err);
            callback({"success": false, "message": "something went wrong in the db."});
            return;
        }
        db.get().end();
        callback(rows);

    });

}
//var bodyParser = reequire('body-parser')
//...
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded())
express.post('/authenticate', function (req, res) {
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
        res.send(401, 'Wrong user or password');
        return;
    }

    var profile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        id: 123
    };

    // We are sending the profile inside the token
    var token = jwt.sign(profile, secret, {expiresInMinutes: 60 * 5});

    res.json({token: token});
});
module.exports = router;

