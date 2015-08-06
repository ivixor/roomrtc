module.exports = function(io, streams, rooms) {

  io.on('connection', function(client) {
    console.log('-- ' + client.id + ' joined --');

    client.emit('id', client.id);

    client.on('message', function (details) {
		  var otherClient = io.sockets.connected[details.to];

      console.log("r: %s", client.id);
      console.log("r: %s", otherClient.id);

      	if (!otherClient) {
      	  	return;
      	}

        delete details.to;
        details.from = client.id;
        otherClient.emit('message', details);
    });
      
    client.on('readyToStream', function(options) {
      console.log('-- ' + client.id + ' is ready to stream --');


      client.room = options.room;
      client.join(client.room);

      console.log('-- joined room: ' + client.room + ' --');
      console.log(io.sockets.adapter.rooms[client.room]);




      streams.addStream(client.id, options.name);





		var clients = io.sockets.adapter.rooms[client.room];
		var otherClient;

      	var keys = Object.keys(clients);
      	for (i = 0; i < keys.length; i++) {
      		if (keys[i] != client.id) {
      			var data = keys[i];
      			otherClient = io.sockets.connected[keys[i]];
      			if (otherClient) {
      				client.emit('smth', data);
      				otherClient.emit('smth', client.id);
      			}
      			
      			console.log(client.id);
      			console.log(keys[i]);
      		}
      	}
      	//console.log(client.id);
      	//client.emit('smth', data);
      
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