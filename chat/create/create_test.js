steal('funcunit', 
	'./create.js',
	'chat/models/message.js',
	'chat/models/fixtures', 
	function (S, MessageCreate, Message, messageStore ) {

	module("chat/message/create", {
		setup: function(){
			$("#qunit-test-area").append("<form id='create'></form>");
			new MessageCreate("#create");
		},
		teardown: function(){
			$("#qunit-test-area").empty();
			messageStore.reset();
		}
	});
	
	test("create messages", function () {
		stop();
		
		Message.bind("created",function(ev, message){
			ok(true, "Ice Water added");
			equals(message.name, "Ice Water", "name set correctly");
			equals(message.description, 
				"Pour water in a glass. Add ice cubes.", 
				"description set correctly");
			start();
			Recipe.unbind("created",arguments.callee);
		})
		
		S("[name=name]").type("Ice Water");
		S("[name=description]").type("Pour water in a glass. Add ice cubes.");
		
		S("[type=submit]").click();
		
		S("[type=submit]").val("Creating...","button text changed while created");
		S("[type=submit]").val("Create", function(){
			ok(true, "button text changed back after create");
			equals(S("[name=name]").val(), "", "form reset");
			equals(S("[name=description]").val(), "", "form reset");
		});
	});

});