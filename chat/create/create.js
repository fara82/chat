steal('can', 'jquerypp/dom/form_params',
	function (can) {

	/**
	 * @class chat/message/create
	 * @alias MessageCreate
	 * @parent index
	 * @inherits jQuery.Controller
	 * Creates messages
	 */
	return can.Control(
	/** @Static */
	{
		defaults : {
			Model : new can.Model(),
			template: false,
			templateOptions: {}
		}
	},
	/** @Prototype */
	{
		init: function () {
			var options = this.options;
			if (options.template) {
				this.element.html(options.template(options.templateOptions));
			}
		},
		submit: function (el, ev) {
			ev.preventDefault();
			el.find('[type=submit]').val('Creating...')
			
			new this.options.Model(el.formParams()).save(function() {
				el.find('[type=submit]').val('Create');
				el[0].reset()
			});
		}
	});
});