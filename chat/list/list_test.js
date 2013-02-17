steal(
	'funcunit',
	'./list.js',
	'chat/models/message.js',
	'chat/models/fixtures',
	function(S, MessageList, Message, messageStore ){

	module("chat/message/list", { 
		setup: function(){
			$("#qunit-test-area").append("<div id='messages'></div>");
			this.list = new MessageList("#messages");
		},
		teardown: function(){
			$("#qunit-test-area").empty();
			messageStore.reset();
		}
	});
	
	test("lists all messages", function(){
		stop();
		
		// retrieve messages
		Message.findAll({}, function(messages){
			// make sure they are listed in the page
			
			S(".message").size(messages.length,function(){
				ok(true, "All messages listed");
				
				start();
			})
		})
	});
	
	test("lists created messages", function(){
		
		new Message({
			name: "Grilled Cheese",
			description: "grill cheese in bread"
		}).save();
		
		S('h3:contains(Grilled Cheese X)').exists("Lists created message");
	})
	
	
	test("delete messages", function(){
		new Message({
			name: "Ice Water",
			description: "mix ice and water"
		}).save();
		
		// wait until grilled cheese has been added
		S('h3:contains(Ice Water X)').exists();
		
		S.confirm(true);
		S('h3:last a').click();
		
		
		S('h3:contains(Ice Water)').missing("Grilled Cheese Removed");
		
	});


});