module.exports = function(io, streams) {

  io.on('connection', function(client) {
    console.log('-- ' + client.id + ' joined --');

    client.emit('id', client.id);

    client.on('message', function (details) {
		var otherClient = io.sockets.connected[details.to];
		var room = io.sockets.adapter.rooms[client.room];

      	if (!otherClient && otherClient.room != room) {
      		console.log('clients room: %s', otherClient.room);
      		console.log('needed room: %s', room);
      	  	return;
      	}

        delete details.to;
        details.from = client.id;
        //otherClient.emit('message', details);

        //client.broadcast.to(client.room).emit('message', details);
    });
      
    client.on('readyToStream', function(options) {
      console.log('-- ' + client.id + ' is ready to stream --');

      client.room = options.room;
      client.join(client.room);
      console.log('-- joined room: ' + client.room + ' --');
      console.log(io.sockets.adapter.rooms[client.room]);
      
      streams.addStream(client.id, options.name);
    });
    
    client.on('update', function(options) {
      streams.update(client.id, options.name);
    });

    function leave() {
      console.log('-- ' + client.id + ' left --');
      streams.removeStream(client.id);
    }

    client.on('disconnect', leave);
    client.on('leave', leave);
  });
};