'use strict';

var login = require("facebook-chat-api");
const _ = require("underscore");
var config = require("./config")
var commands = [];
login({email: config.fbemail, password: config.password}, function callback (err, api) {
    if(err) return console.error(err);

    api.listen(function callback(err, message) {
    	if(message.type === 'message' && message.body.charAt(0) === '/') {
    		let args = message.body.substring(1).split(' ');
    		let cmd = args[0];
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

module.exports.addCommand = (command, handler) => {
  if(_.isFunction(handler)) {
    commands.push({cmd: command, handler: handler});
  } else {
    console.error(`Invalid command. ${handler} is not a function`);
  }
};