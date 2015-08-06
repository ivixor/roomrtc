/**
 * Module dependencies.
 */
var express = require('express')
,	path = require('path')
,	streams = require('./app/streams.js')()
,	rooms = require('./app/rooms.js')();


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);


// routing
require('./app/routes.js')(app, streams);

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
/**
 * Socket.io event handling
 */
require('./app/socketHandler.js')(io, streams, rooms);