
var express = require('express');
var app = express.createServer()
var io = require('socket.io').listen(app);


app.use(express.static(__dirname + '/'));
app.use(express.bodyParser());

app.listen(5000);

//routing
app.get('/chat', function (req, res) {
	console.log(__dirname + '/chat/index.html');
	res.sendfile(__dirname + '/chat/index.html');
});

// usernames which are currently connected to the chat	
var users = [],
	messages = []; 

// find all messages
app.get('/messages', function (req, res) {
	res.send(messages);
});

// add chat message
app.post('/messages', function (req, res) {
	messages.push(req.body);
	io.sockets.emit('updatechat'); 
	res.send({success: true});
});

// find all users
app.get('/users', function (req, res) {
	res.send(users);
});

io.sockets.on('connection', function (socket) {
	var mySocket = socket;

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		mySocket.username = username;
		// add the client's username to the global list
		users.push({username:username});
		
		// echo to client they've connected
		socket.emit('updatechat');
		
		// update the list of users in chat, client-side
		io.sockets.emit('updateusers');

		socket.emit('loadchat', username);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		for(var i=0; i<users.length;i++) {

			if(mySocket.username && (users[i].username === mySocket.username)) {
				users.splice(i, 1);
				io.sockets.emit('updateusers');
				return;
			}
		}
	});
});