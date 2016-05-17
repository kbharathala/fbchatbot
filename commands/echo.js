'use strict';

const _ = require('underscore');

module.exports.command = 'echo';

module.exports.usage = '<message to echo>';
module.exports.description = 'Echoes a message';

module.exports.handler = function (event, callback){
	callback(event, event.message.text);
}
