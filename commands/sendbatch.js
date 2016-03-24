'use strict';
var wrapper = require('../utilities/wrapper');

module.exports.command = 'sendbatch';
module.exports.usage = '<name1 name2 ..>';
module.exports.description = 'sends a list of people the same message';
module.exports.handler = (api, args, message) => {
	if(args.length % 2 == 1){
		for(let i = 0; i < args.length - 1; i+= 2){
			console.log(wrapper.getPersonData(api, args[i] + ' ' + args[i+1])); 
		}
	}
}