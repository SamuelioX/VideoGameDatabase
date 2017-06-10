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

var router = express.Router();

router.post('/', function (req, res) {
    var userId = req.body.userId;
    var gameId = req.body.gameId;
    var statusId = req.body.statusId;
    setUserGameStatus(userId, gameId, statusId, function (data) {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

function setUserGameStatus(userId, gameId, statusId, callback) {
    // Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
//    console.log(user);
    var registerQuery = 'INSERT INTO game_status (user_id, status_id, game_id) ' +
            'VALUES (' + userId + ' + ' + statusId + ', ' + gameId + ', ' + ');';

    //hash password here
    db.get().query(registerQuery, function (err, rows) {
        if (err) {
            console.log(err);
            callback({"success": false, "message": "something went wrong in the db."});
            return;
        }
        db.get().end();
        callback();

    });

}

module.exports = router;

