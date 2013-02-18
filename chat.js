// create a model for messages
var Message = can.Model(
	/* @static */
	{
        findAll : "GET /messages",
        create : function(attrs) {
        	$.post('/messages', attrs)
        	return $.Defferred()
        }
	},
	/* @Prototype */
	{}
);

// message list 
var list = new Message.List()

// initially find all messages and populate the message list with them 
list.replace(Message.findAll())

// add them to the view using an EJS template
$("#messages").html( can.view('messageEJS', list) )

// listen for the created event on our Model and 
// add the newly created message to the list
Message.bind("created", function(ev, message) {
	list.push(message)
})

// when the form is submitted 
// create a new message 
$("#create-message").bind("submit",function(ev){
	ev.preventDefault()
	new Message({body: $("#body").val()}).save()
})

// connect to the server
var socket = io.connect()

// listen for a 'message-created' event which will be produced by the server
// when a new message is created
socket.on('message-created', function(message){
	new Message(message).created()
})