module.exports = function(app, streams, rooms) {

  var index = function(req, res) {
    res.render('index', { 
                  title: 'zeus libjingle test server', 
                  header: 'test',
                  id: req.params.id
                });
  };

  var displayStreams = function(req, res) {
    var streamList = streams.getStreams();
    var data = (JSON.parse(JSON.stringify(streamList))); 

    res.status(200).json(data);
  };

  var displayRooms = function(req, res) {
    console.log('%s', req.params.id);
    var roomList = rooms.getRooms();

    var data = (JSON.parse(JSON.stringify(roomList))); 
    res.status(200).json(data);
  };  

  var joinRoom = function(req, res) {
    var id = req.params.id;
    rooms.createRoom(id, streams);
    console.log('creating room');

    var roomList = rooms.getRooms();
    var data = JSON.parse(JSON.stringify(roomList));
    res.status(200).json(data);
  };

  app.get('/streams.json', displayStreams);
  app.get('/rooms.json', displayRooms);
  app.get('/join/:id', joinRoom);
  app.get('/', index);
  app.get('/:id', index);
};