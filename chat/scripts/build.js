//js chat/scripts/build.js

load("steal/rhino/rhino.js");
steal('steal/build',function(){
	steal.build('chat/scripts/build.html',{to: 'chat'});
});
