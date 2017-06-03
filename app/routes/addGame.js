var express = require('express');
var mysql = require('mysql');
// Get database access
var db = require('../db');
var Q = require('q');
var router = express.Router();

router.post('/', function (req, res) {
    var name = req.body.name;
    var release_date = req.body.release_date;
    var developer = req.body.developer;
    var publisher = req.body.publisher;
    var genre = req.body.genre;
    var game = {
        name: name,
        release_date: release_date,
        developer: developer,
        publisher: publisher,
        genre: genre
    };
    addGame(game, function (data) {
        res.json(data);
    });
});

function addGame(game, callback) {
    db.connect(db.MODE_DEVELOPMENT);
//    console.log(user);
    // # get user data
    var name = mysql.escape(game.name);
    var release_date = mysql.escape(game.release_date);
    var developer = mysql.escape(game.developer);
    var publisher = mysql.escape(game.publisher);
    var genre = mysql.escape(game.genre);
    var date = mysql.escape((new Date(release_date)).toISOString().substring(0, 10));

    var queryList = [];

    var developerQuery = 'INSERT IGNORE INTO developer (name) ' +
            'VALUES (' + developer + ');';

    var publisherQuery = 'INSERT IGNORE INTO publisher (name) ' +
            'VALUES (' + publisher + ');';

    var genreQuery = 'INSERT IGNORE INTO genre_info (genre) ' +
            'VALUES (' + genre + ');';

    var registerQuery = 'INSERT IGNORE INTO video_game_info (name, release_date) ' +
            'VALUES (' + name + ', ' + date + ');';

//    queryList.push(insertQuery(db, developerQuery));
//    queryList.push(insertQuery(db, publisherQuery));
//    queryList.push(insertQuery(db, genreQuery));
    queryList.push(insertQuery(db, registerQuery));
    var findGameQuery = "(SELECT id FROM video_game_info WHERE name = " + name + ") as game_id, ";
    var findGenreQuery = "(SELECT id FROM genre_info WHERE genre = " + genre + ") as genre_id, ";
    var findPublisherQuery = "(SELECT id FROM publisher WHERE name = " + publisher + ") as publisher_id, ";
    var findDeveloperQuery = "(SELECT id FROM developer WHERE name = " + developer + ") as developer_id;";
    var findIdsQuery = "SELECT " + findGameQuery + findGenreQuery + findPublisherQuery + findDeveloperQuery;
//    console.log(findIdsQuery);
//    console.log()
    Q.all(queryList).then(function () {
        db.get().query(findIdsQuery, function (err, rows) {
            var developerGameQuery = "INSERT IGNORE INTO game_developer (game_id, developer_id) " +
                    "VALUES (" + rows[0].game_id + ", " + rows[0].developer_id + ");";
            var publisherGameQuery = "INSERT IGNORE INTO game_publisher (game_id, publisher_id) " +
                    "VALUES (" + rows[0].game_id + ", " + rows[0].publisher_id + ");";
            var genreGameQuery = "INSERT IGNORE INTO game_genre (game_id, genre_id) " +
                    "VALUES (" + rows[0].game_id + ", " + rows[0].genre_id + ");";
//        console.log(developerGameQuery);
//            console.log(publisherGameQuery);
//        console.log(genreGameQuery);
            queryLinkList = [];
        queryLinkList.push(insertQuery(db, developerGameQuery));
            queryLinkList.push(insertQuery(db, publisherGameQuery));
        queryLinkList.push(insertQuery(db, genreGameQuery));
            Q.all(queryLinkList).then(function () {
                callback({"success": true});
            });
        });
    });


}
function insertQuery(db, query) {
    var deferred = Q.defer();
    db.get().query(query, deferred.makeNodeResolver());
//    return deferred.promise;
}
module.exports = router;

