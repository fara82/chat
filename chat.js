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

var list = new Message.List()
list.replace(Message.findAll())

$("#messages").html( can.view('messageEJS', list) )

Message.bind("created", function(ev, message){
	list.push(message)
})

$("#create-message").bind("submit",function(ev){
	ev.preventDefault()
	new Message({body: $("#body").val()}).save()
})

var socket = io.connect('http://localhost:5000')

socket.on('message-created', function(message){
	new Message(message).created()
})