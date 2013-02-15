// map fixtures for this application
steal("can/util/fixture", function(fixture) {

	var store = fixture.store(5, function(i){
		return {
			name: "message "+i,
			description: "message " + i
		}
	});
	
	fixture({
		'GET /messages' : store.findAll,
		'GET /messages/{id}' : store.findOne,
		'POST /messages' : store.create,
		'PUT /messages/{id}' : store.update,
		'DELETE /messages/{id}' : store.destroy
	});

	return store;
});