'use strict';

const _ = require('underscore');

module.exports.command = 'echo';

module.exports.usage = '<message to echo>';
module.exports.description = 'Echoes a message';

module.exports.handler = (api, args, message) => {

  let echoMessage = args.join(' ');
  api.sendMessage(echoMessage, message.threadID);

};
