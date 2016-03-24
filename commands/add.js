var wrapper = require('../utilities/wrapper');

module.exports.command = 'add';
module.exports.usage = '<name>';
module.exports.description = 'adds someone to the conversation';
module.exports.handler = (api, args, message) => {
	if(args.length == 2 && message.threadName === ''){
		wrapper.addPerson(api, args[0] + ' ' + args[1], message.threadID);
	}
	else{
		api.sendMessage('Can\'t add this person to this chat',message.threadID);
	}
}