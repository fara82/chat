var express = require('express');

var app = express.createServer(express.logger()),
	io = require('socket.io').listen(app);

// app.get('/', function(request, response) {
//   response.send('Hello World!');
// });

app.configure(function () { 
  app.set("transports", ["xhr-polling"]); 
  app.set("polling duration", 10); 
});


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});