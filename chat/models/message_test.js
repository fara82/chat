steal( "./message.js", 
	   "funcunit/qunit", 
	   "/Users/fbasrawala/Sites/chat/chat/models/fixtures", 
	   function( Message ){
	   	
	module("/Users/fbasrawala/Sites/chat/chat/models/message");
	
	test("findAll", function(){
		expect(4);
		stop();
		Message.findAll({}, function(messages){
			ok(messages, "findAll provides an object")
	        ok(messages.length, "findAll provides something array-like")
	        ok(messages[0].name, "findAll provides an object with a name")
	        ok(messages[0].description, "findAll provides an object with a description")
			start();
		});
	});
	
	test("create", function(){
		expect(3)
		stop();
		new Message({name: "dry cleaning", description: "take to street corner"}).save(function(message) {
			ok(message, "save provides an object");
			ok(message.id, "save provides and object with an id");
			equals(message.name,"dry cleaning", "save provides an objec with a name")
			message.destroy()
			start();
		});
	});

	test("update" , function(){
		expect(2);
		stop();
		new Message({name: "cook dinner", description: "chicken"}).save(function(message) {
			equals(message.description,"chicken", "save creates with description");
			message.attr({description: "steak"}).save(function(message){
				equals(message.description,"steak", "save udpates with description");
				message.destroy();
				start();
			});
        });
	});

	test("destroy", function(){
		expect(1);
		stop();
		new Message({name: "mow grass", description: "use riding mower"}).destroy(function(message) {
			ok( true ,"Destroy called" )
			start();
		});
	});
});