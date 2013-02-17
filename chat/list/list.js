steal('can','./init.ejs', 'chat/models/message.js',
function (can, initEJS, Message) {
	/**
	 * @class chat/message/list
	 * @alias MessageList
	 * @parent index
	 * @inherits can.Control
	 * Lists messages and lets you destroy them.
	 */
	return can.Control(
	/** @Static */
	{
		defaults : {
			Message: Message,
			list: new Message.List()
		}
	},
	/** @Prototype */
	{
		init: function () {
			this.element.html(initEJS(this.options.list));
			this.options.list.replace(Message.findAll());
		},
		'.destroy click': function (el) {
			if (confirm("Are you sure you want to destroy?")) {
				el.closest('.message').data('message').destroy();
			}
		},
		"{Message} created": function (Model, ev, instance) {
			//alert('message created');
			this.options.list.push(instance);
		}
	});
});