steal(
	'chat/message/create',
	'chat/message/list',
	'./chat.less',
	//'./models/fixtures/fixtures.js',
function(MessageCreate, MessageList){
	new MessageList('#messages');
	new MessageCreate('#create');
})