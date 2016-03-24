var login = require("facebook-chat-api");
var config = require("./config")


// commands dictionary 


// Create simple echo bot
login({email: config.fbemail, password: config.password}, function callback (err, api) {
    if(err) return console.error(err);

    api.listen(function callback(err, message) {

  //       api.sendMessage(message.body, message.threadID);
  //       api.getFriendsList(function(err, data) {
		// 	if(err) return console.error(err);
		// 	api.sendMessage(data[1].profileUrl, message.threadID);
		// });

    	if(message.body.charAt(0) === '/'){
    		command = message.body.substring(1); 
    		console.log(command)
    		args = command.split(' ')
    		if(args.length == 3){
    			if(args[0] == 'add'){
    				var name = args[1] + ' ' + args[2];
    				api.getUserID(name, function(err, data){
    					if(err) return console.error(err); 
    					var UserID

    				})
    				

    			}
    		}
    		else{
    			api.sendMessage(message.body, message.threadID);
    		}
    	}
    	else{
    		api.sendMessage('invalid command sir', message.threadID);
    	}

    });


});