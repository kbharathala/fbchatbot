var login = require("facebook-chat-api");
var config = require("./config")


// commands dictionary 


// Create simple echo bot
login({email: config.fbemail, password: config.password}, function callback (err, api) {
    if(err) return console.error(err);

    api.listen(function callback(err, message) {
    	if(message.type === 'message' && message.body.charAt(0) === '/') {
    		args = message.body.substring(1).split(' ');
    		cmd = args[0];
    		args.shift();

    		let valid = false;
			_.each(commands, (command) => {
				if(command.cmd.toLowerCase() === cmd.toLowerCase()) {
					valid = true;
					command.handler(api, args, message);
				}
			});

			if(!valid) {
          		api.sendMessage({body: `Unknown command ${cmd}`}, message.threadID);
        	}
        }
    });


});