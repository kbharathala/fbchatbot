'use strict';
var wrapper = require('../utilities/wrapper');

module.exports.command = 'sendbatch';
module.exports.usage = '<#name1 name2 ..>';
module.exports.description = 'sends a list of people the same sendMessage';
module.exports.handler = (api, args, message) => {
	if(args.length % 2 == 1){
		for(let i = 0; i < args.length - 1; i+= 2){
			wrapper.getPersonData(api, args[i] + ' ' + args[i+1], (api, data) => 
										{api.sendMessage(args[args.length-1], data[0].userID)}); 
		}
	}
}