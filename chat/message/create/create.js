steal('can', 'chat/models/message.js', './init.ejs', 'jquery/dom/form_params',
	function (can, Message, initEJS) {

	/**
	 * @class chat/message/create
	 * @alias MessageCreate
	 * @parent index
	 * @inherits jQuery.Controller
	 * Creates messages
	 */
	return can.Control(
	/** @Prototype */
	{
		init: function () {
			this.element.html(initEJS());
		},
		submit: function (el, ev) {
			ev.preventDefault();
			el.find('[type=submit]').val('Creating...')
			new Message(el.formParams()).save(function() {
				el.find('[type=submit]').val('Create');
				el[0].reset()
			});
		}
	});
});