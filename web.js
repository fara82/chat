
var express = require('express'),
	app = express.createServer(),
	socket = require('socket.io'),
	io = socket.listen(app);

app.use(express.static(__dirname + '/'));
app.use(express.bodyParser());

// io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

app.listen(5000);

// usernames which are currently connected to the chat	
var messages = [],
	id=0; 

// find all messages
app.get('/messages', function (req, res) {
	res.send(messages);
});

// add chat message
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

// find all users
app.get('/users', function (req, res) {
	res.send(users);
});