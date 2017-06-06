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

    //adding multiple publisher and develoeprs if there are a split
    var queryList = [];
    var developerList = developer.split('/');
    var publisherList = publisher.split('/');
    var preGenreList = genre.split('/');
//    var genreList = genre.split(',');
    var genreList = [];
    for (var i = 0; i < preGenreList.length; i++) {
        var tempList = preGenreList[i].split(',');
        for (var ix = 0; ix < tempList.length; ix++) {
            genreList.push(tempList[ix]);
        }
    }
//    developerList.forEach(function (developer) {
//        var developerQuery = 'INSERT IGNORE INTO company (name) ' +
//                'VALUES (' + developer.trim() + ');';
////        console.log(developer.trim());
//        queryList.push(insertQuery(db, developerQuery));
//    });
//
//    publisherList.forEach(function (publisher) {
//        var publisherQuery = 'INSERT IGNORE INTO company (name) ' +
//                'VALUES (' + publisher.trim() + ');';
//        queryList.push(insertQuery(db, publisherQuery));
//    });

    genreList.forEach(function (genre) {
        var genreQuery = 'INSERT IGNORE INTO genre_info (genre) ' +
                'VALUES (' + genre.trim() + ');';
        
        queryList.push(insertQuery(db, genreQuery));
    });
//    console.log(genreList);

//    var registerQuery = 'INSERT IGNORE INTO video_game_info (name, release_date) ' +
//            'VALUES (' + name + ', ' + date + ');';

//    queryList.push(insertQuery(db, registerQuery));
//    Q.all(queryList).then(function () {
    var findGameQuery = "(SELECT id FROM video_game_info WHERE name = " + name + ") as game_id;";
    var findDeveloperQuery = "";
    var findGenreQuery = "";
    var findPublisherQuery = "";

    for (var i = 0; i < developerList.length; i++) {
        findDeveloperQuery += "(SELECT id FROM company WHERE name = " + developerList[i].trim() + ") as developer_id, ";
    }
    for (var i = 0; i < publisherList.length; i++) {
        findPublisherQuery += "(SELECT id FROM company WHERE name = " + publisherList[i].trim() + ") as publisher_id, ";
    }
    for (var i = 0; i < genreList.length; i++) {
        findGenreQuery += "(SELECT id FROM genre_info WHERE genre = " + genreList[i].trim() + ") as genre_id, ";
    }
//    var findGenreQuery = "(SELECT id FROM genre_info WHERE genre = " + genre + ") as genre_id, ";
//    var findPublisherQuery = "(SELECT id FROM publisher WHERE name = " + publisher + ") as publisher_id, ";
//    var findDeveloperQuery = "(SELECT id FROM developer WHERE name = " + developer + ") as developer_id;";
    var findIdsQuery = "SELECT " + findGenreQuery + findPublisherQuery + findDeveloperQuery + findGameQuery;
//        console.log(findIdsQuery);
//    console.log()
    //making a list of publishers based on a split
    Q.all(queryList).then(function () {
        db.get().query(findIdsQuery, function (err, rows) {
//                console.log(rows[0]);
            queryLinkList = [];
            for (var key in rows[0]) {
                var query = "";
                if (key == "genre_id") {
                    query = "INSERT IGNORE INTO game_genre (game_id, genre_id) " +
                            "VALUES (" + rows[0].game_id + ", " + rows[0][key] + ");";
                } else if (key == "publisher_id") {
                    query = "INSERT IGNORE INTO game_publisher (game_id, company_id) " +
                            "VALUES (" + rows[0].game_id + ", " + rows[0][key] + ");";
                } else if (key == "developer_id") {
                    query = "INSERT IGNORE INTO game_developer (game_id, company_id) " +
                            "VALUES (" + rows[0].game_id + ", " + rows[0][key] + ");";
                }
//                console.log((key + " -> " + rows[0][key]));
//                console.log(query);
                queryLinkList.push(insertQuery(db, query));
            }
//            var developerGameQuery = "INSERT IGNORE INTO game_developer (game_id, developer_id) " +
//                    "VALUES (" + rows[0].game_id + ", " + rows[0].company_id + ");";
//            var publisherGameQuery = "INSERT IGNORE INTO game_publisher (game_id, publisher_id) " +
//                    "VALUES (" + rows[0].game_id + ", " + rows[0].company_id + ");";
//            var genreGameQuery = "INSERT IGNORE INTO game_genre (game_id, genre_id) " +
//                    "VALUES (" + rows[0].game_id + ", " + rows[0].genre_id + ");";

//            console.log(developerList.length + "  length");
//                for (var i = 0; i < developerList.length; i++) {
//                    var developerGameQuery = "INSERT IGNORE INTO game_developer (game_id, company_id) " +
//                            "VALUES (" + rows[0].game_id + ", " + rows[0].developer_id + "" + i + ");";
//                    console.log(developerGameQuery);
//                    queryLinkList.push(insertQuery(db, developerGameQuery));
//                }
//                ;
//
//                for (var i = 0; i < publisherList.length; i++) {
//                    var publisherGameQuery = "INSERT IGNORE INTO game_publisher (game_id, company_id) " +
//                            "VALUES (" + rows[0].game_id + ", " + rows[0].publisher_id + i + ");";
//                    queryLinkList.push(insertQuery(db, publisherGameQuery));
//                }
//                ;
//
//                for (var i = 0; i < genreList.length; i++) {
//                    var genreGameQuery = "INSERT IGNORE INTO game_genre (game_id, genre_id) " +
//                            "VALUES (" + rows[0].game_id + ", " + rows[0].genre_id + i + ");";
//                    queryLinkList.push(insertQuery(db, genreGameQuery));
//                }
//                ;
            Q.all(queryLinkList).then(function () {
                callback({"success": true});
            });
        });
    });
//    });
}
function insertQuery(db, query) {
    var deferred = Q.defer();
    db.get().query(query, deferred.makeNodeResolver());
//    return deferred.promise;
}
module.exports = router;

