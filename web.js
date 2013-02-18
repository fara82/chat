var express = require('express'),
	app = express.createServer(),
	socket = require('socket.io'),
	io = socket.listen(app);

// set up static dir
app.use(express.static(__dirname + '/'));
app.use(express.bodyParser());

// io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["jsonp-polling"]); 
  io.set("polling duration", 10); 
  io.set( 'origins', '*fiddle.jshell.net*:*' );
});

app.listen(process.env.PORT || 5000);

// messages array
var messages = [],
	id=0; 

// find all messages
app.get('/messages', function (req, res) {
	res.send(messages);
});

// add a message to the list
app.post('/messages', function (req, res) {
	var message = {
		id: ++id,
		body: req.body.body
	}

	messages.push(message);

	if(messages.length === 100) {
		messages.shift();
	}

	io.sockets.emit('message-created', message); 
	res.send(message);
});