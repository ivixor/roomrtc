module.exports = function(app, streams) {

  // GET streams as JSON
  var displayStreams = function(req, res) {
    var streamList = streams.getStreams();
    var data = (JSON.parse(JSON.stringify(streamList))); 

    res.status(200).json(data);
  };

  app.get('/streams.json', displayStreams);
}