//js chat/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs", function(DocumentJS){
	DocumentJS('chat/index.html', {
		markdown : ['chat', 'steal', 'jquery', 'can', 'funcunit']
	});
});