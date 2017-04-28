
// Module dependencies
var express = require('express');
var moment = require('moment');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var username = req.query.username;
    var userEmail = req.query.userEmail;
    var hashedPassword = req.query.hashedPassword;
    var userJoinDate = Date.now();
    createUser(username, userEmail, hashedPassword, function (data) {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

/*Given input will be email, hash password and isIntrepreter and should return userid*/
function createUser(username, userEmail, hashedPassword, callback) {

    // Check your input is not null
    if (userEmail == undefined) {
        callback({"success": false, "message": "userEmail was not supplied, but is required"});
        return;
    }
    if (username == undefined) {
        callback({"success": false, "message": "isInterpreter was not supplied, but is required"});
        return;
    }

    if (hashedPassword == undefined) {
        callback({"success": false, "message": "hashedPassword was not supplied, but is required"});
        return;
    }

    //Trim Extra Characters
    userEmail = userEmail.trim();
    userEmail = userEmail.toLowerCase();
    hashedPassword = hashedPassword.trim();

    if (userEmail.length > 250) {
        callback({"success": false, "message": "userEmail must be 250 or less characters"});
        return;
    }

    if (hashedPassword.length > 250) {
        callback({"success": false, "message": "hashedPassword must be 250 or less characters"});
        return;
    }

    // Get and start SQL Connection
    db.connect(db.MODE_DEVELOPMENT);

    db.get().query('SELECT COUNT(*) AS isBad FROM user WHERE LOWER(email) = ?', userEmail.toLowerCase(), function (err, rows) {
        if (err) {
            console.log(err);
            callback({"success": false, "message": "something went wrong in the db."});
            return;
        }
        //check if the email is already in the system
        if (rows[0].isBad > 0)
        {
            db.get().end();
            callback({"success": false, "message": "Given email already exists."});
            return;
        } else {
            var query = "INSERT INTO user (user_type, username, email, hashed_password) " +
                    "VALUES (" + username + ", " + userEmail + ", " + hashedPassword + ");";
            db.get().query('INSERT INTO user SET ?', user, function (err, res) {
                if (err) {
                    console.log(err);
                    callback({"success": false, "message": "something went wrong in the db."});
                    return;
                }
                db.get().end();
                callback({"success": true, "user_id": res.insertId});
            });
        }

    });

}

module.exports = router;
