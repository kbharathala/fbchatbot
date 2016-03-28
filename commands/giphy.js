'use strict';

var request = require('request');
const fs = require('fs');

module.exports.command = 'giphy';

module.exports.usage = '<giphy>';
module.exports.description = '';

module.exports.handler = (api, args, message) => {

	if(args.length == 0) {
		api.sendMessage("<search query>", message.threadID); 
	}

	var searchTerm = args.join(' ');

	request('http://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=dc6zaTOxFJmzC', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	if(JSON.parse(body).data.length == 0) {
	  		api.sendMessage("no results for that search query", message.threadID);
	  		return;
	  	}
	  	var url1 = JSON.parse(body).data[0].images.original.url;
	  	
	  var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
		    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		  });
		};

		download(url1, 'giphy.gif', function(){
	  		var msg = {
		      body: "",
		      attachment: fs.createReadStream(__dirname + '/../giphy.gif')
		    }
		    api.sendMessage(msg, message.threadID); 
		});

	  } else {
	  	console.log(error);
	  }
	})
}