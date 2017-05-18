
// Module dependencies
var mysql = require('mysql');

// Databases
var PRODUCTION_DB = 'videogame',
        DEVELOPMENT_DB = 'videogame'; // can later be a test db
exports.MODE_PRODUCTION = 'mode_production';
exports.MODE_DEVELOPMENT = 'mode_development';

var state = {
    pool: null,
    mode: null
};

// Database connect function
exports.connect = function (mode) {
    state.pool = mysql.createPool({
        host: 'videogamedb.cscuacwgzsui.us-west-2.rds.amazonaws.com',
        user: 'admin',
        password: 'vgdbPASS12345',
//        host: 'localhost',
//        user: 'root',
//        password: 'root',
//  host     : process.env.RDS_HOSTNAME,
//  user     : process.env.RDS_USERNAME,
//  password : process.env.RDS_PASSWORD,
        port: 3306,
        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : DEVELOPMENT_DB
                // socketPath: '/var/run/mysqld/mysqld.sock'
    });

    state.mode = mode;
};

// This function returns a database connection
exports.get = function () {
    return state.pool;
};