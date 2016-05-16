'use strict';
var wrapper = require('../utilities/wrapper');

module.exports.command = 'remove';
module.exports.usage = '<name>';
module.exports.description = 'removes someone from the conversation';
module.exports.handler = (api, args, message) => {
	let participants = message.participantNames;
	if(args.length == 2 && message.threadName === '' && participants.indexOf(args[0]) != -1){
		wrapper.removePerson(api, args[0] + ' ' + args[1], message.threadID);
	}
	else{
		api.sendMessage('Can\'t remove this person from this chat',message.threadID);
	}
}