steal('can', function (can) {
	/**
	 * @class /Users/fbasrawala/Sites/chat/chat/models/message
	 * @alias Message
	 * @parent index
	 * @inherits can.Model
	 *
	 * Wraps backend message services.
	 */
	return can.Model(
	/* @static */
	{
		findAll : "GET /messages",
		findOne : "GET /messages/{id}",
		create : "POST /messages",
		update : "PUT /messages/{id}",
		destroy : "DELETE /messages/{id}"
	},
	/* @Prototype */
	{});
});