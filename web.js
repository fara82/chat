
var express = require('express');
var app = express.createServer()
var io = require('socket.io').listen(app);


app.use(express.static(__dirname + '/'));
app.use(express.bodyParser());

console.log('dirname', __dirname);


app.listen(5000);

//routing
app.get('/chat', function (req, res) {
	console.log(__dirname + '/chat/index.html');
	res.sendfile(__dirname + '/chat/index.html');
});

// usernames which are currently connected to the chat	
var users = [],
	messages = []; 

app.get('/messages', function (req, res) {
	//console.log(req);
	//io.sockets.emit('updatechat', req.body); 
	
	res.send(messages);
});

// add chat message
app.post('/messages', function (req, res) {
	messages.push(req.body);
	// emit a update chat pub
	io.sockets.emit('updatechat'); 
	res.send({success: true});
});

// find all users
app.get('/users', function (req, res) {
	//console.log(req);
	//io.sockets.emit('updatechat', req.body); 
	
	res.send(users);
});

// add user
// app.post('/users', function (req, res) {
// 	var username = req.body;
// 	console.log('fara', username);
// 	users[username] = username;
// 	// emit a update chat pub
// 	io.sockets.emit('updateusers');
// 	console.log(socket); 
// 	res.send({success: true});
// });

io.sockets.on('connection', function (socket) {
	
	// when the client emits 'sendchat', this listens and executes
	// socket.on('sendchat', function (data) {
	// 	console.log('sending message', data);
	// 	// we tell the client to execute 'updatechat' with 2 parameters
	// 	//io.sockets.emit('updatechat', socket.username, data);
	// 	//io.sockets.emit('updatechat', data);
	// 	socket.emit('updatechat', data);
	// });

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		users[username] = username;
		
		// echo to client they've connected
		socket.emit('updatechat');

		// echo globally (all clients) that a person has connected
		//socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
		
		// update the list of users in chat, client-side
		//io.sockets.emit('updateusers');

		socket.emit('loadchat', username);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(socket){
		// remove the username from global usernames list
		//delete users[socket.username];
		//update list of users in chat, client-side
		//io.sockets.emit('updateusers');
		//echo globally that this client has left
		//socket.broadcast.emit('updatechat', {name: 'SERVER', message: socket.username + ' has disconnected'});
	});
});