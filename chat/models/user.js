steal('can', function (can) {
	/**
	 * @class chat/models/message
	 * @alias Message
	 * @parent index
	 * @inherits can.Model
	 *
	 * Wraps backend message services.
	 */
	return can.Model(
	/* @static */
	{
		findAll : "GET /users",
		create : "POST /users"
	},
	/* @Prototype */
	{});
});