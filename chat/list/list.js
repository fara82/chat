steal('can', 
function (can) {
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
			Model: new can.Model(),
			list: new can.Model.List(),
			template: null
		}
	},
	/** @Prototype */
	{
		init: function () {
			var options = this.options;
			if (options.template) {
				this.element.html(options.template(options.list));
			}
			options.list.replace(options.Model.findAll());

		},
		"{Model} created": function (Model, ev, instance) {
			//alert('message created');
			this.options.list.push(instance);
		}
	});
});