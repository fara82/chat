steal(
	'chat/message/create',
	'chat/message/list',
	'./chat.less',
	'./models/fixtures/fixtures.js',
	'/socket.io/socket.io.js',
function(MessageCreate, MessageList){
	
	var socket = io.connect('http://localhost:5000');

	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		socket.emit('adduser', prompt("What's your name?"));
	});


	new MessageList('#messages');
	new MessageCreate('#create');
})