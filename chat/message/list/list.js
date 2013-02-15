steal('can','./init.ejs', '/Users/fbasrawala/Sites/chat/chat/models/message.js',
function (can, initEJS, Message) {
	/**
	 * @class /Users/fbasrawala/Sites/chat/chat/message/list
	 * @alias MessageList
	 * @parent index
	 * @inherits can.Control
	 * Lists messages and lets you destroy them.
	 */
	return can.Control(
	/** @Static */
	{
		defaults : {
			Message: Message
		}
	},
	/** @Prototype */
	{
		init: function () {
			this.list = new Message.List();
			this.element.html(initEJS(this.list));
			this.list.replace(Message.findAll());
		},
		'.destroy click': function (el) {
			if (confirm("Are you sure you want to destroy?")) {
				el.closest('.message').data('message').destroy();
			}
		},
		"{Message} created": function (Model, ev, instance) {
			this.list.push(instance);
		}
	});
});