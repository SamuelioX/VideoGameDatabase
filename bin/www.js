/**
 * Module dependencies.
 */

var app = require('../app/app');
var debug = require('debug')('videogamedb:server');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');

// Setup HTTPS
//var options = {
//    key: fs.readFileSync(path.resolve(__dirname, '../certs/newserver.key')),
//    cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.crt'))
//};
/**
 * Get port from environment and store in Express.
 */
//
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//var httpsPort = normalizePort(process.env.PORT || '443');
//app.set('port', httpsPort);
/**
 * Create HTTP server.
 */

var server = http.createServer(app);
//var httpsServer = https.createServer(options, app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
//server.on('error', onError);
//server.on('listening', onListening);

//
//httpsServer.listen(443);
//httpsServer.on('error', onError);
//httpsServer.on('listening', onListening);

// Secure traffic only
//app.all('*', function(req, res, next){
//  if (req.secure) {
//    return next();
//  };
// res.redirect('https://'+req.hostname+":"+app.get('port_https')+req.url);
//});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof httpPort === 'string'
            ? 'Pipe ' + httpPort
            : 'Port ' + httpPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
    debug('Listening on ' + bind);
}